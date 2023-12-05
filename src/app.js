import express from 'express';
import { router } from './routes/index.js';

const app = express();

//middlewares: elementos json y url-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/api/v1', router)


export default app;