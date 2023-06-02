import styled from "styled-components";
import { mediaQuery } from "@/styles/Media";

export const Wrapper = styled.div`
  ${mediaQuery("mobile")`
    cursor: pointer;
    display: flex;
    justify-contents: center;
    align-items: center;
  `}

  display: none;
`;