"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import {
  BodyCard,
  BtnDetail,
  Card,
  FooterCard,
  HeadCard,
  ItemInfoDetail,
  KeyInfo,
  ListInfoDetail,
  Name,
  Type,
  ValueInfo,
} from "./Styled";
import ImageCar3 from "./img-car-3.png";
import Image from "next/image";

const CardProduct: FC<ICardJob> = ({
  id,
  image,
  name,
  slug,
  type,
  gwv,
  cabin_to_end,
  max_power,
  max_torque,
}) => {
  const router = useRouter();

  return (
    <Card>
      <HeadCard>
        <Image
          src={image}
          alt=""
          width={100}
          height={100}
          layout="responsive"
          objectFit="contain"
          style={{
            maxWidth: "90%",
          }}
        />
      </HeadCard>
      <BodyCard>
        <Type>{type}</Type>
        <Name>{name}</Name>
        <ListInfoDetail>
          <ItemInfoDetail>
            <KeyInfo>GVW</KeyInfo>
            <ValueInfo>{gwv} Kg</ValueInfo>
          </ItemInfoDetail>
          <ItemInfoDetail>
            <KeyInfo>Cabin to end</KeyInfo>
            <ValueInfo>{cabin_to_end} mm</ValueInfo>
          </ItemInfoDetail>
          <ItemInfoDetail>
            <KeyInfo>Max. Power</KeyInfo>
            <ValueInfo>{max_power} PS</ValueInfo>
          </ItemInfoDetail>
          <ItemInfoDetail>
            <KeyInfo>Max. Torque</KeyInfo>
            <ValueInfo>{max_torque} Kgs</ValueInfo>
          </ItemInfoDetail>
        </ListInfoDetail>
      </BodyCard>
      <FooterCard>
        <BtnDetail onClick={() => router.push(`/products/${slug}`)}>
          Info Detail
        </BtnDetail>
      </FooterCard>
    </Card>
  );
};

interface ICardJob {
  id: number;
  image: string;
  name: string;
  slug: string;
  type: string;
  gwv: number;
  cabin_to_end: number;
  max_power: number;
  max_torque: number;
}
export default CardProduct;
