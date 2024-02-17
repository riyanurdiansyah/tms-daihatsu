import React, { FC } from "react";
import { Action, BodyCard, Card, IconPdf, LinkCta, Title } from "./Styled";

const CardBook: FC<ICardBook> = ({ id, title, link }) => {
  return (
    <Card>
      <IconPdf />
      <BodyCard>
        <Title>{title}</Title>
        <Action>
          <LinkCta onClick={() => window.open(link, "_blank")}>Lihat</LinkCta>
          <LinkCta onClick={() => downloadFile(link, title)}>Unduh</LinkCta>
        </Action>
      </BodyCard>
    </Card>
  );
};

export const downloadFile = async (link: string, title: string) => {
  const fileUrl = link;
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
};

interface ICardBook {
  id: any;
  title: string;
  link: string;
}

export default CardBook;
