
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createZip(folderPath, zipFilePath) {
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log('ZIP file created successfully');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(folderPath, false);
  archive.finalize();
}

module.exports = createZip;
