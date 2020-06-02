import { Result } from "../domain/result";
import { UserInfoNeeded } from "../domain/user";

type UserRepositoryError = { type: "unexpected" };

export interface UserRepository {
  insert: (u: UserInfoNeeded) => Promise<Result<void, UserRepositoryError>>;
}
