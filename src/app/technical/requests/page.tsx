// trang của technical

"use client";
import React, { useEffect, useState } from "react";
import Home from "@/app/home/page";
import RequestListTable from "@/components/request/RequestListTable";
import SearchRequestList from "@/components/request/SearchRequestList";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { PaginationParam } from "@/models/base";
import { getRequestData } from "@/slices/request";
import { RequestData } from "@/models/request";
import { Breadcrumb } from "antd";

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
                title: "Yêu cầu từ khách hàng",
              },
              {
                title: "Xem danh sách",
              },
            ]}
          />
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px" }}>Danh sách yêu cầu</h1>
          </div>
          <SearchRequestList />
          <div style={{ paddingTop: "10px" }}>
            <RequestListTable />
          </div>
        </>
      }
    />
  );
}
