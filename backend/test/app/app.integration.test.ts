import 'jest';
import Application from '../../src/app';
import * as dotenv from 'dotenv';
import applicationConfig from '../../application.config';
import * as superAgent from "superagent";

// SEE LAST TEST
// import MongoDBConnection from '../../src/mongodb.connection';
// import mongoose from "mongoose";

describe('Application integration test suite', () => {
    
    beforeEach(() => {
        dotenv.config();
        applicationConfig.dev = false;
        applicationConfig.port = 5556;  
        applicationConfig.endpoints.itunes.urlArtist = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm";      
    });

    it('Works with the REST API origin', async () => {
        applicationConfig.dataOrigin = "rest";
        const myApp = new Application();        
        const response = await superAgent.get(`http://localhost:${applicationConfig.port}/artist/?name=metallica`);
        expect(response).toBeDefined();
        myApp.teardown();
    });

    it('Returns correctly from the base route', async () => {
        const myApp = new Application();
        const response = await superAgent.get(`http://localhost:${applicationConfig.port}/`);        
        const response_json = JSON.parse(response.text);
        expect(response_json).toHaveProperty("server_running");        
        myApp.teardown();
    });    

    it('Return correctly from the mock data origin', async () => {
        applicationConfig.dataOrigin = "mock";
        const myApp = new Application();        
        const response = await superAgent.get(`http://localhost:${applicationConfig.port}/artist/?name=metallica`);
        expect(response).toBeDefined();
        myApp.teardown();
    });

    /*
    IMPORTANT: This test fails, jest detects a TLSWRAP openHandle
    https://github.com/facebook/jest/issues/11665
    It's that same error, no matter how i try to close the mongoose connection,
    it keeps on failing.
    */
    /* it('Works with the MongoDB origin', async () => {
        const myMongo = MongoDBConnection.getInstance();
        const myApp = new Application(myMongo);
        applicationConfig.dataOrigin = "mongo";
        const response = await superAgent.get(`http://localhost:${applicationConfig.port}/artist/?name=metallica`);
        expect(response).toBeDefined();
        myApp.teardown();
        mongoose.connection.close();    // This has to be here or jest detects openHandles
    }); */

});
