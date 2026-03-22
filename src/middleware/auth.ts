import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/index.js";

export const createJWTMiddleware = (authService: AuthService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "missing authorization header" });
    }

    const bearerPrefix = "Bearer ";
    if (!authHeader.startsWith(bearerPrefix)) {
      return res
        .status(401)
        .json({ error: "invalid authorization header format" });
    }

    const token = authHeader.slice(bearerPrefix.length);
    const claims = authService.validateToken(token);

    if (!claims) {
      return res.status(401).json({ error: "invalid or expired token" });
    }

    (req as any).user = claims.sub;
    next();
  };
};
