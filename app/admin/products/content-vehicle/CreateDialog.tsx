"use client";

import React, { FC, useState } from "react";
import {
  ButtonGroup,
  CreateDialogContainer,
  FormGroup,
  FormInput,
  InfoError,
} from "./Styled";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import useToken from "@/utils/useToken";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

type Position = {
  name: string;
};

type FormData = {
  product_id: string | null;
  position: Position | null;
  text: string;
  image: File | null;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataNew,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [token] = useToken();
  const [fetchTrigger] = useFetchTrigger<any>("/api/product/content");
  const [vehicleData] = useFetchUmum("/api/product");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    return file || null;
  };

  const listPosition = ["Text Left", "Text Right"];

  const onSubmit = async (data: any) => {
    try {
       setLoading(true);
      const formData = new FormData();
      formData.append("product_id", data.product_id.product_id);
      formData.append("position", data.position.name);
      formData.append("text", data.text);
      formData.append("image", data.image as File);

      const response = await axios.post(
        `${api_backend}/api/product/content`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        const fetchDataNew = await fetchTrigger();
        await setDataNew(fetchDataNew?.data);
        await showToast({
          type: "success",
          title: "Success",
          message: "Berhasil Menambahkan Data",
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
          name="product_id"
          control={control}
          rules={{ required: "Vehicle is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="product_id">Vehicle</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  placeholder="Pilih Vehicle"
                  options={vehicleData?.data}
                  optionLabel="name"
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.product_id?.message}
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
              <label htmlFor="image">Image Content</label>
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
          name="position"
          control={control}
          rules={{ required: "Text Position is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="position">Pilih Text Position</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionLabel="name"
                  placeholder="Pilih Text Position"
                  options={listPosition.map((item) => ({ name: item }))}
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.position?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="text"
          control={control}
          rules={{ required: "Text is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="text">Text Content</label>
                <Editor
                  id={field.name}
                  value={field.value}
                  onTextChange={(e) => field.onChange(e.htmlValue)}
                  style={{ height: "320px" }}
                />
                <InfoError className="p-error">
                  {errors?.text?.message}
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
          <Button label="Save" type="submit" icon="pi pi-check" loading={loading}/>
        </ButtonGroup>
      </FormInput>
    </CreateDialogContainer>
  );
};

interface ICreateDialog {
  setVisible: (e: boolean) => void;
  setDataNew: (e: any) => void;
  showToast: (data: ToastData) => void;
}

interface ToastData {
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default CreateDialog;
