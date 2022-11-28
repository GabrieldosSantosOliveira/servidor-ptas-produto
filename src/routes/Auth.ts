import { Router } from 'express';

import { Auth } from '../controllers/Auth';
const routerAuth = Router();
routerAuth.post('/create', Auth.create);
routerAuth.post('/login', Auth.login);
routerAuth.post('/refreshToken', Auth.refreshToken);

export { routerAuth };
