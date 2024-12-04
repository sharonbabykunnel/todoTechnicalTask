import { validationResult } from "express-validator"
import { ValidationError } from "../utils/errorHandler.js";
import asyncHandler from "./asyncHandler.js";

const validate = asyncHandler((req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new ValidationError(error.array().map(err => err.msg));
    }
    next();
})

export default validate;