import React from "react";
import { NextPage } from "next";
import { pool } from "../server/db";

interface Props {
  test: string[];
}

const Page: NextPage<Props> = (props: Props) => {
  return <>{props.test[0]}</>;
};

Page.getInitialProps = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_table");
    const test = (result?.rows as string[]) ?? [];
    client.release();
    return { test };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Page;
