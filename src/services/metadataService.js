const fs = require('fs');
const path = require('path');
const metadataPath = path.join(__dirname, '../data/metadata.json');

// Load or initialize metadata storage
function load() {
  if (!fs.existsSync(metadataPath)) return {};
  return JSON.parse(fs.readFileSync(metadataPath));
}

function save(data) {
  fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));
}

const metadata = load();

exports.saveMetadata = (id, data) => {
  metadata[id] = { id, ...data };
  save(metadata);
  return metadata[id];
};

exports.getMetadata = (id) => {
  return metadata[id];
};

exports.listMetadata = () => {
  return Object.values(metadata);
};