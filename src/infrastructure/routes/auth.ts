import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate(
    "auth0",
    {
      scope: "openid email profile",
    },
    (req, res) => res.redirect("/")
  )
);

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env as Record<string, string>;
  res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});

export default router;
