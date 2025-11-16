import React from 'react';
import { X, FileText, Settings, FolderOpen, Save, Download, CheckCircle } from 'lucide-react';

function WelcomeGuide({ onClose, onStartTour }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-banking-teal p-2 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold text-banking-navy">Hướng dẫn sử dụng</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!window.electronAPI && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-5">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-900 mb-2 text-lg">Đang ở chế độ xem demo trên Replit</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    Bạn đang xem giao diện ứng dụng. Để sử dụng đầy đủ tính năng 
                    (chọn file Word, tạo tài liệu), bạn cần <strong>tải ứng dụng về máy tính Windows</strong>.
                  </p>
                  <div className="bg-yellow-100 p-3 rounded border border-yellow-300">
                    <p className="text-sm font-semibold text-yellow-900 mb-1">📖 Hướng dẫn tải về:</p>
                    <p className="text-xs text-yellow-800">
                      Xem file <strong>LUU_Y_QUAN_TRONG.md</strong> hoặc <strong>HUONG_DAN_TAI_CHO_WINDOWS.md</strong> 
                      trong tab Files để biết cách tải về máy tính.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-banking-light to-blue-50 p-6 rounded-lg border border-banking-teal/20">
            <h3 className="text-lg font-semibold text-banking-navy mb-2">
              Chào mừng đến với công cụ tự động hóa tài liệu!
            </h3>
            <p className="text-gray-700">
              Ứng dụng giúp bạn tạo hàng loạt file Word từ mẫu chỉ bằng vài cú click.
              Nhập dữ liệu một lần, tạo nhiều file cùng lúc.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Các bước sử dụng:</h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-banking-teal text-white p-2 rounded-lg flex-shrink-0">
                  <Settings size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bước 1: Quản lý trường</h4>
                  <p className="text-sm text-gray-600">
                    Thêm các trường dữ liệu bạn cần (họ tên, CMND, số tiền...). 
                    Chọn kiểu dữ liệu phù hợp: văn bản, số, ngày, tiền tệ, danh sách.
                  </p>
                  <p className="text-xs text-banking-teal mt-2">
                    💡 Mỗi trường sẽ tạo một mã giữ chỗ dạng {'{{'}<span className="font-mono">ten_truong</span>{'}}'} để dùng trong Word
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-banking-teal text-white p-2 rounded-lg flex-shrink-0">
                  <FolderOpen size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bước 2: Chọn mẫu Word</h4>
                  <p className="text-sm text-gray-600">
                    Chọn file .docx hoặc cả thư mục chứa mẫu. Mẫu Word cần có mã giữ chỗ 
                    dạng {'{{'}<span className="font-mono">ten_truong</span>{'}}'}
                  </p>
                  <p className="text-xs text-banking-teal mt-2">
                    💡 Có thể chọn nhiều file hoặc cả folder cùng lúc
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-banking-teal text-white p-2 rounded-lg flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bước 3: Nhập dữ liệu</h4>
                  <p className="text-sm text-gray-600">
                    Điền thông tin khách hàng vào form. Dữ liệu được chia theo nhóm để dễ nhập.
                  </p>
                  <p className="text-xs text-banking-teal mt-2">
                    💡 Trường có dấu * là bắt buộc phải điền
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-banking-teal text-white p-2 rounded-lg flex-shrink-0">
                  <Download size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bước 4: Tạo file</h4>
                  <p className="text-sm text-gray-600">
                    Chọn thư mục xuất file, kiểm tra dữ liệu, rồi click "Tạo file Word"
                  </p>
                  <p className="text-xs text-banking-teal mt-2">
                    💡 Hệ thống sẽ tự động thay thế mã giữ chỗ và tạo file
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="bg-blue-600 text-white p-2 rounded-lg flex-shrink-0">
                  <Save size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Mẹo: Lưu cấu hình</h4>
                  <p className="text-sm text-gray-600">
                    Sau khi thiết lập xong, vào tab "Cấu hình" để lưu bộ cài đặt. 
                    Lần sau chỉ cần tải lại và nhập dữ liệu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Ví dụ mẫu Word
            </h4>
            <div className="bg-white p-4 rounded border border-yellow-200 font-mono text-sm">
              <div>Kính gửi: {'{{'}<span className="text-banking-teal font-semibold">ho_ten</span>{'}}'}</div>
              <div>CMND: {'{{'}<span className="text-banking-teal font-semibold">so_cmnd</span>{'}}'}</div>
              <div>Ngày sinh: {'{{'}<span className="text-banking-teal font-semibold">ngay_sinh</span>{'}}'}</div>
              <div>Số tiền vay: {'{{'}<span className="text-banking-teal font-semibold">so_tien_vay</span>{'}}'}</div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded" onChange={(e) => {
              if (e.target.checked) {
                localStorage.setItem('hideWelcomeGuide', 'true');
              } else {
                localStorage.removeItem('hideWelcomeGuide');
              }
            }} />
            <span>Không hiển thị lại</span>
          </label>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-banking-teal text-white rounded-lg hover:bg-banking-dark transition-colors font-medium"
          >
            Bắt đầu sử dụng
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeGuide;
