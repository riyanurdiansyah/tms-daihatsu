"use client";

import React, { FC } from "react";
import { FullContainerBanner, Title } from "./Styles";

const HeroBanner: FC<IHeroBanner> = ({ title }) => {
  return (
    <FullContainerBanner>
      <Title>{title}</Title>
    </FullContainerBanner>
  );
};

interface IHeroBanner {
  title: string;
}

export default HeroBanner;
