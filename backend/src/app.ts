import express, { json } from 'express';
import BaseRoutes from '../src/controller/base.controller';
import AlbumRoutes from '../src/controller/album.controller';
import applicationConfig from '../application.config';
import { Server } from "http";

class Application {

  app: express.Application;
  server: Server;

  constructor() {
    this.app = express();    
    this.middlewares();
    this.routes();
    this.server = this.start();
  }
  
  middlewares(): void {
    if (applicationConfig.dev) {
      this.app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use(BaseRoutes);
    this.app.use(AlbumRoutes);
  }

  start(): Server {
    return this.app.listen(applicationConfig.port, () => {
      if (applicationConfig.dev) {
        console.log('Server is running on port ' + this.app.get('port'));
      }
    });
  }

  teardown(): void {
    this.server.close();
  }
}

export default Application;
