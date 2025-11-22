//import
const express = require('express');
const path = require('path');


require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

//set-up middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

//Error handling middleware
app.use((error, request, response, next) => {
    console.log('Error:', error);
    response.status(500).json({ message: 'An error occurred!', error: error.message });
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Serve register page at /register
app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/Leave', (request, response) => {
    response.sendFile(path.join(__dirname, 'leave.html'));
});

app.get('/index', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`)
});

// Global error handler for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});