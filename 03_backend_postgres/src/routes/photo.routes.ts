import { Request, Response, Router } from "express";
import multer from 'multer';
import postPhoto from "../config/postPhoto";
const photoRoutes = Router();

photoRoutes.post('/', multer(postPhoto).single('file'), (request: Request, response: Response) => {
    return response.status(200).json({ok: "photo on"});
});




export {photoRoutes};

// em andamento