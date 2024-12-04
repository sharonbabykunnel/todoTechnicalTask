const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    const errorResponse = {
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            originalError:err.toString()
        })
    }
    res.status(statusCode).json(errorResponse);
}

export default errorHandler;