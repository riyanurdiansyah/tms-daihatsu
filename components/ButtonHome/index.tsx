"use client";
import React, { useEffect, useState } from "react";
import {
  BtnClosePopup,
  BtnHomeWrapper,
  BtnToggleHome,
  CardPopupMenu,
  IconHome,
  ItemCardMenu,
  ItemMenuHome,
  ListCardMenu,
  ListMenuHome,
  MenuToggleHome,
  MenuTogleHomePopup,
} from "./Styled";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineCalculator } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import useDimensiLayar from "@/utils/useDimensiLayar";
import { useFetchUmum } from "@/utils/useFetchData";

const ButtonHome = () => {
  const pathname = usePathname();
  const [lebarLayar] = useDimensiLayar();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return <></>;
  }
  const [sosmedData] = useFetchUmum("/api/sosmed");

  const route = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const sizeIconMenu = 30;
  const sizeIconMenuPopup = 25;

  const handleClickMenu = (url: string) => {
    route.push(url);
    setShowMenu(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && showMenu && lebarLayar < 1200) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu, lebarLayar]);

  return (
    <>
      <BtnHomeWrapper>
        {lebarLayar >= 1200 && (
          <MenuToggleHome showMenu={showMenu}>
            <ListMenuHome showMenu={showMenu}>
              <ItemMenuHome
                onClick={() => handleClickMenu("/tms-isuzu-network")}
              >
                <HiOutlineMapPin size={sizeIconMenu} />
                Find Dealer
              </ItemMenuHome>
              <ItemMenuHome onClick={() => handleClickMenu("/brochures")}>
                <RiDownloadCloud2Line size={sizeIconMenu} />
                Download Brochure
              </ItemMenuHome>
              <ItemMenuHome onClick={() => handleClickMenu("/booking-service")}>
                <TbTruckDelivery size={sizeIconMenu} />
                Booking Service
              </ItemMenuHome>
              <ItemMenuHome
                onClick={() => handleClickMenu("/simulation-credit")}
              >
                <AiOutlineCalculator size={sizeIconMenu} />
                Credit Simulation
              </ItemMenuHome>
              <ItemMenuHome
                onClick={() =>
                  window.open(
                    `https://wa.me/${sosmedData?.data?.whatsapp}?text=Hallo TMS Isuzu, Saya ingin bertanya.`,
                    "_blank"
                  )
                }
              >
                <BiSupport size={sizeIconMenu} />
                Consultation
              </ItemMenuHome>
            </ListMenuHome>
          </MenuToggleHome>
        )}
        <BtnToggleHome
          onClick={() => setShowMenu(!showMenu)}
          showMenu={showMenu}
        >
          <IconHome />
        </BtnToggleHome>
      </BtnHomeWrapper>

      {lebarLayar < 1200 && showMenu && (
        <MenuTogleHomePopup>
          <CardPopupMenu>
            <BtnClosePopup onClick={() => setShowMenu(!showMenu)} />
            <ListCardMenu>
              <ItemCardMenu
                onClick={() => handleClickMenu("/tms-isuzu-network")}
              >
                <HiOutlineMapPin size={sizeIconMenuPopup} />
                Find Dealer
              </ItemCardMenu>
              <ItemCardMenu onClick={() => handleClickMenu("/brochures")}>
                <RiDownloadCloud2Line size={sizeIconMenuPopup} />
                Download Brochure
              </ItemCardMenu>
              <ItemCardMenu onClick={() => handleClickMenu("/booking-service")}>
                <TbTruckDelivery size={sizeIconMenuPopup} />
                Booking Service
              </ItemCardMenu>
              <ItemCardMenu
                onClick={() => handleClickMenu("/simulation-credit")}
              >
                <AiOutlineCalculator size={sizeIconMenuPopup} />
                Credit Simulation
              </ItemCardMenu>
              <ItemCardMenu
                onClick={() =>
                  window.open(
                    "https://wa.me/6281326017533?text=Hallo TMS Isuzu, Saya ingin bertanya.",
                    "_blank"
                  )
                }
              >
                <BiSupport size={sizeIconMenuPopup} />
                Consultation
              </ItemCardMenu>
            </ListCardMenu>
          </CardPopupMenu>
        </MenuTogleHomePopup>
      )}
    </>
  );
};

export default ButtonHome;
