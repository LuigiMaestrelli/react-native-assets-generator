import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(compression());
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(helmet());

    const resultDir = path.join(__dirname, '..', '..', 'tmp', 'output');
    this.express.use('/result', express.static(resultDir));
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
