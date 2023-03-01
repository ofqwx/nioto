import styled from "styled-components";

export const Table = styled.table`
  margin: 0 auto;
  clear: both;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid;
  border-bottom: unset;
`;

export const THead = styled.thead``;

export const TRow = styled.tr``;

export const THeader = styled.th`
  text-align: left;
  border-bottom: 1px solid;
  font-size: ${(props) => props.theme.sizes.s4};
  padding: ${(props) => props.theme.sizes.s4};
`;

export const TBody = styled.tbody``;

export const TCell = styled.td`
  border-bottom: 1px solid;
  font-size: ${(props) => props.theme.sizes.s4};
  text-align: left;
  padding: ${(props) => props.theme.sizes.s4};
`;
