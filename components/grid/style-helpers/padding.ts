import { TPadding } from "../types";

export default function paddingHelper(padding: TPadding): string {
  if (typeof padding === "string") {
    return `padding: ${padding}`;
  }

  const paddingStyle = Object.keys(padding).map(
    (key) => `padding-${key}: ${padding[key]}`
  );

  return paddingStyle.join(";");
}
