import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import useAuth from "./hooks/useAuth";

type StravaAuthResponseData = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Record<string, unknown>;
  errors?: Error[];
};

export default function StravaOAuth(): JSX.Element {
  const router = useRouter();
  const { setUserData, setStravaToken } = useAuth();

  useEffect(() => {
    async function exchangeToken() {
      const { code } = router.query;

      if (code !== undefined) {
        const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;

        const stravaAuthResponse = await fetch(
          "https://www.strava.com/oauth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
              grant_type: "authorization_code",
            }),
          }
        );

        const responseData: StravaAuthResponseData =
          await stravaAuthResponse.json();

        if (stravaAuthResponse.ok) {
          setStravaToken(responseData.access_token);
          setUserData(responseData.athlete);

          router.push("/");
        } else {
          const errorMessage = responseData.errors
            ?.map((e) => e.message)
            .join("\n");

          router.push("/error", {
            query: {
              status: stravaAuthResponse.status,
              statusText: stravaAuthResponse.statusText,
              message: errorMessage,
            },
          });
        }
      }
    }

    exchangeToken();
  }, [router]);

  return <p>Redirecting...</p>;
}
