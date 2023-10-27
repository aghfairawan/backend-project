const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt.js');

const authorizationMiddleware = (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
    }

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, JWT_SIGN);
    req.decodedToken = decodedToken; 

    if (decodedToken.role === 'admin') {
     
      return next();
    } else if (decodedToken.role === 'user') {
      
      return next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = authorizationMiddleware;
