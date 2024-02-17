"use client";
import { CardAdmin } from "@/styles/styledComponents/GlobalStyled";
import React, { useEffect, useRef, useState } from "react";
import {
  ContainerSosmed,
  InputGroup,
  InputIcon,
  ListInputText,
  Title,
} from "./Styled";
import { InputText } from "primereact/inputtext";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { TbMailFilled } from "react-icons/tb";
import { BsWhatsapp } from "react-icons/bs";
import { Button } from "primereact/button";
import useToken from "@/utils/useToken";
import { useFetchTrigger, useFetchUmum } from "@/utils/useFetchData";
import { Toast } from "primereact/toast";
import axios from "axios";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

const SocialMediaContent = () => {
  const toast = useRef<any>(null);
  const [token] = useToken();
  const [dataSosmed, setDataSosmed] = useState<any>({
    facebook: "",
    whatsapp: "",
    twitter: "",
    instagram: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [sosmedData, loadingSosmedData] = useFetchUmum("/api/sosmed");
  const [fetchTrigger] = useFetchTrigger<any>("/api/sosmed");

  useEffect(() => {
    if (sosmedData && !loadingSosmedData) {
      setDataSosmed(sosmedData?.data);
    }
  }, [sosmedData, loadingSosmedData]);

  const showToast = (data: any) => {
    toast.current.show({
      severity: data.type,
      summary: data.title,
      detail: data.message,
      life: 3000,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataSosmed({
      ...dataSosmed,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.put(`${api_backend}/api/sosmed`, dataSosmed, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) {
      setLoading(false);
      const fetchDataNew = await fetchTrigger();
      await setDataSosmed(fetchDataNew?.data);
      await showToast({
        type: "success",
        title: "Success",
        message: "Berhasil Mengubah Data",
      });
    } else {
      setLoading(false);
      await showToast({
        type: "error",
        title: `Error ${response?.data?.code}`,
        message: response?.data?.message,
      });
    }
  };

  return (
    <>
      <CardAdmin style={{ minHeight: "100%" }}>
        <Toast ref={toast} />
        <ContainerSosmed>
          {/* <Title>Social Media</Title> */}
          <ListInputText>
            <InputGroup>
              <InputIcon>
                <FaFacebookF />
              </InputIcon>
              <InputText
                type="text"
                name="facebook"
                value={dataSosmed?.facebook}
                onChange={handleInputChange}
                placeholder="link facebook"
                style={{ width: "100%" }}
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaTwitter />
              </InputIcon>
              <InputText
                type="text"
                name="twitter"
                value={dataSosmed?.twitter}
                onChange={handleInputChange}
                placeholder="link twitter"
                style={{ width: "100%" }}
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <AiFillInstagram />
              </InputIcon>
              <InputText
                type="text"
                name="instagram"
                value={dataSosmed?.instagram}
                onChange={handleInputChange}
                placeholder="link instagram"
                style={{ width: "100%" }}
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <TbMailFilled />
              </InputIcon>
              <InputText
                type="text"
                name="email"
                value={dataSosmed?.email}
                onChange={handleInputChange}
                placeholder="email address"
                style={{ width: "100%" }}
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <BsWhatsapp />
              </InputIcon>
              <InputText
                type="text"
                name="whatsapp"
                value={dataSosmed?.whatsapp}
                onChange={handleInputChange}
                placeholder="nomor whatsapp"
                style={{ width: "100%" }}
              />
            </InputGroup>
            <Button
              label="Save"
              severity="danger"
              onClick={handleSubmit}
              loading={loading}
            />
          </ListInputText>
        </ContainerSosmed>
      </CardAdmin>
    </>
  );
};

export default SocialMediaContent;
