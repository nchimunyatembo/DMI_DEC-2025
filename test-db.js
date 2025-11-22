require('dotenv').config();
const db = require('./config/db');

async function testDb() {
    try {
        console.log('Testing database...');
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM users');
        console.log('Query successful, result:', rows);
    } catch(error) {
        console.log('Query error:', error.message);
    }
}

testDb();
