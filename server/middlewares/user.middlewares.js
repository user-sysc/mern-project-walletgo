import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const userRequeried = (req, res, next) => {
  console.log(req.headers);
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, usuario) => {
      if (error) {
        return res.status(401).json({ message: "token invalid" });
      }
      req.usuario = usuario;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
