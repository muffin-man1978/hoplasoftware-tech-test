import 'jest';
import AlbumService from '../../../src/service/album.service';
import Album from '../../../src/model/album.model';

describe ('AlbumService unite test suite', () => {
    it('Should get only uniques', () => {

        const mockSame = <Album[]>[
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 626204707,
                "artistName": "Beyoncé",
                "collectionName": "4 (Expanded Edition)",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            },
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 626204707,
                "artistName": "Beyoncé",
                "collectionName": "4 (Expanded Edition)",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            },
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 626204707,
                "artistName": "Beyoncé",
                "collectionName": "4 (Expanded Edition)",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            }
        ];

        const myService = new AlbumService();
        const uniques = myService.getUnique(mockSame);
        expect(uniques.length).toBe(1);
    });

    it('Should order by name', () => {

        const mockToOrder = <Album[]>[
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 2,
                "artistName": "Beyoncé",
                "collectionName": "ABC",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            },
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 3,
                "artistName": "Beyoncé",
                "collectionName": "BCE",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            },
            {
                "wrapperType": "collection",
                "collectionType": "Album",
                "artistId": 1419227,
                "collectionId": 1,
                "artistName": "Beyoncé",
                "collectionName": "AAA",
                "collectionCensoredName": "4 (Expanded Edition)",
                "artistViewUrl": "https://music.apple.com/us/artist/beyonc%C3%A9/1419227?uo=4",
                "collectionViewUrl": "https://music.apple.com/us/album/4-expanded-edition/626204707?uo=4",
                "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/60x60bb.jpg",
                "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/85/3f/6c/853f6cc1-fb21-2fc4-2668-160c29c79b32/source/100x100bb.jpg",
                "collectionPrice": 11.99,
                "collectionExplicitness": "notExplicit",
                "trackCount": 14,
                "copyright": "℗ 2011, 2012 Columbia Records, a Division of Sony Music Entertainment",
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2013-03-29T07:00:00Z",
                "primaryGenreName": "Pop"
            }
        ];

        const myService = new AlbumService();
        const ordered = myService.sortByName(mockToOrder);
        expect(ordered[0].collectionId).toBe(1);
    });
});