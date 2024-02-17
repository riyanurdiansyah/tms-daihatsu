"use client";
import { color, font } from "@/styles/styledComponents/GlobalStyled";
import Link from "next/link";
import { styled } from "styled-components";

export const SidebarLayout = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 18rem;
  background: #ffffff;
  border-right: 1px solid transparent;
  box-shadow: 0px 4px 50px #d9ddfc;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  font-family: ${font.admin};
`;

export const SidebarHeader = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

export const MenuContainer = styled.div`
  overflow: auto;
  flex: 1 1;
  padding-bottom: 2rem;
`;

export const ParentListMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ParentItemMenu = styled.li``;

export const TitleParentMenu = styled.p`
  font-size: 12px;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
  cursor: default;
  padding: 1rem 2rem;
  color: ${color.main};
`;

export const ChildMenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
`;

export const ChildItemMenu = styled.li``;

export const LMenuChild = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0.75rem 2rem;
  transition: all 0.2s;
  &:hover {
    background: rgb(246, 249, 252);
  }
  &.active {
    font-weight: 700;
  }
`;
