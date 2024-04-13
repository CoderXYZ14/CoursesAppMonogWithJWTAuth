// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  //token would be
  //Bearer uhdsogeigou......
  //we seprate Bearer and token
  const words = token.split(" ");
  const jwtToken = words[1];

  //as token has username in it encoded so extrct tne username from it only
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs",
    });
  }

  //jwt saves one 1db call
  //in previous case username and pass has to hit the db to check whether it is present or not
  //it in memory itsekf checks has the jwt signed by me
}

module.exports = adminMiddleware;
