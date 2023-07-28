const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to authenticate the JWT
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  // console.log("Token:", token);

  if (!token) {
    res.status(401).json({ status: false, message: "No token provided" });
    return;
  }
  try {
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const tokenExists = await prisma.userTokens.findUnique({
      where: { token: token },
    });
    if (!tokenExists) {
      res.status(401).json({ status: false, message: "Unauthorized Request" });
      return;
    }
    // req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Invalid token
      res.status(401).json({ status: false, message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      // Token expired
      res.status(401).json({
        status: false,
        message: "Token expired! Please login again to continue.",
      });
    } else {
      // Other errors
      res.status(500).json({ status: false, message: "Error verifying token" });
    }
    return;
  }
}

// validate the permission given to the user

module.exports = authenticateToken;
