import asyncHandler from "./asyncHandler.js";
import JWT from 'jsonwebtoken'

const checkAccessToken = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Unauthorized", success: false });

    const token = authHeader.split(" ")[1];
    try {
      const user = JWT.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (verifyError) {
      if (verifyError.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired",
          success: false,
          tokenExpired: true,
        });
      }

      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  } catch (error) {
    next(error);
  }
});


export default checkAccessToken