#!/bin/bash
# ───────────────────────────────────────────────
# macOS/Linux 전용 초기화 스크립트 (init.sh)
# ───────────────────────────────────────────────

echo "1) 데이터베이스 초기화 스크립트 실행: db/initDB.js"
node db/initDB.js
if [ $? -ne 0 ]; then
  echo "❌ initDB.js 실행 중 오류 발생"
  exit 1
fi

echo "2) 샘플 데이터 삽입 스크립트 실행: db/seedProducts.js"
node db/seedProducts.js
if [ $? -ne 0 ]; then
  echo "❌ seedProducts.js 실행 중 오류 발생"
  exit 1
fi

echo "3) 앱 시작: npm start"
npm start
# (npm start가 백그라운드로 실행되거나, 프로세스를 점유할 수 있으므로,
#  필요에 따라 & 붙이거나 별도 터미널에서 실행하세요.)
