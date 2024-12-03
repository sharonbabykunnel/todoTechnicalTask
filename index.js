import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import db from './backEnd/config/db.config.js';
import debug from 'debug';

const log = debug('app:server');
const app = express();

db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(logger(`dev`));
app.use(cookieParser())

app.use('/', routes);

app.listen(process.env.PORT || 5000, () => {
    log(`Server is running..`);
})