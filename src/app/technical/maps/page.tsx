// trang của technical

"use client"
import React from "react";
import Home from "@/app/home/page";
import LocationPage from "@/components/api/rack-map/Map";
import { useEffect, useState } from "react";
import { getRackData } from "@/slices/location";
import { useSession } from "next-auth/react";
import useDispatch from "@/hooks/use-dispatch";

export default function page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const getData = () => {
    dispatch(
      getRackData({
        token: session?.user.access_token!,
      })
    )};

  useEffect(() => {
    session && getData();
  }, [session]);

  return (
    <Home
      content={
        <>
          <div style={{ padding: "14px" }}>
            <h1 style={{ paddingBottom: "10px", textAlign: "center" }}>
              SƠ ĐỒ RACK
            </h1>
            <LocationPage onRefresh={getData}/>
          </div>
        </>
      }
    />
  );
}
