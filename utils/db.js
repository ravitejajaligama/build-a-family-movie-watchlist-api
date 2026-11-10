import fs from "fs";
import path from "path";
import users from "../data/users.json" with { type: "json" };
const file=path.join(import.meta.dirname,"../data/watchlists.json");
const read=()=>JSON.parse(fs.readFileSync(file,"utf8")); const write=x=>fs.writeFileSync(file,JSON.stringify(x,null,2));
export const findByUsername=u=>users.find(x=>x.username===u)||null; const exists=id=>users.some(x=>x.id===id);
export function getWatchlist(id){return exists(id)?read()[id]||[]:null;}
export function addMovie(id,data){if(!exists(id))return null;const w=read(),l=w[id]||[],m={id:l.length?Math.max(...l.map(x=>x.id))+1:1,title:data.title,genre:data.genre,watched:false};l.push(m);w[id]=l;write(w);return m;}
export function updateMovie(id,movieId,u){if(!exists(id))return null;const w=read(),l=w[id]||[],i=l.findIndex(x=>x.id===movieId);if(i<0)return null;l[i]={...l[i],...u,id:movieId};write(w);return l[i];}
export function deleteMovie(id,movieId){if(!exists(id))return null;const w=read(),l=w[id]||[],i=l.findIndex(x=>x.id===movieId);if(i<0)return null;l.splice(i,1);w[id]=l;write(w);return true;}
