/*
Agnostic data factory, otherwise we would need to import EVERY SINGLE data origin here, 
and add a humongous switch to the .getDataOrigin() method
*/
import { albumDataOriginsMap } from "../model/album.dataorigin.types";
import { albumDataOriginsKeys } from "../model/album.dataorigin.types";
import { albumDataOriginsTypes } from "../model/album.dataorigin.types";
import { ExtractInstanceType } from "../model/album.dataorigin.types";


export default class AlbumDataOriginFactory {        
    public static getDataOrigin(key:albumDataOriginsKeys) : ExtractInstanceType<albumDataOriginsTypes> {
        return new albumDataOriginsMap[key]();
    }
}

