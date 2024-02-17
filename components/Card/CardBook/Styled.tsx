import { styled } from "styled-components";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { color } from "@/styles/styledComponents/GlobalStyled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: auto;
  border: 0.125rem solid rgb(234, 240, 249);
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 20px;
  @media screen and (max-width: 576px) {
    flex-direction: row;
    gap: 16px;
    padding: 14px;
    border-radius: 10px;
  }
`;

export const IconPdf = styled(BsFillFileEarmarkPdfFill)`
  color: ${color.main};
  font-size: 64px;
  margin-left: -5px;
  @media screen and (max-width: 576px) {
    font-size: 54px;
  }
`;

export const BodyCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  flex: 1;
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
  @media screen and (max-width: 576px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 576px) {
    gap: 14px;
  }
`;

export const LinkCta = styled.p`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${color.main};
  &:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`;
