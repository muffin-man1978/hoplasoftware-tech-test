import Album from "../model/album.model";
import AlbumRESTAPI from "./album.restapi";
import AlbumMongoDB from "./album.mongodb";

export default class AlbumRepository {
    
    private _dataOrigin: AlbumRESTAPI | AlbumMongoDB;

    public constructor(dataOriginREST : boolean = true) {
        this._dataOrigin = (dataOriginREST) ? new AlbumRESTAPI() : new AlbumMongoDB();
    }

    public async getByArtist(artistName: string) : Promise<Album[]> {        
        try {
            return this._dataOrigin.getByArtist(artistName);
        } catch (e) {
            throw e;
        }        
    }

}