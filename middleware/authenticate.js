import { verifyToken } from "../utils/jwt.js";
export function authenticate(req,res,next){const a=req.headers.authorization;if(!a||!a.startsWith("Bearer "))return res.status(401).json({error:"No token provided."});const u=verifyToken(a.slice(7).trim());if(!u)return res.status(401).json({error:"Invalid or expired token."});req.user=u;next();}
