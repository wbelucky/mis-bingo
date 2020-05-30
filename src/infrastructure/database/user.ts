import { UserWithAccount } from "../../domain/user";
import { ReqUser } from "../routes/handler";
import { pool } from "./db";
import Express from "express";
import { Result, ok, err } from "../../domain/result";

export const existsSlackId = async (slackId: string): Promise<Result<any, any>> => {
  const query = {
    text: "SELECT EXISTS (SELECT * FROM users WHERE slack_id = $1)",
    values: [slackId],
  };
  try {
    const res = await pool.query(query);
    return ok(res);

    // TODO:
  } catch (e) {
    return err(e);
  }
};

export const addUser = async (
  reqBody: Omit<UserWithAccount, "hasAccount">,
  reqUser: ReqUser
): Promise<Result<void, Error>> => {
  const { name, keyword, hint, twitterId, generation, content } = reqBody;
  const { user_id: slackId, picture } = reqUser;

  const query = {
    text:
      "INSERT INTO users ( name, keyword, hint, twitter_id, generation, content, slack_id, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    values: [name, keyword, hint, twitterId, generation, content, slackId, picture],
  };

  try {
    const dbResult = await pool.query(query);
    console.log(dbResult);
    return ok(undefined);
  } catch (e) {
    console.error(e);
    return err(new Error(e));
  }
};
