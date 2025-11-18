import React, { useState, useEffect } from 'react';
import DataForm from './components/DataForm';
import FieldManager from './components/FieldManager';
import TemplateSelector from './components/TemplateSelector';
import GeneratePanel from './components/GeneratePanel';
import { Home, FileText, List, Download, Loader2, AlertTriangle } from 'lucide-react';

// --- ĐÃ VIỆT HÓA VÀ TỐI GIẢN --

const defaultFields = [
    { id: 'c1', name: 'danh_xung', label: 'Danh xưng', category: 'customer', type: 'select', options: ['Ông', 'Bà'], required: true, isMultiple: true },
    { id: 'c2', name: 'ho_ten', label: 'Họ và tên', category: 'customer', type: 'text', required: true, isMultiple: true },
    { id: 'c4', name: 'so_cmnd', label: 'Số CMND/CCCD', category: 'customer', type: 'text', required: true, isMultiple: true },
    { id: 'l1', name: 'so_tien_vay', label: 'Số tiền vay', category: 'loan', type: 'currency', required: true, isMultiple: true },
];

const initialFormData = {
    customers: [{ danh_xung: 'Ông', selected: true }],
    collaterals: [],
    loans: [],
    incomes: []
};

const loadAndValidate = (key, fallback, validator) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved == null) return fallback;
        const parsed = JSON.parse(saved);
        return validator(parsed) ? parsed : fallback;
    } catch (e) {
        console.warn(`Dữ liệu cho "${key}" trong localStorage bị hỏng. Đang quay lại giá trị mặc định.`, e);
        return fallback;
    }
};

// Validators
const validateFields = (fields) => Array.isArray(fields) && fields.every(f => typeof f === 'object' && f.id && f.name);
const validateFormData = (data) => typeof data === 'object' && data !== null && Array.isArray(data.customers);
const validateTemplates = (templates) => Array.isArray(templates);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('form');
    const [fields, setFields] = useState(null);
    const [formData, setFormData] = useState(null);
    const [selectedTemplates, setSelectedTemplates] = useState(null);

    useEffect(() => {
        try {
            setFields(loadAndValidate('app_fields', defaultFields, validateFields));
            setFormData(loadAndValidate('app_formData', initialFormData, validateFormData));
            setSelectedTemplates(loadAndValidate('app_selected_templates', [], validateTemplates));
            setIsLoading(false);
        } catch (e) {
            console.error("Đã xảy ra lỗi nghiêm trọng trong quá trình khởi động ứng dụng:", e);
            setError(e);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { if (fields) localStorage.setItem('app_fields', JSON.stringify(fields)); }, [fields]);
    useEffect(() => { if (formData) localStorage.setItem('app_formData', JSON.stringify(formData)); }, [formData]);
    useEffect(() => { if (selectedTemplates) localStorage.setItem('app_selected_templates', JSON.stringify(selectedTemplates)); }, [selectedTemplates]);

    const tabs = {
        form: { label: 'Nhập Dữ Liệu', icon: FileText },
        fields: { label: 'Quản Lý Trường', icon: List },
        templates: { label: 'Chọn Mẫu Word', icon: Home },
        generate: { label: 'Tạo File', icon: Download },
    };
    
    const forceClearAndReload = () => {
        if (window.confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu đã nhập và cài đặt trường?')) {
            localStorage.clear();
            window.location.reload();
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center text-gray-600 font-sans">
                    <Loader2 className="animate-spin mb-4 text-banking-teal" size={48} />
                    <h1 className="text-xl font-semibold">Đang tải dữ liệu...</h1>
                </div>
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
                <div className="flex flex-col items-center text-red-800 bg-white p-8 rounded-lg shadow-xl border border-red-200">
                    <AlertTriangle className="mb-4 text-red-600" size={48} />
                    <h1 className="text-xl font-semibold mb-2">Đã xảy ra lỗi nghiêm trọng</h1>
                    <p className="text-center mb-4">Ứng dụng không thể khởi động. Nhấn nút bên dưới để xóa dữ liệu hỏng và tải lại.</p>
                    <button onClick={forceClearAndReload} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Xóa dữ liệu và Tải lại</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <aside className="w-64 bg-banking-dark text-white p-4 flex flex-col">
                 <div className="text-center py-4 mb-6">
                    <h1 className="text-xl font-bold">DocuGen</h1>
                    <p className="text-xs text-slate-300">Tự động hoá tài liệu</p>
                </div>
                <nav className="flex-1">
                    <ul>
                        {Object.entries(tabs).map(([key, { label, icon: Icon }]) => (
                            <li key={key} className="mb-2">
                                <a href="#" onClick={() => setActiveTab(key)} 
                                   className={`flex items-center p-3 rounded-lg transition-colors ${activeTab === key ? 'bg-banking-teal' : 'hover:bg-white/10'}`}>\
                                    <Icon size={20} className="mr-3" />
                                    <span>{label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-2 text-center">
                    <button onClick={forceClearAndReload} className="text-xs text-slate-400 hover:text-white hover:bg-red-600/50 p-2 rounded w-full">Xóa dữ liệu</button>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
                    {activeTab === 'form' && <DataForm fields={fields} formData={formData} setFormData={setFormData} appSettings={{numberSeparator: ','}}/>}
                    {activeTab === 'fields' && <FieldManager fields={fields} setFields={setFields} defaultFields={defaultFields} />}
                    {activeTab === 'templates' && <TemplateSelector selectedTemplates={selectedTemplates} setSelectedTemplates={setSelectedTemplates} />}
                    {activeTab === 'generate' && <GeneratePanel fields={fields} formData={formData} selectedTemplates={selectedTemplates} rawTemplateContent={null} appSettings={{numberSeparator: ','}} />} 
                </div>
            </main>
        </div>
    );
}

export default App;
