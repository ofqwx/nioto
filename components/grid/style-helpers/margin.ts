import { TMargin } from "../types";

export default function marginHelper(margin: TMargin): string {
  if (typeof margin === "string") {
    return `margin: ${margin}`;
  }

  const marginStyle = Object.keys(margin).map(
    (key) => `margin-${key}: ${margin[key]}`
  );

  return marginStyle.join(";");
}
