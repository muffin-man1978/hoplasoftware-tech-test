export default {
    async getAlbumsByName(artistName) {
        const url = `${process.env.VUE_APP_URL_BACKEND}/artist/?name=${artistName}`;        
        const response = await fetch(url);
        const data_r = await response.json();
        return data_r;
    }
};