"use client";

import React, { FC, useRef, useState } from "react";
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
import axios from "axios";
import useToken from "@/utils/useToken";
import { useFetchTrigger } from "@/utils/useFetchData";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

type FormData = {
  title: string;
  file: File | null;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataManualBook,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchTriggerManualBook] = useFetchTrigger<any>("/api/book");
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
      formData.append("nama", data.title);
      formData.append("file", data.file as File);

      const response = await axios.post(`${api_backend}/api/book`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.status === 201) {
        const fetchDataNew = await fetchTriggerManualBook();
        await setDataManualBook(fetchDataNew?.data);
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

    // Handle login logic here using data.title, data.link, and uploadedFiles
  };

  // const [file, setFile] = useState<File>();
  // const [imageUrl, setImageUrl] = useState<string>("");

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       console.error("something went wrong, check your console.");
  //       return;
  //     }

  //     const data: { fileUrl: string } = await res.json();
  //     setImageUrl(data.fileUrl);
  //   } catch (error) {
  //     console.error("something went wrong, check your console.");
  //   }
  // };

  return (
    <CreateDialogContainer>
      <FormInput onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="title">Title</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.title?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <label htmlFor="file">File</label>
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  const newFile = handleFileUpload(e);
                  setValue("file", newFile);
                }}
              />
            </FormGroup>
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
      {/* <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form> */}
    </CreateDialogContainer>
  );
};

interface ICreateDialog {
  setVisible: (e: boolean) => void;
  setDataManualBook: (e: any) => void;
  showToast: (data: ToastData) => void;
}

interface ToastData {
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default CreateDialog;
