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
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const WarrantyAndKsgContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataWarranty, setDataWarranty] = useState(null);
  const [loading, setloading] = useState(true);

  const [warrantyData, loadingWarrantyData] = useFetchUmum("/api/service");
  const [fetchTrigger] = useFetchTrigger<any>("/api/service");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  useEffect(() => {
    if (warrantyData && !loadingWarrantyData) {
      setDataWarranty(warrantyData?.data);
      setloading(false);
    }
  }, [warrantyData, loadingWarrantyData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const accept = async (id: any) => {
    const response = await axios.delete(`${api_backend}/api/service/${id}`, {
      headers: {
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response && response.data.code == 200) {
      const fetchDataNew = await fetchTrigger();
      await setDataWarranty(fetchDataNew?.data);
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
          id={rowData.service_id}
        />
        <BtnDelete
          confirmDeleteData={confirmDeleteData}
          id={rowData.service_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "title", header: "Title", style: { width: "20%" } },
    { field: "description", header: "Description" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["title"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataWarranty}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add New Warranty"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataWarranty}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Warranty"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataWarranty}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

// const warrantyDummy = [
//   {
//     title: "Garansi Isuzu Traga dan ELF",
//     description:
//       "<ul><li> Garansi kendaraan baru selama 36 bulan / 100.000 KM (yang mana tercapai terlebih dahulu). </li><li> Garansi mencakup biaya perbaikan, serta penggantian suku cadang dan bahan (kecuali baterai, ban, dan komponen yang habis terpakai) dan tidak termasuk suku cadang yang tidak ditanggung oleh PT. Isuzu Astra Motor Indonesia. </li><li> Masa garansi baterai selama 6 bulan / 10.000 KM (mana yang tercapai terlebih dahulu). </li><li> Masa garansi shock absorber selama 12 bulan / 20.000 KM (mana yang tercapai terlebih dahulu). </li></ul>",
//   },
//   {
//     title: "Garansi Isuzu GIGA",
//     description:
//       "<ul> <li> Garansi kendaraan baru GIGA FRR, FVR, FVM, GVR J, GVJ HP ABS selama 12 bulan / 50.000 KM (yang mana tercapai terlebih dahulu). </li> <li> Garansi kendaraan baru GIGA FVZ, GVZ dan GXK selama 12 bulan / 100.000 KM (yang mana tercapai terlebih dahulu). </li> <li> Masa garansi baterai selama 6 bulan / 10.000 KM (mana yang tercapai terlebih dahulu). </li> <li> Masa garansi shock absorber selama 12 bulan / 20.000 KM (mana yang tercapai terlebih dahulu). </li> </ul>",
//   },
//   {
//     title: "Kupon Servis Gratis Traga dan ELF",
//     description:
//       "<ul> <li> Perawatan Gratis diberikan pada jarak 5.000 KM dan 10.000 KM pertama yang bisa dilakukan di Bengkel Resmi Isuzu maupun Bengkel Mitra Isuzu. </li> <li> Perawatan kupon servis gratis 5.000 dan 10.000 KM sudah termasuk biaya jasa, part dan bahan. </li> <li> Batas waktu kupon gratis pertama 5.000 KM berlaku sampai 6 bulan sejak tanggal serah terima kendaraan atau jarak termpuh kendaraaan tidak melebihi 5.500 KM (mana yang tercapai terlebih dahulu). </li> <li> Batas waktu kupon gratis kedua 10.000 KM berlaku sampai 12 bulan sejak tanggal serah terima kendaraan atau jarak termpuh kendaraaan tidak melebihi 10.500 KM (yang mana tercapai terlebih dahulu). </li> </ul>",
//   },
//   {
//     title: "Kupon Servis Gratis GIGA",
//     description:
//       "<ul> <li> Perawatan Gratis diberikan pada jarak 1.000 KM dan 5.000 KM/10.000 KM (Euro 4) pertama yang dapat dilakukan di Bengkel Resmi Isuzu maupun Bengkel Mitra Isuzu. </li> <li> Perawatan kupon servis gratis 1.000 KM termasuk biaya jasa dan oli. </li> <li> Perawatan kupon servis gratis 5.000 KM (Euro 2) atau 10.000 (Euro 4) termasuk biaya jasa. </li> <li> Batas waktu kupon gratis pertama 1.000 KM berlaku sampai 1 bulan sejak tanggal serah terima kendaraan atau jarak termpuh kendaraaan tidak melebihi 1.500 KM (mana yang tercapai terlebih dahulu). </li> <li>Kupon Servis Gratis GIGA Batas waktu kupon gratis kedua 5.000 KM/10.000 KM (Euro 4) berlaku sampai 6 bulan sejak tanggal serah terima kendaraan atau jarak termpuh kendaraaan tidak melebihi 5.500 KM/ 10.500 KM (yang mana tercapai terlebih dahulu). </li> </ul>",
//   },
// ];

export default WarrantyAndKsgContent;
