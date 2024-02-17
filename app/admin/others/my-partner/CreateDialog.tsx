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
import { useFetchTrigger } from "@/utils/useFetchData";
import axios from "axios";
import useToken from "@/utils/useToken";
import { InputTextarea } from "primereact/inputtextarea";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

type FormData = {
  nama: string;
  video: string;
  description: string;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataNew,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchTrigger] = useFetchTrigger<any>("/api/partner");
  const [token] = useToken();
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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nama", data.nama);
      formData.append("video", data.video);
      formData.append("description", data.description);

      const response = await axios.post(
        `${api_backend}/api/partner`,
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
          name="nama"
          control={control}
          rules={{ required: "Name is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="nama">Name</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.nama?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="video"
          control={control}
          rules={{ required: "Url Video is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="video">Url Video</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.video?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="description">Description</label>
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
                  {errors?.description?.message}
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
