"use client";
import React, { useState } from "react";
import {
  Badge,
  Table,
  Descriptions,
  Col,
  Row,
  Divider,
  Card,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import CreateNewServer from "./CreateNewServer";
import { useRouter } from "next/navigation";
import useSelector from "@/hooks/use-selector";
import { ServerList } from "@/models/serverList";

const { Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns1: ColumnsType<DataType> = [
  {
    title: "Lần gia hạn",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data1: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data1.push({
    key: i,
    name: `${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const ServerDetailTable: React.FC = () => {
  const router = useRouter();

  const { serverDataLoading, serverData } = useSelector(
    (state) => state.serverList
  );

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Khách Hàng",
      children: "customer1",
    },
    {
      key: "2",
      label: "Tên Server",
      children: "Dell Power R450",
    },
    {
      key: "3",
      label: "Serial Number",
      children: "3V1PQR3",
    },
    {
      key: "4",
      label: "Công suất",
      children: "300W",
    },
    {
      key: "5",
      label: "Kích thước",
      children: "1U",
    },
    {
      key: "6",
      label: "Ví trí (Rack)",
      children: "A1-1",
    },
    {
      key: "7",
      label: "Ngày tạo",
      children: "15/03/2023 10:30",
    },
    {
      key: "8",
      label: "Ngày ngừng dịch vụ",
      children: "15/09/2023 10:30",
    },
    {
      key: "9",
      label: "Biên bản giao - nhận",
      children: <a>[Mã biên bản]</a>,
    },
  ];

  const ipTable: ColumnsType<ServerList> = [
    {
      title: "Ngày thực hiện",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Nội dung",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
    },
    {
      title: "IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Trạng thái",
      dataIndex: "power",
      key: "power",
    },
    {
      title: "Biên bản nghiệm thu",
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
  ];

  const portTable: ColumnsType<ServerList> = [
    {
      title: "Ngày thực hiện",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Nội dung",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
    },
    {
      title: "Port",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Trạng thái",
      dataIndex: "power",
      key: "power",
    },
    {
      title: "Biên bản nghiệm thu",
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
  ];

  const data: ServerList[] = [];

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
        column={2}
        items={[
          {
            key: "1",
            label: <Text strong>Ngày tạo</Text>,
            children: "15/03/2023 10:30",
          },
        ]}
        style={{ paddingLeft: "20px" }}
      />

      <Row>
        <Col style={{ paddingRight: "5px" }} span={12}>
          <Card>
            <Descriptions
              column={2}
              title="Thông số server"
              items={items}
              style={{ paddingLeft: "20px" }}
            />
          </Card>
        </Col>
        <Col style={{ paddingLeft: "5px" }} span={12}>
          <Card style={{ height: "300px" }}>
            <Table
              pagination={false}
              columns={columns1}
              dataSource={data1}
              scroll={{ y: 170 }}
            />
          </Card>
        </Col>
      </Row>
      <Divider orientation="center" plain>
        Thống kê thiết bị
      </Divider>
      <CreateNewServer />
      <Row>
        <Col style={{ paddingRight: "5px" }} span={12}>
          <Table
            loading={serverDataLoading}
            columns={ipTable}
            dataSource={data}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          />
        </Col>
        <Col style={{ paddingLeft: "5px" }} span={12}>
          <Table
            loading={serverDataLoading}
            columns={portTable}
            dataSource={data}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ServerDetailTable;
