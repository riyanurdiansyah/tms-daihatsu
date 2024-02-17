import React, { FC } from "react";
import { IconArrow, ItemBreadcrumb, ListBreadcrumb } from "./Styled";
import Link from "next/link";

const BreadcrumbAdmin: FC<IBreadcrumbAdmin> = ({ data }) => {
  return (
    <ListBreadcrumb className="admin">
      {data?.map((item: any, index: number) => (
        <>
          <ItemBreadcrumb className="admin">{item}</ItemBreadcrumb>
          {index + 1 < data?.length && <IconArrow />}
        </>
      ))}
    </ListBreadcrumb>
  );
};

interface IBreadcrumbAdmin {
  data: any;
}

export default BreadcrumbAdmin;
