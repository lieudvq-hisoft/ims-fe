// trang của technical

"use client";
import React, { useEffect, useState } from "react";
import Home from "@/app/home/page";
import { Breadcrumb } from "antd";
import ServerListTable from "@/components/serverlist/ServerListTable";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { PaginationParam } from "@/models/base";
import { getServerListData } from "@/slices/serverList";
import { ServerListData } from "@/models/serverList";

export default function page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<PaginationParam>({
    PageIndex: 1,
    PageSize: 10,
  } as PaginationParam);

  const getData = () => {
    dispatch(
      getServerListData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as ServerListData;
      if (payload) {
        var res = payload as ServerListData;
        if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
          setParamGet({ ...paramGet, PageIndex: res.totalPage });
        }
      }
    });
  };

  useEffect(() => {
    session && getData();
  }, [session, paramGet]);

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
