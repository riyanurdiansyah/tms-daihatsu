"use client";
import { FullContainer, color } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #eff3f7;
`;

export const ContainerLogin = styled(FullContainer)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${color.border};
  @media screen and (max-width: 767px) {
    padding: 32px;
  }
`;
