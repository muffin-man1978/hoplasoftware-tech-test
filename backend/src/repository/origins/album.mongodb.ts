import AlbumDataOrigin from "../../model/album.dataorigin";
import Album from "../../model/album.model";
import AlbumSchema from "../../model/album.schema";

export default class AlbumMongoDB implements AlbumDataOrigin {

    public async getByArtist(): Promise<Album[]> {
        const ret = await AlbumSchema.find({});
        return ret;
    }

}