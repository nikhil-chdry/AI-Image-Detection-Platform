// ============================================================
// DETECTION CONTROLLER
// Handles image detection using FastAPI
// ============================================================

const axios = require('axios');
const FormData = require('form-data');
const Detection = require('../models/Detection');
const User = require('../models/User');

// ============================================================
// DETECT IMAGE
// POST /api/detect
// ============================================================
const detectImage = async (req, res) => {
    try {
        // Check if file uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }

        // Send image to FastAPI model
        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const modelResponse = await axios.post(
            `${process.env.MODEL_API_URL}/predict/both`,
            formData,
            { headers: formData.getHeaders() }
        );

        const predictions = modelResponse.data;

        // Use V3 as primary result (best for human faces)
        const primaryResult = predictions.v3_result;

        // Save to database
        const detection = await Detection.create({
            user: req.user.id,
            imageUrl: req.file.originalname,
            prediction: primaryResult.label,
            confidence: primaryResult.confidence,
            realProbability: primaryResult.real_probability,
            fakeProbability: primaryResult.fake_probability,
            modelUsed: 'v3',
            modelInfo: primaryResult.model_info
        });

        // Update user scan count
        await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { totalScans: 1 } }
        );

        res.status(200).json({
            success: true,
            detection: {
                id: detection._id,
                prediction: primaryResult.label,
                confidence: primaryResult.confidence,
                realProbability: primaryResult.real_probability,
                fakeProbability: primaryResult.fake_probability,
                allModels: predictions,
                createdAt: detection.createdAt
            }
        });

    } catch (error) {
        console.error('Detection error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Detection failed. Make sure FastAPI server is running!'
        });
    }
};

// ============================================================
// GET DETECTION HISTORY
// GET /api/detect/history
// ============================================================
const getHistory = async (req, res) => {
    try {
        const detections = await Detection.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            count: detections.length,
            detections
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// GET STATS
// GET /api/detect/stats
// ============================================================
const getStats = async (req, res) => {
    try {
        const total = await Detection.countDocuments({ user: req.user.id });
        const fakeCount = await Detection.countDocuments({
            user: req.user.id,
            prediction: 'FAKE'
        });
        const realCount = await Detection.countDocuments({
            user: req.user.id,
            prediction: 'REAL'
        });

        res.status(200).json({
            success: true,
            stats: {
                totalScans: total,
                fakeDetected: fakeCount,
                realDetected: realCount,
                fakePercentage: total > 0 ? ((fakeCount / total) * 100).toFixed(1) : 0
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { detectImage, getHistory, getStats };