// Define routes
import { Router, Request, Response } from 'express';
import ITunesService  from "./itunes.service";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ server_running: 1 });
});

router.get('/masterful', (req:Request, res:Response) => (async() => {
    let itunes = new ITunesService();
    let coltrane_albums = await itunes.getTestAlbums();    
    res.status(200).json(coltrane_albums);
})());

router.get('/artist_albums/:artist_name', (req:Request, res:Response) => (async() => {
    let itunes = new ITunesService();    
    let artist_name = <string>req.params.artist_name.trim();
    if(artist_name.length === 0) {
        res.status(200).json({ "error": true, "message": "Invalid artisT name" });
    }
    else {
        let albums = await itunes.getArtistAlbums(artist_name);
        res.status(200).json(albums);    
    }
})());

export default router;