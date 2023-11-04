"use client";
import React, { useState } from "react";
import { Button, Badge, Space, Table, Descriptions, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import { useRouter } from "next/navigation";
import useSelector from "@/hooks/use-selector";
import { ServerList } from "@/models/serverList";
import { PaginationParam } from "@/models/base";

const AppoitmentListTable: React.FC = () => {
  const router = useRouter();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số thiết bị",
      children: "5",
    },
    {
      key: "2",
      label: "Chờ xét duyệt",
      children: "0",
    },
    {
      key: "3",
      label: "Sắp đến",
      children: "0",
    },
    {
      key: "4",
      label: "Hoàn thành",
      children: "0",
    },
    {
      key: "5",
      label: "Không thành công",
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
      title: "Người tạo",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "dateAppoitment",
      key: "dateAppoitment",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        let badgeStatus;

        switch (text) {
          case "Không hoàn thành":
            badgeStatus = "error";
            break;
          case "Sắp đến":
            badgeStatus = "warning";
            break;
          case "Hoàn thành":
            badgeStatus = "success";
            break;
          case "Chờ xét duyệt":
            badgeStatus = "processing";
            break;
          default:
            badgeStatus = "default";
        }

        return (
          <Badge
            status={
              badgeStatus as
                | "error"
                | "warning"
                | "success"
                | "default"
                | "processing"
            }
            text={text}
          />
        );
      },
    },

    {
      title: "Lý do lên",
      dataIndex: "power",
      key: "power",
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
        column={5}
        title="Thông số lịch hẹn"
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
        <Button onClick={() => handleFilter("Chờ xét duyệt")}>
          Chờ xét duyệt
        </Button>
        <Button onClick={() => handleFilter("Sắp đến")}>Sắp đến</Button>
        <Button onClick={() => handleFilter("Hoàn thành")}>Hoàn thành</Button>
        <Button onClick={() => handleFilter("Không hoàn thành")}>
          Không hoàn thành
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

export default AppoitmentListTable;
