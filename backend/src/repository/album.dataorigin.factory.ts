/*
Agnostic data factory, otherwise we would need to import EVERY SINGLE data origin here, 
and add a humongous switch to the .getDataOrigin() method
*/
import { albumDataOriginsMap, 
        albumDataOriginsKeys, 
        albumDataOriginsTypes, 
        ExtractInstanceType  } 
from "../model/album.dataorigin.types";

export default class AlbumDataOriginFactory {        
    public static getDataOrigin(key:albumDataOriginsKeys) : ExtractInstanceType<albumDataOriginsTypes> {
        return new albumDataOriginsMap[key]();
    }
}

