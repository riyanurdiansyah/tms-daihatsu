"use client";
import { color } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export interface IProps {
  paddingTop: any;
}

export const HoverBox = styled.div`
  position: relative;
`;

export const ChildrenComponent = styled.div`
  padding: 0px;
  &:hover {
    cursor: pointer;
  }
  &:hover ~ .hover-komponen {
    visibility: visible;
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const DropdownComponent = styled.div<IProps>`
  position: absolute;
  padding-top: ${(props) => `${props.paddingTop}px` || "5px"};
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateY(5px);
  visibility: hidden;
  transition: 300ms;
  z-index: 15;
  display: flex;
  flex-direction: column;
  width: fit-content;
  &:hover {
    visibility: visible;
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const ListMenuDropdown = styled.div`
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid ${color.border};
  min-width: max-content;
  width: 200px;
  max-height: 280px;
  overflow: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemMenuDropdown = styled.p`
  font-size: 14px;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 10px;
  transition: all 0.5s;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${color.secondary};
  }
`;
