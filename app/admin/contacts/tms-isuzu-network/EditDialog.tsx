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
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import useToken from "@/utils/useToken";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

type FormData = {
  name: string;
  subtitle: string;
  latitude: string;
  longitude: string;
  phone: string;
  location: string;
  dealer_id: any;
};

const EditDialog: FC<IEditDialog> = ({
  setVisible,
  setDataNew,
  showToast,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataOld, loadingDataOld] = useFetchUmum(`/api/dealer/${id}`);
  const [fetchTrigger] = useFetchTrigger<any>("/api/dealer");
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
      setValue("subtitle", dataOld?.data?.subtitle);
      setValue("latitude", dataOld?.data?.latitude.toString());
      setValue("longitude", dataOld?.data?.longitude.toString());
      setValue("phone", dataOld?.data?.phone);
      setValue("location", dataOld?.data?.location);
    }
  }, [dataOld]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      data.dealer_id = id;
      data.latitude = parseFloat(data.latitude);
      data.longitude = parseFloat(data.longitude);
      const response = await axios.put(`${api_backend}/api/dealer`, data, {
        headers: {
          "Content-Type": "application/json",
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
                <label htmlFor="title">Name</label>
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
          name="subtitle"
          control={control}
          rules={{ required: "Category is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="subtitle">Category</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.subtitle?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="latitude"
          control={control}
          rules={{ required: "Latitude is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="latitude">Latitude</label>
                <InputText
                  id={field.name}
                  defaultValue={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.latitude?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="longitude"
          control={control}
          rules={{ required: "Longitude is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="longitude">Longitude</label>
                <InputText
                  id={field.name}
                  defaultValue={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.longitude?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="phone">Phone</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.phone?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: "Address is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="location">Address</label>
                <InputTextarea
                  autoResize
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  rows={5}
                  cols={30}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.location?.message}
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
          <Button
            label="Save"
            type="submit"
            icon="pi pi-check"
            loading={loading}
          />
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
