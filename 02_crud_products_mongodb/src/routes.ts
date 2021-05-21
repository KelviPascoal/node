import { Router, Request, Response } from 'express';
import { create, findAll, findOne, deleteForName, update } from './controllers/ProductController'
const routes = Router();

routes.post('/products', create);
routes.get('/products', findAll);
routes.get('/products/:name', findOne);
routes.delete('/products/:name', deleteForName);
routes.put('/products/:id', update);

export { routes }