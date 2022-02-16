import styled from "styled-components";
import { device, grid } from "../../resources/values";

interface ColProps {
  readonly cols: number;
}

export const Col = styled.div<ColProps>`
  width: 100%;
  box-sizing: border-box;
  @media ${device.laptop} {
    max-width: ${({ cols }: any) => (cols * grid.width) + (grid.gap * (cols - 1))}px;
  }
   
  padding: ${grid.gap}px;
`