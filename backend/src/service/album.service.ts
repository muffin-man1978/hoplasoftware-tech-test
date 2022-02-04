import Album from "../model/album.model";

export default class AlbumService {

    public getUnique(albums:Album[]) : Album[] {
        let res = <Album[]>[];
        let uniq = new Map();
        for(const album of albums) {
            if(!uniq.has(album.collectionName)) {
                uniq.set(album.collectionName, true);
                res.push(album);
            }
        }
        return res;        
    }

    public sortByName(albums:Album[]) : Album[] {
        return albums.sort((album1, album2) => {
            if(album1.collectionName < album2.collectionName) {
                return -1;
            } else {
                return 0;
            }
        });
    }

}