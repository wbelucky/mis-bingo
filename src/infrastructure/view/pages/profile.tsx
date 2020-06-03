import React, { useContext, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { userInfoContext } from "./_app";
import UserConfigForm from "../components/UserConfigForm";
import { useRouter } from "next/router";
import { useFetch } from "../hooks/network";
import { UserWithAccount } from "../../../domain/user";

const Page: NextPage = () => {
  const config = useCallback(
    (body: string): RequestInit => ({
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body,
    }),
    []
  );
  const [submit, status] = useFetch<UserWithAccount, {}>("/api/private/profile", config);
  const router = useRouter();
  const user = useContext(userInfoContext);
  useEffect(() => {
    if (user) return;
    router.push("/login");
  }, [router, user]);
  if (!user) return null;
  return <UserConfigForm user={user} onSubmit={submit} status={status} />;
};

export default Page;
