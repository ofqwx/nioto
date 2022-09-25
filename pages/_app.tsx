import Layout from "../components/Layout";
import { AppProps } from "next/app";
import AuthProvider from "../components/AuthProvider";
import { createGlobalStyle } from "styled-components";
import React, { Fragment } from "react";
import FontStyles from "../styles/FontStyles";
import ThemeProvider from "../components/theme/ThemeProvider";
import { light, dark } from "../components/theme/theme";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <FontStyles />
      <ThemeProvider themes={{ light,  dark }}>
        <GlobalStyle />
        <Layout>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Layout>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
