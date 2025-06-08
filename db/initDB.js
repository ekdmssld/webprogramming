const sqlite3 = require('sqlite3').verbose();
const fs      = require('fs');
const path    = require('path');

const dbPath     = path.join(__dirname, './database.sqlite');
const schemaPath = path.join(__dirname, '../schema.sql');


const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

db.serialize(() => {
    db.run(`DELETE FROM cart_items;`, err => {
        if (err) console.error('❌ cart_items 초기화 오류:', err.message);
        else console.log('🗑 cart_items 비우기 완료');
    });
    db.run(`DELETE FROM wishlist;`, err => {
        if (err) console.error('❌ wishlist 초기화 오류:', err.message);
        else console.log('🗑 wishlist 비우기 완료');
    });
    db.run(`DELETE FROM sqlite_sequence WHERE name='cart_items';`);
    db.run(`DELETE FROM sqlite_sequence WHERE name='wishlist';`);
});

const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema, (err) => {
    if (err) {
        console.error('❌ 스키마 실행 오류:', err.message);
    } else {
        console.log('✅ 데이터베이스 초기화 완료');
    }
    db.close();
});