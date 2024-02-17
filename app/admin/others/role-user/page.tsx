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

const RoleUserContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataFetch, setDataFetch] = useState(null);
  const [loading, setloading] = useState(true);

  const [fetchData, loadingFetchData] = useFetchUmum("/api/role");
  const [fetchTrigger] = useFetchTrigger<any>("/api/role");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);
  const [dataById, setDataById] = useState<any>(null);

  useEffect(() => {
    if (fetchData && !loadingFetchData) {
      setDataFetch(fetchData?.data);
      setloading(false);
    }
  }, [fetchData, loadingFetchData]);

  useEffect(() => {
    if (visibleEdit && idSelected != null) {
      const filterData = fetchData?.data?.filter(
        (type: any) => type?.role_id == idSelected
      )[0];
      setDataById(filterData);
    }
  }, [visibleEdit, idSelected]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/role/${id}`, {
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
        <BtnEdit
          setVisibleEdit={setVisibleEdit}
          setIdSelected={setIdSelected}
          id={rowData.role_id}
        />
        {/* <BtnDelete confirmDeleteData={confirmDeleteData} id={rowData.role_id} /> */}
      </BoxAction>
    );
  };

  const columns = [
    { field: "role_id", header: "Id Role" },
    { field: "role", header: "Role" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["role_id", "role"];

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
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Role"
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataFetch}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Role"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataFetch}
            showToast={showToast}
            id={idSelected}
            dataById={dataById}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

export default RoleUserContent;
