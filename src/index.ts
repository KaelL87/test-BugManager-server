import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: './src/env/.env' });
import express, { Express } from 'express';
import './config/Database';
import router from './routes';

const app: Express = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
