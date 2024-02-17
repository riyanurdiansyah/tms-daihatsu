"use client";
import BtnDelete from "@/components/Buttons/BtnDelete";
import BtnEdit from "@/components/Buttons/BtnEdit";
import TableLayout from "@/components/TableLayout";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import React, { useEffect, useRef, useState } from "react";
import { BoxAction } from "./Styled";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import CreateDialog from "./CreateDialog";
import { Toast } from "primereact/toast";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import useToken from "@/utils/useToken";
import EditDialog from "./EditDialog";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const SliderHomepageContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataSlider, setDataSlider] = useState(null);
  const [loading, setloading] = useState(true);

  const [sliderData, loadingSliderData] = useFetchUmum("/api/slider");
  const [fetchTrigger] = useFetchTrigger<any>("/api/slider");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (sliderData && !loadingSliderData) {
      setDataSlider(sliderData?.data);
      setloading(false);
    }
  }, [sliderData, loadingSliderData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/slider/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataSlider(fetchDataNew?.data);
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

  const imageBodyTemplate = (rowData: any) => {
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

  const actionBodyTemplate = (rowData: any) => {
    return (
      <BoxAction>
        <BtnEdit
          setVisibleEdit={setVisibleEdit}
          setIdSelected={setIdSelected}
          id={rowData.slider_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.slider_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "nama", header: "Name" },
    { body: imageBodyTemplate, header: "Image" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["nama"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataSlider}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Slider"
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataSlider}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Slider"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataSlider}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

export default SliderHomepageContent;
