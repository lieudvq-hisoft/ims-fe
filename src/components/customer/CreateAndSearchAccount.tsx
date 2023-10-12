"use client";
import React, { useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import Search from "antd/es/input/Search";
import CreateOneAccount from "./CreateOneAccount";
import CreateMoreAccount from "./CreateMoreAccount";
import { customerCreate } from "@/models/customer";
import customerService from "@/services/customer";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: customerCreate) => void; // Sửa lại chỗ này
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
          <CreateOneAccount form={form} />
        </TabPane>
        <TabPane key={"2"} tab="Nhiều">
          <CreateMoreAccount />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

const CreateAndSearchAccount: React.FC = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const onSubmitCreateCustomer = async (values: customerCreate) => {
    await customerService
      .createCustomer(session?.user.access_token!, values)
      .then(() => {
        onRefresh();
        toast.success(`Create category successful`);
      })
      .catch((errors) => {
        toast.error(errors.response.values ?? "Create Customer failed");
      });
  };
  const onRefresh = () => {
    // getData();
    setOpen(false);
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
          setOpen(true);
        }}
      >
        Tạo Tài Khoản Mới
      </Button>
      <CreateModalForm
        open={open}
        onCreate={onSubmitCreateCustomer}
        onCancel={() => {
          setOpen(false);
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
