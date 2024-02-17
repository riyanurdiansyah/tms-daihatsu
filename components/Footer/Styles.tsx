"use client";
import { Container, font } from "@/styles/styledComponents/GlobalStyled";
import Link from "next/link";
import { styled } from "styled-components";

const color = {
  main: "#fff",
  secondary: "#c7c7c7",
};

export const Foo = styled.footer`
  margin-top: 100px;
  width: 100%;
  background-color: #2b2b2b;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FooterContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  padding: 60px 0 30px 0;
  @media screen and (max-width: 576px) {
    padding: 60px 16px 40px 16px;
  }
`;

export const LTitle = styled(Link)`
  color: ${color.main};
  font-family: ${font.heading};
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 10px;
`;

export const LMenu = styled(Link)`
  color: ${color.secondary};
  font-family: ${font.reguler};
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  &:hover {
    color: ${color.main};
  }
`;

export const FooterOne = styled.div`
  width: 50%;
  @media screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 60px;
  }
`;

export const ImgBrandColab = styled.div`
  height: 40px;
  margin-bottom: 24px;
`;

export const TitleAdress = styled.p`
  color: ${color.main};
  font-family: ${font.heading};
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 18px;
`;

export const TextAdress = styled.p`
  color: ${color.secondary};
  font-family: ${font.reguler};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  max-width: 250px;
  margin-bottom: 24px;
`;

export const TitleSosmed = styled(TitleAdress)``;

export const ListSosmed = styled.div`
  display: flex;
  gap: 16px;
  color: ${color.secondary};
`;

export const LSosmed = styled(Link)`
  color: #2b2b2b;
  background-color: ${color.secondary};
  font-family: ${font.reguler};
  font-size: 25px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${color.main};
  }
`;

export const FooterMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    flex-direction: column;
    gap: 60px;
  }
`;

export const FooterTwo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${color.secondary};
`;

export const FooterThree = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${color.secondary};
  position: relative;
`;

export const ListVehicle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 20px;
  color: ${color.secondary};
`;

export const LVehicle = styled(LMenu)``;

export const FooterBootom = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const TextBootom = styled.p`
  color: ${color.secondary};
  font-family: ${font.reguler};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
`;
