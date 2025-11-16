import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const fieldTypes = [
  { value: 'text', label: 'Văn bản' },
  { value: 'number', label: 'Số' },
  { value: 'date', label: 'Ngày tháng' },
  { value: 'currency', label: 'Tiền tệ' },
  { value: 'textarea', label: 'Văn bản dài' },
  { value: 'list', label: 'Danh sách' },
];

const categories = [
  { value: 'customer', label: 'Thông tin khách hàng' },
  { value: 'residence', label: 'Hộ khẩu - Cư trú' },
  { value: 'income', label: 'Thu nhập - Công việc' },
  { value: 'loan', label: 'Khoản vay đề nghị' },
  { value: 'collateral', label: 'Tài sản đảm bảo' },
  { value: 'credit', label: 'Lịch sử tín dụng' },
  { value: 'business', label: 'Hộ kinh doanh / Doanh nghiệp' },
];

function FieldManager({ fields, setFields }) {
  const [editingField, setEditingField] = useState(null);
  const [newField, setNewField] = useState({
    name: '',
    label: '',
    type: 'text',
    category: 'customer',
    required: false,
  });

  const handleAddField = () => {
    if (!newField.name || !newField.label) {
      alert('Vui lòng nhập tên trường và nhãn');
      return;
    }

    const field = {
      id: Date.now().toString(),
      ...newField,
    };

    setFields([...fields, field]);
    setNewField({
      name: '',
      label: '',
      type: 'text',
      category: 'customer',
      required: false,
    });
  };

  const handleDeleteField = (id) => {
    if (confirm('Bạn có chắc muốn xóa trường này?')) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  const handleEditField = (field) => {
    setEditingField({ ...field });
  };

  const handleSaveEdit = () => {
    setFields(fields.map(f => f.id === editingField.id ? editingField : f));
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-banking-navy">Quản lý trường dữ liệu</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800">
          💡 Mỗi trường sẽ tạo mã giữ chỗ dạng {'{{'}<span className="font-mono font-semibold">ten_truong</span>{'}}'}
        </div>
      </div>

      <div className="bg-gradient-to-r from-banking-light to-blue-50 p-6 rounded-lg mb-6 border border-banking-teal/20">
        <h3 className="text-lg font-semibold text-banking-navy mb-4 flex items-center">
          <Plus className="mr-2" size={20} />
          Thêm trường mới
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên trường (placeholder)
            </label>
            <input
              type="text"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              placeholder="vd: ho_ten"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhãn hiển thị
            </label>
            <input
              type="text"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              placeholder="vd: Họ và tên"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kiểu dữ liệu
            </label>
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            >
              {fieldTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhóm
            </label>
            <select
              value={newField.category}
              onChange={(e) => setNewField({ ...newField, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                className="w-4 h-4 text-banking-teal focus:ring-banking-teal rounded"
              />
              <span className="text-sm font-medium text-gray-700">Bắt buộc</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleAddField}
          className="w-full bg-banking-teal text-white py-2 rounded-lg hover:bg-banking-dark transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Thêm trường</span>
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Danh sách trường ({fields.length})
        </h3>

        {fields.map(field => (
          <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {editingField && editingField.id === field.id ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={editingField.name}
                  onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tên trường"
                />
                <input
                  type="text"
                  value={editingField.label}
                  onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhãn"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
                  >
                    <Save size={16} className="mr-1" />
                    Lưu
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                  >
                    <X size={16} className="mr-1" />
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-banking-navy">
                      {'{{'}{field.name}{'}}'}
                    </code>
                    <span className="font-medium text-gray-800">{field.label}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {fieldTypes.find(t => t.value === field.type)?.label}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {categories.find(c => c.value === field.category)?.label}
                    </span>
                    {field.required && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        Bắt buộc
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditField(field)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Chưa có trường nào. Thêm trường mới ở phía trên.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FieldManager;
