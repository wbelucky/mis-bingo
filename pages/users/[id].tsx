import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Page: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  return <>user{id}</>;
};

export default Page;
