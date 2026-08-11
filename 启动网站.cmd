@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 朱彦霏个人网站 - 请勿关闭此窗口

echo 正在启动个人网站...
echo 服务运行期间请不要关闭此窗口。
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:5173/'"
npm.cmd run dev

echo.
echo 网站服务已经停止。请按任意键关闭窗口。
pause >nul
