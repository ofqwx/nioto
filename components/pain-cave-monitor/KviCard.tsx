import styled from "styled-components";
import Box from "../grid/Box";

const KviCard = styled(Box)`
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.fg};
  border-radius: 8px;
  text-align: center;
`;

export default KviCard;
