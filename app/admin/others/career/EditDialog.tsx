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
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { parseStringToDate } from "@/utils/convertDate";
import { listDataFunction, listDataJenjang } from "@/utils/craeerDataList";
import { Dropdown } from "primereact/dropdown";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

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
  expired: Date | string;
  link: string;
  location: string;
  status: Status | null;
  description: string;
  kualifikasi: string;
  persyaratan: string;
  benefit: string;
  career_id: any;
};

const EditDialog: FC<IEditDialog> = ({
  setVisible,
  setDataNew,
  showToast,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataOld, loadingDataOld] = useFetchUmum(`/api/career/${id}`);
  const [fetchTrigger] = useFetchTrigger<any>("/api/career");
  const [token] = useToken();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    if (dataOld) {
      setValue("title", dataOld?.data?.title);
      setValue("subtitle", { name: dataOld?.data?.subtitle });
      setValue("published", dataOld?.data?.published);
      const parsedDate: Date | null = parseStringToDate(dataOld?.data?.expired);
      if (parsedDate !== null) {
        setValue("expired", parsedDate);
      }
      setValue("link", dataOld?.data?.link);
      setValue("location", dataOld?.data?.location);
      setValue("status", { name: dataOld?.data?.status });
      setValue("description", dataOld?.data?.description);
      setValue("kualifikasi", dataOld?.data?.kualifikasi);
      setValue("persyaratan", dataOld?.data?.persyaratan);
      setValue("benefit", dataOld?.data?.benefit);
      setValue("career_id", dataOld?.data?.career_id);
    }
  }, [dataOld]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      data.career_id = id;
      const date = new Date(data.expired);
      const timestampString = date.getTime().toString();
      data.expired = timestampString;
      data.subtitle = data?.subtitle?.name;
      data.status = data?.status?.name;

      const response = await axios.put(`${api_backend}/api/career`, data, {
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
          render={({ field }) => (
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
