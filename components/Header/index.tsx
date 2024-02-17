"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import LogoBrand from "./logo-brand.png";
import Link from "next/link";
import {
  HeaderContainer,
  HeaderLogoBrand,
  HeaderLogoColab,
  HeaderWrapper,
  IconToggle,
  ItemNavbar,
  LMMenu,
  LMenu,
  ListNavbar,
  MItemDropdown,
  MItemNavbar,
  MLMMenuDropdown,
  MListDropdown,
  MListNavbar,
  Navbar,
  NavbarMobileWrapper,
  ToggleMenu,
} from "./Styles";
import Hover from "../Hover";
import DropdownMenu from "../Hover/DropdownMenu";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useDimensiLayar from "@/utils/useDimensiLayar";
import { useFetchUmum } from "@/utils/useFetchData";

const Header = () => {
  const route = useRouter();
  const pathname = usePathname();
  const [lebarLayar] = useDimensiLayar();
  const [isShowNavbarMobile, setIsShowNavbarMobile] = useState(false);
  const [sosmedData] = useFetchUmum("/api/sosmed");

  const handleClickDropdown = (e: any) => {
    if (e == "/part-catalogue") {
      window.open(
        "https://parts.isuzu.astra.co.id/marketing/catalog/",
        "_blank"
      );
    } else if (e == "/customer-service") {
      window.open(
        `https://wa.me/${sosmedData?.data?.whatsapp}?text=Hallo TMS Isuzu, Saya ingin bertanya.`,
        "_blank"
      );
    } else {
      route.push(e);
    }
  };

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return <></>;
  }
  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderLogoColab>
            <Link href="/">
              {/* <Image
                src={lebarLayar > 766 ? `/logo-tms.png` : `/logo-colab.png`}
                alt={""}
                width="0"
                height="0"
                layout="responsive"
                objectFit="contain"
                style={{
                  minHeight: "30px",
                }}
              /> */}
            </Link>
          </HeaderLogoColab>
          <Navbar>
            <ListNavbar>
              {listMenu?.map((parent: any, index: number) =>
                parent?.child?.length > 0 ? (
                  <ItemNavbar key={index}>
                    <Hover
                      paddingTop={20}
                      topHover={30}
                      kananHover="auto"
                      kiriHover={0}
                      onHover={
                        <DropdownMenu
                          dataMenu={parent?.child}
                          handleClickDropdown={handleClickDropdown}
                        />
                      }
                    >
                      <LMenu href={parent?.url}>
                        {parent?.name}{" "}
                        <FaSortDown style={{ marginTop: "-3px" }} />
                      </LMenu>
                    </Hover>
                  </ItemNavbar>
                ) : (
                  <ItemNavbar key={index}>
                    <LMenu href={parent?.url}>{parent?.name}</LMenu>
                  </ItemNavbar>
                )
              )}
            </ListNavbar>
          </Navbar>
          <HeaderLogoBrand>
            <Link href="/" className="flex justify-end">
              {/* <Image src={LogoBrand} alt={""} height={30} /> */}
            </Link>
          </HeaderLogoBrand>
          <ToggleMenu
            onClick={() => setIsShowNavbarMobile(!isShowNavbarMobile)}
          >
            <IconToggle />
          </ToggleMenu>
        </HeaderContainer>
      </HeaderWrapper>
      <NavbarMobile
        isShow={isShowNavbarMobile}
        setIsShow={setIsShowNavbarMobile}
      />
    </>
  );
};

const NavbarMobile: FC<INavbarMobile> = ({ isShow, setIsShow }) => {
  const [activeIndices, setActiveIndices] = useState<any>([]);

  const toggleAnswer = (index: any) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i: any) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  const handleClickMenu = async (index: number, menuDropdown: boolean) => {
    if (!menuDropdown) {
      await setIsShow(false);
    } else {
      await toggleAnswer(index);
    }
  };
  return (
    <NavbarMobileWrapper isShow={isShow}>
      <MListNavbar>
        {listMenu?.map((parent: any, index: number) => (
          <MItemNavbar key={index}>
            <LMMenu
              href={parent?.url}
              onClick={() => handleClickMenu(index, parent?.child?.length > 0)}
              // active={activeIndices.includes(index) ? true : false}
            >
              {parent?.name}
              {parent?.child?.length > 0 &&
                (activeIndices.includes(index) ? (
                  <FaSortUp style={{ marginTop: "3px" }} />
                ) : (
                  <FaSortDown style={{ marginTop: "-3px" }} />
                ))}
            </LMMenu>
            {parent?.child?.length > 0 &&
              activeIndices.includes(index) &&
              parent?.child?.map((child: any, index: number) => (
                <MListDropdown>
                  <MItemDropdown>
                    <MLMMenuDropdown
                      href={child?.url}
                      onClick={() => handleClickMenu(index, false)}
                    >
                      {child?.name}
                    </MLMMenuDropdown>
                  </MItemDropdown>
                </MListDropdown>
              ))}
          </MItemNavbar>
        ))}
      </MListNavbar>
    </NavbarMobileWrapper>
  );
};

interface INavbarMobile {
  isShow: boolean;
  setIsShow: (e: boolean) => void;
}

const listMenu = [
  {
    name: "Products",
    url: "/products",
    child: [],
  },
  {
    name: "Resources",
    url: "",
    child: [
      {
        name: "Owners Manual Book",
        url: "/owners-manual",
      },
      {
        name: "Warranty & KSG",
        url: "/warranty-and-ksg",
      },
      {
        name: "Part Catalogue",
        url: "/part-catalogue",
      },
      {
        name: "Owning & Operation Cost",
        url: "/owning-and-operation-cost",
      },
    ],
  },
  {
    name: "Service",
    url: "/booking-service",
    child: [],
  },
  {
    name: "Contact",
    url: "",
    child: [
      {
        name: "TMS Isuzu Network",
        url: "/tms-isuzu-network",
      },
      {
        name: "Customer Service",
        url: "/customer-service",
      },
    ],
  },
  {
    name: "Career",
    url: "/career",
    child: [],
  },
];

export default Header;
