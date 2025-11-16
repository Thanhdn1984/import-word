# Hướng dẫn tải và cài đặt trên máy tính

## 📥 Bước 1: Tải mã nguồn về máy

### Cách 1: Tải trực tiếp từ Replit

1. Nhấn vào nút **"..."** (3 chấm) ở góc trên bên trái màn hình Replit
2. Chọn **"Download as zip"**
3. Giải nén file zip vừa tải về

### Cách 2: Sử dụng Git (nếu có)

```bash
git clone <đường-dẫn-repl-của-bạn>
```

## 💻 Bước 2: Cài đặt Node.js

Trước tiên cần cài Node.js trên máy tính:

### Windows:
1. Truy cập: https://nodejs.org/
2. Tải bản **LTS** (khuyến nghị)
3. Chạy file cài đặt và làm theo hướng dẫn
4. Khởi động lại máy tính

### Mac:
1. Truy cập: https://nodejs.org/
2. Tải bản **LTS** (khuyến nghị)
3. Chạy file .pkg và làm theo hướng dẫn

### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# hoặc dùng nvm (khuyến nghị)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### Kiểm tra cài đặt thành công:
Mở Terminal (hoặc Command Prompt) và gõ:
```bash
node --version
npm --version
```

Nếu hiện số phiên bản là thành công!

## 🔧 Bước 3: Cài đặt các gói cần thiết

1. Mở Terminal/Command Prompt
2. Di chuyển vào thư mục dự án:
```bash
cd đường-dẫn-đến-thư-mục-dự-án
```

3. Cài đặt các gói:
```bash
npm install
```

Đợi vài phút để tải và cài đặt tất cả các gói cần thiết.

## 🚀 Bước 4: Chạy ứng dụng

### Cách 1: Sử dụng lệnh (khuyến nghị)
Mở Terminal/Command Prompt trong thư mục dự án và gõ:
```bash
npm start
```

### Cách 2: Click chuột (Windows)
Click đúp vào file `start.bat`

### Cách 3: Click chuột (Mac/Linux)
1. Mở Terminal
2. Chạy lệnh:
```bash
chmod +x start.sh
./start.sh
```

## ✅ Kiểm tra ứng dụng

Sau khi chạy thành công:
- Ứng dụng Electron sẽ tự động mở
- Hoặc mở trình duyệt và truy cập: http://localhost:5000

## 🛠️ Các lệnh hữu ích khác

### Chạy ở chế độ web (không cần Electron):
```bash
npm run dev
```
Sau đó mở trình duyệt: http://localhost:5000

### Build ứng dụng desktop (.exe):
```bash
npm run build
npm run dist
```

File cài đặt sẽ nằm trong thư mục `dist/`

## ❓ Khắc phục sự cố

### Lỗi: "npm: command not found"
→ Node.js chưa được cài đặt hoặc chưa thêm vào PATH
→ Cài lại Node.js và khởi động lại máy

### Lỗi khi chạy npm install
→ Xóa thư mục `node_modules` và file `package-lock.json`
→ Chạy lại `npm install`

### Ứng dụng không mở
→ Kiểm tra port 5000 có bị chiếm không
→ Thử đổi port trong file `vite.config.js`

### Lỗi thiếu module
→ Chạy lại: `npm install`

## 📞 Hỗ trợ

Nếu gặp lỗi khác, hãy kiểm tra:
1. Node.js đã cài đúng phiên bản (v18 trở lên)
2. Đã chạy `npm install` thành công
3. Không có lỗi trong Terminal khi chạy

## 🎉 Hoàn tất!

Giờ bạn đã có thể sử dụng ứng dụng trên máy tính cá nhân!
