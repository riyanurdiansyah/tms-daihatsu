"use client";
import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 0.125rem solid rgb(234, 240, 249);
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const Name = styled.h4``;

export const Jenis = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Address = styled.p`
  font-size: 14px;
  line-height: 24px;
`;

export const Phone = styled(Address)``;
