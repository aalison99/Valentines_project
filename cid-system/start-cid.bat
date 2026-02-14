@echo off
REM ========================================================================
REM CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM - LAUNCHER SCRIPT
REM ========================================================================
REM
REM This script launches the Criminal Investigation Database Management System.
REM It installs dependencies if needed and starts the server.
REM
REM USAGE:
REM Simply double-click this file or run it from the command prompt
REM
REM ========================================================================

echo ========================================================================
echo CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM
echo ========================================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please install Node.js to run this application.
    echo Visit https://nodejs.org/ to download and install Node.js.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "app.js" (
    echo Please run this script from the cid-system directory.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    
    if %ERRORLEVEL% neq 0 (
        echo Failed to install dependencies. Please run 'npm install' manually.
        pause
        exit /b 1
    )
    
    echo Dependencies installed successfully.
)

echo.
echo Starting the CID System...
echo Press Ctrl+C to stop the server
echo.

REM Start the server
node app.js

REM This line will only execute if the server stops
echo.
echo Server stopped.
pause