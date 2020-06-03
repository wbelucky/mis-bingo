import { Result, ok, err } from "../domain/result";
import { SqlHandler } from "./sql_handler";
import { UserRepository as UserRepositoryUseCase, UserRepositoryError } from "../usecase/user_repository";
import { UserInfoNeeded, UserWithAccount, userValidator } from "../domain/user";

type DbUser = Omit<UserWithAccount, "slackId" | "twitterId" | "createdAt"> & {
  slack_id: UserWithAccount["slackId"];
  twitter_id: UserWithAccount["twitterId"];
  created_at: UserWithAccount["createdAt"];
};
// DBの抽象化
export class UserRepository implements UserRepositoryUseCase {
  private sqlHandler: SqlHandler;
  constructor(sqlHandler: SqlHandler) {
    this.sqlHandler = sqlHandler;
  }
  public async insert(user: UserInfoNeeded): Promise<Result<void, UserRepositoryError>> {
    const { name, keyword, hint, twitterId, generation, content, slackId, picture } = user;
    const sql =
      "INSERT INTO users ( name, keyword, hint, twitter_id, generation, content, slack_id, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [name, keyword, hint, twitterId, generation, content, slackId, picture];
    const res = await this.sqlHandler.query(sql, values);
    if (res.isErr()) {
      return err(res.value);
    }
    console.log(res.value);
    return ok(undefined);
  }
  public async fineBySlackId(slackId: string): Promise<Result<UserWithAccount, UserRepositoryError>> {
    const sql = "SELECT * FROM users WHERE slack_id = $1";
    const values = [slackId];
    const res = await this.sqlHandler.query(sql, values);
    console.log(res);
    if (res.isErr()) {
      return err(res.value);
    }
    if (res.value.rows.length === 0) {
      return err({ type: "no-rows-affected" });
    }
    // if (res.value.rows.length >= 2) {
    //   return err({ type: "several-rows-affected" });
    // }
    const { id, name, keyword, hint, twitter_id: twitterId, generation, content, picture, created_at: createdAt } = res
      .value.rows[0] as DbUser;

    const u: UserWithAccount = {
      hasAccount: true,
      id,
      name,
      keyword,
      hint,
      twitterId,
      generation,
      content,
      picture,
      slackId,
      createdAt,
    };
    const v = userValidator;
    if (!v.isOk(u)) {
      return err({ type: "unexpected", message: v.getErrorString() });
    }
    return ok(u);
  }
}
