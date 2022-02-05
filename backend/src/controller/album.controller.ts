import AlbumRepository from "../repository/album.repository";
import AlbumService from "../service/album.service";
import { Router, Request, Response } from 'express';
import applicationConfig from "../../application.config";

const router = Router();

interface artistName {
    name: string
}

router.get('/artist', (req:Request<{}, {}, {}, artistName>, res:Response) => (async() => {
    const artistName = req.query.name;

    if(artistName.length === 0) {
        return res.status(204);
    }

    const repo = new AlbumRepository();
    const service = new AlbumService();

    try {
        const albums = await repo.getByArtist(artistName);
        const returned = service.sortByName(service.getUnique(albums));
        return res.status(200).json(returned);
    } catch(e) {
        return res.status(500).json({ error: true, message: e });
    }


})());

export default router;