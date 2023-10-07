"use client";

import React from "react";
import { useEffect, useState } from "react";
import Home from "../page";
import CustomerListTable from "@/components/customer/CustomerListTable";
import CreateAndSearchAccount from "@/components/customer/CreateAndSearchAccount";
import { getCustomerData } from "@/slices/customer";
import { useSession } from "next-auth/react";
import { ParamGet } from "@/models/base";
import { CustomerData } from "@/models/customer";
import useDispatch from "@/hooks/use-dispatch";
import { Provider } from "react-redux";
import store from "@/store";

// trang của sale

export default function page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<ParamGet>({
    PageIndex: 1,
    PageSize: 10,
  } as ParamGet);

  const getData = () => {
    dispatch(
      getCustomerData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as CustomerData;
      if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
        setParamGet({ ...paramGet, PageIndex: res.totalPage });
      }
    });
  };
  console.log("getData", getData);

  const onRefresh = () => {
    getData();
    // setLoadingSubmit(false);
  };

  useEffect(() => {
    session && getData();
  }, [session, paramGet]);

  return (
    <Home
      content={
        <>
          <>
            <div style={{ padding: "14px" }}>
              <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
                Danh Sách Khách Hàng
              </h1>
              <CreateAndSearchAccount />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <CustomerListTable />
            </div>
          </>
        </>
      }
    />
  );
}
