"use client";
import React, { FC } from "react";
import { ItemMenuDropdown, ListMenuDropdown } from "./Styled";

const DropdownMenuV2: FC<IDropdownMenuV2> = ({
  dataMenu,
  handleClickDropdown,
}) => {
  return (
    <ListMenuDropdown>
      {dataMenu?.map((item: any, index: any) => {
        return (
          <ItemMenuDropdown
            key={index}
            onClick={() => handleClickDropdown(item?.product_type_name || item)}
          >
            {item?.name || item?.product_type_name || item}
          </ItemMenuDropdown>
        );
      })}
    </ListMenuDropdown>
  );
};

interface IDropdownMenuV2 {
  dataMenu: any[] | undefined; // Sesuaikan tipe data sesuai kebutuhan
  handleClickDropdown: (item: any) => void; // Sesuaikan tipe data sesuai kebutuhan
}

export default DropdownMenuV2;
