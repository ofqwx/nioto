import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div<TFlexProps>`
  height: ${(props) => props.height || "100%"};
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  align-items: ${(props) => props.alignItems || "stretch"};
  justify-content: ${(props) => props.justifyContent || "start"};
  gap: ${(props) => props.gap || "unset"};
`;

type TFlexProps = {
  children: ReactNode;
  direction?: string;
  wrap?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  gap?: string;
  className?: string;
};

export default function Flex({
  children,
  direction,
  wrap,
  alignItems,
  justifyContent,
  height,
  gap,
  className,
}: TFlexProps): JSX.Element {
  return (
    <Wrapper
      direction={direction}
      wrap={wrap}
      alignItems={alignItems}
      justifyContent={justifyContent}
      height={height}
      gap={gap}
      className={className}
    >
      {children}
    </Wrapper>
  );
}
