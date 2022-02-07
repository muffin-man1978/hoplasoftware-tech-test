import Album from "./album.model";

// All album dataOrigins must conform to this interface
export default interface AlbumDataOrigin {    
    getByArtist(artistName?:string): Promise<Album[]>
}