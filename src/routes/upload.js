const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const videoService = require('../services/videoStorageService');
const transcoderService = require('../services/transcoderService');
const metadataService = require('../services/metadataService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded.' });
  }

  const id = uuidv4();
  // Store video "file"
  videoService.saveVideo(id, req.file);

  // Simulate transcoding
  transcoderService.transcode(req.file);

  // Save metadata
  const meta = metadataService.saveMetadata(id, {
    title: req.body.title || req.file.originalname,
    uploadedAt: new Date().toISOString()
  });

  res.json({ message: 'Video uploaded and processed!', id, meta });
});

module.exports = router;