import * as superAgent from "superagent";
import AlbumDataOrigin from "../../model/album.dataorigin";
import Album from "../../model/album.model";
import applicationConfig from "../../../application.config";

export default class AlbumRESTAPI implements AlbumDataOrigin {    

    public async getByArtist(artistName:string): Promise<Album[]> {
        let ret = <Album[]>[];
        try {
            const url = applicationConfig.endpoints.itunes.urlArtist.replace('[ARTIST_NAME]', artistName);
            const response = await superAgent.get(url);            
            ret = <Album[]>JSON.parse(response.text).results;
        } catch (e) {
            throw e;
        }
        return ret;
    }

}