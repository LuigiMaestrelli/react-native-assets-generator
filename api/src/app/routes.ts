import { Router } from 'express';
import ImageController from './controllers/ImageController';
import fileUpload from './middleware/fileUpload';

const routes = Router();

routes.post('/upload', fileUpload('svgFile'), ImageController.convert);

export default routes;
