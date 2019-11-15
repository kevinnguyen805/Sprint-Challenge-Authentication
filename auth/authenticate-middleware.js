/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // res.status(401).json({ you: 'shall not pass!' });
  const token = req.headers.authorization

  if(token){
      const secret = process.env.JWT_SECRET || 'willy wonka'

      jwt.verify(token, secret, (error, decodedToken) => {
        if(error){
          res.status(401).json({message: "Please provide a valid token"})
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
  } else {
    res.status(401).json({Message: "Restricted endpoint. Please provide valid credentials"})
  }
};
