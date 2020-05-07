// 参考 https://qiita.com/tetsutaroendo/items/31300a5e475688a2f4ec#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E4%BD%9C%E3%82%8B
// 参考 https://qiita.com/ukyoda/items/a043f999132b05b79525
import express from "express";
import next from "next";
import { pool } from "./db";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT ?? 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/db", async (req, res) => {
      try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM test_table");
        const results = { results: result ? result.rows : null };
        console.log("db", results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
