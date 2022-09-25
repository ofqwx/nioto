// import original module declarations
import "styled-components";

type SizeKey =
  | "s0"
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9"
  | "s10";

type ColorKey = "bg" | "fg";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    sizes: Partial<Record<SizeKey, string>>;
    colors: Partial<Record<ColorKey, string>>;
  }
}
