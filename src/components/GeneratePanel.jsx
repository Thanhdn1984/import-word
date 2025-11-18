import React, { useState, useMemo } from 'react';
import { Download, AlertTriangle, CheckCircle, FileText, FolderOutput, RefreshCw, Type, Loader2 } from 'lucide-react';
import { generateDocuments, validateData } from '../utils/documentGenerator';

// --- ĐÃ VIỆT HÓA HOÀN TOÀN ---

function GeneratePanel({ fields, formData, selectedTemplates, rawTemplateContent, appSettings }) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [outputFolder, setOutputFolder] = useState('');
  const [fileNamePattern, setFileNamePattern] = useState('{customers[0].ho_ten} - HĐ Tín dụng - {date}');
  const [conflictResolution, setConflictResolution] = useState('rename');
  const [isReverseMode, setIsReverseMode] = useState(false);

  if (!fields || !formData || !selectedTemplates || !appSettings) {
    return (
      <div className="flex items-center justify-center h-60 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
        <Loader2 className="animate-spin mr-3" size={24} />
        <span>Đang khởi tạo dữ liệu cho bảng điều khiển...</span>
      </div>
    );
  }

  const handleSelectOutputFolder = async () => {
    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng đã cài đặt.');
      return;
    }
    const result = await window.electronAPI.selectSaveFolder();
    if (!result.canceled && result.filePaths.length > 0) {
      setOutputFolder(result.filePaths[0]);
    }
  };

  const isEditorMode = !!rawTemplateContent;

  const validationResult = useMemo(() => {
    return validateData(fields, formData, selectedTemplates, isReverseMode, rawTemplateContent);
  }, [fields, formData, selectedTemplates, rawTemplateContent, isReverseMode]);

  const handleValidate = () => {
    if (validationResult.errors && validationResult.errors.length > 0) {
      alert('Phát hiện các vấn đề sau:\n\n' + validationResult.errors.join('\n'));
    } else {
      alert('✓ Kiểm tra thành công! Dữ liệu hợp lệ, bạn đã sẵn sàng tạo file.');
    }
  };

  const handleGenerate = async () => {
    if (!outputFolder) {
      alert('Vui lòng chọn thư mục để lưu file trước.');
      return;
    }
    if (!validationResult.isValid) {
        alert('Dữ liệu chưa hợp lệ. Vui lòng xem lại các cảnh báo và sửa lỗi trước khi tạo file.');
        return;
    }
    if (!window.electronAPI) {
      alert('Chức năng tạo file chỉ hoạt động trong ứng dụng đã cài đặt.');
      return;
    }

    setGenerating(true);
    setProgress(0);
    setResults([]);

    try {
      const generationResults = await generateDocuments({
        fields,
        formData,
        templates: selectedTemplates,
        rawTemplateContent,
        outputFolder,
        fileNamePattern,
        conflictResolution,
        isReverseMode,
        appSettings,
        onProgress: (current, total) => setProgress((current / total) * 100),
      });
      setResults(generationResults);
    } catch (error) {
      console.error('Lỗi trong quá trình tạo file:', error);
      alert('Đã xảy ra lỗi nghiêm trọng khi xử lý file: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const isReady = validationResult.isValid && !!outputFolder;

  return (
    <div>
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-banking-navy">Tạo Tài Liệu Hàng Loạt</h2>
        <div className={`rounded-lg px-4 py-2 text-sm transition-all duration-300 font-semibold ${isEditorMode ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-purple-50 border border-purple-200 text-purple-800'}`}>
          {isEditorMode ? 'Chế độ: Soạn Thảo Nhanh' : 'Chế độ: Dùng Mẫu Word'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center"><FileText className="mr-2" size={20} />Nguồn Dữ Liệu</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Số mẫu Word đã chọn:</span>
              <span className={`font-medium px-2 py-0.5 rounded-full ${selectedTemplates.length > 0 ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'}`}>{selectedTemplates.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nội dung từ Soạn Thảo:</span>
              <span className={`font-medium px-2 py-0.5 rounded-full ${isEditorMode ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{isEditorMode ? 'Đang sử dụng' : 'Không'}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-3 flex items-center"><AlertTriangle className="mr-2" size={20} />Kiểm Tra Tính Hợp Lệ</h3>
          {validationResult.isValid ? (
            <div className="flex items-center text-green-700 font-semibold"><CheckCircle className="mr-2" size={20} /><span>Dữ liệu hợp lệ, sẵn sàng tạo file.</span></div>
          ) : (
            <div className="space-y-1 text-sm text-red-700">
             {(validationResult.errors || []).slice(0, 2).map((e, i) => <div key={i} className="font-medium">- {e}</div>)}
             {validationResult.errors && validationResult.errors.length > 2 && <div className="font-bold mt-1">... và {validationResult.errors.length - 2} lỗi khác.</div>}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tùy Chọn Xuất File</h3>
        <div className="space-y-4">
             <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-300">
                <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" checked={isReverseMode} onChange={(e) => setIsReverseMode(e.target.checked)} className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 mt-1" />
                <div>
                    <span className="font-semibold text-yellow-900">Chế độ Chuyển Đổi Ngược (Tạo mẫu từ file đã điền)</span>
                    <p className="text-xs text-yellow-800 mt-1">Khi bật, chương trình sẽ đọc một file Word bạn đã điền tay và tự động tạo ra một file mẫu mới (.docx) với các biến được chèn sẵn.</p>
                </div>
                </label>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thư mục lưu file</label>
            <div className="flex space-x-2">
              <input type="text" value={outputFolder} readOnly placeholder="Chưa chọn thư mục..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer" onClick={handleSelectOutputFolder}/>
              <button onClick={handleSelectOutputFolder} className="bg-banking-teal text-white px-4 py-2 rounded-lg hover:bg-banking-dark transition-colors flex items-center space-x-2"><FolderOutput size={20} /><span>Chọn Thư Mục</span></button>
            </div>
          </div>
          <div>
            <label htmlFor="fileNamePatternInput" className="block text-sm font-medium text-gray-700 mb-2">Cấu trúc đặt tên file</label>
            <input id="fileNamePatternInput" type="text" value={fileNamePattern} onChange={(e) => setFileNamePattern(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal font-mono" />
            <p className="text-xs text-gray-500 mt-1">Gợi ý: <code className="text-blue-600 bg-blue-100 p-1 rounded">{'customers[0].ho_ten'} - HĐ Tín dụng - {'date'}</code></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Khi bị trùng tên file</label>
            <select value={conflictResolution} onChange={(e) => setConflictResolution(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal">
              <option value="rename">Tự động đổi tên (vd: file_1, file_2)</option>
              <option value="overwrite">Ghi đè lên file cũ</option>
              <option value="skip">Bỏ qua không tạo file đó</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button onClick={handleValidate} className="w-full sm:w-1/3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"><AlertTriangle size={20} /><span>Kiểm Tra Lỗi</span></button>
        <button onClick={handleGenerate} disabled={!isReady || generating} className="w-full sm:w-2/3 bg-banking-teal text-white py-3 rounded-lg hover:bg-banking-dark transition-all flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-bold">
          {generating ? <Loader2 className="animate-spin" size={20} /> : (isReverseMode ? <RefreshCw size={20}/> : <Download size={20} />)}
          <span>{generating ? 'Đang xử lý...' : (isReverseMode ? 'BẮT ĐẦU CHUYỂN ĐỔI' : 'BẮT ĐẦU TẠO FILE')}</span>
        </button>
      </div>

      {generating && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
           <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-blue-900">Đang tạo file, vui lòng chờ...</span><span className="text-sm font-medium text-blue-900">{Math.round(progress)}%</span></div>
           <div className="w-full bg-blue-200 rounded-full h-2.5"><div className="bg-banking-teal h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kết Quả Tạo File</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {results.map((result, index) => (
              <div key={index} className={`p-3 rounded-lg flex items-center justify-between ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-3">
                  {result.success ? <CheckCircle className="text-green-600" size={20} /> : <AlertTriangle className="text-red-600" size={20} />}
                  <span className="text-sm font-medium text-gray-800">{result.fileName}</span>
                </div>
                {!result.success && <span className="text-xs text-red-700 text-right">{result.error}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratePanel;
