import { SVGProps } from "react";
import styled from "styled-components";

const Svg = styled.svg.attrs((props: SVGProps<SVGSVGElement>) => ({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  ...props
}))``;

export default Svg;