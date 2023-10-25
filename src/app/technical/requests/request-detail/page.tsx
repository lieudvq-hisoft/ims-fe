// trang của technical

"use client";
import React from "react";
import Home from "@/app/home/page";
import ViewDetailRequestForm from "@/components/request/ViewDetailRequestForm";

export default function page() {
  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              CHI TIẾT YÊU CẦU
            </h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <ViewDetailRequestForm />
          </div>
        </>
      }
    />
  );
}
