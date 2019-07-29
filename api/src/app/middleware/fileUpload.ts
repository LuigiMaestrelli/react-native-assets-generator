import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsPath = path.join(__dirname, '..', '..', '..', 'tmp', 'uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(_req, _file, cb): void {
    cb(null, uploadsPath);
  },
  filename: function(_req, file, cb): void {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export default (key: string): express.RequestHandler => {
  return upload.single(key);
};
