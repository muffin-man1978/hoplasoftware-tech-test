// Consume JSON from itunes service
import * as sup_ag from "superagent";
import { IAlbum } from "./IAlbum.interface";

class ITunesService {

    private s_url = "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm";
    
    private sanitizeURL(artist: string): string {        
        return this.s_url.replace('[ARTIST_NAME]', artist);
    }

    private uniqueAlbums(albums:IAlbum[]) : IAlbum[] {
        let res = <IAlbum[]>[];
        let uniq = new Map();
        for(const album of albums) {
            if(!uniq.has(album.collectionName)) {
                uniq.set(album.collectionName, true);
                res.push(album);
            }
        }
        return res.sort((album1, album2) => {
            if(album1.collectionName < album2.collectionName) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    private async requestArtistAlbums(artist:string) : Promise<IAlbum[]> {
        let raw_data = await sup_ag.get(this.sanitizeURL(artist));        
        let json_parsed_data = JSON.parse(raw_data.text);        
        return this.uniqueAlbums(json_parsed_data.results);        
    }

    public async getTestAlbums(): Promise<IAlbum[]> {    
        return this.requestArtistAlbums('coltrane');
    }

    public async getArtistAlbums(artist: string): Promise<IAlbum[]> {
        return this.requestArtistAlbums(artist);
    }
}

export default ITunesService;