import { UserInfoNeeded, UserWithAccount, userPropValidators } from "../../domain/user";
import { UserInteractor } from "../../usecase/user_interactor";
import { SqlHandler } from "../sql_handler";
import { UserRepository } from "../user_repository";
import { Context } from "./context";
import { isObj, TypeValidator } from "../../domain/validate";

export type ReqUser = Pick<UserWithAccount, "picture"> & { user_id: UserWithAccount["slackId"] };
export type ReqBody = Pick<UserWithAccount, "name" | "keyword" | "hint" | "twitterId" | "generation" | "content">;

const getValidator = () => {
  const { name, keyword, hint, twitterId, generation, content, slackId, picture } = userPropValidators;
  return new TypeValidator<{ body: ReqBody; user: ReqUser }>(
    isObj({
      body: isObj<ReqBody>({
        name,
        hint,
        keyword,
        twitterId,
        generation,
        content,
      }),
      user: isObj<ReqUser>({
        user_id: slackId,
        picture,
      }),
    })
  );
};

export class UserController {
  private interactor: UserInteractor;
  constructor(sqlHandler: SqlHandler) {
    this.interactor = new UserInteractor(new UserRepository(sqlHandler));
  }
  public async signup(ctx: Context) {
    // 中でinteractorを呼び出して, レスポンスを返すまでやる. これを渡す
    const v = getValidator();
    if (!v.isOk(ctx.req)) {
      const err = v.getError();
      const errObj = { message: "bad request", detail: err };
      console.error(errObj);
      return ctx.sendJSON(400, errObj);
    }
    const { name, keyword, hint, twitterId, generation, content } = ctx.req.body;
    const { user_id: slackId, picture } = ctx.req.user;
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
    const res = await this.interactor.addUser(u);
    if (res.isOk()) {
      return ctx.sendJSON(200, {});
    }
    return ctx.sendJSON(500, res.value);
  }
}
