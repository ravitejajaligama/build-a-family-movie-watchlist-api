import { verifyToken } from "../utils/jwt.js";
export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) return res.status(401).json({ error: "No token provided." });
  const user = verifyToken(authorization.slice(7).trim());
  if (!user) return res.status(401).json({ error: "Invalid or expired token." });
  req.user = user;
  next();
}
