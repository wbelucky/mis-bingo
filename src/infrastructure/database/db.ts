import "../../lib/env";
import pg from "pg";
import { SqlHandler, DbError } from "../../interface/sql_handler";
import { ok, err, Result } from "../../domain/result";

export class PgHandler implements SqlHandler {
  private pool: pg.Pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  public async query(text: string, values: unknown[]): Promise<Result<unknown, DbError>> {
    try {
      const res = await this.pool.query(text, values);
      return ok(res);
    } catch (e) {
      // e.code as number;
      return err({ type: "unexpected", message: e });
    }
  }
}
