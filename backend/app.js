import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';
import fs from 'fs';
import cors from 'cors';

// Use __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Use CORS to allow cross-origin requests
app.use(cors());

// Define the folder locations
const folders = ['transfer', 'context-transfer', 'app-transfer'];


// Serve frontend files from the root (assume index.html in the root)
app.use(express.static(path.join(__dirname, '../')));

// Define the API to serve data from CSV files
app.get('/data/:type', (req, res) => {
  const type = req.params.type;
  console.log(`Requested data type: ${type}`); // Log request type

  if (!folders.includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const metadataPath = path.join(__dirname, `data/${type}/metadata.csv`);
  const relationshipPath = path.join(__dirname, `data/${type}/relationships.csv`);
  

  console.log(`Reading files from: ${metadataPath} and ${relationshipPath}`);

  const metadata = [];
  const relationships = [];

  // Check if file paths exist before proceeding
  if (!fs.existsSync(metadataPath) || !fs.existsSync(relationshipPath)) {
    return res.status(404).json({ error: 'Files not found' });
  }

  // Read metadata.csv
  fs.createReadStream(metadataPath)
    .pipe(csvParser())
    .on('data', (row) => {
      metadata.push(row);
    })
    .on('end', () => {
      // Read relationships.csv
      fs.createReadStream(relationshipPath)
        .pipe(csvParser())
        .on('data', (row) => {
          relationships.push(row);
        })
        .on('end', () => {
          res.json({ metadata, relationships });
        });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
