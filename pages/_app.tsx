// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js 参照

import "semantic-ui-css/semantic.min.css";
import React, { useEffect, createContext, useState } from "react";
import absoluteUrl from "next-absolute-url";
import { AppProps } from "next/app";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Wrapper from "../src/components/Header";
import { User } from "../protcol/user";

export const userInfoContext = createContext<User | undefined>(undefined);

const App = (props: AppProps & { user: User | undefined }) => {
  const router = useRouter();
  console.log(props.user);

  // const handleLogout = useCallback(async () => {
  //   await logout();
  //   setIsLogin(false);
  //   router.reload();
  // }, [router]);

  const { Component, pageProps } = props;
  return (
    <Wrapper>
      <userInfoContext.Provider value={props.user}>
        <Component {...pageProps} />
      </userInfoContext.Provider>
    </Wrapper>
  );
};

App.getInitialProps = async ({ Component, ctx }: { Component: any; ctx: NextPageContext }) => {
  const { origin } = absoluteUrl(ctx.req, "localhost:3000");
  const baseHeaders = {
    Accept: "application/json, */*",
  };
  const headers = ctx.req ? Object.assign({ cookie: ctx.req.headers.cookie }, baseHeaders) : baseHeaders;

  const res = await fetch(`${origin}/api/private/profile`, {
    headers,
    credentials: "include",
    method: "GET",
  });
  console.log(res);
  const isAuthenticated = Math.floor(res.status / 100) === 2;
  const user = isAuthenticated ? ((await res.json()) as User) : undefined;
  console.log(user);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx, user }) : {};
  return { pageProps, user };
};

export default App;
