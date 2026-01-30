export function requireRole(...roles: ("STUDENT" | "TUTOR" | "ADMIN")[]) {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ message: "unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
