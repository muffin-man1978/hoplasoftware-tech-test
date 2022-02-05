import { albumDataOriginsMap } from "../model/album.dataorigin.types";
import { albumDataOriginsKeys } from "../model/album.dataorigin.types";
import { albumDataOriginsTypes } from "../model/album.dataorigin.types";
import { ExtractInstanceType } from "../model/album.dataorigin.types";

export default class AlbumDataOriginFactory {        

    public static getDataOrigin(key:albumDataOriginsKeys) : ExtractInstanceType<albumDataOriginsTypes> {
        return new albumDataOriginsMap[key]();
    }

}

/* export default class AlbumDataOrigin {
    public static getDataOrigin(typeDataOrigin:string) : AlbumRESTAPI | AlbumMongoDB {
        switch (typeDataOrigin) {
            case "rest":
                return new AlbumRESTAPI();
                break;

            case "mongo":
                return new AlbumMongoDB();
                break;

            case "mock":
                return new AlbumRESTAPI();
                break;

            default:
                return new AlbumRESTAPI();
                break;

        }
    }
} */