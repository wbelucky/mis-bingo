import React, { useContext, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { userInfoContext } from "./_app";
import UserConfigForm from "../components/UserConfigForm";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const user = useContext(userInfoContext);
  useEffect(() => {
    if (user) return;
    router.push("/login");
  }, [router, user]);
  if (!user) return null;
  return <UserConfigForm user={user} />;
};

// Page.getInitialProps = async ({ user }: NextPageContext & { user: User | undefined }) => {
//   if (!user) {
//     Router.push("/login");
//     return {};
//   }
//   return {};
// };

export default Page;
