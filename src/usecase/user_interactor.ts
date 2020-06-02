import { UserInfoNeeded } from "../domain/user";
import { UserRepository } from "./user_repository";
import { Result, ok, err } from "../domain/result";

export class UserInteractor {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async addUser(u: UserInfoNeeded): Promise<Result<void, any>> {
    const res = await this.userRepository.insert(u);
    if (res.isErr()) {
      return err(res.value);
    }
    return ok(res);
  }
}
