import jwt from 'jsonwebtoken';

const ACCESS_TOKEN = {
  secret: process.env.ACCESS_TOKEN_SECRET,
};

export default function handleAuthSession(req, res, next) {
  let token = req.header('Authorization');
  token = token.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Forbidden' });
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
