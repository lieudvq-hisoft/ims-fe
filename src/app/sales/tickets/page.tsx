// trang của sale

import React from "react";
import TicketListTable from "@/components/ticket/TicketListTable";
import SearchTicketList from "@/components/ticket/SearchTicketList";
import Home from "@/app/home/page";

export default function page() {
  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              DANH SÁCH YÊU CẦU
            </h1>
            <SearchTicketList />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <TicketListTable />
          </div>
        </>
      }
    />
  );
}
