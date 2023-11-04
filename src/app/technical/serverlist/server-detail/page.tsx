// trang của technical

"use client";
import React from "react";
import Home from "@/app/home/page";
import { Breadcrumb } from "antd";
import ServerDetailTable from "@/components/serverlist/ServerDetailTable";

export default function page() {
  return (
    <Home
      content={
        <>
          <Breadcrumb
            style={{ paddingTop: "10px", paddingLeft: "10px" }}
            separator=">"
            items={[
              {
                title: "Dashboard",
              },
              {
                title: "Danh sách Server",
              },
              {
                title: "Xem danh sách",
                href: "/technical/serverlist",
              },
              {
                title: "Xem chi tiết server",
              },
            ]}
          />
          <div style={{ paddingLeft: "10px" }}>
            <h1 style={{ paddingBottom: "10px" }}>IP Server</h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <ServerDetailTable />
          </div>
        </>
      }
    />
  );
}
