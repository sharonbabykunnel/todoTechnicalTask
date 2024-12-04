class BaseError extends Error{
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends BaseError{
    constructor(messege) {
        super(message, 400)
    }
}

class AuthenticationError extends BaseError{
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends BaseError{
    constructor(message) {
        super(message, 403)
    }
}
class NotFoundError extends BaseError{
    constructor(message) {
        super(message, 404);
    }
}

class ConflictError extends BaseError{
    constructor(message) {
        super(message, 409);
    }
}
export {
    BaseError,
    NotFoundError,
    AuthenticationError,
    ConflictError,
    ForbiddenError,
    ValidationError
}