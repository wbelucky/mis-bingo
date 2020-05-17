import Router from "express-promise-router";

const router = Router();

router.use((req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/login");
  // can use req.user
  next();
});

router.post("/signup", (req, res) => {
  res.send("signup");
  // TODO:
});

router.get("/profile", (req, res) => {
  res.send("profile");
  // TODO:
});

router.post("/profile", (req, res) => {
  res.send("post profile");
  // TODO:
});

router.get("/bingo", (req, res) => {
  res.send("get bingo");
  // TODO:
});

router.post("/bingo", (req, res) => {
  res.send("post bingo");
  // TODO:
});

router.get("/users", (req, res) => {
  res.send("get users");
  // TODO:
});

router.post("/challenge", (req, res) => {
  res.send("post challenge");
});

export default router;
