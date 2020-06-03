import "../../lib/env";
import pg from "pg";
import { SqlHandler, DbResult } from "../../interface/sql_handler";
import { ok, err, Result } from "../../domain/result";
import { DbError } from "../../usecase/user_repository";

export class PgHandler implements SqlHandler {
  private pool: pg.Pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  public async query(text: string, values: unknown[]): Promise<Result<DbResult, DbError>> {
    try {
      const res = await this.pool.query(text, values);
      console.log("pg");
      console.log(res);
      return ok(res);
    } catch (e) {
      // e.code as number;
      // e.detail
      // e.table ... テーブル名
      const code = e.code as string;
      const detail = e.detail as string;
      if (code === "23505") {
        // 23505: ユニークなキーがすでに存在
        const res = detail.match(/\((.+)\)=\((.+)\)/);
        if (!res || res.length <= 1) {
          return err({ type: "unexpected", message: "unexpected psql message" });
        }
        const c = res[1];
        if (c !== "id" && c !== "slackId" && c !== "name") {
          return err({ type: "unexpected", message: "unexpected conflict column" });
        }
        return err({ type: "conflict-unique-column", column: c });
      }
      return err({ type: "unexpected", message: e });
    }
  }
}
