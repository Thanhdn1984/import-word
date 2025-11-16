@echo off
chcp 65001 >nul
cls
echo ====================================
echo   Công cụ tự động hóa tài liệu
echo ====================================
echo.
echo Đang khởi động ứng dụng...
echo.

npm run electron:dev

pause
