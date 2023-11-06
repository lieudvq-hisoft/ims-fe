// trang của technical

"use client";
import React, { useEffect, useState } from "react";
import Home from "@/app/home/page";
import { Breadcrumb, Pagination } from "antd";
import ServerListTable from "@/components/serverlist/ServerListTable";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { PaginationParam } from "@/models/base";
import { getServerListData } from "@/slices/serverList";
import { ServerListData } from "@/models/serverList";
import useSelector from "@/hooks/use-selector";

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
              },
            ]}
          />
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px" }}>Danh sách Server</h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <ServerListTable />
          </div>
        </>
      }
    />
  );
}
