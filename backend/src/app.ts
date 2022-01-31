import express, { json } from 'express';
import routes from "./routes";

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings(): void {
    this.app.set('port', 8000);
  }

  middlewares(): void {  
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use(routes);
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server is running on port ' + this.app.get('port'));
    });
  }
}

export default Application;
