# ⚠️ LƯU Ý QUAN TRỌNG

## 🚫 Ứng dụng KHÔNG THỂ chạy đầy đủ trên Replit

### Tại sao?
- **Replit** là môi trường cloud, không hỗ trợ ứng dụng desktop (Electron)
- Các tính năng **chọn file** và **tạo file Word** cần quyền truy cập hệ thống file
- Chỉ máy tính cá nhân mới có đầy đủ quyền này

### Trên Replit bạn có thể:
✅ **XEM** giao diện ứng dụng  
✅ **HIỂU** cách hoạt động  
✅ **ĐÁNH GIÁ** thiết kế và tính năng  

### Trên Replit bạn KHÔNG thể:
❌ **Chọn file Word** (nút "Chọn file" sẽ báo lỗi)  
❌ **Chọn thư mục** (nút "Chọn thư mục" sẽ báo lỗi)  
❌ **Tạo file Word** (nút "Tạo file Word" sẽ báo lỗi)  
❌ **Lưu preset** vào máy  

---

## ✅ GIẢI PHÁP: Tải về máy tính Windows

### Bước 1: Tải mã nguồn
Có 2 cách:

#### CÁCH 1: Dùng GitHub (KHUYẾN NGHỊ)
1. Trên Replit, tìm tab **"Version Control"** (🌿) bên trái
2. Click **"Connect to GitHub"** hoặc **"Publish to GitHub"**
3. Đăng nhập GitHub (tạo tài khoản miễn phí tại https://github.com nếu chưa có)
4. Đặt tên: `docx-automation-tool` → Click **Publish**
5. Mở link GitHub vừa tạo → Click nút **"Code"** → **"Download ZIP"**
6. Giải nén file ZIP

#### CÁCH 2: Tải từng file thủ công
Xem hướng dẫn chi tiết trong file: **`HUONG_DAN_TAI_CHO_WINDOWS.md`**

### Bước 2: Cài đặt Node.js
1. Truy cập: **https://nodejs.org**
2. Tải bản **LTS** (khuyến nghị)
3. Cài đặt và khởi động lại máy
4. Kiểm tra: Mở Command Prompt, gõ `node --version`

### Bước 3: Cài đặt các gói
Mở Command Prompt trong thư mục dự án:
```batch
npm install
```

### Bước 4: Chạy ứng dụng
```batch
npm start
```

Hoặc click đúp vào file `start.bat`

---

## 🎯 SAU KHI CHẠY TRÊN MÁY TÍNH

Ứng dụng Electron sẽ mở ra với **ĐẦY ĐỦ TÍNH NĂNG**:
✅ Chọn file Word (.docx)  
✅ Chọn thư mục chứa nhiều mẫu  
✅ Nhập dữ liệu vào form  
✅ Tạo hàng loạt file Word tự động  
✅ Lưu và tải cấu hình (preset)  
✅ Xử lý 100% offline, an toàn cho ngân hàng  

---

## 📚 TÀI LIỆU HƯỚNG DẪN

Các file hướng dẫn chi tiết:
- **`HUONG_DAN_TAI_CHO_WINDOWS.md`** - Hướng dẫn tải về Windows đầy đủ
- **`HUONG_DAN_CAI_DAT.md`** - Hướng dẫn cài đặt từng bước  
- **`BAT_DAU_NHANH.txt`** - Hướng dẫn nhanh dạng text  
- **`README.md`** - Hướng dẫn sử dụng ứng dụng  

---

## ❓ CÂU HỎI THƯỜNG GẶP

**Q: Tại sao không tạo link tải trực tiếp?**  
A: Replit không hỗ trợ tạo link tải file. Phải dùng GitHub hoặc tải thủ công.

**Q: Có cách nào chạy đầy đủ trên Replit không?**  
A: Không. Electron không thể chạy trên môi trường cloud.

**Q: Tôi không biết dùng GitHub?**  
A: Không sao! Dùng CÁCH 2 - tải từng file thủ công (xem HUONG_DAN_TAI_CHO_WINDOWS.md)

**Q: Sau khi tải về, có cần internet không?**  
A: Không. Ứng dụng chạy 100% offline trên máy.

**Q: Có thể chia sẻ cho đồng nghiệp không?**  
A: Có! Sau khi build (npm run dist), chia sẻ file .exe trong thư mục dist/

---

## 🔧 HỖ TRỢ

Nếu gặp khó khăn khi tải về hoặc cài đặt, hãy kiểm tra:
1. Đã cài Node.js phiên bản v18 trở lên chưa?
2. Đã chạy `npm install` thành công chưa?
3. Có lỗi gì xuất hiện trong Command Prompt không?

Đọc kỹ file **`HUONG_DAN_TAI_CHO_WINDOWS.md`** để biết cách khắc phục các lỗi thường gặp.
