@echo off
title Cong cu tu dong hoa tai lieu
color 0B
cls

echo ========================================
echo    CONG CU TU DONG HOA TAI LIEU
echo    (Phien ban don gian - Khong dung wait-on)
echo ========================================
echo.

REM Buoc 1: Khoi dong Vite server
echo [1/3] Dang khoi dong Vite server...
start /B cmd /c "npm run dev > vite.log 2>&1"

echo.
echo [2/3] Doi Vite server khoi dong...
echo.

REM Cho Vite san sang voi retry (toi da 30 giay)
set RETRY=0
:WAIT_VITE
set /a RETRY+=1
if %RETRY% GTR 30 (
    echo [LOI] Vite khong khoi dong sau 30 giay!
    echo Dang tat Vite...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    echo Hay kiem tra file vite.log de xem loi.
    echo.
    pause
    exit /b 1
)

curl -s http://localhost:5000/ >nul 2>&1
if errorlevel 1 (
    echo       Doi... (%RETRY%/30 giay^)
    timeout /t 1 /nobreak >nul
    goto WAIT_VITE
)

echo [OK] Vite server da san sang!
echo.
echo [3/3] Dang khoi dong Electron...
echo.

REM Khoi dong Electron
npx electron .

REM Sau khi dong Electron, tat Vite (chi tat neu port 5000 con dung)
echo.
echo Dang dong Vite server...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Da dong ung dung.
pause
