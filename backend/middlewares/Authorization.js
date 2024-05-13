const admin = require("../config/firebaseConfig");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      req.user = decodedToken;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
