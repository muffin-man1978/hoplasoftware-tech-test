import 'jest';
import ITunesService from '../src/itunes.service';
import { IAlbum } from '../src/IAlbum.interface';

describe('ITunes service test', () => {

    let service:ITunesService;

    beforeAll(() => {
        service = new ITunesService();
    });

    it('Can get data from the itunes API', async () => {
        let coltrane_albums:IAlbum[] = await service.getTestAlbums();
        expect(coltrane_albums.length).toBeGreaterThan(0);
        expect(coltrane_albums[0]).toBeInstanceOf(Object);
        expect(coltrane_albums[0].collectionName).toBe('A Giant Step In Jazz');
        expect(coltrane_albums[0].trackCount).toBe(60);
    });

});