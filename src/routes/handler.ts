import Router from "express-promise-router";
import { UserWithoutAccount, UserWithAccount } from "../domain/user";
import { pool } from "../db";
import express from "express";
import { addUser } from "../models/user";

export interface ReqUser {
  displayName: string;
  user_id: string;
  picture: string;
}

const router = Router();

router.use((req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" }).end();
  console.log(req.user);
  next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/signup", async (req, res) => {
  const r = await addUser(req.body as Omit<UserWithAccount, "hasAccount">, req.user as ReqUser);
  if (r.isErr()) {
    return res.status(500).json({ message: r.value }).end();
  }
  res.json({}).end();
});

router.get("/profile", (req, res) => {
  const { displayName: name, user_id: slackId, picture } = req.user as ReqUser;
  const ret: UserWithoutAccount = {
    hasAccount: false,
    name,
    slackId,
    picture,
  };
  res.json(ret);
  res.end();
  // TODO: データベースからidを探索それを返す. なかったら, reqについている必要な情報を返す hasAccount: false
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
