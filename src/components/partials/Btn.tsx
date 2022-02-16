import styled from "styled-components";
import { colors } from "../../resources/colors";

const Btn = styled.div<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? colors.lighterGrey : colors.yellow)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 13.5px;
  box-shadow: 1px 2px 8px rgba(127, 127, 127, 0.25);
  border-radius: 6px;

  font-family: Livvic;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;

  text-align: center;
  color: ${colors.darkerGrey};

  cursor: pointer;
`;

export default Btn