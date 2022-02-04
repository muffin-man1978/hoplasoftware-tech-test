// We don't really know wheter ITunes will ALWAYS return EVERY SINGLE field, therefore, we make them optional for now
// More knowledge of the API would be required, but for the POC this is good enough
export default interface Album {
    wrapperType?: string,
    collectionType?: string,
    artistId?: number,
    collectionId?: number,
    amgArtistId?: number,
    artistName?: string,
    collectionName: string,
    collectionCensoredName?: string,
    artistViewUrl?: string,
    collectionViewUrl?: string,
    artworkUrl60?: string,
    artworkUrl100?: string,
    collectionPrice?: number,
    collectionExplicitness?: string,
    trackCount?: number,
    copyright?: string,
    country?: string,
    currency?: string,
    releaseDate?: Date,
    primaryGenreName?: string    
}