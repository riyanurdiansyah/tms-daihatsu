import { Button } from "primereact/button";
import React, { FC } from "react";

const BtnAdd: FC<IBtnAdd> = () => {
  return (
    <Button label="Add New" severity="success" outlined icon="pi pi-plus" />
  );
};

interface IBtnAdd {}

export default BtnAdd;
