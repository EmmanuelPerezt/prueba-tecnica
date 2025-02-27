import express from 'express';
import upload from '../config/multerConfig.js';
import { getImages, serveImage, uploadImage } from '../controller/imageController.js';
import authMiddleware from '../middleware/auth.js';
import verifyImageAccess from '../middleware/imageauth.js';
const router = express.Router();

// endpoints
router.post('/upload',authMiddleware, upload.single('image'), uploadImage);
router.get('/:username',authMiddleware, getImages);
router.get('/uploads/:file', verifyImageAccess, serveImage);



export default router;