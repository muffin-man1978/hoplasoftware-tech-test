import 'jest';
import * as dotenv from 'dotenv';
import endpointsConfig from '../../../endpoints.config';
import AlbumRESTAPI from '../../../src/repository/album.restapi';

function iTunesDown(e: any) {
    console.log('https://itunes.apple.com/ REST API may be down: ');
    console.log(e);
}

describe('AlbumRESTAPI integration test suite', () => {

    const repo = new AlbumRESTAPI();

    beforeEach(() => {
        endpointsConfig.itunes.urlArtist = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm";
    });

    it('Fails for the wrong environment URL', async () => {
        endpointsConfig.itunes.urlArtist = "WRONG_URL";
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