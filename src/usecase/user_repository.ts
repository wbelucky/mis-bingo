import { Result } from "../domain/result";
import { UserInfoNeeded, UserUniqueProp } from "../domain/user";

export type DbError =
  | {
      type: "unexpected";
      message: any;
    }
  | {
      type: "conflict-unique-column";
      column: UserUniqueProp;
    };

export type UserRepositoryError = { type: "unexpected" } | DbError;

export interface UserRepository {
  insert: (u: UserInfoNeeded) => Promise<Result<void, UserRepositoryError>>;
}
