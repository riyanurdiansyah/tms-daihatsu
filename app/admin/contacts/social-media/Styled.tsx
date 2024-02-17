import { color, font } from "@/styles/styledComponents/GlobalStyled";
import { styled } from "styled-components";

export const ContainerSosmed = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h4`
  font-family: ${font.admin};
  font-weight: 600;
`;

export const ListInputText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  width: 100%;
`;

export const InputGroup = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputIcon = styled.div`
  color: #ffffff;
  background-color: ${color.secondary};
  font-family: ${font.reguler};
  font-size: 25px;
  min-width: 45px;
  height: 45px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
