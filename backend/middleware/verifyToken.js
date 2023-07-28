import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ msg: 'no auth' });
    console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      console.log({token})
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json('token mismatch');
        console.log({data});
        req.user = data;
        next();
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
