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

type FormData = {
  username: string;
  email: string;
  password: string;
  role_id: number | null;
  user_id: number | null;
};

const EditDialog: FC<IEditDialog> = ({
  setVisible,
  setDataNew,
  showToast,
  id,
}) => {
   const [loading, setLoading] = useState(false);
  const [dataOld, loadingDataOld] = useFetchUmum(`/api/user/${id}`);
  const [fetchTrigger] = useFetchTrigger<any>("/api/user");
  const [userData] = useFetchUmum("/api/role");
  const [token] = useToken();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    if (dataOld) {
      setValue(
        "role_id",
        userData?.data?.find(
          (item: any) => item.role_id === dataOld?.data?.role.role_id
        )
      );
      setValue("username", dataOld?.data?.username);
      setValue("email", dataOld?.data?.email);
      setValue("user_id", dataOld?.data?.user_id);
    }
  }, [dataOld, userData]);

  const onSubmit = async (data: any) => {
    try {
       setLoading(true);
      data.role_id = data.role_id.role_id;
      data.user_id = id;

      const response = await axios.put(`${api_backend}/api/user`, data, {
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
          name="username"
          control={control}
          rules={{ required: "Username is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="username">Username</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.username?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.email?.message}
                </InfoError>
              </FormGroup>
            </>
          )}
        />

        <Controller
          name="role_id"
          control={control}
          rules={{ required: "Role is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="role_id">Role</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  placeholder="Pilih Role"
                  options={userData?.data}
                  optionLabel="role"
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <InfoError className="p-error">
                  {errors?.role_id?.message}
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
