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
import { Toast } from "primereact/toast";
import useToken from "@/utils/useToken";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import EditDialog from "./EditDialog";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const TmsIsuzuNetworkContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataNetwork, setDataNetwork] = useState(null);
  const [loading, setloading] = useState(true);

  const [networkData, loadingNetworkData] = useFetchUmum("/api/dealer");
  const [fetchTrigger] = useFetchTrigger<any>("/api/dealer");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (networkData && !loadingNetworkData) {
      setDataNetwork(networkData?.data);
      setloading(false);
    }
  }, [networkData, loadingNetworkData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/dealer/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataNetwork(fetchDataNew?.data);
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
          id={rowData.dealer_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.dealer_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "name", header: "Name" },
    { field: "subtitle", header: "Category" },
    { field: "phone", header: "Phone" },
    { field: "location", header: "Address" },
    { body: actionBodyTemplate, header: "" },
  ];

  const globalFilterFields = ["name", "subtitle", "phone", "location"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataNetwork}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New TMS Isuzu Network"
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataNetwork}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit TMS Isuzu Network"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataNetwork}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

export default TmsIsuzuNetworkContent;
