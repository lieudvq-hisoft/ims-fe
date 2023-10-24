"use client";

import React from "react";
import { Form, Input, Select } from "antd";
import { Typography } from "antd";
import { FormInstance } from "antd/lib";

const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
  form: FormInstance<any>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const CreateAccount: React.FC<Props> = ({ form }) => {
  // const [form] = Form.useForm();

  const onFinish = (values: any) => {};

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Title type="danger" style={{ textAlign: "center" }} level={3}>
        Thêm Một Tài Khoản Mới
      </Title>
      <div style={{ textAlign: "center", paddingBottom: "15px" }}>
        <Text type="warning" strong>
          Những trường có dấu * là những trường bắt buộc
        </Text>
      </div>

      <Form.Item
        name="companyName"
        label="Tên công ty"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Tên công ty!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Loại công ty"
        name="companyTypeId"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Loại công ty!",
          },
        ]}
      >
        <Select placeholder="Chọn loại công ty">
          <Option value={1}>Doanh nghiệp tư nhân</Option>
          <Option value={2}>Công ty trách nhiệm hữu hạn một thành viên</Option>
          <Option value={3}>
            Công ty trách nhiệm hữu hạn từ hai thành viên trở lên
          </Option>
          <Option value={4}>Công ty cổ phần</Option>
          <Option value={5}>Công ty hợp danh</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fullname"
        label="Người đại diện"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Người đại diện!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="taxNumber"
        label="Mã số thuế"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Mã số thuế!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Địa chỉ!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Vui lòng nhập Email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          // {
          //   type: "string",
          //   message: "Vui lòng nhập chữ số từ 1 - 9",
          // },
          {
            required: true,
            message: "Vui lòng nhập Số điện thoại!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateAccount;
