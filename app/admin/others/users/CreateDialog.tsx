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
import {
  useFetchTrigger,
  useFetchUmum,
  usePostUmum,
} from "@/utils/useFetchData";
import { Dropdown } from "primereact/dropdown";

type FormData = {
  username: string;
  email: string;
  password: string;
  role_id: number | null;
};

const CreateDialog: FC<ICreateDialog> = ({
  setVisible,
  setDataNew,
  showToast,
}) => {
   const [loading, setLoading] = useState(false);
  const [postData] = usePostUmum("/api/signup");
  const [fetchTrigger] = useFetchTrigger<any>("/api/user");
  const [roleData] = useFetchUmum("/api/role");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    try {
       setLoading(true);
      data.role_id = data.role_id.role_id;
      const response = await postData(data);

      if (response.code === 201) {
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
          name="password"
          control={control}
          rules={{ required: "Password is required." }}
          render={({ field, fieldState }) => (
            <>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ width: "100%" }}
                />
                <InfoError className="p-error">
                  {errors?.password?.message}
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
                  options={roleData?.data}
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
