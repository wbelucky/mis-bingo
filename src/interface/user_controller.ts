import { UserInfoNeeded, UserWithAccount } from "../domain/user";
import { Result } from "../domain/result";
import { UserInteractor } from "../usecase/user_interactor";
import { ReqUser } from "../infrastructure/routes/handler";
import { SqlHandler } from "./sql_handler";
import { UserRepository } from "./user_repository";

export class UserController {
  private interactor: UserInteractor;
  constructor(sqlHandler: SqlHandler) {
    this.interactor = new UserInteractor(new UserRepository(sqlHandler));
  }
  public async signup(reqBody: Omit<UserWithAccount, "hasAccount">, reqUser: ReqUser) {
    // 中でinteractorを呼び出して, レスポンスを返すまでやる. これを渡す
    // TODO: validate
    const { name, keyword, hint, twitterId, generation, content } = reqBody;
    const { user_id: slackId, picture } = reqUser;
    const u: UserInfoNeeded = {
      name,
      keyword,
      hint,
      twitterId,
      generation,
      content,
      slackId,
      picture,
    };
    this.interactor.addUser(u);
  }
}
