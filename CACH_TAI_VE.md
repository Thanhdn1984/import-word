# 📥 HƯỚNG DẪN TẢI DỰ ÁN VỀ MÁY

## ✅ CÁCH ĐƠN GIẢN NHẤT

### Bước 1: Tải file ZIP
Tôi đã tạo sẵn file zip cho bạn:

1. **Mở tab "Files"** (biểu tượng 📁) ở thanh bên trái màn hình Replit
2. Tìm file tên **`docx-automation-tool.zip`**
3. **Click chuột phải** vào file → Chọn **"Download"**
4. **Giải nén** file zip vào thư mục bất kỳ trên máy

### Bước 2: Cài Node.js
- Truy cập: **https://nodejs.org**
- Tải bản **LTS** (khuyến nghị)
- Cài đặt và khởi động lại máy

### Bước 3: Cài đặt
Mở Command Prompt/Terminal trong thư mục vừa giải nén:
```bash
npm install
```

### Bước 4: Chạy
```bash
npm start
```

---

## 🔧 CÁC CÁCH KHÁC (NẾU CÁCH TRÊN KHÔNG ĐƯỢC)

### Cách 2: Tải từng file quan trọng

Nếu không tải được file ZIP, bạn có thể tải từng file:

**File cần thiết:**
1. `package.json` - Danh sách các gói cần cài
2. Thư mục `src/` - Toàn bộ mã nguồn
3. Thư mục `electron/` - Code Electron
4. `vite.config.js` - Cấu hình Vite
5. `tailwind.config.js` - Cấu hình Tailwind
6. `index.html` - File HTML chính
7. `start.bat` - Script chạy (Windows)
8. `start.sh` - Script chạy (Mac/Linux)

**Cách tải:**
- Click chuột phải vào từng file → **Download**
- Tạo lại cấu trúc thư mục giống trên Replit

### Cách 3: Dùng Git Clone

Nếu bạn biết dùng Git:

1. Copy URL của Repl này
2. Mở Terminal/Command Prompt
3. Chạy:
```bash
git clone [URL-của-repl].git
cd [tên-thư-mục]
npm install
npm start
```

---

## ❓ KHÔNG TÌM THẤY FILE ZIP?

Nếu không thấy file `docx-automation-tool.zip` trong Files:

### Tạo file ZIP bằng Shell:

1. Mở tab **Shell** trong Replit (biểu tượng >_)
2. Chạy lệnh:
```bash
zip -r docx-automation-tool.zip . -x "node_modules/*" ".git/*"
```
3. File ZIP sẽ xuất hiện trong tab Files
4. Click chuột phải → Download

---

## 💾 SAO LƯU TỰ ĐỘNG (KHUYẾN NGHỊ)

### Đẩy lên GitHub (Tốt nhất):

1. Mở tab **Version Control** (biểu tượng nhánh cây) bên trái Replit
2. Click **"Connect to GitHub"** hoặc **"Create a Git Repo"**
3. Đăng nhập GitHub
4. Click **"Publish to GitHub"**
5. Đặt tên repository → Click **Publish**

**Sau đó trên máy tính:**
```bash
git clone https://github.com/[tên-của-bạn]/[tên-repo].git
cd [tên-repo]
npm install
npm start
```

---

## 🆘 VẪN GẶP KHÓ KHĂN?

Nếu vẫn không tải được, hãy cho tôi biết:
- Bạn đang dùng Windows, Mac hay Linux?
- Bạn thấy gì trong tab Files?
- Có thấy file `docx-automation-tool.zip` không?

Tôi sẽ hướng dẫn cách khác phù hợp hơn!
