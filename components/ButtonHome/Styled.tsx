import { Btn, color, font } from "@/styles/styledComponents/GlobalStyled";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { styled } from "styled-components";

export interface IProps {
  showMenu: boolean;
}

export const BtnHomeWrapper = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  bottom: 50px;
  right: 70px;
  z-index: 10;
  display: flex;
  align-items: center;
  @media screen and (max-width: 991px) {
    bottom: 40px;
    right: 50px;
  }
  @media screen and (max-width: 767px) {
    bottom: 30px;
    right: 40px;
  }
  @media screen and (max-width: 575px) {
    bottom: 16px;
    right: 24px;
  }
`;

export const BtnToggleHome = styled(Btn)<IProps>`
  background-color: #000;
  border-radius: 100%;
  padding: 15px;
  z-index: 10;
  color: ${(props) => (props.showMenu ? color.main : `#fff`)};
  &:hover {
    background-color: #000;
    color: ${(props) => (props.showMenu ? color.main : `#fff`)};
  }
  @media screen and (max-width: 767px) {
    padding: 12px;
  }
`;

export const IconHome = styled(HiHome)`
  font-size: 55px;
  color: inherit;
  @media screen and (max-width: 991px) {
    font-size: 45px;
  }
  @media screen and (max-width: 767px) {
    font-size: 35px;
  }
  @media screen and (max-width: 575px) {
    font-size: 23px;
  }
`;

export const MenuToggleHome = styled.div<IProps>`
  width: ${(props) => (props.showMenu ? "90vw" : `0%`)};
  height: 60px;
  background-color: ${color.main};
  position: absolute;
  right: 10px;
  border-radius: 100px;
  padding-left: ${(props) => (props.showMenu ? "50px" : `0`)};
  padding-right: ${(props) => (props.showMenu ? "120px" : `0`)};
  transition: 0.5s all;
  overflow: hidden;
`;

export const ListMenuHome = styled.div<IProps>`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: ${(props) => (props.showMenu ? "" : `none`)};
`;

export const ItemMenuHome = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-family: ${font.heading};
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    color: ${color.fh};
  }
`;

export const MenuTogleHomePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(135, 135, 135, 0.2);
  backdrop-filter: blur(4px); // This be the blur
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 576px) {
    padding: 16px;
  }
`;

export const CardPopupMenu = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  padding: 24px;
  background: #ffffff;
  position: relative;
  box-shadow: 0px 4px 30px rgba(221, 224, 255, 0.54);
`;

export const ListCardMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemCardMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  color: ${color.fr};
  font-family: ${font.heading};
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${color.border};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${color.secondary};
  }
`;

export const BtnClosePopup = styled(AiFillCloseCircle)`
  position: absolute;
  top: -16px;
  right: -16px;
  font-size: 35px;
  color: ${color.fh};
  cursor: pointer;
`;
