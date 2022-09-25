import { useContext } from "react";
import { AuthContext } from "../../../components/AuthProvider";

export default function useAuth() {
  const authObject = useContext(AuthContext);

  return { ...authObject, isStravaConnected: Boolean(authObject.stravaToken) };
}
