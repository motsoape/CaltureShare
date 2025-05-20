const express = require('express');
const metadataService = require('../services/metadataService');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(metadataService.listMetadata());
});

router.get('/:id', (req, res) => {
  const meta = metadataService.getMetadata(req.params.id);
  if (meta) res.json(meta);
  else res.status(404).json({ error: 'Video metadata not found' });
});

module.exports = router;