import React, { FC } from "react";
import { IconArrow, ItemBreadcrumb, ListBreadcrumb } from "./Styled";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

const BreadcrumbText: FC<IBreadcrumbText> = ({ data }) => {
  return (
    <ListBreadcrumb>
      <Link href="/">
        <ItemBreadcrumb>
          <AiFillHome />
        </ItemBreadcrumb>
      </Link>
      <IconArrow />
      {data?.map((item: any, index: number) => (
        <>
          <Link href={`/${item}`}>
            <ItemBreadcrumb>{item}</ItemBreadcrumb>
          </Link>
          {index + 1 < data?.length && <IconArrow />}
        </>
      ))}
    </ListBreadcrumb>
  );
};

interface IBreadcrumbText {
  data: any;
}

export default BreadcrumbText;
