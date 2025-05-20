const express = require('express');
const videoService = require('../services/videoStorageService');
const router = express.Router();

router.get('/:id', (req, res) => {
  const video = videoService.getVideo(req.params.id);
  if (video) {
    res.send(`Streaming video (simulated): ${video.originalname}`);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

module.exports = router;