import Album from "../model/album.model";
import AlbumDataOriginFactory from "./album.dataorigin.factory";
import applicationConfig from "../../application.config";

export default class AlbumRepository {
    
    private _dataOrigin;

    public constructor() {        
        this._dataOrigin = AlbumDataOriginFactory.getDataOrigin(applicationConfig.dataOrigin);
    }

    public async getByArtist(artistName: string) : Promise<Album[]> {        
        try {
            return this._dataOrigin.getByArtist(artistName);
        } catch (e) {
            throw e;
        }        
    }

}