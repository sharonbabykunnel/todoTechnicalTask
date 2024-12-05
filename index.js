import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import db from './backEnd/config/db.config.js';
import debug from 'debug';
import routes from './backEnd/server.js'
const log = debug('app:server');
const app = express();

db();
app.use(rateLimit({ max: 1000, windowMs: 10 * 60 * 1000 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(process.env.ORIGIN)
app.use(cors({ origin: process.env.ORIGIN, credentials: true}));
app.use(logger(`dev`));
app.use(cookieParser())

app.use('/', routes);

app.listen(process.env.PORT || 5000, () => {
    log(`Server is running..`);
})