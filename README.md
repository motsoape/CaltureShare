# CaltureShare

A simplified backend project inspired by YouTube’s system design.

## Architecture Overview

CaltureShare’s backend is structured to simulate the architecture of a modern video streaming platform, as illustrated below:

```
[User Client]
     |
     v
[Web Server] -- [Load Balancer] -- [API Server] -- [Metadata Storage]
     |                                  |
     |                                  v
     |                            [Transcoding Server]
     |                                  |
     v                                  v
[Video Storage] <------------------ [Transcoding Output]
     |
     v
   [CDN]
```

**Component Breakdown:**
- **User Client:** The user’s browser or application interacting with the platform.
- **Web Server:** Handles incoming HTTP requests for video uploads and metadata retrieval.
- **Load Balancer:** (Simulated) Would distribute requests across multiple API servers for scalability and reliability.
- **API Server:** Processes business logic, manages video metadata, and coordinates with transcoding and storage services.
- **Metadata Storage:** Stores video details such as title, upload time, and other descriptive data.
- **Transcoding Server:** Converts uploaded videos into a streamable format (simulated in this project).
- **Video Storage:** Holds the raw and transcoded video files (represented by JSON metadata in this demo).
- **CDN:** Simulates fast delivery of video content to users (here, a simple endpoint).

**How it works:**
1. Users upload a video via the `/upload` endpoint.
2. The server “transcodes” the video (simulated as a simple operation).
3. Video metadata is stored, and a reference to the uploaded video is made available.
4. Users can view all videos or individual metadata via `/videos` and `/videos/:id`.
5. Streaming is simulated via the `/cdn/:id` endpoint.

## Features

- Video upload
- Metadata storage
- Simulated transcoding
- Video serving via a "CDN" endpoint

## Getting Started

1. Install dependencies:

    ```sh
    npm install
    ```

2. Start the server:

    ```sh
    npm start
    ```

3. Endpoints:

    - `POST /upload` — Upload a video (use form-data with "video" and "title")
    - `GET /videos` — List all uploaded videos (metadata)
    - `GET /videos/:id` — Get metadata for a specific video
    - `GET /cdn/:id` — Simulated video streaming

## Project Structure

- `src/routes/` — Express route handlers
- `src/services/` — Core services (metadata, storage, transcoding)
- `src/data/` — Simple JSON data stores (for demo)

---

*This project is intended for educational and demonstration purposes and does not implement real video storage or transcoding. For real-world use, you would integrate with persistent storage solutions and actual video processing pipelines.*