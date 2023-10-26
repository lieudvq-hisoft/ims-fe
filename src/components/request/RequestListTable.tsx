"use client";
import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useSelector from "@/hooks/use-selector";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  id: string;
  dateCreated: string;
  companyName: string;
  type: string;
  customerId: string;
  status: string;
}

const RequestListTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { requestDataLoading, requestData } = useSelector(
    (state) => state.request
  );

  const showEditTicketModal = () => {
    setOpen(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Tên công ty",
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Loại yêu cầu",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = "green";
        if (status === "Incomplete") {
          color = "geekblue";
        } else if (status === "Thất Bại") {
          color = "volcano";
        } else if (status === "Thành Công") {
          color = "green";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Tùy Chọn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              const rackId = e.currentTarget.getAttribute("data-rack-id");
              router.push(`/technical/requests/request-detail`);
            }}
          >
            Chi tiết{" "}
          </a>
          <a onClick={() => showEditTicketModal()}>Chỉnh sửa </a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < requestData?.data?.length; ++i) {
    data.push({
      key: requestData?.data[i].id,
      id: requestData?.data[i].id,
      dateCreated: requestData?.data[i].dateCreated,
      companyName: requestData?.data[i].companyName,
      type: requestData?.data[i].type,
      customerId: requestData?.data[i].customerId,
      status: requestData?.data[i].status,
    });
  }
  // {
  //   key: "1",
  //   createAt: "2014-12-24 23:12:00",
  //   company: "HiSoft",
  //   request: "Thuê chỗ",
  //   status: ["Thành Công"],
  // },
  // {
  //   key: "2",
  //   createAt: "2014-12-24 23:12:00",
  //   company: "HiSoft",
  //   request: "Cấp thêm IP",
  //   status: ["Thất Bại"],
  // },
  // {
  //   key: "3",
  //   createAt: "2014-12-24 23:12:00",
  //   company: "HiSoft",
  //   request: "Cấp thêm PORT",
  //   status: ["Đang Thực Hiện"],
  // },

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  return (
    <>
      <Table loading={requestDataLoading} columns={columns} dataSource={data} />
      {/* <EditTicketModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </>
  );
};

export default RequestListTable;
