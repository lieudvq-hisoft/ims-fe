"use client";
import React, { useState } from "react";
import { Button, Badge, Space, Table, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import CreateNewServer from "./CreateNewServer";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  createAt: string;
  timeChange: string;
  ipServer: string;
  status: string;
  W: number;
  U: number;
  userName: string;
}

const ServerListTable: React.FC = () => {
  const router = useRouter();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số server",
      children: "Zhou Maomao",
    },
    {
      key: "2",
      label: "Đang hoạt động",
      children: "1810000000",
    },
    {
      key: "3",
      label: "Tạm ngừng",
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "4",
      label: "Ngừng hoạt động",
      children: "Hangzhou, Zhejiang",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Thay đổi gần nhất",
      dataIndex: "timeChange",
      key: "timeChange",
    },
    {
      title: "IP Server",
      dataIndex: "ipServer",
      key: "ipServer",
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
      dataIndex: "W",
      key: "W",
    },
    {
      title: "Kích thước (U)",
      dataIndex: "U",
      key: "U",
    },
    {
      title: "Người sở hữu",
      dataIndex: "userName",
      key: "userName",
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

  const data: DataType[] = [
    {
      key: "1",
      createAt: "2014-12-24 23:12:00",
      timeChange: "2014-12-24 23:12:00",
      ipServer: "192.168.1.10",
      W: 700,
      U: 1,
      userName: "username1",
      status: "Đang hoạt động",
    },
    {
      key: "2",
      createAt: "2014-12-24 23:12:00",
      timeChange: "2014-12-24 23:12:00",
      ipServer: "192.168.1.10",
      W: 700,
      U: 1,
      userName: "username1",
      status: "Ngừng hoạt động",
    },
    {
      key: "3",
      createAt: "2014-12-24 23:12:00",
      timeChange: "2014-12-24 23:12:00",
      ipServer: "192.168.1.10",
      W: 700,
      U: 1,
      userName: "username1",
      status: "Tạm ngừng",
    },
  ];

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
        <Button onClick={() => handleFilter("Đang hoạt động")}>
          Đang hoạt động
        </Button>
        <Button onClick={() => handleFilter("Tạm ngừng")}>Tạm ngừng</Button>
        <Button onClick={() => handleFilter("Ngừng hoạt động")}>
          Ngừng hoạt động
        </Button>
      </Space>
      <CreateNewServer />
      <Table
        columns={columns}
        dataSource={filteredData}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      />
    </>
  );
};

export default ServerListTable;
