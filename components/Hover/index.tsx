"use client";
import React, { FC, ReactNode } from "react";
import { ChildrenComponent, DropdownComponent, HoverBox } from "./Styled";

const Hover: FC<IHover> = ({
  paddingTop,
  onHover,
  topHover,
  children,
  kiriHover,
  kananHover,
}) => {
  return (
    <HoverBox>
      <ChildrenComponent>{children}</ChildrenComponent>
      <DropdownComponent
        className="hover-komponen"
        paddingTop={paddingTop}
        style={{
          top: topHover || 0,
          left: kiriHover == null ? "auto" : kiriHover,
          right: kananHover == null ? "auto" : kananHover,
        }}
      >
        {onHover}
      </DropdownComponent>
    </HoverBox>
  );
};

interface IHover {
  paddingTop: any;
  topHover: any;
  kiriHover: any;
  kananHover: any;
  onHover: JSX.Element;
  children: ReactNode;
}

export default Hover;
