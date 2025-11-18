import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const groupNameMap = {
    customer: 'Thông tin Khách hàng',
    loan_info: 'Thông tin Khoản vay',
    income: 'Nguồn thu nhập',
    expense: 'Chi phí hàng tháng',
    collateral: 'Tài sản bảo đảm',
    income_total: 'Tổng hợp Thu nhập',
    expense_total: 'Tổng hợp Chi phí',
    collateral_total: 'Tổng hợp Tài sản bảo đảm',
};

const getVietnameseGroupName = (name) => groupNameMap[name] || name;

const parseCurrency = (value, separator = ',') => {
    if (typeof value === 'number') return value;
    if (!value || typeof value !== 'string') return 0;
    return parseFloat(value.replace(new RegExp(`\\${separator}`, 'g'), '')) || 0;
};

const formatCurrency = (value, separator = ',') => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

// --- COMPONENT FormField ĐÃ ĐƯỢC CẬP NHẬT ---
const FormField = ({ field, value, onChange, appSettings }) => {
    const commonProps = {
        id: field.name,
        name: field.name,
        className: "p-2 border rounded w-full",
        required: field.required,
    };

    if (field.readOnly) {
        commonProps.className += " bg-slate-200 font-medium text-gray-800 focus:ring-0 cursor-not-allowed";
        commonProps.readOnly = true;
    }

    // Xử lý CHECKBOX
    if (field.type === 'checkbox') {
        return (
            <div className="flex items-center h-full mt-2">
                <input 
                    type="checkbox" 
                    id={field.name}
                    name={field.name}
                    checked={!!value} // Sử dụng !! để đảm bảo giá trị là boolean
                    onChange={(e) => onChange(e.target.checked)} // Gửi về giá trị boolean
                    className="h-5 w-5 rounded border-gray-300 text-banking-teal focus:ring-banking-teal"
                />
                <label htmlFor={field.name} className="ml-2 text-sm font-medium text-gray-700">{field.label}</label>
            </div>
        );
    }

    let displayValue = value;
    if (field.type === 'currency') {
        displayValue = formatCurrency(value, appSettings.numberSeparator);
    } else if (value === null || value === undefined) {
        displayValue = '';
    }

    // Xử lý các input khác
    const handleChange = (e) => onChange(e.target.value);

    switch (field.type) {
        case 'textarea':
            return <textarea {...commonProps} value={displayValue} onChange={handleChange} rows="3" />;
        case 'select':
            return (
                <select {...commonProps} value={displayValue} onChange={handleChange}>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        default:
            return <input type={field.type || 'text'} {...commonProps} value={displayValue} onChange={handleChange} />;
    }
};

function DataForm({ fields, formData, setFormData, appSettings }) {
    const [collapsedSections, setCollapsedSections] = useState({});

    const toggleSection = (groupName) => {
        setCollapsedSections(prev => ({ ...prev, [groupName]: !prev[groupName] }));
    };

    const handleFieldChange = (fieldName, value) => {
        const field = fields.find(f => f.name === fieldName);
        let parsedValue = value;
        if (field && field.type === 'currency' && !field.readOnly) {
            parsedValue = parseCurrency(value, appSettings.numberSeparator);
        }
        setFormData(prev => ({ ...prev, [fieldName]: parsedValue }));
    };

    const handleGroupedChange = (groupName, index, fieldName, value) => {
        const newFormData = { ...formData };
        const field = fields.find(f => f.name === fieldName && f.category === groupName);
        let parsedValue = value;

        if (field && field.type === 'currency') {
            parsedValue = parseCurrency(value, appSettings.numberSeparator);
        }
        
        if (!newFormData[groupName]) newFormData[groupName] = [];
        while (newFormData[groupName].length <= index) {
            newFormData[groupName].push({});
        }

        newFormData[groupName][index][fieldName] = parsedValue;
        setFormData(newFormData);
    };

    const addGroupItem = (groupName) => {
        const newFormData = { ...formData };
        if (!newFormData[groupName]) newFormData[groupName] = [];

        const defaultItem = {};
        const groupFields = fields.filter(f => f.category === groupName);
        groupFields.forEach(field => {
            defaultItem[field.name] = field.defaultValue !== undefined ? field.defaultValue : (field.type === 'select' && field.options?.[0]);
        });

        newFormData[groupName].push(defaultItem);
        setFormData(newFormData);
    };

    const removeGroupItem = (groupName, index) => {
        const newFormData = { ...formData };
        newFormData[groupName].splice(index, 1);
        setFormData(newFormData);
    };

    // Tách các trường đơn lẻ và các trường nhóm
    const { singleFields, groupedFields } = useMemo(() => {
        const single = fields.filter(f => !f.isMultiple && !f.isCalculated);
        const grouped = fields.filter(f => f.isMultiple);
        return { singleFields: single, groupedFields: grouped };
    }, [fields]);

    // Nhóm các trường đơn lẻ theo category
    const singleFieldsByCategory = useMemo(() => {
        const groups = {};
        singleFields.forEach(field => {
            if (!groups[field.category]) groups[field.category] = [];
            groups[field.category].push(field);
        });
        return Object.entries(groups);
    }, [singleFields]);
    
    // Nhóm các trường isMultiple theo category
    const groupedFieldsByCategory = useMemo(() => {
        const groups = {};
        groupedFields.forEach(field => {
            if (!groups[field.category]) groups[field.category] = [];
            groups[field.category].push(field);
        });
        return Object.entries(groups);
    }, [groupedFields]);

    // Nhóm các trường tính toán (tổng hợp)
    const calculatedFieldsByCategory = useMemo(() => {
         const groups = {};
        fields.filter(f => f.isCalculated && !f.isMultiple).forEach(field => {
             if (!groups[field.category]) groups[field.category] = [];
            groups[field.category].push(field);
        });
        return Object.entries(groups);
    }, [fields]);


    // --- RENDER FUNCTIONS ---

    const renderSingleFieldGroup = ([groupName, fieldList]) => {
         const isCollapsed = collapsedSections[groupName];
         const vietnameseGroupName = getVietnameseGroupName(groupName);
         return (
            <div key={groupName} className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-3 cursor-pointer select-none" onClick={() => toggleSection(groupName)}>
                    <h3 className="text-xl font-semibold capitalize text-banking-dark">{vietnameseGroupName}</h3>
                    {isCollapsed ? <ChevronDown size={24} className="text-gray-600"/> : <ChevronUp size={24} className="text-gray-600"/>}
                </div>
                {!isCollapsed && (
                    <div className="p-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {fieldList.map(field => (
                            <div key={field.id}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                <FormField field={field} value={formData[field.name]} onChange={(val) => handleFieldChange(field.name, val)} appSettings={appSettings}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         );
    };

    const renderMultiFieldGroup = ([groupName, fieldList]) => {
        const dataList = formData[groupName] || [];
        const isCollapsed = collapsedSections[groupName];
        const vietnameseGroupName = getVietnameseGroupName(groupName);

        return (
            <div key={groupName} className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-3 cursor-pointer select-none" onClick={() => toggleSection(groupName)}>
                    <h3 className="text-xl font-semibold capitalize text-banking-dark">{vietnameseGroupName}</h3>
                     <div className="flex items-center space-x-4">
                        <button onClick={(e) => { e.stopPropagation(); addGroupItem(groupName); }} className="bg-banking-teal text-white py-1 px-3 rounded-lg hover:bg-banking-dark transition-colors flex items-center space-x-2">
                            <PlusCircle size={16} />
                            <span>Thêm mục</span>
                        </button>
                        {isCollapsed ? <ChevronDown size={24} className="text-gray-600"/> : <ChevronUp size={24} className="text-gray-600"/>}
                    </div>
                </div>
                {!isCollapsed && (
                    <div className="space-y-4 p-4 border-t border-slate-200">
                        {dataList.map((item, index) => (
                            <div key={index} className="bg-white border border-slate-300 p-4 rounded-lg relative pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                <div className="absolute top-2 left-3 text-sm font-bold text-banking-dark">{vietnameseGroupName} #{index + 1}</div>
                                {fieldList.map(field => (
                                    <div key={field.id} className={field.type === 'checkbox' ? 'md:col-span-2 lg:col-span-3' : ''}>
                                        {field.type !== 'checkbox' && <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>}
                                        <FormField 
                                            field={field} 
                                            value={item[field.name]} 
                                            onChange={(val) => handleGroupedChange(groupName, index, field.name, val)} 
                                            appSettings={appSettings}
                                        />
                                    </div>
                                ))}
                                 <button onClick={() => removeGroupItem(groupName, index)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full" title={`Xóa mục #${index + 1}`}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                         {dataList.length === 0 && <p className="text-sm text-gray-500 px-2">Chưa có mục nào. Nhấn "Thêm mục" để bắt đầu.</p>}
                    </div>
                )}
            </div>
        );
    };
    
    const renderCalculatedGroup = ([groupName, fieldList]) => {
         const isCollapsed = collapsedSections[groupName];
         const vietnameseGroupName = getVietnameseGroupName(groupName);
         return (
            <div key={groupName} className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                 <div className="flex items-center justify-between p-3 cursor-pointer select-none" onClick={() => toggleSection(groupName)}>
                    <h3 className="text-xl font-semibold capitalize text-banking-dark">{vietnameseGroupName}</h3>
                    {isCollapsed ? <ChevronDown size={24} className="text-gray-600"/> : <ChevronUp size={24} className="text-gray-600"/>}
                </div>
                {!isCollapsed && (
                     <div className="p-4 border-t border-blue-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {fieldList.map(field => (
                            <div key={field.id}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                <FormField field={{...field, readOnly: true}} value={formData[field.name]} onChange={() => {}} appSettings={appSettings}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-banking-navy pb-4 border-b">Nhập Dữ Liệu Hồ Sơ</h2>
            {singleFieldsByCategory.map(renderSingleFieldGroup)}
            {groupedFieldsByCategory.map(renderMultiFieldGroup)}
            {calculatedFieldsByCategory.map(renderCalculatedGroup)}
        </div>
    );
}

export default DataForm;
