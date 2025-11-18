@echo off
title Docx Automation Tool - Starting...
color 0B
cls

echo ========================================
echo      STARTING APPLICATION
echo ========================================
echo.
echo    Please wait a moment...
echo.

REM Step 1: Kill old processes
echo [1/4] Cleaning up old sessions on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
taskkill /F /IM electron.exe >nul 2>&1
echo      => Done!
echo.

REM Step 2: Start Vite server in the background
echo [2/4] Starting interface server (Vite)...
start /B "Vite Background Server" npm run dev

REM Step 3: Wait until Vite is ready
echo [3/4] Waiting for the interface server to be ready...

:check_vite
REM Wait 2 seconds then check
timeout /t 2 /nobreak >nul
REM Use curl to check if the server is responding on port 5000
curl -s http://localhost:5000/ >nul 2>&1

if errorlevel 1 (
    echo      ...Not ready, still waiting...
    goto check_vite
)

echo      => Server is ready!
echo.

REM Step 4: Start Electron
echo [4/4] Opening main interface (Electron)...
echo.
npx electron .

echo.
echo ========================================
echo       APPLICATION CLOSED
echo ========================================
echo.

REM Clean up Vite process after Electron is closed
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

exit
