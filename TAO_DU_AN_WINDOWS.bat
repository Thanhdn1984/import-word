@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════
echo   TẠO DỰ ÁN TỰ ĐỘNG HÓA TÀI LIỆU - WINDOWS
echo ════════════════════════════════════════════════════════
echo.
echo Bước 1: Tạo thư mục dự án...
echo.

set /p folder="Nhập tên thư mục muốn tạo (vd: my-docx-tool): "

if "%folder%"=="" (
    echo [LỖI] Vui lòng nhập tên thư mục!
    pause
    exit /b
)

mkdir "%folder%" 2>nul
cd "%folder%"

echo.
echo Bước 2: Tạo package.json...
(
echo {
echo   "name": "docx-automation-tool",
echo   "version": "1.0.0",
echo   "description": "Công cụ tự động hóa tài liệu ngân hàng",
echo   "main": "electron/main.js",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite --host 0.0.0.0 --port 5000",
echo     "build": "vite build",
echo     "preview": "vite preview",
echo     "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5000 ^&^& electron .\"",
echo     "electron:build": "npm run build ^&^& electron-builder",
echo     "start": "concurrently \"npm run dev\" \"wait-on http://localhost:5000 ^&^& electron .\"",
echo     "dist": "electron-builder"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "lucide-react": "^0.263.1",
echo     "docxtemplater": "^3.42.0",
echo     "pizzip": "^3.1.6",
echo     "date-fns": "^2.30.0",
echo     "numeral": "^2.0.6",
echo     "clsx": "^2.0.0",
echo     "tailwind-merge": "^1.14.0"
echo   },
echo   "devDependencies": {
echo     "@vitejs/plugin-react": "^4.0.4",
echo     "vite": "^4.4.9",
echo     "tailwindcss": "^3.3.3",
echo     "postcss": "^8.4.29",
echo     "autoprefixer": "^10.4.15",
echo     "electron": "^26.2.1",
echo     "electron-builder": "^24.6.4",
echo     "concurrently": "^8.2.1",
echo     "wait-on": "^7.0.1",
echo     "@types/react": "^18.2.21",
echo     "@types/react-dom": "^18.2.7",
echo     "@types/node": "^20.5.9",
echo     "jszip": "^3.10.1",
echo     "archiver": "^6.0.1",
echo     "extract-zip": "^2.0.1"
echo   }
echo }
) > package.json

echo.
echo ✓ Đã tạo package.json
echo.
echo ════════════════════════════════════════════════════════
echo   HƯỚNG DẪN TIẾP THEO:
echo ════════════════════════════════════════════════════════
echo.
echo 1. Mở Replit, vào tab "Files" bên trái
echo.
echo 2. Tải các file/thư mục sau về máy:
echo    - Thư mục "src" (toàn bộ)
echo    - Thư mục "electron" (toàn bộ)
echo    - File "index.html"
echo    - File "vite.config.js"
echo    - File "tailwind.config.js"
echo    - File "postcss.config.js"
echo.
echo 3. Chép tất cả vào thư mục: %cd%
echo.
echo 4. Sau đó chạy lệnh:
echo    npm install
echo    npm start
echo.
echo ════════════════════════════════════════════════════════
echo.
pause
