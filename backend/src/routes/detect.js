// ============================================================
// DETECTION ROUTES
// ============================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');

// Import controllers
const detectController = require('../controllers/detectController');

// Multer setup - store in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images allowed!'), false);
        }
    }
});

router.post('/', protect, upload.single('image'), detectController.detectImage);
router.get('/history', protect, detectController.getHistory);
router.get('/stats', protect, detectController.getStats);

module.exports = router;