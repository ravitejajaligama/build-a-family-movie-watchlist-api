import jwt from "jsonwebtoken";
const secret = () => process.env.JWT_SECRET || "some_long_jwt_secret_key";
export function signToken(payload) { return jwt.sign(payload, secret(), { expiresIn: "1d" }); }
export function verifyToken(token) { try { return jwt.verify(token, secret()); } catch { return null; } }
