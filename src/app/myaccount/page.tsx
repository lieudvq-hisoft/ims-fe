import React from "react";
import Home from "../home/page";
import InfomationForm from "@/components/myaccount/InfomationForm";

//trang này chung, của tài khoản cá nhân

export default function page() {
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
