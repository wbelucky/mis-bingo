import { Result, ok, err } from "../domain/result";
import { SqlHandler } from "./sql_handler";
import { UserRepository as UserRepositoryUseCase, UserRepositoryError } from "../usecase/user_repository";
import { UserInfoNeeded } from "../domain/user";

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
}

// export const existsSlackId = async (slackId: string): Promise<Result<any, any>> => {
//   const query = {
//     text: "SELECT EXISTS (SELECT * FROM users WHERE slack_id = $1)",
//     values: [slackId],
//   };
//   try {
//     const res = await pool.query(query);
//     return ok(res);

//     // TODO:
//   } catch (e) {
//     return err(e);
//   }
// };
