@echo off
title Cong cu tu dong hoa tai lieu
cls
echo.
echo ========================================
echo    DANG KHOI DONG UNG DUNG...
echo ========================================
echo.
echo Vui long doi 5-10 giay...
echo Cua so Electron se mo tu dong.
echo.

npm start

if errorlevel 1 (
    echo.
    echo LOI! Khong the khoi dong.
    echo Hay chay lenh: npm install
    echo.
    pause
)
