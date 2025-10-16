import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}

//admin checker
export const ensureAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
      const user = req.user as User
      if (user.role === 'admin') {
        return next();
      }
    }
    res.status(403).send("Admins only.")
};