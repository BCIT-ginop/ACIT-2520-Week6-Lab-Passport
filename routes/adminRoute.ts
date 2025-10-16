import express, { Request, Response } from "express";
import { ensureAdmin } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", ensureAdmin, (req: Request, res: Response) => {
  const sessionStore = (req as any).sessionStore;
  sessionStore.all( (err: any, sessions: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching sessions.");
    }
    const sessionData = Object.keys(sessions || {} ).map((sid) => {
      const session = sessions[sid];
      return {
        sessionId: sid,
        userId: session.passport?.user || null,
      };
    });
    res.render("admin", {
      sessions: sessionData,
      user: req.user,
    });
  });
});

router.post("/revoke/:sessionId", ensureAdmin,
  (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const sessionStore = (req as any).sessionStore;
    sessionStore.destroy(sessionId, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error revoking session.");
      }
      res.redirect("/admin");
    });
  }
);

export default router;