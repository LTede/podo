@echo off
chcp 65001 >nul
rem ── 포도여성의원 개발 서버 실행 (더블클릭용) ──
cd /d "%~dp0"
echo [1/3] 최신 코드 받는 중...
git pull
echo [2/3] 패키지 설치 중...
call npm install
echo [3/3] 개발 서버 시작 — 브라우저에서 http://localhost:3000 접속
echo (이 창을 닫으면 서버가 꺼집니다. 중지: Ctrl+C)
call npm run dev
pause
