import 'jest';
import Application from '../../src/app';
import * as dotenv from 'dotenv';
import applicationConfig from '../../application.config';
import * as superAgent from "superagent";

describe('Application unit test suite', () => {

    beforeEach(() => {
        dotenv.config();
        applicationConfig.dev = false;
        applicationConfig.port = 5556;        
    });

    it('Fails with wrong environment variables', async () => {
        applicationConfig.endpoints.itunes.urlArtist = "WRONG_URL";
        const myApp = new Application();

        try {
            const response = await superAgent.get(`http://localhost:${applicationConfig.port}/artist/?name=mattersnotitwillfail`);
        } catch (e) {
            expect(e).toBeDefined();
        }
        myApp.teardown();
    });    

});