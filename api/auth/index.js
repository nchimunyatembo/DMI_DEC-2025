/**
 * Vercel Serverless Function Handler
 * Handles API routes for authentication
 * CommonJS format for Vercel compatibility
 */
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Create database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

// User registration function
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await db.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)', [
            name,
            email,
            hashedPassword
        ]);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({ message: 'An error occurred!', error: error.message });
    }
};

// User login function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found! Please register.' });
        }

        const user = rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        res.status(200).json({
            message: 'Login successful!',
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: 'An error occurred!', error: error.message });
    }
};

// Main handler function for Vercel
module.exports = async (req, res) => {
    try {
        const url = req.url || '';
        const method = req.method || 'GET';

        // normalize path to check for register/login
        const path = url.toLowerCase();

        if (method === 'POST' && path.includes('/register')) {
            return await registerUser(req, res);
        }

        if (method === 'POST' && path.includes('/login')) {
            return await loginUser(req, res);
        }

        res.status(404).json({ message: 'Not found' });
    } catch (err) {
        console.log('Handler error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
