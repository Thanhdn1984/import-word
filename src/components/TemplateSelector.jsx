import React, { useState } from 'react';
import { FileText, FolderOpen, Trash2, Files } from 'lucide-react';

function TemplateSelector({ selectedTemplates, setSelectedTemplates }) {
  const [includeSubfolders, setIncludeSubfolders] = useState(false);

  const handleSelectFiles = async () => {
    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
      return;
    }

    const result = await window.electronAPI.selectFiles();
    
    if (!result.canceled && result.filePaths.length > 0) {
      const newTemplates = result.filePaths.map(path => ({
        id: Date.now() + Math.random(),
        path,
        name: path.split(/[\\/]/).pop(),
        type: 'file'
      }));
      
      setSelectedTemplates([...selectedTemplates, ...newTemplates]);
    }
  };

  const handleSelectFolder = async () => {
    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
      return;
    }

    const result = await window.electronAPI.selectFolder();
    
    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      const filesResult = await window.electronAPI.readDirectory(folderPath, { includeSubfolders });
      
      if (filesResult.success) {
        const newTemplates = filesResult.files.map(path => ({
          id: Date.now() + Math.random(),
          path,
          name: path.split(/[\\/]/).pop(),
          type: 'file'
        }));
        
        setSelectedTemplates([...selectedTemplates, ...newTemplates]);
      } else {
        alert('Lỗi khi đọc thư mục: ' + filesResult.error);
      }
    }
  };

  const handleRemoveTemplate = (id) => {
    setSelectedTemplates(selectedTemplates.filter(t => t.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả mẫu đã chọn?')) {
      setSelectedTemplates([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-banking-navy mb-6">Chọn mẫu Word</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleSelectFiles}
          className="bg-banking-teal text-white p-6 rounded-lg hover:bg-banking-dark transition-colors flex items-center justify-center space-x-3 shadow-md"
        >
          <Files size={32} />
          <div className="text-left">
            <div className="font-semibold text-lg">Chọn file</div>
            <div className="text-sm opacity-90">Chọn một hoặc nhiều file .docx</div>
          </div>
        </button>

        <button
          onClick={handleSelectFolder}
          className="bg-banking-navy text-white p-6 rounded-lg hover:bg-banking-dark transition-colors flex items-center justify-center space-x-3 shadow-md"
        >
          <FolderOpen size={32} />
          <div className="text-left">
            <div className="font-semibold text-lg">Chọn thư mục</div>
            <div className="text-sm opacity-90">Chọn tất cả file trong folder</div>
          </div>
        </button>
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSubfolders}
            onChange={(e) => setIncludeSubfolders(e.target.checked)}
            className="w-4 h-4 text-banking-teal focus:ring-banking-teal rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Bao gồm cả thư mục con (subfolders)
          </span>
        </label>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Mẫu đã chọn ({selectedTemplates.length})
          </h3>
          {selectedTemplates.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {selectedTemplates.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chưa chọn mẫu nào</p>
            <p className="text-sm">Nhấn nút phía trên để chọn file hoặc thư mục</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedTemplates.map(template => (
              <div
                key={template.id}
                className="bg-white p-4 rounded-lg flex items-center justify-between hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="text-blue-600" size={24} />
                  <div>
                    <div className="font-medium text-gray-800">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.path}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTemplate(template.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateSelector;
