// ============================================================
// DETECTION MODEL
// Stores all image detection results
// ============================================================

const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    prediction: {
        type: String,
        enum: ['REAL', 'FAKE'],
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    realProbability: {
        type: Number,
        required: true
    },
    fakeProbability: {
        type: Number,
        required: true
    },
    modelUsed: {
        type: String,
        default: 'v3'
    },
    modelInfo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Detection', DetectionSchema);