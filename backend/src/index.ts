// Run app
import Application from './app';
import * as dotenv from 'dotenv';
import applicationConfig from '../application.config';
import MongoDBConnection from './mongodb.connection';

dotenv.config();

let myApp: Application;

if(applicationConfig.dataOrigin === "mongo") {
    const myMongoDB = new MongoDBConnection();
    myApp = new Application(myMongoDB);
} else {
    myApp = new Application();
}
