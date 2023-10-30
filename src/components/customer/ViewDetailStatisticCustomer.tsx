"use client";
import React, { useState } from "react";
import { Space, Table, Modal, Drawer } from "antd";
import type { ColumnsType } from "antd/es/table";
import useSelector from "@/hooks/use-selector";

import { useRouter } from "next/navigation";
const { confirm } = Modal;

interface DataType {
  key: string;
  dateCreated: string;
  dateStop: number;
  model: string;
  IP: string;
}

const ViewDetailStatisticCustomer: React.FC = () => {
  const [openDrawerStatistic, setOpenDrawerStatistic] = useState(false);
  const router = useRouter();

  const { customersLoading: customerDataLoading, customers: customerData } =
    useSelector((state) => state.customers);

  const showDrawer = () => {
    setOpenDrawerStatistic(true);
  };

  const onClose = () => {
    setOpenDrawerStatistic(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "dateStop",
      key: "dateStop",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "IP Server",
      dataIndex: "IP",
      key: "IP",
    },
    {
      title: "Tùy Chọn",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <a onClick={showDrawer} key={`a-${item.id}`}>
            Chi tiết{" "}
          </a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      dateCreated: "John Brown",
      dateStop: 32,
      model: "New York No. 1 Lake Park",
      IP: "Cac",
    },
    {
      key: "2",
      dateCreated: "John Brown",
      dateStop: 32,
      model: "New York No. 1 Lake Park",
      IP: "Cac",
    },
  ];

  return (
    <>
      <Table
        loading={customerDataLoading}
        columns={columns}
        dataSource={data}
      />
      <Drawer
        width={760}
        placement="right"
        closable={false}
        onClose={onClose}
        open={openDrawerStatistic}
      ></Drawer>
    </>
  );
};

export default ViewDetailStatisticCustomer;
