"use client";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BodyCard,
  Card,
  FormGroup,
  FormLogin,
  HeadCard,
  InfoError,
  Invalid,
  LabelCheckbox,
  Remember,
  Subtitle,
  Title,
} from "./Styles";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

const CardLogin: FC<ICardLogin> = ({}) => {
  const { data, status } = useSession();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const resp = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (resp && resp.error != null) {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (loading) {
      if (data && data.user.code == 200) {
        redirect("/admin");
      } else {
        setLoading(false);
        setError(true);
      }
    }
  }, [data, status]);

  return (
    <Card>
      <HeadCard>
        <Title>Login</Title>
        <Subtitle>Please enter your details</Subtitle>
      </HeadCard>
      <BodyCard>
        <FormLogin onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required." }}
            render={({ field, fieldState }) => (
              <>
                <FormGroup className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setError(false);
                    }}
                    placeholder="Username"
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
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field, fieldState }) => (
              <>
                <FormGroup className="p-input-icon-left">
                  <i className="pi pi-lock" />
                  <InputText
                    id={field.name}
                    type="password"
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setError(false);
                    }}
                    placeholder="Password"
                    style={{ width: "100%" }}
                  />
                  <InfoError className="p-error">
                    {errors?.password?.message}
                  </InfoError>
                </FormGroup>
              </>
            )}
          />
          {/* <Remember>
            <Checkbox
              inputId="remember"
              onChange={() => {
                setRemember(!remember);
                setError(false);
              }}
              checked={remember}
            />
            <LabelCheckbox htmlFor="remember">Remember me</LabelCheckbox>
          </Remember> */}
          {error && <Invalid>* Akun tidak valid</Invalid>}
          <Button
            label="Log in"
            type="submit"
            severity="danger"
            loading={loading}
          />
        </FormLogin>
      </BodyCard>
    </Card>
  );
};

interface ICardLogin {}

export default CardLogin;
