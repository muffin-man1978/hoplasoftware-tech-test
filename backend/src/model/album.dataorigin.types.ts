import AlbumRESTAPI from "../repository/album.restapi";
import AlbumMongoDB from "../repository/album.mongodb";
import AlbumMockData from "../repository/album.mock";

export const albumDataOriginsMap = {
    rest: AlbumRESTAPI,
    mongo: AlbumMongoDB,
    mock: AlbumMockData
};

export type albumDataOriginsKeys = keyof typeof albumDataOriginsMap;
export type albumDataOriginsTypes = typeof albumDataOriginsMap[albumDataOriginsKeys];
export type ExtractInstanceType<T> = T extends new () => infer R ? R : never;
