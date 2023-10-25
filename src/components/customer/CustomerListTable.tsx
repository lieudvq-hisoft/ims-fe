"use client";
import React, { useState } from "react";
import { Space, Table, Modal, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditCustomerModal from "./EditCustomerModal";
import useSelector from "@/hooks/use-selector";
import { Customer, CustomerEdit } from "@/models/customer";
import { toast } from "react-toastify";
import customerService from "@/services/customer";
import { useSession } from "next-auth/react";
const { confirm } = Modal;

interface CustomerListTableProps {
  onRefresh: () => void;
}

const CustomerListTable: React.FC<CustomerListTableProps> = (props) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const { customersLoading: customerDataLoading, customers: customerData } = useSelector(
    (state) => state.customers
  );

  const showEditCustomerModal = (record: Customer) => {
    setCustomer(record);
    setOpen(true);
  };

  const onDeleteButtonClick = (customer: Customer) => {
    confirm({
      title: "Delete",
      content: (
        <Alert
          message="Do you want to delete this Customer?"
          description={`${customer.companyName}`}
          type="warning"
        />
      ),
      async onOk() {
        setLoadingSubmit(true);
        await customerService
          .deleteCustomer(session?.user.access_token!, customer.id)
          .then(() => {
            props.onRefresh();
            toast.success(`Delete blog successful`);
          })
          .catch((errors) => {
            toast.error(errors.response.data ?? "Delete blog failed");
            setLoadingSubmit(false);
          });
      },
      onCancel() {},
    });
  };

  const onUpdateButtonClick = async (values: CustomerEdit) => {
    if (customer?.id) {
      // sử dụng customer?.id để lấy id của đối tượng được chọn
      const updatedValues = { ...values, id: customer.id }; // tạo một đối tượng mới với id và các giá trị khác từ form
      customerService
        .updateCustomer(session?.user.access_token!, updatedValues)
        .then(() => {
          props.onRefresh();
          setOpen(false);

          toast.success(`Update category successful`);
        })
        .catch((errors) => {
          toast.error(errors.response.data ?? "Update category failed");
        });
    }
  };

  const columns: ColumnsType<Customer> = [
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
          <a onClick={() => onDeleteButtonClick(record)}>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: Customer[] = [];
  for (let i = 0; i < customerData?.data?.length; ++i) {
    data.push({
      key: customerData?.data[i].id,
      id: customerData?.data[i].id,
      companyName: customerData?.data[i].companyName,
      fullname: customerData?.data[i].fullname,
      address: customerData?.data[i].address,
      companyType: customerData?.data[i].companyType,
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
        onCreate={onUpdateButtonClick}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomerListTable;
