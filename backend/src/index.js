// ============================================================
// MAIN SERVER FILE
// ============================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

// Security headers
app.use(helmet());

// CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// ROUTES
// ============================================================

app.use('/api/auth', require('./routes/auth'));
app.use('/api/detect', require('./routes/detect'));

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AI Image Detection Backend Running 🚀',
        version: '1.0.0'
    });
});

// ============================================================
// DATABASE + SERVER START
// ============================================================

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected!');
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`✅ API: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });