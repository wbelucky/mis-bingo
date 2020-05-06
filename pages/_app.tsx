// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js 参照

import "semantic-ui-css/semantic.min.css";
import React, { useEffect, createContext, useState } from "react";
import { AppProps } from "next/app";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Wrapper from "../src/components/Header";

export const loginContext = createContext(false);

const App = (props: AppProps) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  // useEffect(() => {
  //   // TODO: ここのpathによる分岐をなんとかしたい.
  //   switch (router.pathname) {
  //     case "/signup":
  //       return;
  //     case "/signup/form":
  //       return;
  //     case "/login":
  //       return;
  //     case "/callback":
  //       return;
  //     case "/verify_email":
  //       return;
  //     default: {
  // let unmounted = false;
  // if (!isLogin) {
  //   (async () => {
  //     const isLoginResult = await checkLoggingIn();
  //     if (!isLoginResult && !unmounted) {
  //       await router.push("/login");
  //     } else {
  //       setIsLogin(true);
  //     }
  //   })().catch((err) => {
  //     throw err;
  //   });
  // }
  // return () => {
  //   unmounted = true;
  // };
  //     }
  //   }
  // }, [isLogin, router]);
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // });

  // const handleLogout = useCallback(async () => {
  //   await logout();
  //   setIsLogin(false);
  //   router.reload();
  // }, [router]);

  const { Component, pageProps } = props;
  return (
    <Wrapper>
      <loginContext.Provider value={isLogin}>
        <Component {...pageProps} />
      </loginContext.Provider>
    </Wrapper>
  );
};

App.getInitialProps = async ({ Component, ctx }: { Component: any; ctx: NextPageContext }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {};
  return { pageProps };
};

export default App;
