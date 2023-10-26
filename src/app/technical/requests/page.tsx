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

export default function page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<PaginationParam>({
    PageIndex: 1,
    PageSize: 10,
  } as PaginationParam);

  const getData = () => {
    dispatch(
      getRequestData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as RequestData;
      if (payload) {
        var res = payload as RequestData;
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
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              YÊU CẦU ĐÃ DUYỆT
            </h1>
            <SearchRequestList />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <RequestListTable />
          </div>
        </>
      }
    />
  );
}
