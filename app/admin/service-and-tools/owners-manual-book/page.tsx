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
import axios from "axios";
import useToken from "@/utils/useToken";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import EditDialog from "./EditDialog";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const OwnersManualBookContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataManualBook, setDataManualBook] = useState(null);
  const [loading, setloading] = useState(true);

  const [manualBookData, loadingManualBookData] = useFetchUmum("/api/book");
  const [fetchTrigger] = useFetchTrigger<any>("/api/book");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (manualBookData && !loadingManualBookData) {
      setDataManualBook(manualBookData?.data);
      setloading(false);
    }
  }, [manualBookData, loadingManualBookData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/book/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataManualBook(fetchDataNew?.data);
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
          id={rowData.book_id}
        />
        <BtnDelete confirmDeleteData={confirmDeleteData} id={rowData.book_id} />
      </BoxAction>
    );
  };

  const columns = [
    { field: "nama", header: "Title", style: { width: "20%" } },
    { field: "file", header: "Link Book" },
    { body: actionBodyTemplate, header: "" },
  ];

  const globalFilterFields = ["nama", "file"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataManualBook}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Manual Book"
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataManualBook={setDataManualBook}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Manual Book"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataManualBook}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

// const manualBookDummy = [
//   {
//     title: "ISUZU ELF OWNER'S MANUAL (EURO 2)",
//     linkBook:
//       "https://uploads-ssl.webflow.com/60debe5ee0fe74c62dd2a66f/613984e0a0772c8bef055c64_Elf%20Owners%20manual_compressed%20(2).pdf",
//   },
//   {
//     title: "ISUZU ELF OWNER'S MANUAL (EURO 2)",
//     linkBook:
//       "https://uploads-ssl.webflow.com/60debe5ee0fe74c62dd2a66f/613984e0a0772c8bef055c64_Elf%20Owners%20manual_compressed%20(2).pdf",
//   },
//   {
//     title: "ISUZU ELF OWNER'S MANUAL (EURO 2)",
//     linkBook:
//       "https://uploads-ssl.webflow.com/60debe5ee0fe74c62dd2a66f/613984e0a0772c8bef055c64_Elf%20Owners%20manual_compressed%20(2).pdf",
//   },
//   {
//     title: "ISUZU ELF OWNER'S MANUAL (EURO 2)",
//     linkBrochure:
//       "https://uploads-ssl.webflow.com/60debe5ee0fe74c62dd2a66f/613984e0a0772c8bef055c64_Elf%20Owners%20manual_compressed%20(2).pdf",
//   },
//   {
//     title: "ISUZU ELF OWNER'S MANUAL (EURO 2)",
//     linkBook:
//       "https://uploads-ssl.webflow.com/60debe5ee0fe74c62dd2a66f/613984e0a0772c8bef055c64_Elf%20Owners%20manual_compressed%20(2).pdf",
//   },
// ];

export default OwnersManualBookContent;
