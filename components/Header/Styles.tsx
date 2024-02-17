"use client";
import { Container, color } from "@/styles/styledComponents/GlobalStyled";
import Link from "next/link";
import { styled } from "styled-components";
import { CgMenuGridO } from "react-icons/cg";

interface INavbarMobileWrapper {
  isShow: boolean;
}
interface ILMMenu {
  isShow: boolean;
}

export const HeaderWrapper = styled.header`
  width: 100%;
  padding: 16px 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 576px) {
    padding: 0 16px;
  }
`;

export const HeaderLogoColab = styled.div`
  max-width: 190px;
  height: 30px;
`;

export const Navbar = styled.nav`
  width: auto;
  height: 30px;
`;

export const ListNavbar = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 30px;
  @media screen and (max-width: 766px) {
    display: none;
  }
  @media screen and (max-width: 991px) {
    gap: 20px;
  }
  @media screen and (max-width: 1199px) {
    gap: 30px;
  }
`;

export const ItemNavbar = styled.li`
  height: 30px;
`;

export const LMenu = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 766px) {
    gap: 5px;
  }
  &:hover {
    color: red;
  }
`;

export const HeaderLogoBrand = styled(HeaderLogoColab)`
  text-align: end;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

export const ToggleMenu = styled.div`
  width: 30px;
  height: 30px;
  display: none;
  @media screen and (max-width: 766px) {
    display: block;
    cursor: pointer;
  }
`;

export const IconToggle = styled(CgMenuGridO)`
  width: 30px;
  height: 30px;
  color: ${color.main};
`;

// NAVBAR MOBILE
export const NavbarMobileWrapper = styled(Container)<INavbarMobileWrapper>`
  padding: 16px;
  background-color: #fff;
  min-width: 100vw;
  height: 100vh;
  top: 0;
  padding-top: calc(30px + 16px + 16px + 16px);
  position: fixed;
  transition: 0.5s all;
  left: ${(props) => (props.isShow ? "0" : "100vw")};
  z-index: 9;
  overflow: scroll;
  @media screen and (min-width: 767px) {
    display: none;
    left: 100vw;
  }
`;

export const MListNavbar = styled.ul``;

export const MItemNavbar = styled.li``;

export const LMMenu = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 5px;
`;

export const MListDropdown = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

export const MItemDropdown = styled.div``;

export const MLMMenuDropdown = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 5px;
`;
