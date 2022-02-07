import 'jest';
import Application from '../../src/app';
import * as dotenv from 'dotenv';
import endpointsConfig from '../../endpoints.config';
import applicationConfig from '../../application.config';
import * as superAgent from "superagent";

// describe('')


/* it('Works with the correct environment variable', async () => {
        const myApp = new Application();
        const response = await superAgent.get(`http://localhost:${applicationConfig.port}/artist/?name=thiswillwork`);
        expect(response).toBeDefined();
        myApp.teardown();
    }); */


// endpointsConfig.itunes.urlArtist = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm";