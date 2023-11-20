"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import useDispatch from "@hooks/use-dispatch";
import { getRackData } from "@slices/area";
import { Area } from "@models/area";
import {
  message,
  Modal,
  Alert,
  DescriptionsProps,
  Divider,
  Descriptions,
  Button,
} from "antd";
import ModalCreate from "@components/area/rack/ModalCreate";
import areaService from "@services/area";
import rackService from "@services/rack";
import ModalUpdate from "@components/area/rack/ModalUpdate";
import { useRouter } from "next/router";
import moment from "moment";
import { dateAdvFormat } from "@utils/constants";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import RackTable from "@components/area/rack/RackRender";
import { Rack, RackCreateModel, RackUpdateModel } from "@models/rack";
const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});
var itemBreadcrumbs: ItemType[] = [];
const { confirm } = Modal;

const AreaDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [areaDetail, setAreaDetail] = useState<Area | undefined>(undefined);
  const [rackUpdate, setRackUpdate] = useState<Rack>();
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<DescriptionsProps["items"]>(
    []
  );

  const getData = async () => {
    await areaService
      .getDataById(session?.user.access_token!, router.query.areaId + "")
      .then((res) => {
        setAreaDetail(res);
        var items = [] as DescriptionsProps["items"];
        items?.push({
          key: "1",
          label: "Id",
          children: res.id,
        });
        items?.push({
          key: "2",
          label: "Name",
          children: res.name,
        });
        items?.push({
          key: "3",
          label: "Row Count",
          children: res.rowCount,
        });
        items?.push({
          key: "4",
          label: "Column Count",
          children: res.columnCount,
        });
        items?.push({
          key: "6",
          label: "Date created",
          children: moment(res.dateCreated).format(dateAdvFormat),
        });
        items?.push({
          key: "7",
          label: "Date updated",
          children: moment(res.dateUpdated).format(dateAdvFormat),
        });
        setItemDetails(items);
      });
    dispatch(
      getRackData({
        token: session?.user.access_token!,
        id: router.query.areaId + "",
      })
    );
  };

  const createData = async (data: RackCreateModel) => {
    await rackService
      .createData(session?.user.access_token!, data)
      .then((res) => {
        message.success("Create successful!");
        getData();
      })
      .catch((errors) => {
        message.error(errors.response.data);
      })
      .finally(() => {
        setOpenModalCreate(false);
      });
  };

  const updateData = async (data: RackUpdateModel) => {
    await rackService
      .updateData(session?.user.access_token!, data)
      .then((res) => {
        message.success("Update successful!");
        getData();
      })
      .catch((errors) => {
        message.error(errors.message);
      })
      .finally(() => {
        setRackUpdate(undefined);
      });
  };

  const deleteComponent = (area: Area) => {
    confirm({
      title: "Delete",
      content: (
        <Alert
          message={`Do you want to delete with Id ${area.id}?`}
          // description={`${serverAllocation.id}`}
          type="warning"
        />
      ),
      async onOk() {
        setLoadingSubmit(true);
        await rackService
          .deleteData(session?.user.access_token!, area.id)
          .then(() => {
            getData();
            message.success(`Delete rack successful!`);
          })
          .catch((errors) => {
            message.error(errors.message ?? "Delete rack failed");
            setLoadingSubmit(false);
          });
      },
      onCancel() {},
    });
  };

  const handleBreadCumb = () => {
    itemBreadcrumbs = [];
    var items = router.asPath.split("/").filter((_) => _ != "");
    var path = "";
    items.forEach((element) => {
      path += `/${element}`;
      itemBreadcrumbs.push({
        href: path,
        title: element,
      });
    });
  };

  useEffect(() => {
    if (router.query.areaId && session) {
      getData();
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router.query.areaId]);
  return (
    <AntdLayoutNoSSR
      content={
        <>
          <div className="flex justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
            <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setOpenModalCreate(true);
              }}
            >
              Create
            </Button>
            {/* <SearchComponent
              placeholder="Search Name, Description..."
              setSearchValue={(value) =>
                setParamGet({ ...paramGet, SearchValue: value })
              }
            /> */}
          </div>
          <Divider orientation="left" plain>
            <h3>Area Information</h3>
          </Divider>{" "}
          <Descriptions className="p-5" items={itemDetails} />
          <RackTable
            area={areaDetail!}
            onEdit={(record) => {
              setRackUpdate(record!);
            }}
          />
          <ModalCreate
            open={openModalCreate}
            onClose={() => setOpenModalCreate(false)}
            onSubmit={(data: RackCreateModel) => {
              createData(data);
            }}
          />
          <ModalUpdate
            rack={rackUpdate!}
            onClose={() => setRackUpdate(undefined)}
            onSubmit={(data: RackUpdateModel) => {
              updateData(data);
            }}
          />
        </>
      }
    />
  );
};

export default AreaDetail;