@echo off
title [DEBUG] Cong cu tu dong hoa tai lieu
color 0A
cls

echo ========================================
echo    CONG CU TU DONG HOA TAI LIEU
echo    (DEBUG MODE - Chi tiet loi)
echo ========================================
echo.

REM Kiem tra Node.js
echo [1/5] Kiem tra Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo [LIEN] Khong tim thay Node.js!
    echo Vui long cai dat Node.js tu: https://nodejs.org
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
    echo [OK] Node.js version: %NODE_VER%
)
echo.

REM Kiem tra npm
echo [2/5] Kiem tra npm...
npm -v >nul 2>&1
if errorlevel 1 (
    echo [LOI] Khong tim thay npm!
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VER=%%i
    echo [OK] npm version: %NPM_VER%
)
echo.

REM Kiem tra package.json
echo [3/5] Kiem tra package.json...
if not exist package.json (
    echo [LOI] Khong tim thay package.json!
    echo Hay chac chan ban dang o dung thu muc du an.
    echo.
    pause
    exit /b 1
) else (
    echo [OK] package.json ton tai
)
echo.

REM Kiem tra node_modules
echo [4/5] Kiem tra dependencies...
if not exist node_modules (
    echo [CANH BAO] Thu muc node_modules khong ton tai!
    echo Dang cai dat dependencies...
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo [LOI] Khong the cai dat dependencies!
        echo.
        pause
        exit /b 1
    )
) else (
    echo [OK] node_modules da ton tai
)
echo.

REM Kiem tra port 5000
echo [5/5] Kiem tra port 5000...
netstat -ano | findstr :5000 >nul 2>&1
if errorlevel 0 (
    echo [CANH BAO] Port 5000 co the dang duoc su dung!
    echo Neu ung dung khong mo, hay dong cac ung dung khac dang dung port 5000.
    echo.
)

echo ========================================
echo    TAT CA KIEM TRA HOAN TAT
echo ========================================
echo.
echo Dang khoi dong ung dung...
echo Vui long doi 10-15 giay de Electron khoi dong.
echo.
echo Neu khong thay cua so Electron:
echo   1. Xem thong bao loi ben duoi
echo   2. Kiem tra Task Manager xem co tien trinh Electron khong
echo   3. Thu khoi dong lai may tinh
echo.
echo Nhan Ctrl+C de dung bat ky luc nao
echo ========================================
echo.

REM Chay ung dung voi output day du
npm start

REM Neu co loi
if errorlevel 1 (
    echo.
    echo ========================================
    echo    DA XAY RA LOI!
    echo ========================================
    echo.
    echo Cac buoc khac phuc:
    echo   1. Chay lenh: npm install
    echo   2. Khoi dong lai may tinh
    echo   3. Kiem tra antivirus co chan Electron khong
    echo   4. Thu xoa thu muc node_modules va chay lai npm install
    echo.
)

pause
