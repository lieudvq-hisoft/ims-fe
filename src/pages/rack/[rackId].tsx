"use client";
import { CaretLeftOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ModalReserve from "@components/area/rack/ModalReserve";
import RackDetail from "@components/area/rack/RackDetail";
import RackMapRender from "@components/area/rack/RackMapRender";
import PieChartComponent from "@components/chartComponent/Pie";
import { Rack, RackMap } from "@models/rack";
import area from "@services/rack";
import { ROLE_MANAGER, ROLE_TECH } from "@utils/constants";
import { areInArray } from "@utils/helpers";
import { Avatar, Button, List } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});

const AreaDetail: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rackDetail, setRackDetail] = useState<Rack | undefined>(undefined);
  const [rackMapList, setRackMapList] = useState<RackMap[]>([]);
  var available =
    rackMapList.filter((_) => !_.serverAllocation).length / rackMapList.length;
  var reserved =
    rackMapList.filter((_) => _.serverAllocation).length / rackMapList.length;
  var booked =
    rackMapList.filter((_) => _.requestedServerAllocation).length /
    rackMapList.length;

  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);
  const [openModalReserve, setOpenModalReserve] = useState<boolean>(false);

  const getData = async () => {
    await area
      .getRackById(session?.user.access_token!, router.query.rackId + "")
      .then((res) => {
        setRackDetail(res);
      });
    await area
      .getMapsById(session?.user.access_token!, router.query.rackId + "")
      .then((e) => setRackMapList([...e]));
  };

  const handleBreadCumb = () => {
    var itemBrs = [] as ItemType[];
    var items = router.asPath.split("/").filter((_) => _ != "");
    var path = "";
    items.forEach((element) => {
      switch (element) {
        case rackDetail?.id + "":
          path += `/${element}`;
          itemBrs.push({
            href: path,
            title: "Detail Information",
          });
          break;
        default:
          path += `/${element}`;
          itemBrs.push({
            href: path,
            title: element,
          });
          break;
      }
    });
    setItemBreadcrumbs(itemBrs);
  };

  useEffect(() => {
    if (router.query.rackId && session) {
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rackDetail]);

  useEffect(() => {
    if (router.query.rackId && session) {
      getData();
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router.query.rackId]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          {areInArray(session?.user.roles!, ROLE_TECH, ROLE_MANAGER) && (
            <>
              <div className="flex justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
                <div>
                  <Button
                    type="primary"
                    className="mb-2"
                    icon={<CaretLeftOutlined />}
                    onClick={() => router.back()}
                  ></Button>
                  <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
                </div>
                <Button
                  type="primary"
                  className="mr-2"
                  htmlType="submit"
                  onClick={() => {
                    setOpenModalReserve(true);
                  }}
                >
                  Reserve
                </Button>
              </div>

              <ModalReserve
                open={openModalReserve}
                onClose={() => setOpenModalReserve(false)}
                onSubmit={() => {
                  setOpenModalReserve(false);
                  getData();
                }}
              />

              <RackDetail rackDetail={rackDetail!} />
              <div className="flex ">
                <div className="w-2/3">
                  <RackMapRender rackMapList={rackMapList} />
                </div>
                <div className="w-1/3">
                  <PieChartComponent
                    data={[
                      { name: "Available", value: available, color: "#e1efd8" },
                      { name: "Booked", value: booked, color: "#c2e4ea" },
                      { name: "Reserved", value: reserved, color: "#fbe4d4" },
                    ]}
                  />
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  );
};

export default AreaDetail;
