export function authorizeModification(req, res, next) {
  const { role, id } = req.user;
  if (role !== "parent" && !(role === "child" && String(id) === req.params.userId)) return res.status(403).json({ error: "Access denied" });
  next();
}
