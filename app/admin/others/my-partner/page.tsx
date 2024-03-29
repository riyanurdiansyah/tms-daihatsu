"use client";
import BtnDelete from "@/components/Buttons/BtnDelete";
import BtnEdit from "@/components/Buttons/BtnEdit";
import TableLayout from "@/components/TableLayout";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import React, { useEffect, useRef, useState } from "react";
import { BoxAction } from "./Styled";
import { Dialog } from "primereact/dialog";
import CreateDialog from "./CreateDialog";
import { Toast } from "primereact/toast";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import axios from "axios";
import useToken from "@/utils/useToken";
import EditDialog from "./EditDialog";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const PartnerHomepageContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataPartner, setDataPartner] = useState(null);
  const [loading, setloading] = useState(true);

  const [myPartner, loadingMyPartner] = useFetchUmum("/api/partner");
  const [fetchTrigger] = useFetchTrigger<any>("/api/partner");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (myPartner && !loadingMyPartner) {
      setDataPartner(myPartner?.data);
      setloading(false);
    }
  }, [myPartner, loadingMyPartner]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/partner/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataPartner(fetchDataNew?.data);
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
          id={rowData.partner_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.partner_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "nama", header: "Name" },
    { field: "video", header: "Url Video" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["nama"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataPartner}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Partner"
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataPartner}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Partner"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataPartner}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

export default PartnerHomepageContent;
