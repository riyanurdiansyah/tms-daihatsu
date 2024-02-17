"use client";
import { FullContainer } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";
import BgHeroBanner from "./bg-hero-banner.png";

export const FullContainerBanner = styled(FullContainer)`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${BgHeroBanner.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: grayscale(70%);
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  position: absolute;
  z-index: 2;
`;
