# Công cụ tự động hóa tài liệu ngân hàng

Ứng dụng desktop giúp tạo hàng loạt file Word từ mẫu một cách tự động.

## 🚀 Cách chạy ứng dụng

### Chạy ngay (1 click)

```bash
npm start
```

Hoặc click đúp vào file `start.bat` (Windows) hoặc `start.sh` (Mac/Linux)

### Lần đầu sử dụng

1. Cài đặt các gói cần thiết:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

## 📖 Hướng dẫn sử dụng

### Bước 1: Quản lý trường dữ liệu
- Vào tab **"Quản lý trường"**
- Thêm các trường bạn cần (ví dụ: họ tên, CMND, địa chỉ...)
- Chọn kiểu dữ liệu phù hợp: văn bản, số, ngày, tiền tệ, danh sách...

### Bước 2: Chọn mẫu Word
- Vào tab **"Chọn mẫu"**
- Chọn file .docx hoặc cả thư mục chứa mẫu
- Mẫu Word phải có placeholder dạng: `{{ten_truong}}`

### Bước 3: Nhập dữ liệu
- Vào tab **"Nhập dữ liệu"**
- Điền thông tin khách hàng vào form

### Bước 4: Tạo file
- Vào tab **"Tạo file"**
- Chọn thư mục xuất file
- Click **"Tạo file Word"**

### Lưu cấu hình
- Sau khi thiết lập xong, vào tab **"Cấu hình"**
- Lưu bộ cài đặt để dùng lại sau

## 💡 Mẹo sử dụng

- **Mã giữ chỗ trong Word**: Sử dụng cú pháp `{{ten_truong}}` trong file Word
- **Danh sách**: Nhập các giá trị cách nhau bằng dấu phẩy
- **Tiền tệ**: Nhập số, hệ thống tự format thành "123,456 VNĐ"
- **Ngày tháng**: Hệ thống tự format thành dd/MM/yyyy

## 🔧 Các lệnh khác

- Chạy ở chế độ phát triển: `npm run dev`
- Chạy ứng dụng desktop: `npm run electron:dev`
- Build sản phẩm: `npm run build && npm run dist`

## 📝 Ví dụ mẫu Word

```
Kính gửi: {{ho_ten}}
CMND: {{so_cmnd}}
Ngày sinh: {{ngay_sinh}}
Số tiền vay: {{so_tien_vay}}
```

## 🎯 Tính năng

✅ Tùy chỉnh trường dữ liệu hoàn toàn
✅ Hỗ trợ nhiều kiểu dữ liệu
✅ Tạo hàng loạt file Word
✅ Lưu và tải cấu hình
✅ Giao diện tiếng Việt
✅ Hoạt động offline 100%
