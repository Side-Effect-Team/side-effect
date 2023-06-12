import styled from "styled-components";
import { media } from "@/styles/mediatest";
export const ThirdSectionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  ${media.custom(640)} {
    flex-direction: column;
  }
`;
export const Title = styled.h2`
  text-align: start;
  width: 100%;
  font-size: xx-large;
  padding: 20px 0px;
`;
