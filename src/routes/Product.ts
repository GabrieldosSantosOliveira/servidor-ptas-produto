import { Router } from 'express';

import { ProductController } from '../controllers/Product';
import { Auth } from '../middleware/Auth';
const routerProduct = Router();

routerProduct.post('/', Auth, ProductController.create);
routerProduct.get('/', ProductController.findAll);
routerProduct.get('/:id', Auth, ProductController.findOne);
routerProduct.put('/:id', Auth, ProductController.update);
routerProduct.delete(
  '/:id',
  Auth,
  ProductController.delete
);
export { routerProduct };
