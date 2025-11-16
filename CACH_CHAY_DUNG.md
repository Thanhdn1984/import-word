# 🚨 CÁCH CHẠY ĐÚNG TRÊN MÁY TÍNH WINDOWS

## ❌ LỖI PHỔ BIẾN NHẤT

Nhiều người chạy lệnh SAI:
```batch
npm run electron  ← SAI! Không chạy được!
```

**Tại sao SAI?**
- Lệnh này CHỈ chạy Electron
- KHÔNG chạy Vite server
- Electron mở nhưng không có gì để hiển thị
- Banner vẫn màu VÀNG vì không load được app

---

## ✅ CÁCH CHẠY ĐÚNG

### Cách 1: Dùng lệnh (Terminal/CMD)

Mở Command Prompt trong thư mục dự án:
```batch
npm start
```

**Lệnh này sẽ:**
1. ✅ Khởi động Vite server (localhost:5000)
2. ✅ Đợi server sẵn sàng
3. ✅ Mở Electron và load từ localhost:5000
4. ✅ Banner hiện màu XANH LÁ: "✓ Chế độ Desktop"

---

### Cách 2: Click file (ĐƠN GIẢN NHẤT)

**Option A - Hiện terminal:**
- Click đúp vào **`CHAY.bat`**

**Option B - Chạy im lặng (KHUYẾN NGHỊ):**
- Click đúp vào **`CHAY.vbs`**

---

## 📊 BẢNG SO SÁNH CÁC LỆNH

| Lệnh | Vite Server | Electron | Kết quả | Banner |
|------|-------------|----------|---------|--------|
| `npm run electron` | ❌ | ✅ | ❌ Lỗi | 🟡 Vàng |
| `npm run dev` | ✅ | ❌ | ❌ Chỉ web | 🟡 Vàng |
| `npm start` | ✅ | ✅ | ✅ Hoạt động | 🟢 Xanh |
| `npm run electron:dev` | ✅ | ✅ | ✅ Hoạt động | 🟢 Xanh |
| `CHAY.bat` | ✅ | ✅ | ✅ Hoạt động | 🟢 Xanh |
| `CHAY.vbs` | ✅ | ✅ | ✅ Hoạt động | 🟢 Xanh |

---

## 🎯 CÁCH KIỂM TRA ĐÃ CHẠY ĐÚNG

Sau khi chạy lệnh đúng, bạn sẽ thấy:

### 1. Hai cửa sổ mở (nếu dùng CHAY.bat hoặc npm start):
- **Cửa sổ Command Prompt**: Hiện log Vite server
- **Cửa sổ Electron**: App chính (dùng cửa sổ này)

### 2. Banner màu XANH LÁ:
```
✓ Chế độ Desktop - Đầy đủ tính năng
```

### 3. Tất cả tính năng hoạt động:
- ✅ Click "Chọn file" → Hộp thoại Windows mở
- ✅ Click "Chọn thư mục" → Chọn được
- ✅ Lưu cấu hình → Hoạt động
- ✅ Tạo tài liệu → Hoạt động

---

## 🔴 NẾU VẪN THẤY BANNER VÀNG

**Kiểm tra lại:**

### Bước 1: Xác nhận lệnh đã chạy
Xem lại Command Prompt, phải thấy:
```
VITE v5.4.21  ready in XXX ms
➜  Local:   http://localhost:5000/
```

Nếu KHÔNG thấy → Bạn chạy SAI lệnh!

### Bước 2: Kiểm tra cửa sổ đang nhìn
Bạn có thể đang nhìn **TAB TRÌNH DUYỆT** thay vì **CỬA SỔ ELECTRON**!

**Cửa sổ Electron (ĐÚNG):**
- Không có thanh địa chỉ URL
- Không có nút Back, Forward
- Banner XANH LÁ

**Tab Browser (SAI):**
- Có thanh địa chỉ: `http://localhost:5000`
- Có nút Back, Forward
- Banner VÀNG

➡️ **ĐÓNG tab browser, chỉ dùng cửa sổ Electron!**

---

## 💡 LƯU Ý QUAN TRỌNG

### Tắt ứng dụng đúng cách:

1. Đóng cửa sổ Electron (Alt+F4 hoặc click X)
2. Đóng cửa sổ Command Prompt (nếu có)

Nếu không đóng Command Prompt, Vite server vẫn chạy ngầm!

### Lần sau muốn chạy lại:

Chỉ cần:
1. Click đúp `CHAY.vbs` (hoặc `CHAY.bat`)
2. Đợi 5-10 giây
3. Cửa sổ Electron mở → Sử dụng!

---

## 📝 TÓM TẮT

**ĐÚNG:**
```batch
npm start
```
hoặc click đúp `CHAY.bat` / `CHAY.vbs`

**SAI:**
```batch
npm run electron  ← ĐỪNG DÙNG!
npm run dev       ← Chỉ dành cho web preview
```

---

## 🆘 VẪN GẶP VẤN ĐỀ?

Nếu làm đúng mà vẫn lỗi:

1. Chạy lệnh test:
   ```batch
   node -v
   npm -v
   ```
   Phải hiện số phiên bản

2. Cài lại dependencies:
   ```batch
   npm install
   ```

3. Xóa cache và chạy lại:
   ```batch
   rd /s /q node_modules\.vite
   npm start
   ```

4. Xem file **KHAC_PHUC_LOI.md** để biết thêm chi tiết

---

**Nhớ: Luôn dùng `npm start` hoặc click `CHAY.vbs`!** 🚀
