import { UserInfoNeeded, UserWithAccount, UserWithoutAccount, User } from "../domain/user";
import { UserRepository } from "./user_repository";
import { Result, ok, err } from "../domain/result";

type GetProfileArg = Pick<UserWithAccount, "slackId" | "name" | "picture">;

export class UserInteractor {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async add(u: UserInfoNeeded): Promise<Result<void, any>> {
    const res = await this.userRepository.insert(u);
    if (res.isErr()) {
      return err(res.value);
    }
    return ok(undefined);
  }
  public async getProfile(u: GetProfileArg): Promise<Result<User, any>> {
    const res = await this.userRepository.fineBySlackId(u.slackId);
    if (res.isErr()) {
      // no account => GetProfileArgからの情報をもとに新しいインスタンスを返す
      if (res.value.type === "no-rows-affected") {
        const { name, slackId, picture } = u;
        const ret: UserWithoutAccount = {
          hasAccount: false,
          name,
          slackId,
          picture,
        };
        return ok(ret);
      }
      return err(res.value);
    }
    return ok(res.value);
  }
  public async updateProfile(u: UserInfoNeeded): Promise<Result<void, any>> {
    const res = await this.userRepository.update(u);
    if (res.isErr()) {
      return err(res.value);
    }
    return ok(undefined);
  }
}
