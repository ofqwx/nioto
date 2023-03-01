import Layout from "../components/Layout";
import { AppProps } from "next/app";
import AuthProvider from "../components/AuthProvider";
import { createGlobalStyle } from "styled-components";
import React, { Fragment, ReactElement, ReactNode } from "react";
import FontStyles from "../styles/FontStyles";
import ThemeProvider from "../components/theme/ThemeProvider";
import { light, dark } from "../components/theme/theme";
import { NextPage } from "next";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: system-ui;
    font-weight: 500;
    background-color: ${(props) => props.theme.colors.bg};
    transition: background-color .3s;
    color: ${(props) => props.theme.colors.fg};
    font-size: ${(props) => props.theme.sizes.s5} 
  }
  
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Fragment>
      <FontStyles />
      <ThemeProvider themes={{ light, dark }}>
        <GlobalStyle />
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
