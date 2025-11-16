@echo off
chcp 65001 >nul
cls
echo ════════════════════════════════════════════════════════
echo   KIỂM TRA VÀ TEST ELECTRON
echo ════════════════════════════════════════════════════════
echo.

echo [1] Kiểm tra Node.js và npm...
call node --version
call npm --version
echo.

echo [2] Kiểm tra Electron đã cài chưa...
call npx electron --version
if errorlevel 1 (
    echo [CẢNH BÁO] Electron chưa cài hoặc bị lỗi
    echo Đang cài lại Electron...
    call npm install --save-dev electron
)
echo.

echo [3] Kiểm tra thư mục electron/...
if exist "electron\main.js" (
    echo ✓ File electron/main.js tồn tại
) else (
    echo ✗ THIẾU file electron/main.js
)

if exist "electron\preload.js" (
    echo ✓ File electron/preload.js tồn tại
) else (
    echo ✗ THIẾU file electron/preload.js
)
echo.

echo [4] Test chạy Electron đơn giản...
echo Nhấn Ctrl+C để dừng sau khi test xong
echo.
timeout /t 3 >nul

start "Vite Server" cmd /c "npm run dev"
timeout /t 5 >nul
start "Electron App" cmd /c "npx electron ."

echo.
echo ════════════════════════════════════════════════════════
echo   KẾT QUẢ KIỂM TRA:
echo ════════════════════════════════════════════════════════
echo.
echo Nếu thấy:
echo   1. Cửa sổ terminal chạy Vite
echo   2. Cửa sổ Electron mở ra
echo   → ✓ THÀNH CÔNG!
echo.
echo Nếu KHÔNG thấy cửa sổ Electron:
echo   → Xem file KHAC_PHUC_LOI.md để khắc phục
echo.
pause
