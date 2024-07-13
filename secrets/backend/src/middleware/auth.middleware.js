import jwt from 'jsonwebtoken';

export default function handleAuthSession(req, res, next) {
  let token = req.header('Authorization');
  token = token.replace('Bearer ', '');
  if (!token) return res.status(401).json({message: 'Access Forbidden'});
  try {
    const output = jwt.verify(token,
      'thisisnotthesecretkeyshouldbereplacedinproduction');
    req.userId = output.id;
    next();
  } catch (err) {
    res.status(401).json({message: err.message});
  }
}