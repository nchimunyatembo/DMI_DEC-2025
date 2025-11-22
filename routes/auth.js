//import
const express = require('express')
const { registerUser, loginUser,homepage,leave } = require('../controllers/authController')
const router = express.Router();

// Wrapper for async route handlers
const asyncHandler = (fn) => (request, response, next) => {
    Promise.resolve(fn(request, response, next)).catch(next);
};

//homepage route
router.post('/homepage', asyncHandler(homepage));

//user registration
router.post('/register', asyncHandler(registerUser));

//leave route
router.post('/leave', asyncHandler(leave));

//user login 
router.post('/login', asyncHandler(loginUser));

module.exports = router;

