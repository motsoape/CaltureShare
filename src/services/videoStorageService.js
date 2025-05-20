const fs = require('fs');
const path = require('path');
const videosPath = path.join(__dirname, '../data/videos.json');

// Load or initialize video storage
function load() {
  if (!fs.existsSync(videosPath)) return {};
  return JSON.parse(fs.readFileSync(videosPath));
}

function save(data) {
  fs.writeFileSync(videosPath, JSON.stringify(data, null, 2));
}

const videos = load();

exports.saveVideo = (id, file) => {
  videos[id] = { originalname: file.originalname, size: file.size };
  save(videos);
};

exports.getVideo = (id) => {
  return videos[id];
};

exports.listVideos = () => {
  return Object.values(videos);
};