"use client";
import { color, font } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 465px;
  border-radius: 6px;
  padding: 56px;
  background: #fff;
  @media screen and (max-width: 767px) {
    padding: 56px 21px;
  }
`;

export const Invalid = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: ${font.heading};
  color: ${color.main};
  text-align: center;
`;

export const HeadCard = styled.div`
  margin-bottom: 21px;
`;

export const Title = styled.p`
  font-size: 18px;
  line-height: normal;
  font-weight: 700;
  color: #212121;
  margin-bottom: 7px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: normal;
  font-weight: 500;
  color: #757575;
`;

export const BodyCard = styled.div`
  width: 100%;
`;

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const FormGroup = styled.span`
  width: 100% !important;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InfoError = styled.small`
  height: 16px;
  position: absolute;
  top: 100%;
  font-size: 11px;
`;

export const Remember = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LabelCheckbox = styled.label`
  color: #212121;
  font-weight: 500;
`;
