import { albumDataOriginsKeys } from "./src/model/album.dataorigin.types"

export default {
    port: 8000,
    dev: true,
    // isREST: false,
    dataOrigin: <albumDataOriginsKeys>"rest",
    endpoints: {
        itunes: {
            urlArtist: "https://itunes.apple.com/search?term=[ARTIST_NAME]&entity=album&attribute=composerTerm"
        }
    },
    mongoDB: {
        connectionString: ""
    }
}