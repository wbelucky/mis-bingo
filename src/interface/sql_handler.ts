import { Result } from "../domain/result";
import { UserWithAccount } from "../domain/user";

export type DbError =
  | {
      type: "unexpected";
      message: any;
    }
  | {
      type: "conflict-unique-column";
      column: Pick<UserWithAccount, "id" | "slackId" | "name">;
    };

export interface SqlHandler {
  query: (text: string, args: unknown[]) => Promise<Result<unknown, DbError>>;
}
