import React, { useMemo } from "react";
import { StravaAuthButton } from "../components";
import useAuth from "./auth/hooks/useAuth";

export default function Home() {
  const { userData, isStravaConnected } = useAuth();

  return (
    <div>
      <h1>Wiu</h1>
      {isStravaConnected ? <p>{`Welcome ${userData.firstname}!`}</p> : null}

      <StravaAuthButton />
    </div>
  );
}
