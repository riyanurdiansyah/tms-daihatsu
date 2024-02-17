"use client";

import React, { FC, useEffect, useState } from "react";
import {
  ButtonGroup,
  CreateDialogContainer,
  FormGroup,
  FormInput,
  InfoError,
} from "./Styled";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import axios from "axios";
import useToken from "@/utils/useToken";
import { Dropdown } from "primereact/dropdown";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

type Type = {
  product_type_id: string;
  product_type_name: string;
};

type FormData = {
  image: File | null;
  image_bg: File | null;
  name: string;
  product_type_id: Type | null;
  gvw: string;
  cabin: string;
  max_power: string;
  max_torque: string;
  product_id: any;
};

const EditDialog: FC<IEditDialog> = ({
  setVisible,
  setDataNew,
  showToast,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataOld, loadingDataOld] = useFetchUmum(`/api/product/${id}`);
  const [fetchTrigger] = useFetchTrigger<any>("/api/product");
  const [categoryVehicleData] = useFetchUmum("/api/product/type");
  const [token] = useToken();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    if (dataOld) {
      setValue("name", dataOld?.data?.name);
      setValue(
        "product_type_id",
        categoryVehicleData?.data?.find(
          (item: Type) =>
            item.product_type_id === dataOld?.data?.product_type_id
        )
      );
      setValue("gvw", dataOld?.data?.gvw);
      setValue("cabin", dataOld?.data?.cabin);
      setValue("max_power", dataOld?.data?.max_power);
      setValue("max_torque", dataOld?.data?.max_torque);
      setValue("product_id", dataOld?.data?.product_id);
    }
  }, [dataOld, categoryVehicleData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    return file || null;
  };

  const onSubmit = async (data: any) => {
    try {
       setLoading(true);
      const formData = new FormData();
      formData.append("product_id", id);
      data.image != null && formData.append("image", data.image as File);
      data.image_bg != null &&
        formData.append("image_bg", data.image_bg as File);
      formData.append("name", data.name);
      formData.append("product_type_id", data.product_type_id.product_type_id);
      formData.append("gvw", data.gvw);
      formData.append("cabin", data.cabin);
      formData.append("max_power", data.max_power);
      formData.append("max_torque", data.max_torque);

      const response = await axios.put(`${api_backend}/api/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const fetchDataNew = await fetchTrigger();
        await setDataNew(fetchDataNew?.data);
        await showToast({
          type: "success",
          title: "Success",
          message: "Berhasil Mengubah Data",
        });
        setVisible(false);
      } else {
        await showToast({
          type: "error",
          title: `Error ${response?.data?.code}`,
          message: response?.data?.message,
        });
        setVisible(false);
      }
    } catch (error: any) {
      await showToast({
        type: "error",
        title: `Error ${error?.response?.data?.code}`,
        message: error?.response?.data?.message,
      });
      setVisible(false);
    }
  };

  return (
    <CreateDialogContainer>
      <FormInput onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.name?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const newFile = handleFileUpload(e);
                  setValue("image", newFile);
                }}
              />
            </FormGroup>
          )}
        />
        <Controller
          name="image_bg"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <label htmlFor="image_bg">Background</label>
              <input
                type="file"
                name="image_bg"
                onChange={(e) => {
                  const newFile = handleFileUpload(e);
                  setValue("image_bg", newFile);
                }}
              />
            </FormGroup>
          )}
        />
        <Controller
          name="product_type_id"
          control={control}
          rules={{ required: "Category is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="product_type_id">Category</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  placeholder="Pilih Category"
                  options={categoryVehicleData?.data}
                  optionLabel="product_type_name"
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.product_type_id?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="gvw"
          control={control}
          rules={{ required: "GWV is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="name">GWV</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.gvw?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="cabin"
          control={control}
          rules={{ required: "Cabin to end is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="cabin">Cabin to end</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.cabin?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="max_power"
          control={control}
          rules={{ required: "Max. Power is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="max_power">Max. Power</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.max_power?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="max_torque"
          control={control}
          rules={{ required: "Max Torque is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="max_torque">Max Torque</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.max_torque?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <ButtonGroup>
          <Button
            label="Cancel"
            icon="pi pi-times"
            text
            onClick={(e: any) => {
              e.preventDefault();
              setVisible(false);
            }}
          />
          <Button label="Save" type="submit" icon="pi pi-check" loading={loading} />
        </ButtonGroup>
      </FormInput>
    </CreateDialogContainer>
  );
};

interface IEditDialog {
  setVisible: (e: boolean) => void;
  setDataNew: (e: any) => void;
  showToast: (data: ToastData) => void;
  id: any;
}
interface ToastData {
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default EditDialog;
