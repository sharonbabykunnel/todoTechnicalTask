import express from "express";
import globalErrorHandler from "./middlewares/error.middleware.js";
import { NotFoundError } from "./utils/errorHandler.js";
import auth from './routes/auth.routes.js'; 

const routes = express.Router();

routes.use('/v1/auth', auth);

routes.all('*', (req, res, next) =>
    next(new NotFoundError)
);
routes.use(globalErrorHandler);

export default routes;