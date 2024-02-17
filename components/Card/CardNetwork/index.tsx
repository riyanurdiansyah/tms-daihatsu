import React, { FC } from "react";
import { Address, Card, Jenis, Name, Phone } from "./Styled";

const CardNetwork: FC<ICardNetwork> = ({ name, jenis, address, phone }) => {
  return (
    <Card>
      <Name>{name}</Name>
      <Jenis>{jenis}</Jenis>
      <Address>{address}</Address>
      <Phone>{phone}</Phone>
    </Card>
  );
};

interface ICardNetwork {
  name: string;
  jenis: string;
  address: string;
  phone: string;
}

export default CardNetwork;
