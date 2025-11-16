@echo off
chcp 65001 >nul
cls
echo ════════════════════════════════════════════════════════
echo   CÔNG CỤ TỰ ĐỘNG HÓA TÀI LIỆU - KHỞI ĐỘNG
echo ════════════════════════════════════════════════════════
echo.
echo [1/3] Kiểm tra Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [LỖI] Node.js chưa được cài đặt!
    echo Vui lòng tải và cài Node.js tại: https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js đã cài đặt
echo.

echo [2/3] Kiểm tra dependencies...
if not exist "node_modules\" (
    echo [CẢNH BÁO] Chưa cài đặt dependencies!
    echo Đang cài đặt... Vui lòng đợi...
    call npm install
    if errorlevel 1 (
        echo [LỖI] Cài đặt thất bại!
        pause
        exit /b 1
    )
)
echo ✓ Dependencies đã sẵn sàng
echo.

echo [3/3] Khởi động ứng dụng Electron...
echo.
echo ════════════════════════════════════════════════════════
echo   CỬA SỔ ELECTRON SẼ MỞ TRONG VÀI GIÂY
echo   (Nếu không mở, xem file KHAC_PHUC_LOI.md)
echo ════════════════════════════════════════════════════════
echo.

npm start

if errorlevel 1 (
    echo.
    echo [LỖI] Không thể khởi động ứng dụng!
    echo.
    echo Hãy thử chạy lệnh này thay thế:
    echo   npm run dev
    echo.
    echo Sau đó mở trình duyệt: http://localhost:5000
    echo (Lưu ý: Chế độ web không thể chọn file)
    echo.
)

pause
