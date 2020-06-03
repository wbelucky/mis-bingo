import { Result } from "../domain/result";
import { UserInfoNeeded, UserUniqueProp, User, UserWithAccount } from "../domain/user";

export type DbError =
  | {
      type: "unexpected";
      message: any;
    }
  | {
      type: "conflict-unique-column";
      column: UserUniqueProp;
    };

export type UserRepositoryError = { type: "unexpected" } | DbError | { type: "no-rows-affected" };

export interface UserRepository {
  insert: (u: UserInfoNeeded) => Promise<Result<void, UserRepositoryError>>;
  fineBySlackId: (slackId: User["slackId"]) => Promise<Result<UserWithAccount, UserRepositoryError>>;
}
