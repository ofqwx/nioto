import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import {
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

type ThemeProviderValue = {
  theme: DefaultTheme;
  switchTheme: () => void;
  selectedTheme: string;
};

const ThemeContext = createContext<ThemeProviderValue>({
  theme: { sizes: {}, colors: {} },
  switchTheme: () => undefined,
  selectedTheme: "",
});

type Themes = Record<string, DefaultTheme>;

type ThemeProviderProps = {
  themes: Themes;
  children: ReactNode;
};

type ThemeKey = keyof Themes;

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  themes,
  children,
}: ThemeProviderProps) {
  const [defaultTheme] = Object.keys(themes);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(defaultTheme);

  const switchTheme = useCallback(() => {
    if (selectedTheme === "light") {
      setSelectedTheme("dark");
      return;
    }

    setSelectedTheme("light");
  }, [selectedTheme, setSelectedTheme]);

  useEffect(() => {
    const darkModeQuery =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    const prefersDark = darkModeQuery.matches;

    if (prefersDark) {
      setSelectedTheme("dark");
    }

    darkModeQuery.addEventListener("change", (event) => {
      setSelectedTheme(event.matches ? "dark" : "light");
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: themes[selectedTheme], selectedTheme, switchTheme }}
    >
      <StyledComponentsThemeProvider theme={themes[selectedTheme]}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}
