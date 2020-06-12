// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js 参照

import "semantic-ui-css/semantic.min.css";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { AppProps } from "next/app";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Wrapper from "../components/Header";
import { User } from "../../../domain/user";

export const userInfoContext = createContext<User | undefined>(undefined);

const App = (props: AppProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        const res = await fetch(`${origin}/api/private/profile`, {
          headers: {
            Accept: "application/json, */*",
          },
          credentials: "include",
          method: "GET",
        });
        const isAuthenticated = Math.floor(res.status / 100) === 2;
        const u = isAuthenticated ? ((await res.json()) as User) : undefined;
        if (!u) {
          router.push("/login");
          return;
        }
        setUser(u);
        return;
      }
      if (user && !user.hasAccount && router.pathname !== "/signup") {
        router.push("/signup");
      }
    };
    getProfile();
  }, [router, user]);
  const handleLogout = useCallback(async () => {
    setUser(undefined);
    router.push("/logout");
  }, [router]);

  const { Component, pageProps } = props;
  return (
    <userInfoContext.Provider value={user}>
      <Wrapper handleLogout={handleLogout}>
        <Component {...pageProps} />
      </Wrapper>
    </userInfoContext.Provider>
  );
};

// TODO: konoshori ha browsergawadeyarasetahougayosasou
App.getInitialProps = async ({ Component, ctx }: { Component: any; ctx: NextPageContext }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default App;
