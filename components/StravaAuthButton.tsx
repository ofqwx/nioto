export default function StravaAuthButton() {
  const stravaAuthorizeUri = `https://www.strava.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URI}/auth/strava-oauth&response_type=code&scope=activity:read_all,read`;

  return (
    <a href={stravaAuthorizeUri}>
      Connect to Strava
    </a>
  );
}
