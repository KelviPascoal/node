import { Router, Request, Response } from 'express';
import { create, findAll, findOne } from './controllers/ProductController'
const routes = Router();

routes.post('/products', create)
routes.get('/products', findAll)
routes.get('/products/:name', findOne)



export { routes }