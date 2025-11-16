import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { format } from 'date-fns';

export function validateData(fields, formData, templates) {
  const errors = [];
  const warnings = [];

  if (templates.length === 0) {
    errors.push('Chưa chọn mẫu Word nào');
  }

  const requiredFields = fields.filter(f => f.required);
  const missingFields = requiredFields.filter(f => !formData[f.name] || formData[f.name] === '');

  if (missingFields.length > 0) {
    errors.push(`Thiếu ${missingFields.length} trường bắt buộc: ${missingFields.map(f => f.label).join(', ')}`);
  }

  return { errors, warnings, isValid: errors.length === 0 };
}

export async function generateDocuments(options) {
  const { fields, formData, templates, outputFolder, fileNamePattern, conflictResolution, placeholderMode = {}, onProgress } = options;

  if (!window.electronAPI) {
    throw new Error('Electron API không khả dụng');
  }

  const results = [];
  let processedCount = 0;

  for (const template of templates) {
    try {
      const fileResult = await window.electronAPI.readFile(template.path);
      
      if (!fileResult.success) {
        results.push({
          fileName: template.name,
          success: false,
          error: fileResult.error,
        });
        continue;
      }

      const zip = new PizZip(new Uint8Array(fileResult.data));
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const templateData = {};
      fields.forEach(field => {
        // Nếu field được đánh dấu dùng làm mẫu, dùng placeholder thay vì giá trị thực
        if (placeholderMode[field.name]) {
          templateData[field.name] = `{{${field.name}}}`;
          return;
        }

        let value = formData[field.name] || '';

        switch (field.type) {
          case 'currency':
            if (value) {
              value = new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
            }
            break;
          case 'date':
            if (value) {
              try {
                value = format(new Date(value), 'dd/MM/yyyy');
              } catch (e) {
              }
            }
            break;
          case 'list':
            if (value) {
              const items = value.split(',').map(item => item.trim()).filter(item => item);
              value = items.map((item, index) => `${index + 1}. ${item}`).join('\n');
            }
            break;
        }

        templateData[field.name] = value;
      });

      doc.setData(templateData);

      try {
        doc.render();
      } catch (error) {
        results.push({
          fileName: template.name,
          success: false,
          error: `Lỗi khi render: ${error.message}`,
        });
        continue;
      }

      const buf = doc.getZip().generate({ type: 'uint8array' });

      let outputFileName = fileNamePattern
        .replace('{template}', template.name.replace('.docx', ''))
        .replace('{date}', format(new Date(), 'yyyyMMdd'));

      fields.forEach(field => {
        const placeholder = `{${field.name}}`;
        if (outputFileName.includes(placeholder)) {
          outputFileName = outputFileName.replace(placeholder, formData[field.name] || 'empty');
        }
      });

      if (!outputFileName.endsWith('.docx')) {
        outputFileName += '.docx';
      }

      const outputPath = `${outputFolder}/${outputFileName}`;

      const writeResult = await window.electronAPI.writeFile(outputPath, Array.from(buf));

      if (writeResult.success) {
        results.push({
          fileName: outputFileName,
          success: true,
          path: outputPath,
        });
      } else {
        results.push({
          fileName: outputFileName,
          success: false,
          error: writeResult.error,
        });
      }

    } catch (error) {
      results.push({
        fileName: template.name,
        success: false,
        error: error.message,
      });
    }

    processedCount++;
    if (onProgress) {
      onProgress(processedCount, templates.length);
    }
  }

  return results;
}
