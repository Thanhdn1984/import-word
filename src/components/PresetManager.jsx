import React, { useState, useEffect } from 'react';
import { Save, Upload, Download, Trash2, FolderOpen } from 'lucide-react';

function PresetManager({ fields, setFields, selectedTemplates, setSelectedTemplates, currentPreset, setCurrentPreset }) {
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState('');

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    if (!window.electronAPI) return;
    
    const result = await window.electronAPI.loadPresets();
    if (result.success) {
      setPresets(result.presets);
    }
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      alert('Vui lòng nhập tên preset');
      return;
    }

    if (!window.electronAPI) {
      alert('Chức năng này chỉ hoạt động trong ứng dụng Electron');
      return;
    }

    const preset = {
      name: presetName,
      fields,
      templates: selectedTemplates,
      createdAt: new Date().toISOString(),
    };

    const result = await window.electronAPI.savePreset(preset);
    
    if (result.success) {
      alert('Đã lưu preset thành công!');
      setPresetName('');
      loadPresets();
    } else {
      alert('Lỗi khi lưu preset: ' + result.error);
    }
  };

  const handleLoadPreset = (preset) => {
    if (confirm(`Tải preset "${preset.name}"? Dữ liệu hiện tại sẽ bị thay thế.`)) {
      setFields(preset.fields || []);
      setSelectedTemplates(preset.templates || []);
      setCurrentPreset(preset);
      alert('Đã tải preset thành công!');
    }
  };

  const handleExportPreset = async (preset) => {
    alert('Tính năng xuất preset đang được phát triển');
  };

  const handleImportPreset = async () => {
    alert('Tính năng nhập preset đang được phát triển');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-banking-navy mb-6">Quản lý Preset</h2>

      <div className="bg-gradient-to-r from-banking-light to-blue-50 p-6 rounded-lg mb-6 border border-banking-teal/20">
        <h3 className="text-lg font-semibold text-banking-navy mb-4">Lưu cấu hình hiện tại</h3>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Nhập tên preset (vd: Hồ sơ vay cá nhân)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
          />
          <button
            onClick={handleSavePreset}
            className="bg-banking-teal text-white px-6 py-2 rounded-lg hover:bg-banking-dark transition-colors flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Lưu Preset</span>
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Preset sẽ lưu:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>{fields.length} trường dữ liệu</li>
            <li>{selectedTemplates.length} mẫu Word đã chọn</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách Preset</h3>
          <button
            onClick={handleImportPreset}
            className="text-banking-teal hover:text-banking-dark text-sm font-medium flex items-center space-x-1"
          >
            <Upload size={16} />
            <span>Nhập từ file</span>
          </button>
        </div>

        {presets.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FolderOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chưa có preset nào</p>
            <p className="text-sm">Lưu cấu hình hiện tại để tạo preset mới</p>
          </div>
        ) : (
          <div className="space-y-3">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{preset.name}</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      {preset.fields?.length || 0} trường • {preset.templates?.length || 0} mẫu
                      {preset.createdAt && (
                        <span className="ml-2">
                          • {new Date(preset.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLoadPreset(preset)}
                      className="px-4 py-2 bg-banking-teal text-white rounded-lg hover:bg-banking-dark transition-colors text-sm"
                    >
                      Tải
                    </button>
                    <button
                      onClick={() => handleExportPreset(preset)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Xuất preset"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PresetManager;
