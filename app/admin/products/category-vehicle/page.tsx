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

const CategoryVehicleContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataCategoryVehicle, setDataCategoryVehicle] = useState(
    categoryVehicleDataDummy.data
  );
  const [loading, setloading] = useState(true);

  const [categoryVehicleData, loadingCategoryVehicleData] =
    useFetchUmum("/api/product/type");
  const [fetchTrigger] = useFetchTrigger<any>("/api/product/type");
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idSelected, setIdSelected] = useState<any>(null);

  // useEffect(() => {
  //   if (categoryVehicleData && !loadingCategoryVehicleData) {
  //     setDataCategoryVehicle(categoryVehicleData?.data);
  //     setloading(false);
  //   }
  // }, [categoryVehicleData, loadingCategoryVehicleData]);

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
      `${api_backend}/api/product/type/${id}`,
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
      await setDataCategoryVehicle(fetchDataNew?.data);
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
          id={rowData.product_type_id}
        />
      </BoxAction>
    );
  };

  const columns = [
    { field: "product_type_name", header: "Category Vehicle" },
    { body: actionBodyTemplate, header: "", style: { width: "10%" } },
  ];

  const globalFilterFields = ["product_type_name"];

  return (
    <>
      <CardAdmin>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TableLayout
          data={dataCategoryVehicle}
          loading={loading}
          columns={columns}
          globalFilterFields={globalFilterFields}
          withSearchBar={true}
          withBtnAdd={true}
          setVisible={setVisible}
        />
        <Dialog
          header="Add Category Vehicle"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <CreateDialog
            setVisible={setVisible}
            setDataNew={setDataCategoryVehicle}
            showToast={showToast}
          />
        </Dialog>
        <Dialog
          header="Edit Category Vehicle"
          visible={visibleEdit}
          style={{ width: "30vw" }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditDialog
            setVisible={setVisibleEdit}
            setDataNew={setDataCategoryVehicle}
            showToast={showToast}
            id={idSelected}
          />
        </Dialog>
      </CardAdmin>
    </>
  );
};

const categoryVehicleDataDummy = {
  code: 200,
  message: "Data has been listed",
  data: [
    {
      product_type_id: "40a50fb9-e17f-499b-9d27-7fb96859a894",
      product_type_name: "Light Truck 6 Ban",
    },
    {
      product_type_id: "5642c397-4c16-4c56-ab6c-1b4af89fd6f3",
      product_type_name: "Light Truck 4 Ban",
    },
    {
      product_type_id: "770e26ba-b654-479b-b0d8-cd871011f7c0",
      product_type_name: "Pick Up",
    },
    {
      product_type_id: "96b15626-e012-4a29-b77d-378e8c3eb66e",
      product_type_name: "Medium Truck",
    },
    {
      product_type_id: "fc5ee3e0-1b33-444e-b1ff-3fbec756ecf8",
      product_type_name: "Light Commercial Vehicle",
    },
  ],
};

export default CategoryVehicleContent;
