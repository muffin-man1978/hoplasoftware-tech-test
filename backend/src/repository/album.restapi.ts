import * as superAgent from "superagent";
import AlbumDataOrigin from "../model/album.dataorigin";
import Album from "../model/album.model";
import endpointsConfig from "../../endpoints.config";

export default class AlbumRESTAPI implements AlbumDataOrigin {    

    public async getByArtist(artistName:string): Promise<Album[]> {
        let ret = <Album[]>[];
        try {
            const url = endpointsConfig.itunes.urlArtist.replace('[ARTIST_NAME]', artistName);
            const response = await superAgent.get(url);            
            ret = <Album[]>JSON.parse(response.text).results;
        } catch (e) {
            throw e;
        }
        return ret;
    }

}