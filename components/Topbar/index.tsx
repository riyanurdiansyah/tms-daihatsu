"use client";

import React from "react";
import {
  Avatar,
  BtnLogout,
  BtnTogle,
  IconLogout,
  IconTogle,
  Left,
  Name,
  Profile,
  Right,
  TopbarWrapper,
} from "./Styled";
import { usePathname } from "next/navigation";
import BreadcrumbAdmin from "../Breadcrumb/BreadcrumbAdmin";
import Image from "next/image";
import ImgAvatarAdmin from "./img-avatar-admin.jpg";
import { signOut, useSession } from "next-auth/react";

const Topbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const dataArray = pathname
    .split("/")
    .filter((item) => item !== "")
    .map((item) => item.replace(/-/g, " "));

  return (
    <TopbarWrapper>
      <Left>
        <BtnTogle>
          <IconTogle />
        </BtnTogle>
        <BreadcrumbAdmin data={dataArray} />
      </Left>
      <Right>
        <BtnLogout onClick={() => signOut()}>
          <IconLogout />
        </BtnLogout>
        <Profile>
          <Name>{session?.user?.data?.username}</Name>
          <Avatar>
            <Image
              src={ImgAvatarAdmin}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </Avatar>
        </Profile>
      </Right>
    </TopbarWrapper>
  );
};

export default Topbar;
