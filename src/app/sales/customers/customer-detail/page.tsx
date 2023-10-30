// trang của technical

"use client";
import React from "react";
import Home from "@/app/home/page";
import ViewDetailStatisticCustomer from "@/components/customer/ViewDetailStatisticCustomer";

export default function page() {
  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              CHI TIẾT KHÁCH HÀNG
            </h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <ViewDetailStatisticCustomer />
          </div>
        </>
      }
    />
  );
}
