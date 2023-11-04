"use client";
import React, { useState } from "react";
import { Button, Badge, Space, Table, Descriptions, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import { useRouter } from "next/navigation";
import useSelector from "@/hooks/use-selector";
import { ServerList } from "@/models/serverList";
import { PaginationParam } from "@/models/base";

const DeviceListTable: React.FC = () => {
  const router = useRouter();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số thiết bị",
      children: "5",
    },
    {
      key: "2",
      label: "Đang hoạt động",
      children: "0",
    },
    {
      key: "3",
      label: "Tạm ngừng",
      children: "0",
    },
    {
      key: "4",
      label: "Ngừng hoạt động",
      children: "0",
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
      title: "Tên thiết bị",
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
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
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
          <a>Chỉnh sửa</a>
        </Space>
      ),
    },
  ];

  const data: ServerList[] = [];
  //   for (let i = 0; i < serverData?.data?.length; ++i) {
  //     data.push({
  //       id: serverData?.data[i].id,
  //       dateCreated: serverData?.data[i].dateCreated,
  //       dateUpdate: serverData?.data[i].dateUpdate,
  //       ipAddress: serverData?.data[i].ipAddress,
  //       size: serverData?.data[i].size,
  //       power: serverData?.data[i].power,
  //       customer: serverData?.data[i].customer,
  //       status: serverData?.data[i].status,
  //     });
  //   }

  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (status: string) => {
    const filtered =
      status === "all" ? data : data.filter((item) => item.status === status);
    setFilteredData(filtered);
    console.log("data", data);
    console.log(filtered);
  };

  return (
    <>
      <Descriptions
        column={4}
        title="Thông số thiết bị"
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
        <Button onClick={() => handleFilter("Đang hoạt động")}>
          Đang hoạt động
        </Button>
        <Button onClick={() => handleFilter("Tạm ngừng")}>Tạm ngừng</Button>
        <Button onClick={() => handleFilter("Ngừng hoạt động")}>
          Ngừng hoạt động
        </Button>
      </Space>
      <Table
        pagination={false}
        // loading={serverDataLoading}
        columns={columns}
        dataSource={data}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      />
    </>
  );
};

export default DeviceListTable;
