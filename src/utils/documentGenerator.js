import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import moment from 'moment';

// --- PHIÊN BẢN SỬA LỖI TRIỆT ĐỂ - ĐÚNG YÊU CẦU ĐƠN GIẢN CỦA BẠN ---

// Helper: Chuyển đổi object thành danh sách phẳng để xử lý.
const flattenObject = (obj, parentKey = '', result = {}) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = parentKey ? (Array.isArray(obj) ? `${parentKey}[${key}]` : `${parentKey}.${key}`) : key;
            const value = obj[key];
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                flattenObject(value, newKey, result);
            } else if (Array.isArray(value)) {
                 for(let i = 0; i < value.length; i++) {
                    flattenObject(value[i], `${newKey}[${i}]`, result);
                 }
            } else {
                result[newKey] = value;
            }
        }
    }
    return result;
};

// Hàm chính để xử lý tạo một file duy nhất
const generateSingleDocument = async (options) => {
    const {
        templateContent,
        data,
        isReverseMode,
        appSettings,
        fileNamePattern,
        outputFolder,
        conflictResolution
    } = options;

    try {
        let finalDocBuffer;
        const zip = new PizZip(templateContent);

        if (isReverseMode) {
            // --- YÊU CẦU 2: TỪ FILE HOÀN THIỆN -> FILE MẪU ---
            // Logic này sẽ đọc file XML bên trong file .docx và thay thế ngược lại
            const docXmlPath = 'word/document.xml';
            const docXml = zip.files[docXmlPath];
            if (!docXml) throw new Error('Tệp docx không hợp lệ: không tìm thấy word/document.xml.');

            let docText = docXml.asText();
            const flatData = flattenObject(data);
            
            // Sắp xếp các giá trị cần thay thế từ dài nhất -> ngắn nhất để tránh lỗi thay thế chồng chéo
            const sortedKeys = Object.keys(flatData).sort((a, b) => String(flatData[b]).length - String(flatData[a]).length);

            for (const key of sortedKeys) {
                const value = String(flatData[key]);
                if (value && value.trim() !== '') {
                    const placeholder = `${appSettings.variableOpening}${key}${appSettings.variableClosing}`;
                    // Thay thế tất cả các lần xuất hiện của giá trị bằng placeholder
                    const searchRegex = new RegExp(value.replace(/[-\/\\^$*+?.()|[\\]{}]/g, '\\$&'), 'g');
                    docText = docText.replace(searchRegex, placeholder);
                }
            }

            zip.file(docXmlPath, docText);
            finalDocBuffer = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });

        } else {
            // --- YÊU CẦU 1: TỪ FILE MẪU -> FILE HOÀN THIỆN ---
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters: {
                    start: appSettings.variableOpening,
                    end: appSettings.variableClosing
                }
            });

            const patchData = { ...data };
            const now = moment();
            patchData['date'] = now.format('DD/MM/YYYY');
            patchData['year'] = now.format('YYYY');
            patchData['month'] = now.format('MM');
            patchData['day'] = now.format('DD');

            doc.setData(patchData);
            
            try {
                doc.render();
            } catch (error) {
                // Bắt lỗi từ docxtemplater để báo biến nào bị thiếu trong file mẫu
                if (error.properties && error.properties.errors) {
                    const errorMessages = error.properties.errors.map(err => `Biến không tồn tại trong mẫu: ${err.properties.id}`).join('\n');
                    throw new Error(`Lỗi file mẫu: \n${errorMessages}`);
                }
                throw error;
            }

            finalDocBuffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
        }

        // Đặt tên file kết quả
        let finalFileName = fileNamePattern || 'file.docx';
        const allData = flattenObject({ ...data, date: moment().format('DD/MM/YYYY') });
        finalFileName = finalFileName.replace(/{\s*(.*?)\s*}/g, (match, key) => allData[key] || '');
        finalFileName = finalFileName.replace(/[\\/:*?"<>|]/g, '-').replace(/\s*-+\s*/g, ' - ') + '.docx';

        // Lưu file
        if (window.electronAPI && outputFolder) {
            const pathModule = window.path;
            const filePath = pathModule.join(outputFolder, finalFileName);
            await window.electronAPI.saveFile({ filePath, data: finalDocBuffer, conflictResolution });
        } else {
            const blob = new Blob([finalDocBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            saveAs(blob, finalFileName);
        }

        return { success: true, fileName: finalFileName };

    } catch (error) {
        console.error('Lỗi khi tạo tài liệu:', error);
        return { success: false, fileName: 'Lỗi', error: error.message };
    }
};

// Hàm điều phối chung
export const generateDocuments = async (options) => {
    const { templates, rawTemplateContent, onProgress, ...commonOptions } = options;
    const results = [];

    if (commonOptions.isReverseMode) {
        if (!templates || templates.length === 0) {
            return [{ success: false, fileName: 'Lỗi', error: 'Chế độ chuyển đổi ngược yêu cầu một file Word đã điền.' }];
        }
        const template = templates[0];
        let templateContent;
        if (window.electronAPI) {
            const fileReadResult = await window.electronAPI.readFile(template.path);
            templateContent = fileReadResult.success ? fileReadResult.data : null;
        } else {
            templateContent = template.path; 
        }

        if (templateContent) {
            const result = await generateSingleDocument({ ...commonOptions, templateContent });
            results.push(result);
        } else {
            results.push({ success: false, fileName: template.name, error: 'Không đọc được file để chuyển đổi.' });
        }

    } else { // Chế độ tạo file thông thường
        const hasEditorContent = !!rawTemplateContent;
        const hasTemplateFiles = templates && templates.length > 0;

        if (hasEditorContent) {
            const result = await generateSingleDocument({ ...commonOptions, templateContent: rawTemplateContent });
            results.push(result);
        } else if (hasTemplateFiles) {
            for (let i = 0; i < templates.length; i++) {
                const template = templates[i];
                let templateContent;
                if (window.electronAPI) {
                    const fileReadResult = await window.electronAPI.readFile(template.path);
                    templateContent = fileReadResult.success ? fileReadResult.data : null;
                } else {
                    templateContent = template.path;
                }
                
                if (templateContent) {
                    const result = await generateSingleDocument({ ...commonOptions, templateContent });
                    results.push(result);
                    if (onProgress) onProgress(i + 1, templates.length);
                } else {
                    results.push({ success: false, fileName: template.name, error: 'Không đọc được file mẫu.' });
                }
            }
        } else {
            return [{ success: false, fileName: 'Lỗi', error: 'Không có mẫu nào được chọn hoặc soạn thảo.' }];
        }
    }
    return results;
};

// Hàm kiểm tra dữ liệu đơn giản
export const validateData = (fields, formData, selectedTemplates, isReverseMode, rawTemplateContent) => {
    if (!formData) {
        return { isValid: false, errors: ['Chưa có dữ liệu nhập vào.'] };
    }

    const hasTemplateFile = selectedTemplates && selectedTemplates.length > 0;

    if (isReverseMode) {
        if (!hasTemplateFile) {
            return { isValid: false, errors: ['Chế độ Đảo ngược yêu cầu bạn chọn một file Word đã điền.'] };
        }
    } else {
        const hasEditorContent = !!rawTemplateContent;
        if (!hasTemplateFile && !hasEditorContent) {
            return { isValid: false, errors: ['Bạn cần chọn file mẫu hoặc dùng trình Soạn Thảo.'] };
        }
    }

    return { isValid: true, errors: [] };
};
