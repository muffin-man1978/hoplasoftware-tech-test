// Run app
import Application from './app';
import * as dotenv from 'dotenv';
import applicationConfig from '../application.config';
import MongoDBConnection from './mongodb.connection';

dotenv.config();

if(!applicationConfig.isREST) {
    const myMongo = MongoDBConnection.getInstance();
}

const myApp = new Application();
