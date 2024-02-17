"use client";
import { Btn, color, font } from "@/styles/styledComponents/GlobalStyled";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { styled } from "styled-components";

export const TopbarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const BtnTogle = styled(Btn)`
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  margin-right: 2rem;
  border-radius: 50%;
  background: transparent;
  color: ${color.fr};
  transition: all 0.2s;
  &:hover {
    background: ${color.main};
    color: #fff;
  }
`;

export const IconTogle = styled(HiOutlineMenu)`
  font-size: 25px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const BtnLogout = styled(BtnTogle)`
  margin-right: 1.5rem;
`;

export const IconLogout = styled(BiLogOutCircle)`
  font-size: 22px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.p`
  font-family: ${font.admin};
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  margin-right: 1rem;
`;

export const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
