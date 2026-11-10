import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";
const r=express.Router(); r.use(authenticate);
r.get("/:userId",(q,s)=>{const x=getWatchlist(Number(q.params.userId)); if(x===null)return s.status(404).json({error:"User not found"}); s.json(x);});
r.post("/:userId/movies",authorizeModification,(q,s)=>{const x=addMovie(Number(q.params.userId),q.body); if(!x)return s.status(404).json({error:"User not found"}); s.status(201).json(x);});
r.put("/:userId/movies/:movieId",authorizeModification,(q,s)=>{const x=updateMovie(Number(q.params.userId),Number(q.params.movieId),q.body); if(!x)return s.status(404).json({error:"Movie not found"}); s.json(x);});
r.delete("/:userId/movies/:movieId",authorizeModification,(q,s)=>{const x=deleteMovie(Number(q.params.userId),Number(q.params.movieId)); if(!x)return s.status(404).json({error:"Movie not found"}); s.json({message:"Movie deleted successfully"});}); export default r;
