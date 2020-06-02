import { Result } from "../domain/result";

export type DbError = {
  type: "unexpected";
  message: any;
};

export interface SqlHandler {
  query: (text: string, args: unknown[]) => Promise<Result<unknown, DbError>>;
}
