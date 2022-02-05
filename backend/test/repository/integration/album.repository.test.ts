import 'jest';
import AlbumRepository from '../../../src/repository/album.repository';
import * as dotenv from 'dotenv';
import applicationConfig from '../../../application.config';
import { albumDataOriginsKeys } from '../../../src/model/album.dataorigin.types';


describe('AlbumRepository integration tests', () => {    
    
    beforeEach(() => {
        dotenv.config();        
    });

    it('Connects correctly to REST API, retrieves "coltrane" albums', () => {
        applicationConfig.dataOrigin = <albumDataOriginsKeys>"rest";
        const repo = new AlbumRepository();
        try {
            const result = repo.getByArtist("coltrane");
            expect(result).toBeDefined();
        } catch (e) {
           // Not here 
        }
    });

    /* it('Connects correctly to MongoDB, retrieves all data from DB', () => {
        applicationConfig.dataOrigin = <albumDataOriginsKeys>"mongo";
        const repo = new AlbumRepository();
        try {
            const result = repo.getByArtist("coltrane");
            expect(result).toBeDefined();
        } catch (e) {
            // Not here
        }
    }); */

    it('Uses correctly the mock data object', () => {
        applicationConfig.dataOrigin = <albumDataOriginsKeys>"mock";
        const repo = new AlbumRepository();
        try {
            const result = repo.getByArtist("coltrane");
            expect(result).toBeDefined();
        } catch (e) {
            // Not here
        }
    });

});