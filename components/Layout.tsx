import Head from "next/head";
import React, { ReactNode, Fragment } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.sizes.s5};
`

export default function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <Main>{children}</Main>
    </Fragment>
  );
}