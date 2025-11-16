@echo off
title Cong cu tu dong hoa tai lieu - An toan
color 0A
cls

echo ========================================
echo    CACH CHAY AN TOAN NHAT
echo    (Chay tung buoc de kiem soat)
echo ========================================
echo.

REM Buoc 1: Kill cac tien trinh cu tren port 5000
echo [Buoc 1] Tat cac tien trinh dang dung port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
taskkill /F /IM electron.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo           Done!
echo.

REM Buoc 2: Khoi dong Vite
echo [Buoc 2] Khoi dong Vite server...
echo           Cua so moi se mo - KHONG DONG cua so do!
echo.
start "Vite Server - KHONG DONG" cmd /k "npm run dev"

echo.
echo [Buoc 3] Doi Vite server khoi dong...
echo           Xem cua so Vite, doi thay dong "ready in XXX ms"
echo.
pause

REM Buoc 3: Kiem tra Vite
echo.
echo [Buoc 4] Kiem tra Vite server...
curl -s http://localhost:5000/ >nul 2>&1
if errorlevel 1 (
    echo [LOI] Vite chua chay!
    echo Hay kiem tra cua so Vite co loi gi khong.
    echo.
    pause
    exit /b 1
) else (
    echo [OK] Vite server dang chay!
)

echo.
echo [Buoc 5] Khoi dong Electron...
echo           Cua so Electron se mo sau 2 giay...
timeout /t 2 /nobreak >nul
echo.

npx electron .

echo.
echo ========================================
echo Electron da dong.
echo 
echo LUU Y: Cua so Vite van dang chay!
echo Hay DONG cua so Vite de tat hoan toan.
echo ========================================
echo.
pause
