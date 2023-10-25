"use client"

import React from "react";
import { useEffect, useState } from "react";
import Home from "../home/page";
import InfomationForm from "@/components/myaccount/InfomationForm";
import { getMyAccountInfo } from "@/slices/myAccount";
import { useSession } from "next-auth/react";
import useDispatch from "@/hooks/use-dispatch";
import { User } from "@/models/user";

//trang này chung, của tài khoản cá nhân

export default function page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const getData = () => {
    dispatch(
      getMyAccountInfo({
        token: session?.user.access_token!
      })
    );
  };

  useEffect(() => {
    session && getData();
  }, [session]);

  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              THÔNG TIN TÀI KHOẢN CÁ NHÂN
            </h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <InfomationForm />
          </div>
        </>
      }
    />
  );
}
