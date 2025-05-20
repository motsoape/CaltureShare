const express = require('express');
const app = express();
const uploadRoute = require('./routes/upload');
const videosRoute = require('./routes/videos');
const cdnRoute = require('./routes/cdn');

app.use(express.json());

app.use('/upload', uploadRoute);
app.use('/videos', videosRoute);
app.use('/cdn', cdnRoute);

app.get('/', (req, res) => {
  res.send(`
    <h1>CaltureShare API</h1>
    <ul>
      <li>POST /upload - Upload a video</li>
      <li>GET /videos - List all videos</li>
      <li>GET /videos/:id - Video metadata</li>
      <li>GET /cdn/:id - Stream a video (simulated)</li>
    </ul>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CaltureShare server running on http://localhost:${PORT}`);
});