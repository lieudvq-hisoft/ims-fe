// trang của technical

import React from "react";
import Home from "@/app/page";
import RequestListTable from "@/components/request/RequestListTable";
import SearchRequestList from "@/components/request/SearchRequestList";

export default function page() {
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
