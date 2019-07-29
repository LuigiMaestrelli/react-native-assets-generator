import { Request } from 'express';
import MulterFile from './MulterFile';

export default interface UploadRequest extends Request {
  file: MulterFile;
  files: MulterFile[];
}
