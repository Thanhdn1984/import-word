import React, { useState, useEffect } from 'react';
import { FileText, Settings, Download, Plus, Upload, Save, FolderOpen } from 'lucide-react';
import FieldManager from './components/FieldManager';
import DataForm from './components/DataForm';
import TemplateSelector from './components/TemplateSelector';
import PresetManager from './components/PresetManager';
import GeneratePanel from './components/GeneratePanel';

function App() {
  const [activeTab, setActiveTab] = useState('data');
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [currentPreset, setCurrentPreset] = useState(null);

  useEffect(() => {
    const defaultFields = [
      { id: '1', name: 'ho_ten', label: 'Họ và tên', type: 'text', category: 'customer', required: true },
      { id: '2', name: 'ngay_sinh', label: 'Ngày sinh', type: 'date', category: 'customer', required: true },
      { id: '3', name: 'so_cmnd', label: 'Số CMND/CCCD', type: 'text', category: 'customer', required: true },
      { id: '4', name: 'dia_chi', label: 'Địa chỉ thường trú', type: 'text', category: 'residence', required: true },
      { id: '5', name: 'so_dien_thoai', label: 'Số điện thoại', type: 'text', category: 'customer', required: true },
      { id: '6', name: 'nghe_nghiep', label: 'Nghề nghiệp', type: 'text', category: 'income', required: false },
      { id: '7', name: 'thu_nhap_thang', label: 'Thu nhập hàng tháng', type: 'currency', category: 'income', required: false },
      { id: '8', name: 'so_tien_vay', label: 'Số tiền vay', type: 'currency', category: 'loan', required: true },
      { id: '9', name: 'thoi_han_vay', label: 'Thời hạn vay (tháng)', type: 'number', category: 'loan', required: true },
      { id: '10', name: 'muc_dich_vay', label: 'Mục đích vay', type: 'text', category: 'loan', required: true },
    ];
    setFields(defaultFields);
  }, []);

  const tabs = [
    { id: 'data', label: 'Nhập dữ liệu', icon: FileText },
    { id: 'fields', label: 'Quản lý trường', icon: Settings },
    { id: 'templates', label: 'Chọn mẫu', icon: FolderOpen },
    { id: 'presets', label: 'Cấu hình', icon: Save },
    { id: 'generate', label: 'Tạo file', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-banking-navy to-banking-dark text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-banking-teal p-2 rounded-lg">
                <FileText size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Công cụ tự động hóa tài liệu</h1>
                <p className="text-sm text-blue-100">Hệ thống tạo hồ sơ tín dụng tự động</p>
              </div>
            </div>
            {currentPreset && (
              <div className="bg-banking-teal/20 px-4 py-2 rounded-lg">
                <span className="text-sm">Preset hiện tại: <strong>{currentPreset.name}</strong></span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <nav className="bg-white rounded-lg shadow-md mb-6 p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-banking-teal text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-6 min-h-[600px]">
          {activeTab === 'data' && (
            <DataForm 
              fields={fields} 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
          {activeTab === 'fields' && (
            <FieldManager 
              fields={fields} 
              setFields={setFields} 
            />
          )}
          {activeTab === 'templates' && (
            <TemplateSelector 
              selectedTemplates={selectedTemplates}
              setSelectedTemplates={setSelectedTemplates}
            />
          )}
          {activeTab === 'presets' && (
            <PresetManager 
              fields={fields}
              setFields={setFields}
              selectedTemplates={selectedTemplates}
              setSelectedTemplates={setSelectedTemplates}
              currentPreset={currentPreset}
              setCurrentPreset={setCurrentPreset}
            />
          )}
          {activeTab === 'generate' && (
            <GeneratePanel 
              fields={fields}
              formData={formData}
              selectedTemplates={selectedTemplates}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
