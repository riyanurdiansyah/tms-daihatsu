import { Btn, color } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
  /* height: max-content; */
  border: 0.125rem solid rgb(234, 240, 249);
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const HeadCard = styled.div``;

export const BodyCard = styled.div`
  padding: 16px 0;
`;

export const Type = styled.p``;

export const Name = styled.h4``;

export const ListInfoDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  margin-top: 15px;
`;

export const ItemInfoDetail = styled.div``;

export const KeyInfo = styled.p`
  font-size: 12px;
  line-height: 16px;
`;

export const ValueInfo = styled.p``;

export const FooterCard = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #e7cccc;
`;

export const BtnDetail = styled(Btn)`
  width: 100%;
`;
