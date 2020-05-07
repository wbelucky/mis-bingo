import React from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import absoluteUrl from "next-absolute-url";

interface Props {
  test: { id: number; name: string }[];
}

const Page: NextPage<Props> = (props: Props) => {
  return <>{props.test[0].name}</>;
};

Page.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req, "localhost:3000");
  const res = await fetch(`${origin}/api/db`);
  const body = (await res.json()) as Props;
  console.log(body);
  return body;
};

export default Page;
