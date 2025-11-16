import React from 'react';
import { User, Home, Briefcase, DollarSign, Building2, CreditCard, FileText } from 'lucide-react';

const categoryIcons = {
  customer: User,
  residence: Home,
  income: Briefcase,
  loan: DollarSign,
  collateral: Building2,
  credit: CreditCard,
  business: FileText,
};

const categoryLabels = {
  customer: 'Thông tin khách hàng',
  residence: 'Hộ khẩu - Cư trú',
  income: 'Thu nhập - Công việc',
  loan: 'Khoản vay đề nghị',
  collateral: 'Tài sản đảm bảo',
  credit: 'Lịch sử tín dụng',
  business: 'Hộ kinh doanh / Doanh nghiệp',
};

function DataForm({ fields, formData, setFormData }) {
  const categories = [...new Set(fields.map(f => f.category))];

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
            placeholder={`Nhập ${field.label.toLowerCase()}...`}
            required={field.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
            required={field.required}
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
              placeholder="0"
              required={field.required}
            />
            <span className="absolute right-4 top-2.5 text-gray-500">VNĐ</span>
          </div>
        );

      case 'list':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
            placeholder="Nhập các giá trị cách nhau bằng dấu phẩy..."
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
            placeholder={`Nhập ${field.label.toLowerCase()}...`}
            required={field.required}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal focus:border-transparent"
            placeholder={`Nhập ${field.label.toLowerCase()}...`}
            required={field.required}
          />
        );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-banking-navy mb-6">Nhập dữ liệu khách hàng</h2>
      
      <div className="space-y-6">
        {categories.map(category => {
          const categoryFields = fields.filter(f => f.category === category);
          if (categoryFields.length === 0) return null;

          const Icon = categoryIcons[category] || FileText;

          return (
            <div key={category} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-banking-teal p-2 rounded-lg text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {categoryLabels[category] || category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryFields.map(field => (
                  <div key={field.id} className="bg-white p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>Chưa có trường nào được thiết lập.</p>
          <p className="text-sm">Vui lòng vào tab "Quản lý trường" để thêm trường mới.</p>
        </div>
      )}
    </div>
  );
}

export default DataForm;
