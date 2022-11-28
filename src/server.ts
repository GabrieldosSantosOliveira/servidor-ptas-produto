import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from '../config/configEnv';
import { routerAuth } from './routes/Auth';
import { routerProduct } from './routes/Product';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/products', routerProduct);
app.use('/auth', routerAuth);
app.use('/', (req, res) => {
  res.status(404).json({
    message: 'Not Found'
  });
});
const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
