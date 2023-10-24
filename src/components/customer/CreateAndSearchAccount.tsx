"use client";
import React, { useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import Search from "antd/es/input/Search";
import CreateAccount from "./CreateAccount";
import CreateMultipleAccount from "./CreateMultipleAccount";
import { CustomerCreate } from "@/models/customer";
import customerService from "@/services/customer";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: CustomerCreate) => void; // Sửa lại chỗ này
  onCancel: () => void;
}

const onChange = (key: string) => {
  console.log(key);
};

const CreateModalForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title={<h2 style={{ textAlign: "center" }}>Tạo Tài Khoản Mới</h2>}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log("valuessss", values);
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Tabs defaultActiveKey="1" centered onChange={onChange}>
        <TabPane key={"1"} tab="Một">
          <CreateAccount form={form} />
        </TabPane>
        <TabPane key={"2"} tab="Nhiều">
          <CreateMultipleAccount />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

const CreateAndSearchAccount: React.FC<{ onRefresh: () => void }> = ({
  onRefresh,
}) => {
  const { data: session } = useSession();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const onSubmitCreateCustomer = async (values: CustomerCreate) => {
    await customerService
      .createCustomer(session?.user.access_token!, values)
      .then(() => {
        onRefresh();
        setCreateModalOpen(false);
        toast.success(`Create category successful`);
      })
      .catch((errors) => {
        toast.error(errors.response.values ?? "Create Customer failed");
      });
  };

  // const onCreate = (values: any) => {
  //   console.log("Received values of form: ", values);
  //   setOpen(false);
  // };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        type="primary"
        onClick={() => {
          setCreateModalOpen(true);
        }}
      >
        Tạo Tài Khoản Mới
      </Button>
      <CreateModalForm
        open={createModalOpen}
        onCreate={onSubmitCreateCustomer}
        onCancel={() => {
          setCreateModalOpen(false);
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong>Tìm kiếm khách hàng:</strong>{" "}
        <Search
          placeholder="Tìm kiếm"
          allowClear
          style={{
            marginLeft: "15px",
            width: 300,
          }}
        />
      </div>
    </div>
  );
};

export default CreateAndSearchAccount;
