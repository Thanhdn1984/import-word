import React, { useState, useEffect } from 'react';
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
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'customer');

  // Sync activeCategory khi field set thay đổi (vd: load preset mới)
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories.join(','), activeCategory]);

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-banking-navy">Nhập dữ liệu khách hàng</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-800">
          ⚠ Trường có dấu <span className="text-red-500 font-bold">*</span> là bắt buộc
        </div>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>Chưa có trường nào được thiết lập.</p>
          <p className="text-sm">Vui lòng vào tab "Quản lý trường" để thêm trường mới.</p>
        </div>
      ) : (
        <>
          {/* Tab Navigation - Riêng biệt từng danh mục */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-2">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const Icon = categoryIcons[category] || FileText;
                const categoryFields = fields.filter(f => f.category === category);
                if (categoryFields.length === 0) return null;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                      activeCategory === category
                        ? 'bg-banking-teal text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">
                      {categoryLabels[category] || category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === category 
                        ? 'bg-white/20 text-white' 
                        : 'bg-banking-teal/10 text-banking-teal'
                    }`}>
                      {categoryFields.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Content */}
          {categories.map(category => {
            if (category !== activeCategory) return null;

            const categoryFields = fields.filter(f => f.category === category);
            if (categoryFields.length === 0) return null;

            const Icon = categoryIcons[category] || FileText;

            return (
              <div key={category} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="bg-banking-teal p-3 rounded-lg text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {categoryLabels[category] || category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categoryFields.length} trường dữ liệu
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryFields.map(field => (
                    <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
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
        </>
      )}
    </div>
  );
}

export default DataForm;
