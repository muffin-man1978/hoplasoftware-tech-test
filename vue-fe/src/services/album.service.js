const host_services = "http://localhost:8000";
export default {
    async getAlbumsByName(artistName) {
        const url = `${host_services}/artist/?name=${artistName}`;
        console.log(url);
        const response = await fetch(url);
        const data_r = await response.json();
        return data_r;
    }
};