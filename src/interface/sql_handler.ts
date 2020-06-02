import { Result } from "../domain/result";
import { DbError } from "../usecase/user_repository";

export interface SqlHandler {
  query: (text: string, args: unknown[]) => Promise<Result<unknown, DbError>>;
}
