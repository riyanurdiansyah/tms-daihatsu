"use client";
import BtnDelete from "@/components/Buttons/BtnDelete";
import BtnEdit from "@/components/Buttons/BtnEdit";
import TableLayout from "@/components/TableLayout";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import React, { useEffect, useRef, useState } from "react";
import { BoxAction } from "./Styled";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import useToken from "@/utils/useToken";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const BookingServiceContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataFetch, setDataFetch] = useState(null);
  const [loading, setloading] = useState(true);

  const [fetchData, loadingFetchData] = useFetchUmum("/api/booking");
  const [fetchTrigger] = useFetchTrigger<any>("/api/booking");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (fetchData && !loadingFetchData) {
      setDataFetch(fetchData?.data);
      setloading(false);
    }
  }, [fetchData, loadingFetchData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/booking/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataFetch(fetchDataNew?.data);
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
        {/* <BtnEdit
          setVisibleEdit={setVisibleEdit}
          setIdSelected={setIdSelected}
          id={rowData.booking_id}
        /> */}
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.booking_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "email", header: "Email" },
    { field: "no_hp", header: "Phone" },
    { field: "date", header: "Date" },
    { field: "time", header: "Time" },
    { field: "location", header: "Location" },
    { field: "outlet_id", header: "Id Outlet" },
    { field: "no_kendaraan", header: "No Kendaraan" },
    { field: "model", header: "Model" },
    { field: "tahun", header: "Tahun" },
    { field: "jenis_service", header: "Jenis Service" },
    // { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = [
    "email",
    "no_hp",
    "date",
    "time",
    "location",
    "no_kendaraan",
    "model",
    "tahun",
    "jenis_service",
  ];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataFetch}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={false}
          setVisible={setVisible}
        />
      </CardAdmin>
    </>
  );
};

export default BookingServiceContent;
