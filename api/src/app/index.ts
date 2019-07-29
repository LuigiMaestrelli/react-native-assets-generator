import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

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
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
