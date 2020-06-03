import Router from "express-promise-router";
import { UserWithoutAccount } from "../../domain/user";
import express from "express";
import { UserController } from "../../interface/controllers/user_controller";
import { PgHandler } from "../database/pg_handler";
import { Context } from "../context";

const router = Router();
const sqlHandler = new PgHandler();

const userController = new UserController(sqlHandler);

router.use((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" }).end();
  next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/signup", async (req, res) => {
  await userController.signup(new Context(req, res));
});

router.get("/profile", async (req, res) => {
  await userController.getProfile(new Context(req, res));
});

// TODO: below, if not have account, return.
router.post("/profile", async (req, res) => {
  // TODO: update my bingo card
  await userController.updateProfile(new Context(req, res));
});

router.get("/users", (req, res) => {
  res.send("get users");
  // TODO: don't show me and keywords and content for after getting keywords
});

router.get("/bingo", (req, res) => {
  res.send("get bingo");
  // TODO:
});

router.post("/bingo", (req, res) => {
  res.send("post bingo");
  // TODO:
});

router.post("/challenge", (req, res) => {
  res.send("post challenge");
});

export default router;
