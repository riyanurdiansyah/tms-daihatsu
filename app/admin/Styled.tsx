"use client";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #eff3f7;
`;

export const ContentWrapper = styled.div`
  margin-left: 18rem;
  padding: 2rem;
  transition: all 0.2s;
  min-height: 100vh;
  position: relative;
`;

export const BodyWrapper = styled.div`
  position: relative;
  height: calc(100vh - 134px);
`;

export const CardWelcome = styled(CardAdmin)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const TitleAdmin = styled.h4``;
