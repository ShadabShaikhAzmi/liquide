const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
            .status(403)
            .json({ error: true, message: 'Token not found' });
  }
  const tokenArr = token.split(" ");
  if(tokenArr.length < 2){
    return res
            .status(403)
            .json({ error: true, message: 'Sorry token is not valid' });
  }
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  jwt.verify(tokenArr[1], privateKey, (err, tokenDetails) => {
    if (err) {
        return res
            .status(403)
            .json({ error: true, message: 'Invalid token' });
    }else{
        req.user = tokenDetails;
        return next();
    }
  });
};

module.exports = { authorization };