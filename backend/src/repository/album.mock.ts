import AlbumDataOrigin from "../model/album.dataorigin";
import Album from "../model/album.model";

const mockDataAlbums = <Album[]>[
    {
        "_id": "61fd4de8bf1d9434a3c6915d",
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 250000383,
        "collectionId": 250000378,
        "amgArtistId": 320653,
        "artistName": "Aggravated",
        "collectionName": "Accept",
        "collectionCensoredName": "Accept",
        "artistViewUrl": "https://music.apple.com/us/artist/aggravated/250000383?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/accept/250000378?uo=4",
        "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music/v4/4b/70/9c/4b709c0c-0b24-e2eb-323a-58c2a0256f13/source/60x60bb.jpg",
        "artworkUrl100": "https://is3-ssl.mzstatic.com/image/thumb/Music/v4/4b/70/9c/4b709c0c-0b24-e2eb-323a-58c2a0256f13/source/100x100bb.jpg",
        "collectionPrice": 9.99,
        "collectionExplicitness": "notExplicit",
        "trackCount": 11,
        "copyright": "℗ 2007 HTX RECORDS",
        "country": "USA",
        "currency": "USD",
        "releaseDate": undefined,
        "primaryGenreName": "Hip-Hop/Rap"
    },
    {
        "_id": "61fd4de8bf1d9434a3c6915e",
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 545085,
        "collectionId": 950982462,
        "amgArtistId": 3498,
        "artistName": "Accept",
        "collectionName": "Accept All Areas - Worldwide (Live)",
        "collectionCensoredName": "Accept All Areas - Worldwide (Live)",
        "artistViewUrl": "https://music.apple.com/us/artist/accept/545085?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/accept-all-areas-worldwide-live/950982462?uo=4",
        "artworkUrl60": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/3a/a0/5d/3aa05df8-c01d-3f8a-6c7c-d82ebceaec9b/source/60x60bb.jpg",
        "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/3a/a0/5d/3aa05df8-c01d-3f8a-6c7c-d82ebceaec9b/source/100x100bb.jpg",
        "collectionPrice": -1,
        "collectionExplicitness": "notExplicit",
        "trackCount": 20,
        "copyright": "℗ 1997 Gun",
        "country": "USA",
        "currency": "USD",
        "releaseDate": undefined,
        "primaryGenreName": "Hard Rock"
    }
];


export default class AlbumMockData implements AlbumDataOrigin {
    getByArtist(artistName?: string): Promise<Album[]> {
        return new Promise<Album[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(mockDataAlbums);
            }, 1)
        });
    }
}
