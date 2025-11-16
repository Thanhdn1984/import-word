# 🚀 HƯỚNG DẪN SỬ DỤNG ĐƠN GIẢN

## 🎯 Cách khởi động ứng dụng (CHỈ 1 CLICK!)

Sau khi tải về và cài đặt (`npm install`), bạn có **3 CÁCH** để chạy:

---

### ⭐ CÁCH 1: ĐƠN GIẢN NHẤT (KHUYẾN NGHỊ)

**Click đúp vào file: `CHAY.bat`**

✅ Hiện cửa sổ terminal  
✅ Thấy tiến trình khởi động  
✅ Cửa sổ Electron tự động mở sau 5-10 giây  

---

### ⭐⭐ CÁCH 2: CHẠY IM LẶNG (KHÔNG HIỆN TERMINAL)

**Click đúp vào file: `CHAY.vbs`**

✅ KHÔNG hiện cửa sổ terminal (chạy ngầm)  
✅ Chỉ thấy cửa sổ Electron mở ra  
✅ Gọn gàng, chuyên nghiệp  

---

### CÁCH 3: DÙNG LỆNH (CHO NGƯỜI AM HIỂU KỸ THUẬT)

Mở Command Prompt trong thư mục dự án:
```batch
npm start
```

---

## 📋 Lưu ý quan trọng

### 1. Lần đầu tiên chạy

Nếu chưa cài dependencies, hãy chạy lệnh này TRƯỚC:
```batch
npm install
```

Đợi 2-5 phút cho đến khi xong, sau đó mới dùng `CHAY.bat` hoặc `CHAY.vbs`

### 2. Nhận biết đã chạy thành công

Sau khi click `CHAY.bat` hoặc `CHAY.vbs`, bạn sẽ thấy:

✅ **Cửa sổ Electron** mở ra (cửa sổ riêng, không phải browser)  
✅ Banner **XANH LÁ** ở góc phải trên:
```
✓ Chế độ Desktop - Đầy đủ tính năng
```

❌ **KHÔNG PHẢI** tab trình duyệt với URL `http://localhost:5000`

### 3. Tắt ứng dụng

- Nhấn **Alt+F4** hoặc click nút **X** trên cửa sổ Electron
- Nếu có cửa sổ Command Prompt đang chạy, đóng nó luôn

---

## 🎓 Hướng dẫn sử dụng tính năng

### Bước 1: Quản lý trường dữ liệu (Tab "Quản lý trường")

1. Vào tab **"Quản lý trường"**
2. Thêm/sửa/xóa các trường dữ liệu bạn cần
3. Mỗi trường có:
   - **Tên trường**: Tên biến (vd: `ho_ten`, `so_tien_vay`)
   - **Nhãn hiển thị**: Tên hiển thị cho người dùng
   - **Loại dữ liệu**: Text, số, ngày, tiền tệ, v.v.
   - **Danh mục**: Customer, Loan, Collateral, v.v.
   - **Bắt buộc**: Có/Không

### Bước 2: Nhập dữ liệu (Tab "Nhập dữ liệu")

1. Vào tab **"Nhập dữ liệu"**
2. Điền thông tin vào các trường
3. Dữ liệu được chia theo danh mục (tabs con)

### Bước 3: Chọn mẫu Word (Tab "Chọn mẫu")

1. Vào tab **"Chọn mẫu"**
2. Click **"Chọn file"** để chọn 1 hoặc nhiều file .docx
3. HOẶC click **"Chọn thư mục"** để chọn toàn bộ thư mục mẫu

**Cách tạo mẫu Word:**
- Mở Word, tạo file mẫu
- Chèn placeholder dạng: `{ho_ten}`, `{so_tien_vay}`, v.v.
- Lưu file với định dạng .docx

### Bước 4: Lưu cấu hình (Tab "Cấu hình" - Tùy chọn)

1. Vào tab **"Cấu hình"**
2. Đặt tên cho preset (vd: "Ho so vay the chap")
3. Click **"Lưu cấu hình"**
4. Lần sau chỉ cần load lại, không cần setup lại

### Bước 5: Tạo file (Tab "Tạo file")

1. Vào tab **"Tạo file"**
2. Kiểm tra thông tin
3. Click **"Chọn thư mục lưu file"**
4. Click **"Tạo tài liệu"**
5. Đợi thanh tiến trình → Xong!

---

## ❓ Các câu hỏi thường gặp

### Q: Tại sao vẫn thấy banner màu vàng?

**A:** Bạn đang nhìn TAB TRÌNH DUYỆT, không phải cửa sổ Electron!
- Đóng tất cả tab browser
- Chỉ dùng cửa sổ Electron (cửa sổ riêng, không có thanh địa chỉ URL)

### Q: Electron không mở, chỉ thấy Command Prompt?

**A:** Đợi thêm 5-10 giây. Nếu vẫn không mở:
1. Tắt Command Prompt
2. Chạy lệnh: `npm install` (cài lại dependencies)
3. Chạy lại `CHAY.bat`

### Q: Báo lỗi "Cannot find module..."

**A:** Chạy lệnh:
```batch
npm install
```

### Q: Muốn debug hoặc xem console

**A:** Mở ứng dụng Electron, nhấn **F12**

---

## 📞 Cần trợ giúp?

Nếu gặp lỗi, hãy xem:
1. **KHAC_PHUC_LOI.md** - Khắc phục lỗi thường gặp
2. **NHAN_BIET_ELECTRON.md** - Phân biệt Electron vs Web
3. **TEST_ELECTRON.bat** - Công cụ test chẩn đoán

---

## 🎉 Chúc bạn sử dụng thành công!

Bây giờ bạn có thể:
- ✅ Tạo hàng loạt file Word cùng lúc
- ✅ Nhập dữ liệu 1 lần, tạo nhiều file
- ✅ Tùy chỉnh trường dữ liệu theo nhu cầu
- ✅ Lưu cấu hình để sử dụng lại
