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
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { listDataFunction, listDataJenjang } from "@/utils/craeerDataList";
import { Dropdown } from "primereact/dropdown";

type Subtitle = {
  name: string;
};

type Status = {
  name: string;
};

type FormData = {
  title: string;
  subtitle: Subtitle | null;
  published: string;
  expired: string;
  link: string;
  location: string;
  status: Status | null;
  description: string;
  kualifikasi: string;
  persyaratan: string;
  benefit: string;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataNew,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const [postData] = usePostUmum("/api/career");
  const [fetchTrigger] = useFetchTrigger<any>("/api/career");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  // const [editorValue, setEditorValue] = useState<string>("");

  // const formatDate = (timestamp: number) => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     weekday: "short",
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     timeZoneName: "short",
  //     timeZone: "Asia/Jakarta",
  //   };
  //   const date = new Date(timestamp);
  //   const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
  //     date
  //   );
  //   return formattedDate;
  // };
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      data.published = Date.now().toString();
      const date = new Date(data.expired);
      const timestampString = date.getTime().toString();
      data.expired = timestampString;
      data.subtitle = data?.subtitle?.name;
      data.status = data?.status?.name;

      const response = await postData(data);
      if (response && response.code === 201) {
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
          name="subtitle"
          control={control}
          rules={{ required: "Function/Role is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="subtitle">Function/Role</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionLabel="name"
                  placeholder="Pilih Function/Role"
                  options={listDataFunction.map((item) => ({ name: item }))}
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.subtitle?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: "Level is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="status">Level</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  optionLabel="name"
                  placeholder="Pilih Level"
                  options={listDataJenjang.map((item) => ({ name: item }))}
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.status?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="expired"
          control={control}
          rules={{ required: "Expired is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="expired">Expired</label>
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  showIcon
                />
                <InfoError className="p-error">
                  {errors?.expired?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="link"
          control={control}
          rules={{ required: "Link is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="link">Link</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.link?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: "Location is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="location">Location</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.location?.message}
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
                <Editor
                  id={field.name}
                  value={field.value}
                  onTextChange={(e) => field.onChange(e.htmlValue)}
                  style={{ height: "320px" }}
                />
                <InfoError className="p-error">
                  {errors?.description?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="kualifikasi"
          control={control}
          rules={{ required: "Qualification is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="kualifikasi">Qualification</label>
                <Editor
                  id={field.name}
                  value={field.value}
                  onTextChange={(e) => field.onChange(e.htmlValue)}
                  style={{ height: "320px" }}
                />
                <InfoError className="p-error">
                  {errors?.kualifikasi?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="persyaratan"
          control={control}
          rules={{ required: "Requirements is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="persyaratan">Requirement</label>
                <Editor
                  id={field.name}
                  value={field.value}
                  onTextChange={(e) => field.onChange(e.htmlValue)}
                  style={{ height: "320px" }}
                />
                <InfoError className="p-error">
                  {errors?.persyaratan?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="benefit"
          control={control}
          rules={{ required: "Benefit is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="benefit">Benefit</label>
                <Editor
                  id={field.name}
                  value={field.value}
                  onTextChange={(e) => field.onChange(e.htmlValue)}
                  style={{ height: "320px" }}
                />
                <InfoError className="p-error">
                  {errors?.benefit?.message}
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
