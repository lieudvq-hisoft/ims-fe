"use client";
import React, { useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditCustomerModal from "./EditCustomerModal";
import useSelector from "@/hooks/use-selector";
import { CustomerEdit } from "@/models/customer";
import { toast } from "react-toastify";
import customerService from "@/services/customer";
import { useSession } from "next-auth/react";

export interface DataType {
  key: React.Key;
  id: string;
  companyName: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  email: string;
  taxNumber: string;
}

const CustomerListTable: React.FC = () => {
  const [customer, setCustomer] = useState<DataType | null>(null);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const { customerDataLoading, customerData } = useSelector(
    (state) => state.customer
  );

  const showEditCustomerModal = (record: DataType) => {
    setCustomer(record);
    setOpen(true);
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const onUpdate = async (values: CustomerEdit) => {
    if (customer?.id) {
      // sử dụng customer?.id để lấy id của đối tượng được chọn
      const updatedValues = { ...values, id: customer.id }; // tạo một đối tượng mới với id và các giá trị khác từ form
      customerService
        .updateCustomer(session?.user.access_token!, updatedValues)
        .then(() => {
          toast.success(`Update category successful`);
        })
        .catch((errors) => {
          toast.error(errors.response.data ?? "Update category failed");
        });
    }
  };
  const onRefresh = () => {
    // getData();
    setOpen(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên công ty",
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Người đại diện",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Tùy Chọn",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>Chi tiết </a>
          <a onClick={() => showEditCustomerModal(record)}>Chỉnh sửa </a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < customerData?.data?.length; ++i) {
    data.push({
      key: customerData?.data[i].id,
      id: customerData?.data[i].id,
      companyName: customerData?.data[i].companyName,
      fullname: customerData?.data[i].fullname,
      address: customerData?.data[i].address,
      phoneNumber: customerData?.data[i].phoneNumber,
      email: customerData?.data[i].email,
      taxNumber: customerData?.data[i].taxNumber,
    });
  }

  return (
    <>
      <Table
        loading={customerDataLoading}
        columns={columns}
        dataSource={data}
      />
      <EditCustomerModal
        customer={customer}
        open={open}
        onCreate={onUpdate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomerListTable;
