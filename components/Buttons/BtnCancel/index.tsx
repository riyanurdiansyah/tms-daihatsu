import { Button } from "primereact/button";
import React, { FC } from "react";

const BtnCancel: FC<IBtnCancel> = () => {
  return <Button label="Cancel" severity="secondary" outlined />;
};

interface IBtnCancel {}

export default BtnCancel;
