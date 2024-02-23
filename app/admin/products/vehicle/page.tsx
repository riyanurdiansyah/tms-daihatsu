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

const VehicleContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataVehicle, setDataVehicle] = useState<any>(vehicleDataDummy.data);
  const [loading, setloading] = useState(true);

  const [vehicleData, loadingVehicleData] = useFetchUmum("/api/product");
  const [fetchTrigger] = useFetchTrigger<any>("/api/product");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  // useEffect(() => {
  //   if (vehicleDataDummy && !loadingVehicleData) {
  //     setDataVehicle(vehicleData?.data);
  //     setloading(false);
  //   }
  // }, [vehicleDataDummy, loadingVehicleData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/product/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataVehicle(fetchDataNew?.data);
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

  const imageBodyVehicle = (rowData: any) => {
    return (
      <Image
        src={`https://www.tmsisuzu.co.id/${rowData.image}` || "/no-image.png"}
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

  const imageBodyBg = (rowData: any) => {
    return (
      <Image
        src={
          `https://www.tmsisuzu.co.id/${rowData.image_bg}` || "/no-image.png"
        }
        alt={rowData.image_bg}
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
          id={rowData.product_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.product_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "name", header: "Name vehicle", style: { width: "30%" } },
    { body: imageBodyVehicle, header: "Image", style: { width: "12%" } },
    { body: imageBodyBg, header: "Background", style: { width: "12%" } },
    { field: "product_type.product_type_name", header: "Category" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["name"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataVehicle}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Vehicle"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataVehicle}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Vehicle"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataVehicle}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

const vehicleDataDummy = {
  code: 200,
  message: "Data has been listed",
  data: [
    {
      image: "/product/image/10cbbbe2-14fa-4f6a-ba63-70cd79352065.png",
      image_bg: "/product/imagebg/10cbbbe2-14fa-4f6a-ba63-70cd79352065.png",
      name: "ELF NLR",
      product_id: "10cbbbe2-14fa-4f6a-ba63-70cd79352065",
      cabin: "2987",
      gvw: "5100",
      max_power: "100",
      max_torque: "22.5",
      product_type: {
        product_type_id: "5642c397-4c16-4c56-ab6c-1b4af89fd6f3",
        product_type_name: "Light Truck 4 Ban",
      },
      contents: [
        {
          product_content_id: "968531bc-fb86-43e3-bb27-06b040e2bd11",
          product_id: "10cbbbe2-14fa-4f6a-ba63-70cd79352065",
          text: "<p>ELF NLR</p>",
          image:
            "/product/content/image/968531bc-fb86-43e3-bb27-06b040e2bd11.png",
          position: "Text Left",
        },
      ],
    },
    {
      image: "/product/image/171cdc7b-990e-4a98-aa99-d350de39f311.png",
      image_bg: "/product/imagebg/171cdc7b-990e-4a98-aa99-d350de39f311.png",
      name: "GIGA FVR L D",
      product_id: "171cdc7b-990e-4a98-aa99-d350de39f311",
      cabin: "-",
      gvw: "16000",
      max_power: "245",
      max_torque: "80.5",
      product_type: {
        product_type_id: "96b15626-e012-4a29-b77d-378e8c3eb66e",
        product_type_name: "Medium Truck",
      },
      contents: [],
    },
    {
      image: "/product/image/1d38b402-c987-4b3d-8229-1f6244398b95.png",
      image_bg: "/product/imagebg/1d38b402-c987-4b3d-8229-1f6244398b95.png",
      name: "ELF NLR 55 B LX Microbus KTP (STD)",
      product_id: "1d38b402-c987-4b3d-8229-1f6244398b95",
      cabin: "-",
      gvw: "5100",
      max_power: "100",
      max_torque: "22.5",
      product_type: {
        product_type_id: "5642c397-4c16-4c56-ab6c-1b4af89fd6f3",
        product_type_name: "Light Truck 4 Ban",
      },
      contents: [],
    },
  ],
};

export default VehicleContent;
