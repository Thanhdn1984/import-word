# 🎯 CÁCH CHẠY TỪNG BƯỚC (CHẮC CHẮN HOẠT ĐỘNG)

## ❌ VẤN ĐỀ: wait-on bị treo trên Windows

Lệnh `wait-on` trong `npm start` **KHÔNG HOẠT ĐỘNG** trên nhiều máy Windows.

Triệu chứng:
```
➜  Local:   http://localhost:5000/
▌  ← Cursor nháy ở đây, không làm gì thêm
```

---

## ✅ GIẢI PHÁP: 3 CÁCH CHẠY ĐÚNG

### 🥇 CÁCH 1: CHAY_AN_TOAN.bat (KHUYẾN NGHỊ - DỄ NHẤT!)

**File này chạy TỪNG BƯỚC và CHỜ BẠN XÁC NHẬN.**

1. Click đúp vào **`CHAY_AN_TOAN.bat`**

2. Script sẽ:
   - ✅ Tắt các tiến trình cũ
   - ✅ Mở cửa sổ Vite server (cửa sổ riêng)
   - ⏸ **DỪNG LẠI** đợi bạn xác nhận Vite đã sẵn sàng
   - ✅ Mở Electron khi bạn nhấn phím

3. Bạn sẽ thấy:
   - **Cửa sổ 1**: Vite Server (có chữ "KHÔNG ĐÓNG")
   - **Cửa sổ 2**: CHAY_AN_TOAN.bat (hướng dẫn)
   - **Cửa sổ 3**: Electron app (khi bạn nhấn phím)

4. Đợi cửa sổ Vite hiện:
   ```
   VITE v5.4.21  ready in 530 ms
   ➜  Local:   http://localhost:5000/
   ```

5. Quay lại cửa sổ CHAY_AN_TOAN.bat → Nhấn **Enter**

6. Electron sẽ mở sau 2 giây!

---

### 🥈 CÁCH 2: CHAY_MOI.bat (Tự động)

**File này TỰ ĐỘNG ĐỢI 10 giây.**

1. Click đúp vào **`CHAY_MOI.bat`**

2. Script sẽ:
   - ✅ Khởi động Vite ngầm
   - ⏱ Đợi 10 giây
   - ✅ Mở Electron

3. Chỉ cần chờ 10-15 giây → Electron tự mở!

**Ưu điểm:** Đơn giản, 1 click
**Nhược điểm:** Nếu máy chậm, có thể cần đợi lâu hơn

---

### 🥉 CÁCH 3: Chạy thủ công 2 cửa sổ (CHO NGƯỜI HIỂU BIẾT)

**Cách này CHẮC CHẮN NHẤT nếu 2 cách trên không được.**

#### Terminal 1 - Khởi động Vite:
```batch
npm run dev
```

Đợi đến khi thấy:
```
VITE v5.4.21  ready in XXX ms
➜  Local:   http://localhost:5000/
```

#### Terminal 2 - Mở terminal MỚI, chạy Electron:
```batch
npx electron .
```

**LƯU Ý:** Luôn dùng `npx electron .` (KHÔNG phải `electron .` vì electron không có trong PATH)

---

## 📊 SO SÁNH 3 CÁCH

| Cách | Độ dễ | Độ tin cậy | Khi nào dùng? |
|------|-------|-----------|---------------|
| **CHAY_AN_TOAN.bat** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **KHUYẾN NGHỊ CHO MỌI NGƯỜI** |
| **CHAY_MOI.bat** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Máy nhanh, muốn tự động |
| **Chạy thủ công** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Debug, kiểm soát tuyệt đối |

---

## ⚠️ ĐỪNG DÙNG CÁC LỆNH SAU (CÓ THỂ BỊ LỖI WAIT-ON)

❌ `npm start` - Có thể bị treo wait-on trên một số máy Windows
❌ `npm run electron:dev` - Có thể bị treo wait-on trên một số máy Windows
❌ `CHAY.bat` - Dùng npm start, có thể bị treo

**LƯU Ý:** Nếu `npm start` hoạt động trên máy bạn thì vẫn dùng được! Nhưng nếu bị treo thì dùng các cách trên.

---

## 🔧 NẾU VẪN LỖI

### Lỗi: "electron: command not found" hoặc "'electron' is not recognized"

**NGUYÊN NHÂN:** Electron không có trong PATH của Windows.

**GIẢI PHÁP:** Luôn luôn dùng `npx electron .` thay vì `electron .`

`npx` sẽ tự động tìm electron trong node_modules/.bin/

**Nếu vẫn lỗi:** Cài lại Electron
```batch
npm install electron --save-dev
```

---

### Lỗi: Port 5000 đã được sử dụng

**Tìm và tắt tiến trình đang dùng port 5000:**
```batch
netstat -ano | findstr :5000
```

Xem PID (cột cuối), ví dụ: `12345`

**Tắt tiến trình đó:**
```batch
taskkill /PID 12345 /F
```

**HOẶC tắt tất cả:**
```batch
taskkill /F /IM node.exe
taskkill /F /IM electron.exe
```

---

### Lỗi: Vite không khởi động

**Xóa cache và chạy lại:**
```batch
rd /s /q node_modules\.vite
npm run dev
```

---

## 💡 MẸO HỮU ÍCH

### Mẹo 1: Kiểm tra Vite đã chạy chưa
Mở browser, vào: http://localhost:5000

Nếu thấy giao diện → Vite OK → Có thể chạy Electron!

### Mẹo 2: Xem log Vite
Nếu dùng CHAY_MOI.bat, kiểm tra file `vite.log`:
```batch
type vite.log
```

### Mẹo 3: Tắt hoàn toàn
Sau khi dùng xong:
```batch
taskkill /F /IM electron.exe
taskkill /F /IM node.exe
```

---

## 🎯 KHUYẾN NGHỊ CUỐI CÙNG

**Dùng CHAY_AN_TOAN.bat** - Đây là cách DỄ NHẤT và TIN CẬY NHẤT!

1. Click `CHAY_AN_TOAN.bat`
2. Đợi Vite sẵn sàng
3. Nhấn Enter
4. Dùng app!

**Đơn giản vậy thôi!** 🚀
