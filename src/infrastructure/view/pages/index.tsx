import React from "react";
import { NextPage } from "next";

// interface Props {
//   test: { id: number; name: string }[];
// }

const Page: NextPage<{}> = () => {
  return <>Hello, MISW BINGO</>;
};

// Page.getInitialProps = async ({ req }) => {
//   const { origin } = absoluteUrl(req, "localhost:3000");
//   // const res = await fetch(`${origin}/api/db`);
//   const body = (await res.json()) as Props;
//   console.log(body);
//   return body;
// };

export default Page;
