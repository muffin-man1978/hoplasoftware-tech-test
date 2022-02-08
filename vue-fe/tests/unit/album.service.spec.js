import AlbumService from "../../src/services/album.service";

describe('Unit test for AlbumService', () => {

    const mockData = [{
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 71822,
        "collectionId": 1443203607,
        "amgArtistId": 65851,
        "artistName": "John Coltrane Quartet",
        "collectionName": "Coltrane (Expanded Edition)",
        "collectionCensoredName": "Coltrane (Expanded Edition)",
        "artistViewUrl": "https://music.apple.com/us/artist/john-coltrane-quartet/71822?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/coltrane-expanded-edition/1443203607?uo=4",
        "artworkUrl60": "https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/bf/46/bb/bf46bbb0-35f9-eb84-741b-73beabf615d5/source/60x60bb.jpg",
        "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/bf/46/bb/bf46bbb0-35f9-eb84-741b-73beabf615d5/source/100x100bb.jpg",
        "collectionPrice": 9.99,
        "collectionExplicitness": "notExplicit",
        "trackCount": 7,
        "copyright": "℗ 1997 UMG Recordings, Inc.",
        "country": "USA",
        "currency": "USD",
        "releaseDate": "1997-01-01T08:00:00Z",
        "primaryGenreName": "Jazz"
    },
    {
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 71822,
        "collectionId": 1443143816,
        "amgArtistId": 65851,
        "artistName": "John Coltrane Quartet",
        "collectionName": "Coltrane",
        "collectionCensoredName": "Coltrane",
        "artistViewUrl": "https://music.apple.com/us/artist/john-coltrane-quartet/71822?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/coltrane/1443143816?uo=4",
        "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/b0/a6/1e/b0a61eed-9706-07a0-cdd7-de73c802cad5/source/60x60bb.jpg",
        "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/b0/a6/1e/b0a61eed-9706-07a0-cdd7-de73c802cad5/source/100x100bb.jpg",
        "collectionPrice": 7.99,
        "collectionExplicitness": "notExplicit",
        "trackCount": 5,
        "copyright": "℗ 2015 The Verve Music Group, a Division of UMG Recordings, Inc.",
        "country": "USA",
        "currency": "USD",
        "releaseDate": "1962-08-01T07:00:00Z",
        "primaryGenreName": "Jazz"
    }];

    // Mock fetch
    const unmockedFetch = global.fetch
    beforeAll(() => {
        global.fetch = () =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
    });    
    afterAll(() => {
        global.fetch = unmockedFetch
    });

    it('Should return from mock fetch', async () => {
        const response = await AlbumService.getAlbumsByName('coltrane');
        expect(response).toBeDefined();
        expect(response.length).toBe(2);
        expect(response[0].collectionId).toBe(1443203607);
    });
});