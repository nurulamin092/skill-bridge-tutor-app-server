import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await betterAuth.api.getSession({
      headers: {
        cookie: req.headers.cookie ?? "",
      },
    });
    if (!session) {
      return res.status(401).json({ message: "unauthorized" });
    }
    if (session.user.isBanned) {
      return res.status(403).json({ message: "User is banned" });
    }
    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role as "STUDENT" | "TUTOR" | "ADMIN",
      isBanned: session.user.isBanned,
    };
    req.session = session.session;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid session" });
  }
}
