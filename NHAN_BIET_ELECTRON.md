# 🎯 CÁCH NHẬN BIẾT BẠN ĐANG CHẠY ELECTRON HAY WEB

## ❓ Tại sao cần biết?

Ứng dụng có 2 chế độ:
- **Chế độ Web** (xem thử trên Replit) → KHÔNG chọn được file
- **Chế độ Desktop/Electron** (sau khi tải về máy) → Chọn file được

Nhiều người nhầm lẫn giữa 2 chế độ!

---

## ✅ DẤU HIỆU ĐANG CHẠY ELECTRON (ĐÚNG)

### 1. KIỂM TRA BANNER PHÍA TRÊN

Khi mở ứng dụng, nhìn vào **góc phải trên**:

**✅ Nếu thấy màu XANH LÁ:**
```
✓ Chế độ Desktop - Đầy đủ tính năng
```
→ BẠN ĐANG CHẠY ELECTRON! Mọi tính năng hoạt động!

**❌ Nếu thấy màu VÀNG:**
```
⚠️ Chế độ Web - Tải về máy để dùng đầy đủ
```
→ BẠN ĐANG CHẠY WEB! Không thể chọn file!

---

### 2. KIỂM TRA CỬA SỔ

**✅ ELECTRON (Đúng):**
- Cửa sổ riêng biệt (giống Word, Excel)
- KHÔNG CÓ thanh địa chỉ URL phía trên
- KHÔNG CÓ nút Back, Forward của trình duyệt
- Title bar: "Công cụ tự động hóa tài liệu ngân hàng"
- Alt+F4 để tắt

**❌ WEB (Sai):**
- Mở trong Chrome/Edge/Firefox
- CÓ thanh địa chỉ: `http://localhost:5000`
- CÓ nút Back, Forward, Refresh
- CÓ bookmarks bar
- Ctrl+W để đóng tab

---

### 3. TEST CHỨC NĂNG

Vào tab **"Chọn mẫu"**, click nút **"Chọn file"**:

**✅ Nếu mở hộp thoại chọn file Windows:**
→ Electron đang chạy ĐÚNG!

**❌ Nếu báo lỗi:**
```
Chức năng này chỉ hoạt động trong ứng dụng Electron
```
→ Bạn đang chạy Web!

---

## 🚨 NHẦM LẪN PHỔ BIẾN

### Tình huống 1: Chạy `npm start` nhưng vẫn thấy cảnh báo vàng

**Nguyên nhân:** Bạn đang nhìn vào TAB TRÌNH DUYỆT!

**Giải pháp:**
1. Khi chạy `npm start`, sẽ có **2 cửa sổ** mở:
   - Cửa sổ Command Prompt (để nguyên)
   - **Cửa sổ Electron** (màn hình app chính)
   - Có thể có tab browser tự động mở (ĐÓNG LẠI!)

2. **ĐÓNG TAB BROWSER** (nếu có)

3. Chỉ dùng **CỬA SỔ ELECTRON**

### Tình huống 2: Chạy xong không thấy cửa sổ Electron

**Nguyên nhân:** Electron không khởi động hoặc bị ẩn sau các cửa sổ khác

**Giải pháp:**
1. Nhấn Alt+Tab để xem tất cả cửa sổ đang mở
2. Tìm cửa sổ tên: "Công cụ tự động hóa tài liệu ngân hàng"
3. Nếu không có → Electron bị lỗi (xem KHAC_PHUC_LOI.md)

### Tình huống 3: Chạy `npm run dev` và thấy cảnh báo vàng

**Đây KHÔNG PHẢI LỖI!**

`npm run dev` CHỈ chạy web server, KHÔNG chạy Electron!

**Lệnh đúng:**
```batch
npm start
```
HOẶC
```batch
npm run electron:dev
```

---

## 🔍 KIỂM TRA NHANH BẰNG CODE

Nếu vẫn không chắc, làm theo:

1. Mở ứng dụng
2. Nhấn **F12** (mở DevTools)
3. Click tab **Console**
4. Gõ lệnh:
```javascript
window.electronAPI
```

**Kết quả:**
- Nếu hiện: `Object { selectFiles: function, selectFolder: function, ... }`
  → ✅ ELECTRON ĐANG CHẠY!

- Nếu hiện: `undefined`
  → ❌ BẠN ĐANG CHẠY WEB!

---

## 📸 SO SÁNH TRỰC QUAN

### ELECTRON (Đúng) - Banner màu XANH LÁ:
```
┌─────────────────────────────────────────────────┐
│ [📄] Công cụ tự động hóa tài liệu               │
│                                                 │
│              ✓ Chế độ Desktop - Đầy đủ tính năng│
│                                      [Trợ giúp] │
└─────────────────────────────────────────────────┘
```

### WEB (Sai) - Banner màu VÀNG:
```
┌─────────────────────────────────────────────────┐
│ http://localhost:5000          [←] [→] [⟳]     │ ← CÓ THANH NÀY
├─────────────────────────────────────────────────┤
│ [📄] Công cụ tự động hóa tài liệu               │
│                                                 │
│        ⚠️ Chế độ Web - Tải về máy để dùng đầy đủ│
│                                      [Trợ giúp] │
└─────────────────────────────────────────────────┘
```

---

## 💡 LỜI KHUYÊN

**BẠN NÊN:**
- ✅ Click đúp vào `start.bat` để chạy
- ✅ Đợi cửa sổ Electron mở (3-10 giây)
- ✅ Đóng các tab browser nếu tự động mở
- ✅ Chỉ dùng cửa sổ Electron (có banner XANH LÁ)

**TRÁNH:**
- ❌ Chạy `npm run dev` rồi mở browser
- ❌ Sử dụng tab browser `http://localhost:5000`
- ❌ Nhầm lẫn giữa Electron và Browser

---

## 🎓 KẾT LUẬN

Nếu bạn thấy:
```
✓ Chế độ Desktop - Đầy đủ tính năng
```
(màu xanh lá)

→ **XIN CHÚC MỪNG! BẠN ĐANG CHẠY ĐÚNG!** 🎉

Nếu vẫn thấy màu vàng sau khi làm theo hướng dẫn, hãy gửi cho tôi:
1. Screenshot màn hình
2. Lệnh bạn đã chạy
3. Các cửa sổ đang mở (Alt+Tab)
