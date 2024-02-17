import { styled } from "styled-components";

export const BoxAction = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 7px;
`;

// CREATE DIALOG
export const CreateDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormInput = styled.form`
  display: flex;
  flex-direction: column;
  gap: 21px;
  width: 100%;
`;

export const FormGroup = styled.span`
  width: 100% !important;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 4px;
`;

export const InfoError = styled.small`
  height: 16px;
  position: absolute;
  top: 100%;
  font-size: 11px;
`;

export const ButtonGroup = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
`;
