import React, { FC } from "react";
import {
  BodyCard,
  BtnDownload,
  Card,
  HeadCard,
  IconDownload,
  Thumbnail,
  Title,
} from "./Styled";

const CardBrochure: FC<ICardBrocure> = ({ id, title, thumbnail, link }) => {
  return (
    <Card>
      <HeadCard>
        <Thumbnail
          src={thumbnail || "/no-image.png"}
          alt=""
          width={150}
          height={200}
        />
      </HeadCard>
      <BodyCard>
        <Title>{title}</Title>
        <BtnDownload>
          <IconDownload />
        </BtnDownload>
      </BodyCard>
    </Card>
  );
};

interface ICardBrocure {
  id: any;
  title: string;
  thumbnail: string;
  link: string;
}

export default CardBrochure;
