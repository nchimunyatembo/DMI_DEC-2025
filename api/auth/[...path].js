import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((error, request, response, next) => {
    console.log('Error:', error);
    response.status(500).json({ message: 'An error occurred!', error: error.message });
});

export default app;
