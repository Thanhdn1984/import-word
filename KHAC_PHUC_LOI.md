# 🔧 KHẮC PHỤC LỖI KHI CHẠY TRÊN MÁY TÍNH

## ❓ Bạn gặp lỗi gì?

### Lỗi 1: "Chức năng này chỉ hoạt động trong ứng dụng Electron"
**Nguyên nhân:** Bạn đang chạy sai lệnh hoặc Electron không khởi động

### Lỗi 2: Electron không mở, chỉ thấy trình duyệt
**Nguyên nhân:** Windows chặn hoặc Electron chưa cài đúng

---

## ✅ GIẢI PHÁP: Kiểm tra bạn đang chạy lệnh nào

### Bước 1: Mở Command Prompt trong thư mục dự án

Cách mở:
1. Mở thư mục dự án
2. Click vào thanh địa chỉ (address bar) phía trên
3. Gõ `cmd` và nhấn Enter

### Bước 2: Kiểm tra lệnh bạn đã chạy

**❌ LỆNH SAI (chỉ mở web):**
```batch
npm run dev
```
➡️ Lệnh này CHỈ mở trình duyệt, KHÔNG có chức năng chọn file!

**✅ LỆNH ĐÚNG (mở Electron):**
```batch
npm start
```
HOẶC
```batch
npm run electron:dev
```
HOẶC click đúp file `start.bat`

➡️ Lệnh này sẽ mở **CẢ HAI**:
1. Web server (Vite)
2. Ứng dụng Electron (cửa sổ riêng)

---

## 🪟 Nhận biết đã chạy đúng

### Khi chạy ĐÚNG `npm start`:

Bạn sẽ thấy:
1. **Command Prompt** hiện:
   ```
   [0] VITE v5.4.21 ready in 455 ms
   [0] ➜ Local: http://localhost:5000/
   [1] Electron starting...
   ```

2. **CỬA SỔ MỚI** của Electron mở ra (KHÔNG PHẢI trình duyệt!)
   - Cửa sổ có title: "Công cụ tự động hóa tài liệu ngân hàng"
   - KHÔNG có thanh địa chỉ URL phía trên
   - Trông giống ứng dụng desktop thông thường

### Khi chạy SAI `npm run dev`:

Bạn sẽ thấy:
1. Command Prompt hiện:
   ```
   VITE v5.4.21 ready in 455 ms
   ➜ Local: http://localhost:5000/
   ```

2. BẠN PHẢI TỰ MỞ trình duyệt vào http://localhost:5000
   - CÓ thanh địa chỉ URL
   - Đây là web browser, KHÔNG PHẢI Electron
   - ➡️ KHÔNG THỂ chọn file!

---

## 🚨 Nếu Electron vẫn không mở

### Lỗi: "electron: command not found" hoặc không khởi động

**Giải pháp 1: Cài lại Electron**
```batch
npm install --save-dev electron
```

**Giải pháp 2: Chạy trực tiếp**
```batch
npx electron .
```

**Giải pháp 3: Kiểm tra Windows Defender/Antivirus**
- Windows Defender có thể chặn Electron
- Thêm thư mục dự án vào Exception

**Giải pháp 4: Chạy với quyền Administrator**
1. Click chuột phải vào Command Prompt
2. Chọn "Run as Administrator"
3. Chạy lại `npm start`

---

## 📝 HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC

### Bước 1: Đảm bảo đã cài Node.js

Mở Command Prompt, gõ:
```batch
node --version
npm --version
```

Nếu hiện số phiên bản (vd: v20.11.0) → OK!  
Nếu báo lỗi → Cài Node.js tại https://nodejs.org

### Bước 2: Cài đặt dependencies

Trong thư mục dự án, chạy:
```batch
npm install
```

Đợi 2-5 phút cho đến khi xong.

### Bước 3: Chạy ứng dụng

**CÁCH 1 - Sử dụng lệnh:**
```batch
npm start
```

**CÁCH 2 - Click file:**
Click đúp vào `start.bat`

**CÁCH 3 - Chạy riêng:**
Nếu cách trên không được:
```batch
# Terminal 1 - Chạy web server
npm run dev

# Terminal 2 - Mở terminal mới, chạy Electron
npx electron .
```

### Bước 4: Kiểm tra

Sau khi chạy:
1. Cửa sổ Electron phải MỞ (cửa sổ riêng, không phải browser)
2. Vào tab "Chọn mẫu"
3. Click "Chọn file"
4. Hộp thoại chọn file Windows phải XUẤT HIỆN

Nếu xuất hiện hộp thoại → ✅ Thành công!  
Nếu báo lỗi → ❌ Vẫn chạy sai

---

## 🔍 DEBUG: Xác định đang chạy Electron hay Web

Mở ứng dụng, nhấn F12 (DevTools), gõ vào Console:
```javascript
window.electronAPI
```

Nếu hiện `undefined` → ❌ Bạn đang chạy trên web browser  
Nếu hiện `Object {...}` → ✅ Bạn đang chạy trên Electron

---

## 💡 TẠM THỜI: Nếu Electron HOÀN TOÀN không chạy được

Nếu thử mọi cách mà Electron vẫn không chạy, có thể:

1. **Máy tính thiếu dependencies hệ thống**
   - Windows cũ thiếu .NET Framework
   - Cần cập nhật Windows Update

2. **Antivirus chặn Electron**
   - Tắt tạm antivirus và thử lại

3. **Quyền admin không đủ**
   - Chạy Command Prompt với quyền Administrator

**Gửi cho tôi screenshot và thông báo lỗi chính xác để tôi hỗ trợ tốt hơn!**

---

## 📞 CẦN TRỢ GIÚP

Nếu vẫn không được, hãy gửi cho tôi:

1. **Screenshot Command Prompt** khi chạy `npm start`
2. **Thông báo lỗi đầy đủ** (nếu có)
3. **Phiên bản Windows** (Windows 10/11?)
4. **Kết quả của lệnh:**
   ```batch
   node --version
   npm --version
   npx electron --version
   ```

Tôi sẽ hỗ trợ cụ thể hơn!
