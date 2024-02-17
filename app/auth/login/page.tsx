import React from "react";
import { ContainerLogin } from "./Styles";
import CardLogin from "@/components/Card/CardLogin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.code == 200) redirect("/admin");
  return (
    <div className="login-page-wrapper">
      <ContainerLogin>
        <CardLogin />
      </ContainerLogin>
    </div>
  );
}
