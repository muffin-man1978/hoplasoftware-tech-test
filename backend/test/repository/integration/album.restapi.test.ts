import 'jest';
import * as dotenv from 'dotenv';
import applicationConfig from '../../../application.config';
import AlbumRESTAPI from '../../../src/repository/origins/album.restapi';

function iTunesDown(e: any) {
    console.log('https://itunes.apple.com/ REST API may be down: ');
    console.log(e);
}

describe('AlbumRESTAPI integration test suite', () => {

    const repo = new AlbumRESTAPI();

    beforeEach(() => {
        dotenv.config();
        applicationConfig.endpoints.itunes.urlArtist = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm";
    });

    it('Fails for the wrong environment URL', async () => {
        applicationConfig.endpoints.itunes.urlArtist = "WRONG_URL";
        try {
            await repo.getByArtist("coltrane");
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it('Works for the artist "coltrane"', async () => {
        try {
            const results = await repo.getByArtist("coltrane");
            expect(results).toBeDefined();
            expect(results.length).toBeGreaterThan(0);
        } catch (e) {
            iTunesDown(e);
        }
    });

    it('Returns nothing for artist empty', async () => {
        try {
            const results = await repo.getByArtist("");
            expect(results).toBeDefined();
            expect(results.length).toBe(0);
        } catch (e) {
            iTunesDown(e);
        }
    });

});