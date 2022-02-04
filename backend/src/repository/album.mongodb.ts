import * as superAgent from "superagent";
import AlbumDataOrigin from "../model/album.dataorigin";
import Album from "../model/album.model";

// @TODO: Put somewhere else?
enum urlOperations {
    GET_BY_ARTIST = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm"
}

export default class AlbumMongoDB implements AlbumDataOrigin {    

    public async getByArtist(artistName:string): Promise<Album[]> {
        let ret = <Album[]>[];
        try {
            const url = urlOperations.GET_BY_ARTIST.replace('[ARTIST_NAME]', artistName);            
            const response = await superAgent.get(url);
            ret = <Album[]>JSON.parse(response.text);
        } catch (e) {
            throw e;        // Catch in repository class, pass to controller
        }
        return ret;
    }

}