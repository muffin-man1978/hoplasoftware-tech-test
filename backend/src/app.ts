import express, { json } from 'express';
import BaseRoutes from '../src/controller/base.controller';
import AlbumRoutes from '../src/controller/album.controller';
import applicationConfig from '../application.config';
import { Server } from "http";
import MongoDBConnection from './mongodb.connection';

class Application {

  app: express.Application;
  server: Server;
  mongo?: MongoDBConnection;
  // @todo: Insertar objeto de MongoDB Connection aqui

  constructor(mongo_handle?:MongoDBConnection) {
    this.app = express();
    this.middlewares();
    this.routes();
    if(mongo_handle) {
      this.mongo = mongo_handle;    
    }
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
        console.log('Server is running on port ' + applicationConfig.port);
      }
    });
  }

  // Aqui nos tenemos que cargar el objeto de MongoDB
  teardown(): void {
    if(this.mongo) {
      this.mongo.close();
    }
    this.server.close();    
  }

  /* start(): void {
    this.app.listen(applicationConfig.port, () => {
      if (applicationConfig.dev) {
        console.log('Server is running on port ' + applicationConfig.port);
      }
    });
  }

  close() : void {
    // this.app.
  } */

}

export default Application;
