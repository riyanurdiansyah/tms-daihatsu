"use client";
import React, { FC } from "react";
import { ItemMenuDropdown, ListMenuDropdown } from "./Styled";

const DropdownMenu: FC<IDropdownMenu> = ({ dataMenu, handleClickDropdown }) => {
  return (
    <ListMenuDropdown>
      {dataMenu?.map((item: any, index: any) => {
        return (
          <ItemMenuDropdown
            key={index}
            onClick={() => handleClickDropdown(item?.url || item)}
          >
            {item?.name || item}
          </ItemMenuDropdown>
        );
      })}
    </ListMenuDropdown>
  );
};

interface IDropdownMenu {
  dataMenu: any;
  handleClickDropdown: (e: any) => void;
}

export default DropdownMenu;
