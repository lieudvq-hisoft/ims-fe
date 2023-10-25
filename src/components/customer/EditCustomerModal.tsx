"use client";
import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { Typography } from "antd";
import { Customer, CustomerEdit } from "@/models/customer";
const { Title } = Typography;

interface CollectionEditFormProps {
  open: boolean;
  onCreate: (values: CustomerEdit) => void;
  onCancel: () => void;
  customer: Customer | null;
}

const EditCustomerModal: React.FC<CollectionEditFormProps> = ({
  open,
  onCreate,
  onCancel,
  customer,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  }, [customer, form]);

  return (
    <Modal
      style={{ width: 1000 }}
      open={open}
      title={
        <Title type="danger" style={{ textAlign: "center" }} level={3}>
          CHỈNH SỬA THÔNG TIN KHÁCH HÀNG
        </Title>
      }
      okText="Lưu Thông Tin"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log("values", values);
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ width: 500 }}
        >
          <Form.Item label="Tên công ty" name="companyName">
            <Input />
          </Form.Item>
          <Form.Item label="Người đại diện" name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Mã số thuế" name="taxNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCustomerModal;
