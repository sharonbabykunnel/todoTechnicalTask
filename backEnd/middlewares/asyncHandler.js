const asyncHandler = async (fun) => {
    return (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch(next);
    }
}

export default asyncHandler;