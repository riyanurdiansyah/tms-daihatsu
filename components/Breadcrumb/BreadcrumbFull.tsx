import React, { FC } from "react";
import { BreadcrumbWrapper, ContainerBreadcrumb } from "./Styled";
import BreadcrumbText from "./BreadcrumbText";

const BreadcrumbFull: FC<IBreadcrumbFull> = ({ data }) => {
  return (
    <BreadcrumbWrapper>
      <ContainerBreadcrumb>
        <BreadcrumbText data={data} />
      </ContainerBreadcrumb>
    </BreadcrumbWrapper>
  );
};

interface IBreadcrumbFull {
  data: any;
}

export default BreadcrumbFull;
