import { Request, Response } from 'express';
import fs from 'fs';
import rimraf from 'rimraf';

import UploadRequest from '../interfaces/UploadRequest';

import ImageCreator from '../services/ImageCreator';
import ZipCreator from '../services/ZipCreator';

class ImageController {
  public async convert(req: UploadRequest, res: Response): Promise<Response> {
    let dirToRemove: string;

    try {
      if (req.file.mimetype !== 'image/svg+xml') {
        return res.status(400).json({ msg: 'Not a valid SVG file' });
      }

      if (!req.body.color) {
        return res.status(400).json({ msg: 'You must inform a color' });
      }

      if (!req.body.baseSize) {
        return res.status(400).json({ msg: 'You must inform a base size' });
      }

      if (!req.body.name) {
        return res.status(400).json({ msg: 'You must inform a name' });
      }

      const config = {
        baseSize: parseInt(req.body.baseSize),
        color: req.body.color,
        path: req.file.path,
        name: req.body.name,
        density: !req.body.density ? 300 : parseInt(req.body.density)
      };

      const result = await new ImageCreator(config).createFiles();

      const zipFile = await new ZipCreator({
        files: result.files,
        name: req.body.name
      }).createFile();

      dirToRemove = result.outputPath;

      return res.status(200).json(zipFile);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    } finally {
      fs.unlinkSync(req.file.path);

      if (dirToRemove) {
        rimraf.sync(dirToRemove);
      }
    }
  }
}

export default new ImageController();
