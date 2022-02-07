import 'jest';
import AlbumMockData from '../../../src/repository/album.mock';

describe('AlbumMock unit test suite', () => {

    it('Should return correct mock data', async () => {
        const myMock = new AlbumMockData();
        const dataMock = await myMock.getByArtist();
        expect(dataMock).not.toBe(null);
        expect(dataMock.length).toBe(2);        
    });

});