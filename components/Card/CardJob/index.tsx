"use client";
import React, { FC } from "react";
import {
  BodyCard,
  BtnApply,
  BtnDetail,
  Card,
  CardImgBrand,
  FooterCard,
  HeadCard,
  JobExpired,
  JobQualification,
  JobRank,
  JobTitle,
  Jobcategory,
} from "./Styled";

import { BiTime } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { MdWorkOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { formatTimestampToDate } from "@/utils/convertDate";

const CardJob: FC<ICardJob> = ({
  id,
  title,
  category,
  rank,
  expired,
  location,
  link,
}) => {
  const router = useRouter();

  return (
    <Card>
      <HeadCard>
        <CardImgBrand />
      </HeadCard>
      <BodyCard>
        <JobTitle>{`${title} (${location})`}</JobTitle>
        <JobQualification>
          <Jobcategory>
            <MdWorkOutline color="#e7cccc" /> {category}
          </Jobcategory>
          <JobRank>
            <GoDotFill color="#e7cccc" /> {rank}
          </JobRank>
        </JobQualification>
        <JobExpired>
          <BiTime color="#e7cccc" />
          {formatTimestampToDate(expired)}
        </JobExpired>
      </BodyCard>
      <FooterCard>
        <BtnDetail onClick={() => router.push(`/career/${id}`)}>
          Lihat Detail
        </BtnDetail>
        <BtnApply onClick={() => window.open(link, "_blank")}>Lamar</BtnApply>
      </FooterCard>
    </Card>
  );
};

interface ICardJob {
  id: number;
  title: string;
  category: string;
  rank: string;
  expired: any;
  location: string;
  link: string;
}
export default CardJob;
