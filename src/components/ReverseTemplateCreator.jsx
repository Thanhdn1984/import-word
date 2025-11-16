import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';

function ReverseTemplateCreator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedPlaceholders, setExtractedPlaceholders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectFile = async () => {
    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
      return;
    }

    try {
      const result = await window.electronAPI.selectFiles({
        filters: [
          { name: 'Word Documents', extensions: ['doc', 'docx'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
      });

      if (!result.canceled && result.filePaths.length > 0) {
        setSelectedFile(result.filePaths[0]);
        setError(null);
      }
    } catch (err) {
      setError('Lỗi khi chọn file: ' + err.message);
    }
  };

  const handleExtractPlaceholders = async () => {
    if (!selectedFile) {
      setError('Vui lòng chọn file trước');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Trích xuất placeholders trực tiếp từ file path
      // IPC handler sẽ tự đọc file
      const placeholders = await window.electronAPI.extractPlaceholders(null, selectedFile);
      
      setExtractedPlaceholders(placeholders);
    } catch (err) {
      setError('Lỗi khi trích xuất placeholders: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (extractedPlaceholders.length === 0) {
      setError('Không có placeholders nào để lưu');
      return;
    }

    try {
      const result = await window.electronAPI.selectSaveFolder();
      
      if (!result.canceled) {
        const savePath = result.filePaths[0];
        
        // Tạo file cấu hình JSON
        const config = {
          placeholders: extractedPlaceholders,
          sourceFile: selectedFile,
          createdAt: new Date().toISOString()
        };

        await window.electronAPI.writeFile(
          `${savePath}/template_config.json`,
          JSON.stringify(config, null, 2)
        );

        alert(`Đã lưu cấu hình template vào: ${savePath}/template_config.json`);
      }
    } catch (err) {
      setError('Lỗi khi lưu template: ' + err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-banking-navy mb-2">Tạo mẫu ngược (Reverse Template)</h2>
        <p className="text-gray-600">
          Tải lên file Word đã điền sẵn để tự động trích xuất các trường dữ liệu và tạo template.
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Bước 1: Chọn file */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-banking-teal p-2 rounded-lg text-white">
            <Upload size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Bước 1: Chọn file Word</h3>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSelectFile}
            className="w-full px-6 py-3 bg-banking-teal text-white rounded-lg hover:bg-banking-teal/90 transition-colors flex items-center justify-center space-x-2"
          >
            <FileText size={20} />
            <span>Chọn file .doc hoặc .docx</span>
          </button>

          {selectedFile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Đã chọn file:</p>
                  <p className="text-xs text-green-700 mt-1 break-all">{selectedFile}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bước 2: Trích xuất */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-banking-teal p-2 rounded-lg text-white">
            <FileText size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Bước 2: Trích xuất dữ liệu</h3>
        </div>

        <button
          onClick={handleExtractPlaceholders}
          disabled={!selectedFile || isProcessing}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <FileText size={20} />
              <span>Trích xuất placeholders</span>
            </>
          )}
        </button>

        {extractedPlaceholders.length > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Tìm thấy {extractedPlaceholders.length} placeholders:
            </p>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {extractedPlaceholders.map((ph, idx) => (
                <div key={idx} className="text-xs bg-white p-2 rounded border border-blue-100">
                  <code className="text-blue-700">{`{{${ph.name}}}`}</code>
                  {ph.sampleValue && (
                    <span className="ml-2 text-gray-600">→ {ph.sampleValue}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bước 3: Lưu template */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-banking-teal p-2 rounded-lg text-white">
            <Download size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Bước 3: Lưu cấu hình template</h3>
        </div>

        <button
          onClick={handleSaveTemplate}
          disabled={extractedPlaceholders.length === 0}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Download size={20} />
          <span>Lưu cấu hình</span>
        </button>
      </div>

      {/* Hướng dẫn */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-900 mb-2">💡 Hướng dẫn sử dụng:</h4>
        <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
          <li>Chọn file Word đã điền sẵn dữ liệu</li>
          <li>Click "Trích xuất placeholders" để tự động phát hiện các trường</li>
          <li>Xem lại danh sách placeholders đã tìm thấy</li>
          <li>Lưu cấu hình để sử dụng cho lần sau</li>
        </ol>
        <p className="text-xs text-amber-700 mt-3">
          <strong>Lưu ý:</strong> Công cụ sẽ tự động phát hiện các mẫu như <code>{'{{tên_trường}}'}</code> trong file Word.
        </p>
      </div>
    </div>
  );
}

export default ReverseTemplateCreator;
