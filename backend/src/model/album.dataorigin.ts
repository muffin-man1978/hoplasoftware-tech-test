import Album from "./album.model";

export default interface AlbumDataOrigin {
    getByArtist(artistName:string): Promise<Album[]>
}