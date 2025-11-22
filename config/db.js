//import
const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

pool.on('error', (err) => {
    console.log('Database error:', err);
});

pool.connect((err) =>{
   if(err) {
       console.log('Connection failed:', err);
       return;
   }
    console.log("database connected successfully")
})

module.exports = pool.promise();

