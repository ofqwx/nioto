import styled from "styled-components";
import Flex from "../grid/Flex";

const KvisContainer = styled(Flex)`
  padding: 1rem;
  gap: 2rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.fg};
  border-radius: 8px;
  width: 100%;
  height: 200px;
`;

export default KvisContainer;
