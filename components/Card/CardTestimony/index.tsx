import React from "react";
import { Card, CardDesc, CardProfile, CardUserName, StarGroup } from "./Styled";
import ImgAvatarDefault from "./img-dummy-avatar.png";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";

const CardTestimony = () => {
  return (
    <Card>
      <CardProfile>
        <Image
          src={ImgAvatarDefault}
          alt=""
          layout="responsive"
          objectFit="contain"
          style={{
            borderRadius: "50%",
            maxWidth: "80px",
          }}
        />
        <CardUserName>Saripudin</CardUserName>
      </CardProfile>
      <CardDesc>
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        natus vero, laudantium cumque voluptatibus in, explicabo, odio commodi
        illo quis maxime enim iusto odit nisi nulla labore! Minima, provident
        tenetur!"
      </CardDesc>
      <StarReview />
    </Card>
  );
};

const colorStar = "#FDAA02";
const sizeStar = 20;

const StarReview = () => {
  return (
    <StarGroup>
      <TiStarFullOutline color={colorStar} size={sizeStar} />
      <TiStarFullOutline color={colorStar} size={sizeStar} />
      <TiStarFullOutline color={colorStar} size={sizeStar} />
      <TiStarFullOutline color={colorStar} size={sizeStar} />
      <TiStarFullOutline color={colorStar} size={sizeStar} />
    </StarGroup>
  );
};

export default CardTestimony;
