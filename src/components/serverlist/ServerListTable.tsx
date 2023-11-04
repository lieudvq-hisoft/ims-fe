"use client";
import React, { useEffect, useState } from "react";
import { Button, Badge, Space, Table, Descriptions, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import CreateNewServer from "./CreateNewServer";
import { useRouter } from "next/navigation";
import useSelector from "@/hooks/use-selector";
import { ServerList, ServerListData } from "@/models/serverList";
import { PaginationParam } from "@/models/base";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { getServerListData } from "@/slices/serverList";

const ServerListTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<PaginationParam>({
    PageIndex: 1,
    PageSize: 10,
  } as PaginationParam);

  const router = useRouter();
  const { serverDataLoading, serverData } = useSelector(
    (state) => state.serverList
  );

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<ServerList[]>([]);

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

  const handleFilter = (status: string) => {
    setParamGet((prevParamGet) => ({
      ...prevParamGet,
      PageIndex: 1,
      status: status === "all" ? null : status,
    }));
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số thiết bị",
      children: 0,
    },
    {
      key: "2",
      label: "Đang hoạt động",
      children: 0,
    },
    {
      key: "3",
      label: "Tạm ngừng",
      children: 0,
    },
    {
      key: "4",
      label: "Ngừng hoạt động",
      children: 0,
    },
  ];

  const columns: ColumnsType<ServerList> = [
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Thay đổi gần nhất",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
    },
    {
      title: "IP Server",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        let badgeStatus;

        switch (text) {
          case "Ngừng hoạt động":
            badgeStatus = "error";
            break;
          case "Tạm ngừng":
            badgeStatus = "warning";
            break;
          case "Đang hoạt động":
            badgeStatus = "success";
            break;
          default:
            badgeStatus = "default";
        }

        return (
          <Badge
            status={badgeStatus as "error" | "warning" | "success" | "default"}
            text={text}
          />
        );
      },
    },

    {
      title: "Công suất (W)",
      dataIndex: "power",
      key: "power",
    },
    {
      title: "Kích thước (U)",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Người sở hữu",
      dataIndex: "customer",
      key: "customer",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Tùy Chọn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              router.push(`/technical/serverlist/server-detail`);
            }}
          >
            Chi tiết{" "}
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const newData = serverData?.data?.map((item) => ({
      id: item.id,
      dateCreated: item.dateCreated,
      dateUpdate: item.dateUpdate,
      ipAddress: item.ipAddress,
      size: item.size,
      power: item.power,
      customer: item.customer,
      status: item.status,
    }));

    if (filterStatus) {
      setFilteredData(
        newData?.filter((item) => item.status === filterStatus) ?? []
      );
    } else {
      setFilteredData(newData ?? []);
    }
  }, [serverData, filterStatus]);

  return (
    <>
      <Descriptions
        column={4}
        title="Thông số server"
        items={items}
        style={{ paddingLeft: "20px" }}
      />
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button onClick={() => handleFilter("all")}>Tất cả</Button>
        <Button onClick={() => handleFilter("Ongoing")}>Đang hoạt động</Button>
        <Button onClick={() => handleFilter("Stopped")}>Tạm ngừng</Button>
        <Button onClick={() => handleFilter("Ended")}>Ngừng hoạt động</Button>
        <Button onClick={() => handleFilter("Accepted")}>Chấp nhận</Button>
      </Space>
      <CreateNewServer />
      <Table
        pagination={false}
        loading={serverDataLoading}
        columns={columns}
        dataSource={filteredData}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      />
      {serverData.totalPage > 0 && (
        <Pagination
          style={{ paddingBottom: "15px" }}
          className="text-end m-5"
          current={paramGet.PageIndex}
          pageSize={serverData.pageSize ?? 10}
          total={serverData.totalSize}
          onChange={(page, pageSize) => {
            setParamGet((prevParamGet) => ({
              ...prevParamGet,
              PageIndex: page,
              PageSize: pageSize,
            }));
          }}
        />
      )}
    </>
  );
};

export default ServerListTable;
