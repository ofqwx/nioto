import React, { ReactElement, useMemo } from "react";
import { StravaAuthButton } from "../components";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { userData, isStravaConnected } = useAuth();

  return (
    <div>
      <h1>Nioto projects</h1>
      {isStravaConnected ? <p>{`Welcome ${userData.firstname}!`}</p> : null}
      <StravaAuthButton />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
