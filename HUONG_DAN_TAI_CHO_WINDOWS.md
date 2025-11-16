# 📥 HƯỚNG DẪN TẢI DỰ ÁN CHO WINDOWS (ĐƠN GIẢN NHẤT)

## ✅ PHƯƠNG ÁN 1: SỬ DỤNG GITHUB (NHANH NHẤT - 5 PHÚT)

### Bước 1: Đẩy code lên GitHub từ Replit

Trên màn hình Replit:

1. Nhìn sang **thanh bên trái**, tìm biểu tượng **nhánh cây** (🌿) - Tab "**Version Control**"
2. Click vào tab đó
3. Nếu chưa kết nối GitHub:
   - Click **"Connect to GitHub"** hoặc **"Create a Git Repo"**
   - Đăng nhập tài khoản GitHub của bạn
   - Cho phép Replit truy cập GitHub
4. Click nút **"Publish to GitHub"**
5. Đặt tên repository (vd: `docx-automation-tool`)
6. Click **"Publish"** hoặc **"Create"**

### Bước 2: Tải về máy Windows

Sau khi đẩy lên GitHub xong, bạn sẽ có link dạng:
```
https://github.com/[tên-của-bạn]/docx-automation-tool
```

**Trên máy Windows:**

1. Mở trình duyệt, vào link GitHub vừa tạo
2. Click nút **"Code"** (màu xanh lá)
3. Chọn **"Download ZIP"**
4. Giải nén file ZIP
5. Mở Command Prompt trong thư mục vừa giải nén
6. Chạy:
```batch
npm install
npm start
```

---

## 📋 PHƯƠNG ÁN 2: TẢI TỪNG FILE QUAN TRỌNG

Nếu không dùng GitHub, bạn tải từng file/thư mục:

### Các file/thư mục CẦN TẢI:

Trên Replit, mở tab **Files** (📁), click chuột phải vào từng mục sau và chọn **Download**:

#### 📁 Thư mục (tải toàn bộ):
- ✅ **src/** - Toàn bộ mã nguồn React
- ✅ **electron/** - Code Electron

#### 📄 File riêng lẻ:
- ✅ **package.json** - Danh sách gói cần cài
- ✅ **index.html** - File HTML chính
- ✅ **vite.config.js** - Cấu hình Vite
- ✅ **tailwind.config.js** - Cấu hình Tailwind
- ✅ **postcss.config.js** - Cấu hình PostCSS
- ✅ **start.bat** - Script chạy nhanh

### Cách tải thư mục trên Replit:

**Lưu ý:** Replit có thể không cho tải cả thư mục trực tiếp, nên bạn cần:

1. Click vào thư mục (vd: `src`)
2. Click chuột phải vào thư mục
3. Nếu có **"Download as zip"** → Click vào
4. Nếu không có → Bạn cần tải từng file bên trong:
   - Mở thư mục `src`
   - Click chuột phải từng file → Download
   - Tạo lại cấu trúc thư mục giống trên Replit

### Tạo lại cấu trúc trên Windows:

```
my-docx-tool/
├── electron/
│   ├── main.js
│   └── preload.js
├── src/
│   ├── components/
│   │   ├── DataForm.jsx
│   │   ├── FieldManager.jsx
│   │   ├── TemplateSelector.jsx
│   │   ├── PresetManager.jsx
│   │   ├── GeneratePanel.jsx
│   │   └── WelcomeGuide.jsx
│   ├── utils/
│   │   └── documentGenerator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── start.bat
```

### Sau khi tải xong:

```batch
cd đường-dẫn-đến-thư-mục
npm install
npm start
```

---

## 🔧 PHƯƠNG ÁN 3: DÙNG GIT CLONE (CHO NGƯỜI BIẾT GIT)

Nếu bạn có Git trên Windows:

### Bước 1: Lấy URL của Repl

Trên Replit, nhìn lên thanh địa chỉ browser, URL có dạng:
```
https://replit.com/@username/project-name
```

URL git sẽ là:
```
https://github.com/username/project-name.git
```

HOẶC trên Replit có thể có URL dạng:
```
https://replit.com/@username/project-name.git
```

### Bước 2: Clone về máy

Mở Command Prompt:
```batch
git clone https://github.com/username/project-name.git
cd project-name
npm install
npm start
```

---

## ❓ VẪN KHÔNG TẢI ĐƯỢC?

### Cách cuối cùng: Tôi gửi toàn bộ code

Nếu tất cả cách trên đều không được, hãy:

1. **Tạo thư mục mới** trên Windows
2. **Tạo file package.json** (tôi sẽ cung cấp nội dung)
3. **Tạo từng file** theo hướng dẫn tôi đưa
4. Chạy `npm install`

**Bạn muốn tôi hướng dẫn cách này không?** 
Tôi sẽ gửi từng đoạn code để bạn copy-paste vào từng file.

---

## 🆘 CẦN TRỢ GIÚP?

Cho tôi biết:
- Bạn có tài khoản GitHub không?
- Bạn thấy tab "Version Control" (🌿) trên Replit không?
- Bạn muốn dùng phương án nào (1, 2, hay 3)?

Tôi sẽ hướng dẫn chi tiết hơn! 🚀
