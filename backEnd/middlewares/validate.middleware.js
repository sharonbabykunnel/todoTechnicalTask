import { validationResult } from "express-validator"

const validate = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ success: false, error: error.array().map(err => ({ faild: err.path, message: err.msg })) });
    }
    next();
}

export default validate;