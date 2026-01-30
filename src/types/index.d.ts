import "express";
import "better-auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: "STUDENT" | "TUTOR" | "ADMIN";
        isBanned: boolean;
      };
      session?: any;
    }
  }
}

declare module "better-auth" {
  interface User {
    role: "STUDENT" | "TUTOR" | "ADMIN";
    isBanned: boolean;
  }
}

export {};
