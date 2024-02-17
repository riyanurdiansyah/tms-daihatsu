import { Button } from "primereact/button";
import React, { FC } from "react";

const BtnEdit: FC<IBtnEdit> = ({ setVisibleEdit, setIdSelected, id }) => {
  const handleClick = async () => {
    setVisibleEdit(true);
    setIdSelected(id);
  };
  return (
    <Button
      icon="pi pi-pencil"
      rounded
      severity="success"
      aria-label="Edit"
      style={{ width: "2.5rem", height: "2.5rem" }}
      onClick={() => handleClick()}
    />
  );
};

interface IBtnEdit {
  setVisibleEdit: (e: boolean) => void;
  setIdSelected: (e: any) => void;
  id: any;
}

export default BtnEdit;
