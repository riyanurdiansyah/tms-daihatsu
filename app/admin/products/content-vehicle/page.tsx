"use client";
import TableLayout from "@/components/TableLayout";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import React, { useEffect, useRef, useState } from "react";
import { BoxAction } from "./Styled";
import BtnEdit from "@/components/Buttons/BtnEdit";
import BtnDelete from "@/components/Buttons/BtnDelete";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { Dialog } from "primereact/dialog";
import CreateDialog from "./CreateDialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import useToken from "@/utils/useToken";
import { Toast } from "primereact/toast";
import EditDialog from "./EditDialog";
import Image from "next/image";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const ContentVehicleContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataContentVehicle, setDataContentVehicle] = useState(null);
  const [loading, setloading] = useState(true);

  const [contentVehicleData, loadingContentVehicleData] = useFetchUmum(
    "/api/product/content"
  );
  const [fetchTrigger] = useFetchTrigger<any>("/api/product/content");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (contentVehicleData && !loadingContentVehicleData) {
      setDataContentVehicle(contentVehicleData?.data);
      setloading(false);
    }
  }, [contentVehicleData, loadingContentVehicleData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(
      `${api_backend}/api/product/content/${id}`,
      {
        headers: {
          Authorization: token,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataContentVehicle(fetchDataNew?.data);
      showToast({
        type: "success",
        title: "Success",
        message: `${response.data.message}`,
      });
    }
  };

  const reject = () => {
    showToast({
      type: "warn",
      title: "Rejected",
      message: "You have rejected",
    });
  };

  const confirmDeleteData = (id: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
      reject,
    });
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <BoxAction>
        <BtnEdit
          setVisibleEdit={setVisibleEdit}
          setIdSelected={setIdSelected}
          id={rowData.product_content_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.product_content_id}
        />
      </BoxAction>
    );
  };

  const imageBodyImage = (rowData: any) => {
    return (
      <Image
        src={rowData.image || "/no-image.png"}
        alt={rowData.image}
        layout="responsive"
        objectFit="cover"
        loading="lazy"
        width="0"
        height="0"
        style={{
          maxWidth: "100px",
          height: "auto",
          boxShadow:
            "0 4px 10px rgba(0,0,0,.03),0 0 2px rgba(0,0,0,.06),0 2px 6px rgba(0, 0, 0, 0.081)",
        }}
      />
    );
  };

  const columns = [
    { field: "product_id", header: "Product Id" },
    { body: imageBodyImage, header: "Image Content" },
    { field: "position", header: "Text Position" },
    { field: "text", header: "Text Content" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["product_id"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataContentVehicle}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add Content Vehicle"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataContentVehicle}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Content Vehicle"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataContentVehicle}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

export default ContentVehicleContent;
