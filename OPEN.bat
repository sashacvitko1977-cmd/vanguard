@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if %errorlevel%==0 (
  echo Запуск через локальный сервер...
  start "Vanguard Server" /min cmd /k node "%~dp0scripts\serve.cjs"
  timeout /t 2 /nobreak >nul
  start "" "http://localhost:5500/vanguard.html"
  echo.
  echo Сайт открыт: http://localhost:5500/vanguard.html
  echo Чтобы остановить сервер — закройте окно "Vanguard Server".
) else (
  echo Node.js не найден — открываю файл напрямую...
  start "" "%~dp0vanguard.html"
  echo.
  echo Сайт открыт в браузере.
)

echo.
pause