"use client";
import { styled } from "styled-components";
import { Btn, color } from "@/styles/styledComponents/GlobalStyled";
import Image from "next/image";
import { HiOutlineDownload } from "react-icons/hi";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: auto;
  border: 0.125rem solid rgb(234, 240, 249);
  border-radius: 1rem;
`;

export const HeadCard = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: ${color.border};
`;

export const Thumbnail = styled(Image)`
  width: 100%;
  border-radius: 1rem 1rem 0 0;
`;

export const BodyCard = styled.div`
  display: flex;
  align-items: flex-end;
  height: fit-content;
  flex: 1;
  padding: 1.5rem;
`;

export const Title = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;
  gap: 10px;
  @media screen and (max-width: 576px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const BtnDownload = styled(Btn)`
  background: transparent;
  padding: 8px;
  transition: all 0.5s;
  color: ${color.main};
  outline: 1px solid ${color.main};
  &:hover {
    color: #fff;
  }
`;

export const IconDownload = styled(HiOutlineDownload)`
  color: inherit;
  font-size: 24px;
`;
