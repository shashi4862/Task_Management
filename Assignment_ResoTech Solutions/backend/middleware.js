const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    // Check if the token exists
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    // Verify the token
    JWT.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token." });
      }

      // Attach the decoded user information to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
