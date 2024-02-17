import { Btn, color } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: max-content;
  border: 0.125rem solid rgb(234, 240, 249);
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const HeadCard = styled.div`
  margin-bottom: 14px;
`;

export const CardImgBrand = styled.div`
  width: 50px;
  height: 50px;
  background: url("/logo-tms.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
export const BodyCard = styled.div``;

export const JobTitle = styled.p`
  color: ${color.fh};
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 14px;
`;

export const JobQualification = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 12px;
`;

export const Jobcategory = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const JobRank = styled.p`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
`;

export const JobExpired = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const FooterCard = styled.div`
  display: flex;
  gap: 1.5rem;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  padding-top: 1.5rem;
  margin-top: 10px;
  border-top: 1px solid #e7cccc;
`;

export const BtnDetail = styled(Btn)`
  background: transparent;
  color: ${color.main};
  width: 100%;
  padding: 10px 10px;
  &:hover {
    background: #e7cccc;
  }
`;

export const BtnApply = styled(Btn)`
  width: 100%;
  padding: 10px 10px;
`;
