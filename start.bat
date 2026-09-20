@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 未找到 Node.js。
  echo 请打开 https://nodejs.org/zh-cn/download 安装 Node.js 22 或更新版本。
  echo 安装完成后关闭此窗口，再次双击 start.bat。
  pause
  exit /b 1
)
node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)" >nul 2>nul
if errorlevel 1 (
  echo Node.js 版本过旧，请安装 Node.js 22 或更新版本。
  echo 官方下载：https://nodejs.org/zh-cn/download
  echo 安装完成后关闭此窗口，再次双击 start.bat。
  pause
  exit /b 1
)
node scripts/bootstrap.mjs
set "AGENT_MOTION_EXIT=%ERRORLEVEL%"
pause
exit /b %AGENT_MOTION_EXIT%
