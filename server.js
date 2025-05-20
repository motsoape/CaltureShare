// Simulated YouTube System Design (Simplified)
// Requires: npm install express multer uuid

const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data stores (mocking storage and metadata DB)
const videos = {};
const metadata = {};

// Simulate CDN (just a simple route)
app.get('/cdn/:videoId', (req, res) => {
    const video = videos[req.params.videoId];
    if (video) res.send(`Streaming video: ${video.originalname}`);
    else res.status(404).send('Video not found');
});

// Simulate API Server (metadata)
app.get('/api/videos', (req, res) => {
    res.json(Object.values(metadata));
});

app.get('/api/videos/:id', (req, res) => {
    const meta = metadata[req.params.id];
    if (meta) res.json(meta);
    else res.status(404).send('Metadata not found');
});

// Simulate Transcoding (stub)
function transcodeVideo(file) {
    // In reality, would convert to multiple formats
    return { ...file, transcoded: true };
}

// Simulate Video Upload (Web Server)
const upload = multer({ storage: multer.memoryStorage() });
app.post('/upload', upload.single('video'), (req, res) => {
    // 1. Store original video (simulate Video Storage)
    const id = uuidv4();
    videos[id] = req.file;

    // 2. "Transcode" video (simulate Transcoding Server)
    const transcoded = transcodeVideo(req.file);

    // 3. Store metadata (simulate Metadata Storage)
    metadata[id] = {
        id,
        title: req.body.title || req.file.originalname,
        transcoded: transcoded.transcoded,
        uploadedAt: new Date(),
    };

    res.json({ message: 'Video uploaded and processed!', id });
});

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1>Mini YouTube System Design (Simulated)</h1>
        <p>Endpoints:</p>
        <ul>
            <li>POST /upload (form-data: video file, title)</li>
            <li>GET /api/videos (list all video metadata)</li>
            <li>GET /api/videos/:id (get metadata for a video)</li>
            <li>GET /cdn/:videoId (simulate streaming a video)</li>
        </ul>
    `);
});

app.listen(port, () => {
    console.log(`YouTube system server running at http://localhost:${port}`);
});