import { execSync } from "child_process";
import "../lib/env";
import { validateEnv } from "../lib/util";

const { username, password, hostname, port, pathname } = new URL(validateEnv("DATABASE_URL"));
const dbName = pathname.replace("/", "");

const filePaths = ["users.sql", "apply_keyword.sql"];

filePaths.forEach((fileName) =>
  execSync(
    `PGPASSWORD=${password} psql -f ${__dirname}/${fileName} -U ${username} -p ${port} -h ${hostname} -d ${dbName}`
  )
);
