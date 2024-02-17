"use client";

import React, { FC, useState } from "react";
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
import { useFetchTrigger, usePostUmum } from "@/utils/useFetchData";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

type FormData = {
  name: string;
  subtitle: string;
  latitude: string;
  longitude: string;
  phone: string;
  location: string;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataNew,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [postData] = usePostUmum("/api/dealer");
  const [fetchTriggerNetwork] = useFetchTrigger<any>("/api/dealer");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      data.latitude = parseFloat(data.latitude);
      data.longitude = parseFloat(data.longitude);
      const response = await postData(data);
      if (response && response.code === 201) {
        const fetchDataNew = await fetchTriggerNetwork();
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
