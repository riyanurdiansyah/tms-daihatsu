import { Button } from "primereact/button";
import React, { FC } from "react";

const BtnSubmit: FC<IBtnSubmit> = () => {
  return <Button label="Save" severity="success" />;
};

interface IBtnSubmit {}

export default BtnSubmit;
