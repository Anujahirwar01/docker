// server.js - Main Express server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
// In Docker, we use service names instead of localhost
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/mern-tutorial';

mongoose.connect(MONGO_URL)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ MongoDB connection error:', err));

// Simple User model for demonstration
const User = mongoose.model('User', {
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

// Routes
// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            message: 'Users fetched successfully',
            data: users,
            count: users.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/users - Create a new user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend server is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MERN Docker Tutorial API!',
        endpoints: {
            health: '/api/health',
            users: '/api/users (GET, POST)'
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});