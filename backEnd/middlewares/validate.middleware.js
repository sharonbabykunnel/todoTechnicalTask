import { validationResult } from "express-validator"
import { ValidationError } from "../utils/errorHandler.js";
import asyncHandler from "./asyncHandler.js";

const validate = asyncHandler((req, res, next) => {
    console.log('here')
    const error = validationResult(req);
    console.log('here',error)
    if (!error.isEmpty()) {
        throw new ValidationError(error.array().map(err => err.msg));
    }
    next();
})

export default validate;