import React, { useState } from 'react';
import { Download, AlertTriangle, CheckCircle, FileText, FolderOutput } from 'lucide-react';
import { generateDocuments, validateData } from '../utils/documentGenerator';

function GeneratePanel({ fields, formData, selectedTemplates, placeholderMode }) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [outputFolder, setOutputFolder] = useState('');
  const [fileNamePattern, setFileNamePattern] = useState('{ho_ten}_{so_cmnd}_{template}_{date}');
  const [conflictResolution, setConflictResolution] = useState('rename');
  const [isTemplateMode, setIsTemplateMode] = useState(false);

  const handleSelectOutputFolder = async () => {
    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
      return;
    }

    const result = await window.electronAPI.selectSaveFolder();
    if (!result.canceled && result.filePaths.length > 0) {
      setOutputFolder(result.filePaths[0]);
    }
  };

  const handleValidate = () => {
    const validation = validateData(fields, formData, selectedTemplates);
    
    if (validation.errors.length > 0) {
      alert('Phát hiện lỗi:\n\n' + validation.errors.join('\n'));
    } else {
      alert('✓ Kiểm tra thành công! Không có lỗi.');
    }

    return validation;
  };

  const handleGenerate = async () => {
    const validation = handleValidate();
    
    if (validation.errors.length > 0) {
      return;
    }

    if (!outputFolder) {
      alert('Vui lòng chọn thư mục xuất file');
      return;
    }

    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
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
        outputFolder,
        fileNamePattern,
        conflictResolution,
        placeholderMode: isTemplateMode ? placeholderMode : {},
        onProgress: (current, total) => {
          setProgress((current / total) * 100);
        },
      });

      setResults(generationResults);
      alert(`Hoàn thành! Đã tạo ${generationResults.filter(r => r.success).length}/${generationResults.length} file.`);
    } catch (error) {
      alert('Lỗi khi tạo file: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const requiredFields = fields.filter(f => f.required);
  const missingFields = requiredFields.filter(f => !formData[f.name]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-banking-navy">Tạo file Word</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-sm text-purple-800">
          🚀 Tạo hàng loạt file chỉ trong vài giây
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <FileText className="mr-2" size={20} />
            Thông tin
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Trường dữ liệu:</span>
              <span className="font-medium">{fields.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trường bắt buộc:</span>
              <span className="font-medium">{requiredFields.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mẫu Word:</span>
              <span className="font-medium">{selectedTemplates.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dữ liệu đã nhập:</span>
              <span className="font-medium">{Object.keys(formData).filter(k => formData[k]).length}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            Kiểm tra
          </h3>
          {missingFields.length === 0 && selectedTemplates.length > 0 ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" size={20} />
              <span>Sẵn sàng tạo file</span>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              {missingFields.length > 0 && (
                <div className="text-red-600">
                  ⚠ Còn {missingFields.length} trường bắt buộc chưa nhập
                </div>
              )}
              {selectedTemplates.length === 0 && (
                <div className="text-red-600">
                  ⚠ Chưa chọn mẫu Word
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt xuất file</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thư mục xuất file
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={outputFolder}
                readOnly
                placeholder="Chọn thư mục..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={handleSelectOutputFolder}
                className="bg-banking-teal text-white px-4 py-2 rounded-lg hover:bg-banking-dark transition-colors flex items-center space-x-2"
              >
                <FolderOutput size={20} />
                <span>Chọn</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mẫu tên file
            </label>
            <input
              type="text"
              value={fileNamePattern}
              onChange={(e) => setFileNamePattern(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sử dụng: {'{ho_ten}'}, {'{so_cmnd}'}, {'{template}'}, {'{date}'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khi trùng tên file
            </label>
            <select
              value={conflictResolution}
              onChange={(e) => setConflictResolution(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            >
              <option value="rename">Đổi tên tự động (_v2, _v3...)</option>
              <option value="overwrite">Ghi đè</option>
              <option value="skip">Bỏ qua</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isTemplateMode}
                onChange={(e) => setIsTemplateMode(e.target.checked)}
                className="w-5 h-5 text-banking-teal border-gray-300 rounded focus:ring-banking-teal"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Chế độ tạo mẫu</span>
                <p className="text-xs text-gray-500">
                  Tạo file Word mẫu với placeholders thay vì giá trị thực. Các trường được đánh dấu "Dùng làm mẫu" sẽ dùng {'{{placeholder}}'} thay vì giá trị đã nhập.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleValidate}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
        >
          <AlertTriangle size={20} />
          <span>Kiểm tra trước</span>
        </button>

        <button
          onClick={handleGenerate}
          disabled={generating || missingFields.length > 0 || selectedTemplates.length === 0 || !outputFolder}
          className="flex-1 bg-banking-teal text-white py-3 rounded-lg hover:bg-banking-dark transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          <span>{generating ? 'Đang tạo...' : 'Tạo file Word'}</span>
        </button>
      </div>

      {generating && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Đang xử lý...</span>
            <span className="text-sm font-medium text-blue-900">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-banking-teal h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kết quả</h3>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {result.success ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <AlertTriangle className="text-red-600" size={20} />
                  )}
                  <span className="text-sm font-medium">{result.fileName}</span>
                </div>
                {!result.success && (
                  <span className="text-xs text-red-600">{result.error}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratePanel;
