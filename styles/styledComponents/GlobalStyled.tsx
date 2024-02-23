"use client";

import styled, { createGlobalStyle } from "styled-components";

export const color = {
  main: "#3F79BD",
  secondary: "#e7cccc",
  fh: "#262626",
  fr: "#717276",
  border: "#EAF0F9",
};

export const font = {
  heading: "'Montserrat', sans-serif",
  reguler: "'Source Sans Pro', sans-serif",
  admin: "'Poppins', sans-serif",
};

export const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* list-style: none; */
}

body{
    color: #fff;
    font-size: 16px;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight:400;
    overflow-x: hidden;
}

a{
  color: ${color.fr};
  text-decoration: none;
}

label{
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}

input{
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border-radius: 6px;
}

h1,h2,h3,h4,h5,h6 {
  font-family: ${font.heading};
  color: ${color.fh};
}

h2{
  font-size: 44px;
  line-height: 56px;
}
h3{
  font-size: 36px;
  line-height: 48px;
}
h4{
  font-size: 24px;
  line-height: 36px;
}
p{
  font-family: ${font.reguler};
  color: ${color.fr};
  font-size: 16px;
  line-height: 28px;
}

@media screen and (max-width: 767px) {
  h2{
    font-size: 36px;
    line-height: 48px;
  }
  h3{
    font-size: 32px;
    line-height: 44px;
  }
  h4{
    font-size: 20px;
    line-height: 28px;
  }
  p{
    color: ${color.fr};
    font-size: 16px;
    line-height: 28px;
  }
}

.p-checkbox-box {
  &.p-highlight{
    background-color: ${color.main} !important;
    border-color: ${color.main} !important;
 }
 &.p-focus{
  box-shadow: 0 0 0 0.2rem ${color.secondary} !important;
  border-color: ${color.main} !important;
 }
 &:hover{
  border-color: ${color.main} !important;
 }
}

.p-button {
  font-size: 14px !important;
  font-family: ${font.admin} !important;
  .p-button-label{
    font-weight: 500 !important;
  }
}


`;

export const FullContainer = styled.section`
  z-index: 1;
  width: 100%;
  padding: 0;
  margin: 0;
  transition: all 1s;
`;

export const Container = styled.section`
  z-index: 1;
  width: 100%;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  transition: all 1s;
  /* ============ Mobile Max 576 */
  @media screen and (max-width: 576px) {
    max-width: 100%;
    padding: 16px;
  }

  /* ============ Mobile Min 576  */
  @media screen and (min-width: 576px) {
    max-width: 540px;
  }

  /* ============ Tablet Min 768 */
  @media screen and (min-width: 768px) {
    max-width: 720px;
  }

  /* ============ Laptop Min 992 */
  @media screen and (min-width: 992px) {
    max-width: 960px;
  }

  /* ============ Laptop Min 1200 */
  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
  /* ============ Desktop Min 1440 */
  @media screen and (min-width: 1440px) {
    width: 80%;
    max-width: 80%;
  }
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  border-radius: 8px;
  font-size: 16px;
  line-height: normal;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  outline: none;
  background: ${color.main};
  color: #fff;
  transition: all 1s;
  padding: 11px 24px;
  &:hover {
    transition: all 0.3s ease-out;
    background: #d10000;
  }
`;

export const CardAdmin = styled.div`
  background: #ffffff;
  border: 1px solid #dfe7ef;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 30px rgba(221, 224, 255, 0.54);
  border-radius: 12px;
`;
