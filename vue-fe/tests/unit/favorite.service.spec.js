import FavoriteService from "../../src/services/favorite.service";

describe('FavoriteService unite test suite', () => {

    // Mock sessionStorage
    const unmockedSessionStorage = global.sessionStorage;
    const sessionStorageMock = (() => {
        let store = {};

        return {
            getItem(key) {
                return store[key] || null;
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            removeItem(key) {
                delete store[key];
            },
            clear() {
                store = {};
            }
        };
    })();

    beforeEach(() => {
        global.sessionStorage = sessionStorageMock;        
    });

    afterEach(() => {
        global.sessionStorage.clear();
    });

    afterAll(() => {        
        global.sessionStorage = unmockedSessionStorage;
    });

    const mockData = [
        {
            collectionId: 1,
            collectionName: 'Coltrane'
        },
        {
            collectionId: 2,
            collectionName: 'Is'
        },
        {
            collectionId: 3,
            collectionName: 'Great'
        }
    ];


    it('Should add a new favorite correctly', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        expect(FavoriteService.totalFavorites()).toBe(1);
    });

    it('Should not add the same favorite again', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        FavoriteService.addNewFavorite(mockData[0]);
        expect(FavoriteService.totalFavorites()).toBe(1);
    });

    it('Should remove favorites correctly', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        FavoriteService.removeFavorite(mockData[0]);
        expect(FavoriteService.totalFavorites()).toBe(0);
    });

    it('Should return the number of favorites', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        expect(FavoriteService.totalFavorites()).toBe(1);
        FavoriteService.addNewFavorite(mockData[1]);
        expect(FavoriteService.totalFavorites()).toBe(2);
        FavoriteService.addNewFavorite(mockData[2]);
        expect(FavoriteService.totalFavorites()).toBe(3);
        FavoriteService.removeFavorite(mockData[2]);
        expect(FavoriteService.totalFavorites()).toBe(2);
        FavoriteService.removeFavorite(mockData[1]);
        expect(FavoriteService.totalFavorites()).toBe(1);
        FavoriteService.removeFavorite(mockData[0]);
        expect(FavoriteService.totalFavorites()).toBe(0);
    });

    it('Should return the correct list of favorites', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        FavoriteService.addNewFavorite(mockData[1]);
        FavoriteService.addNewFavorite(mockData[2]);
        const favs = FavoriteService.getFavorites();
        expect(favs[2].collectionName).toBe('Great');
    });

    it('Should detect there are favorites', () => {
        FavoriteService.addNewFavorite(mockData[0]);
        expect(FavoriteService.areThereAny()).toBe(true);
    });

    it('Should detect there are no favorites', () => {
        expect(FavoriteService.areThereAny()).toBe(false);        
    });
});