import { createContext, ReactNode } from "react";
import useLocalStorage from "../hooks/use-local-storage";

export type AuthContextValue = {
  stravaToken: string;
  userData: Record<string, unknown>;
  setStravaToken: (newValue: string) => void;
  setUserData: (newValue: Record<string, unknown>) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  stravaToken: "",
  userData: {},
  setStravaToken: () => undefined,
  setUserData: () => undefined,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [stravaToken, setStravaToken] = useLocalStorage<string>("strava-token");
  const [userData, setUserData] =
    useLocalStorage<Record<string, unknown>>("strava-user-data");

  return (
    <AuthContext.Provider
      value={{
        stravaToken,
        userData: userData ?? {},
        setStravaToken,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
