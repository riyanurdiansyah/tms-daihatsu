import { Button } from "primereact/button";
import React, { FC } from "react";

const BtnDelete: FC<IBtnDelete> = ({ confirmDeleteData, id }) => {
  return (
    <Button
      icon="pi pi-trash"
      rounded
      severity="warning"
      aria-label="Delete"
      style={{ width: "2.5rem", height: "2.5rem" }}
      onClick={() => confirmDeleteData(id)}
    />
  );
};

interface IBtnDelete {
  confirmDeleteData: (e: any) => void;
  id: any;
}

export default BtnDelete;
