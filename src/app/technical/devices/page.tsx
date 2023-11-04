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
import DeviceListTable from "@/components/device/DeviceListTable";

export default function page() {
  const dispatch = useDispatch();
  //   const { data: session } = useSession();
  //   const [paramGet, setParamGet] = useState<PaginationParam>({
  //     PageIndex: 1,
  //     PageSize: 10,
  //   } as PaginationParam);

  //   const { serverData } = useSelector((state) => state.serverList);

  //   const getData = () => {
  //     dispatch(
  //       getServerListData({
  //         token: session?.user.access_token!,
  //         paramGet: { ...paramGet },
  //       })
  //     ).then(({ payload }) => {
  //       var res = payload as ServerListData;
  //       if (payload) {
  //         var res = payload as ServerListData;
  //         if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
  //           setParamGet({ ...paramGet, PageIndex: res.totalPage });
  //         }
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     session && getData();
  //   }, [session, paramGet]);

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
                title: "Danh sách thiết bị khác",
              },
              {
                title: "Xem danh sách",
              },
            ]}
          />
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px" }}>Danh sách thiết bị khác</h1>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <DeviceListTable />
            {/* {serverData.totalPage > 0 && (
              <Pagination
                className="text-end m-4"
                current={paramGet.PageIndex}
                pageSize={serverData.pageSize ?? 10}
                total={serverData.totalSize}
                onChange={(page, pageSize) => {
                  setParamGet({
                    ...paramGet,
                    PageIndex: page,
                    PageSize: pageSize,
                  });
                }}
              />
            )} */}
          </div>
        </>
      }
    />
  );
}
