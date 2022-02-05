import * as mongoose from 'mongoose';
import Album from './album.model';

const Schema = mongoose.Schema;

const albumSchema = new Schema<Album>({   
    wrapperType: { type: String },
    collectionType: { type: String },
    artistId: { type: Number },
    collectionId: { type: Number },
    amgArtistId: { type: Number },
    artistName: { type: String },
    collectionName: { type: String, required: true },
    collectionCensoredName: { type: String },
    artistViewUrl: { type: String },
    collectionViewUrl: { type: String },
    artworkUrl60: { type: String },
    artworkUrl100: { type: String },
    collectionPrice: { type: Number },
    collectionExplicitness: { type: String },
    trackCount: { type: Number },
    copyright: { type: String },
    country: { type: String },
    currency: { type: String },
    releaseDate: { type: String },
    primaryGenreName: { type: String }
}, {
    collection: 'albums'
});

export default mongoose.model<Album>('AlbumSchema', albumSchema);