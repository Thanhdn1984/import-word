# 🆘 KHẮC PHỤC LỖI - ELECTRON KHÔNG MỞ

## 🔍 CHẨN ĐOÁN VẤN ĐỀ

### ⚡ CHẠY SCRIPT DEBUG TRƯỚC TIÊN!

Click đúp vào **`CHAY_DEBUG.bat`** để kiểm tra chi tiết.

Script này sẽ kiểm tra:
- ✅ Node.js đã cài đặt chưa
- ✅ npm đã cài đặt chưa  
- ✅ package.json có tồn tại không
- ✅ Dependencies đã cài đặt chưa
- ⚠ Port 5000 có bị chiếm không

### ❓ Bạn gặp lỗi gì?

### Lỗi 1: "Chức năng này chỉ hoạt động trong ứng dụng Electron"
**Nguyên nhân:** Bạn đang chạy sai lệnh hoặc Electron không khởi động

### Lỗi 2: Electron không mở, chỉ thấy trình duyệt
**Nguyên nhân:** Windows chặn hoặc Electron chưa cài đúng

### Lỗi 3: Click CHAY.bat nhưng không có cửa sổ Electron nào mở
**Nguyên nhân:** Có thể port bị chiếm, dependencies lỗi, hoặc antivirus chặn

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

---

## ❌ CÁC LỖI PHỔ BIẾN VÀ CÁCH SỬA

### Lỗi A: "Không tìm thấy Node.js"

**Nguyên nhân:** Node.js chưa được cài đặt hoặc chưa thêm vào PATH

**Cách sửa:**
1. Tải Node.js từ: https://nodejs.org
2. Cài đặt phiên bản LTS (khuyến nghị)
3. Trong quá trình cài đặt, **CHỌN** "Add to PATH"
4. Khởi động lại Command Prompt
5. Kiểm tra: `node -v` và `npm -v`

---

### Lỗi B: "node_modules không tồn tại"

**Nguyên nhân:** Chưa cài đặt dependencies

**Cách sửa:**
```batch
npm install
```

Đợi 2-5 phút để npm tải và cài đặt tất cả packages.

---

### Lỗi C: "Port 5000 đang được sử dụng"

**Nguyên nhân:** Ứng dụng khác đang chiếm port 5000

**Cách sửa:**

**Cách 1 - Tìm và tắt ứng dụng:**
```batch
netstat -ano | findstr :5000
```
Xem cột cuối (PID), ví dụ: `12345`

Mở Task Manager → Details → Tìm PID `12345` → End Task

**Cách 2 - Tự động tắt:**
```batch
FOR /F "tokens=5" %P IN ('netstat -ano ^| findstr :5000') DO taskkill /PID %P /F
```

---

### Lỗi D: "Electron không mở nhưng process đang chạy"

**Nguyên nhân:** Electron chạy ngầm hoặc bị antivirus chặn

**Cách sửa:**

**Bước 1:** Tắt tất cả process Electron đang chạy
```batch
taskkill /IM electron.exe /F
taskkill /IM node.exe /F
```

**Bước 2:** Kiểm tra antivirus
- Mở Windows Security / Antivirus
- Thêm thư mục dự án vào **Exclusions**
- Cho phép `electron.exe` chạy

**Bước 3:** Chạy lại
```batch
npm start
```

---

### Lỗi E: "wait-on timeout"

**Nguyên nhân:** Vite server khởi động quá chậm hoặc bị lỗi

**Cách sửa:**

**Bước 1:** Kiểm tra Vite có chạy không
```batch
npm run dev
```

Nếu Vite chạy OK → Mở tab mới và chạy:
```batch
electron .
```

**Bước 2:** Nếu Vite lỗi, xem lỗi gì và sửa

**Bước 3:** Xóa cache Vite
```batch
rd /s /q node_modules\.vite
npm run dev
```

---

### Lỗi F: "Module not found" hoặc "Cannot find module"

**Nguyên nhân:** Dependencies bị lỗi hoặc cài thiếu

**Cách sửa:**

**Cách 1 - Cài lại dependencies:**
```batch
rd /s /q node_modules
del package-lock.json
npm install
```

**Cách 2 - Cài package cụ thể:**
Ví dụ lỗi: `Cannot find module 'electron'`
```batch
npm install electron --save-dev
```

---

### Lỗi G: "Permission denied" hoặc "Access denied"

**Nguyên nhân:** Không có quyền ghi file hoặc chạy script

**Cách sửa:**

**Bước 1:** Chạy Command Prompt **as Administrator**
- Tìm "cmd" trong Start Menu
- Right-click → "Run as administrator"

**Bước 2:** Vào thư mục dự án
```batch
cd D:\InfoEntryTool
```

**Bước 3:** Chạy lại
```batch
npm start
```

---

## 🔧 KHẮC PHỤC TRIỆT ĐỂ

### Reset hoàn toàn dự án:

```batch
REM Bước 1: Xóa cache và dependencies cũ
rd /s /q node_modules
rd /s /q node_modules\.vite
del package-lock.json

REM Bước 2: Cài lại từ đầu
npm cache clean --force
npm install

REM Bước 3: Chạy lại
npm start
```

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
