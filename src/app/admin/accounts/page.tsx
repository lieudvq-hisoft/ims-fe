//trang của admin

import AccountTable from "@/components/account/AccountTable";
import React from "react";
import CreateAccountButton from "@/components/account/CreateAccountButton";
import Home from "@/app/home/page";

export default function page() {
  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              TÀI KHOẢN KHÁCH HÀNG
            </h1>
            <CreateAccountButton />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <AccountTable />
          </div>
        </>
      }
    />
  );
}
