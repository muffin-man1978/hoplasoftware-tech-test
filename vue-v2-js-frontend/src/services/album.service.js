export default class {
    async getAlbumsByArtist() {
        return await fetch("http://localhost:8000/artist/?name=metallica");
    }
}