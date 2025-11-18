import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, Edit, Save, X, AlertTriangle, ChevronDown, ChevronUp, Lock } from 'lucide-react';

// --- ĐÃ VIỆT HÓA HOÀN TOÀN (VÀ SỬA LỖI HIỂN THỊ TÊN NHÓM) ---

// Bản đồ dịch tên các nhóm dữ liệu (để nhất quán với các phần khác của ứng dụng)
const groupNameMap = {
    customer: 'Khách hàng',
    loan: 'Khoản vay',
    collateral: 'Tài sản bảo đảm',
    income: 'Nguồn thu nhập',
    chua_phan_loai: 'Chưa phân loại'
};

const defaultCategories = ['customer', 'loan', 'collateral', 'income'];

// Hàm lấy tên tiếng Việt, nếu không có trong bản đồ thì trả về tên gốc
const getVietnameseGroupName = (name) => {
    return groupNameMap[name] || name.replace(/_/g, ' ');
};

function FieldManager({ fields, setFields, defaultFields }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [tempCategoryName, setTempCategoryName] = useState('');
    const [openCategories, setOpenCategories] = useState(() => {
        const uniqueCategories = [...new Set(fields.map(f => f.category))];
        return uniqueCategories.reduce((acc, cat) => ({ ...acc, [cat]: true }), {});
    });

    const groupedFields = useMemo(() => {
        const sortedFields = [...fields].sort((a, b) => (a.category > b.category) ? 1 : -1);
        return sortedFields.reduce((acc, field) => {
            const category = field.category || 'chua_phan_loai';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(field);
            return acc;
        }, {});
    }, [fields]);

    const handleRestoreDefaults = () => {
        if (window.confirm('Bạn có chắc muốn khôi phục danh sách trường về mặc định? Mọi thay đổi của bạn sẽ bị mất.')) {
            setFields(defaultFields);
            alert('Đã khôi phục danh sách trường mặc định thành công.');
        }
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategoryName || groupedFields[newCategoryName]) {
            alert('Tên nhóm không được để trống và không được trùng với tên đã có.');
            return;
        }
        const newField = { id: `custom_${Date.now()}`, name: `truong_moi_${Date.now()}`, label: 'Trường Mới', category: newCategoryName, type: 'text', options: [], required: false, isMultiple: true };
        setFields([...fields, newField]);
        setNewCategoryName('');
        setOpenCategories({...openCategories, [newCategoryName]: true });
    };

    const handleRenameCategory = (oldName) => {
        if (!tempCategoryName || (groupedFields[tempCategoryName] && tempCategoryName !== oldName)) {
            alert('Tên nhóm mới không hợp lệ hoặc đã tồn tại.');
            return;
        }
        if (window.confirm(`Bạn có chắc muốn đổi tên nhóm "${oldName}" thành "${tempCategoryName}"?`)) {
            const newFields = fields.map(f => f.category === oldName ? { ...f, category: tempCategoryName } : f);
            setFields(newFields);
        }
        setEditingCategory(null);
        setTempCategoryName('');
    };

    const handleDeleteCategory = (categoryName) => {
        if (window.confirm(`CẢNH BÁO: Bạn có chắc muốn xóa nhóm "${getVietnameseGroupName(categoryName)}" và TẤT CẢ các trường bên trong nó không? Hành động này không thể hoàn tác.`)) {
            setFields(fields.filter(f => f.category !== categoryName));
        }
    };

    const handleAddFieldToCategory = (categoryName) => {
        const newId = `custom_${Date.now()}`;
        const newField = { id: newId, name: '', label: 'Trường Mới', category: categoryName, type: 'text', options: [], required: false, isMultiple: true };
        const lastIndex = fields.map(f => f.category).lastIndexOf(categoryName);
        const newFields = [...fields];
        if (lastIndex > -1) {
             newFields.splice(lastIndex + 1, 0, newField);
        } else {
            newFields.push(newField);
        }
        setFields(newFields);
    };
    
    const handleFieldChange = (id, property, value) => {
        setFields(fields.map(field => {
            if (field.id === id) {
                const updatedField = { ...field, [property]: value };
                if (property === 'label' && !field.name) {
                    updatedField.name = 'var_' + value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                }
                if (property === 'type' && value !== 'select') {
                    updatedField.options = [];
                }
                return updatedField;
            }
            return field;
        }));
    };
    
    const handleRemoveField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const toggleCategory = (categoryName) => {
        setOpenCategories(prev => ({...prev, [categoryName]: !prev[categoryName]}));
    };

    return (
        <div className="space-y-8">
             <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-3xl font-bold text-banking-navy">Tùy Chỉnh Trường Dữ Liệu</h2>
                 <button onClick={handleRestoreDefaults} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
                    <AlertTriangle size={20} />
                    <span>Khôi phục Mặc định</span>
                </button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg mb-2">Tạo nhóm dữ liệu mới</h3>
                <form onSubmit={handleAddCategory} className="flex items-center space-x-2">
                    <input 
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                        placeholder="Tên nhóm, viết liền không dấu (vd: chi_tiet_tsdb)"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-banking-teal"
                    />
                    <button type="submit" className="bg-banking-teal text-white px-6 py-2 rounded-lg hover:bg-banking-dark transition-colors flex items-center space-x-2 disabled:bg-gray-400" disabled={!newCategoryName}>
                        <PlusCircle size={20} />
                        <span>Tạo Nhóm</span>
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                {Object.keys(groupedFields).sort().map((categoryName) => {
                    const isDefaultCategory = defaultCategories.includes(categoryName);
                    return (
                    <div key={categoryName} className="border border-slate-300 rounded-lg shadow-sm">
                        <div className="bg-slate-100 p-3 flex items-center justify-between rounded-t-lg">
                            {editingCategory === categoryName ? (
                                <div className="flex-grow flex items-center space-x-2">
                                    <input 
                                        type="text"
                                        value={tempCategoryName}
                                        onChange={(e) => setTempCategoryName(e.target.value)}
                                        className="p-1 border rounded"
                                        autoFocus
                                    />
                                    <button onClick={() => handleRenameCategory(categoryName)} className="text-green-600 p-1 hover:bg-green-100 rounded-md" title="Lưu tên nhóm"><Save size={20}/></button>
                                    <button onClick={() => setEditingCategory(null)} className="text-gray-500 p-1 hover:bg-gray-200 rounded-md" title="Hủy"><X size={20}/></button>
                                </div>
                            ) : (
                                <h3 className="text-xl font-bold text-banking-dark flex items-center capitalize">
                                    {getVietnameseGroupName(categoryName)}
                                    {isDefaultCategory ? (
                                        <Lock size={14} className="ml-3 text-gray-400" title="Đây là nhóm hệ thống, không thể sửa hoặc xóa."/>
                                    ) : (
                                        <>
                                            <button onClick={() => { setEditingCategory(categoryName); setTempCategoryName(categoryName); }} className="ml-3 text-gray-500 hover:text-blue-600" title="Đổi tên nhóm"><Edit size={16}/></button>
                                            <button onClick={() => handleDeleteCategory(categoryName)} className="ml-2 text-gray-500 hover:text-red-600" title="Xóa nhóm này và tất cả các trường bên trong"><Trash2 size={16}/></button>
                                        </>
                                    )}
                                </h3>
                            )}
                            <div className="flex items-center space-x-4">
                                <button onClick={() => handleAddFieldToCategory(categoryName)} className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 flex items-center space-x-1">
                                    <PlusCircle size={16}/><span>Thêm trường</span>
                                </button>
                                <button onClick={() => toggleCategory(categoryName)} className="text-gray-600" title={openCategories[categoryName] ? 'Thu gọn' : 'Mở rộng'}>
                                    {openCategories[categoryName] ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
                                </button>
                            </div>
                        </div>

                        {openCategories[categoryName] && (
                            <div className="p-4 space-y-3 bg-white">
                                {groupedFields[categoryName].map((field) => (
                                    <div key={field.id} className="bg-white border border-slate-200 p-3 rounded-md">
                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                                            <input type="text" placeholder="Nhãn (VD: Họ tên)" value={field.label} onChange={e => handleFieldChange(field.id, 'label', e.target.value)} className="md:col-span-2 p-2 border rounded" />
                                            <input type="text" placeholder="Tên biến" value={field.name} onChange={e => handleFieldChange(field.id, 'name', e.target.value)} className="p-2 border rounded bg-slate-100" title="Tên biến này sẽ được dùng trong file Word, ví dụ: ${var_ho_ten}. Tự động tạo, chỉ sửa khi bạn biết mình đang làm gì."/>
                                            <select value={field.type} onChange={e => handleFieldChange(field.id, 'type', e.target.value)} className="p-2 border rounded">
                                                <option value="text">Chữ</option>
                                                <option value="textarea">Đoạn văn</option>
                                                <option value="number">Số</option>
                                                <option value="currency">Tiền tệ</option>
                                                <option value="date">Ngày</option>
                                                <option value="select">Lựa chọn</option>
                                            </select>
                                            <div className="md:col-span-2 flex items-center justify-between">
                                                 <div className="flex items-center space-x-3">
                                                    <label className="flex items-center space-x-1 cursor-pointer" title="Đánh dấu nếu người dùng bắt buộc phải nhập trường này."><input type="checkbox" checked={field.required || false} onChange={e => handleFieldChange(field.id, 'required', e.target.checked)} /><span>Bắt buộc</span></label>
                                                    <label className="flex items-center space-x-1 cursor-pointer text-gray-400" title="Tất cả các trường trong một nhóm đều là dạng 'nhiều'. Thuộc tính này được quản lý ở cấp độ nhóm."><input type="checkbox" checked={field.isMultiple || true} readOnly disabled /><span>Nhiều</span></label>
                                                </div>
                                                <button onClick={() => handleRemoveField(field.id)} className="p-2 rounded-md text-red-500 hover:bg-red-100" title="Xóa trường này"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                        {field.type === 'select' && (
                                            <div className="mt-2">
                                                <input type="text" placeholder="Các lựa chọn, cách nhau bởi dấu phẩy (VD: Tín chấp,Thế chấp)" value={Array.isArray(field.options) ? field.options.join(',') : ''} onChange={e => handleFieldChange(field.id, 'options', e.target.value.split(','))} className="w-full p-2 border rounded" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )})}
            </div>
        </div>
    );
}

export default FieldManager;
