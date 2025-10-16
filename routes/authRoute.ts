import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req: Request, res: Response) => {
  res.render("login", {
    error: req.query.error || null
  });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err); 
      }

      /* FIX ME: 😭 failureMsg needed when login fails */
      if (!user) {
        return res.redirect(`/auth/login?error=${encodeURIComponent(info.message)}`);
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.redirect("/dashboard");
      });
    })(req, res, next);

  }
);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login?error=GitHub%20authentication%20failed",
  })
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
