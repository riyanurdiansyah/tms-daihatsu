"use client";
import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #464646;
  width: calc((100% - 40px) / 3);
  margin-right: 20px;
  padding: 40px 30px;
  border-radius: 20px;
  height: auto;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 991px) {
    width: calc((100% - 20px) / 2);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const CardProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StarGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const CardDesc = styled.p`
  color: #dedede;
  font-size: 14px;
  line-height: 26px;
  font-style: italic;
  text-align: center;
  margin-bottom: 20px;
`;

export const CardLine = styled.hr`
  width: 100%;
  border: 2px solid #dedede;
  border-radius: 10px;
  margin: 15px 0;
`;

export const CardUserName = styled.p`
  color: #dedede;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;
