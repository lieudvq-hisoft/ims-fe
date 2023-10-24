"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Modal,
  DatePicker,
  Select,
  InputNumber,
  Space,
  Button,
} from "antd";
import { Typography } from "antd";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

const ViewDetailRequestForm: React.FC = () => {
  const [form] = Form.useForm();

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

  return (
    <>
      <Title style={{ paddingLeft: "300px" }} level={5}>
        Thông tin khách hàng
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
        }}
      >
        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ width: 500 }}
        >
          <Form.Item name="date-time-picker" label="Ngày tạo yêu cầu">
            <DatePicker
              style={{ width: "285px" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item name="date-picker" label="Ngày cấp phát">
            <DatePicker style={{ width: "285px" }} />
          </Form.Item>

          <Form.Item name="date-picker" label="Ngày ngưng server">
            <DatePicker style={{ width: "285px" }} />
          </Form.Item>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                defaultValue="china"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber
                disabled
                defaultValue={1}
                style={{ marginRight: "20px" }}
              />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>
          <div style={{ display: "flex", paddingLeft: "37px" }}>
            <Form.Item name="select" label="Loại yêu cầu">
              <Select
                style={{ width: "160px" }}
                placeholder="Please select a country"
                disabled
              >
                <Option value="china">Thuê chỗ</Option>
                <Option value="usa">Thêm 1U</Option>
                <Option value="usa">Công suất 100</Option>
                <Option value="usa">Cấp thêm IP</Option>
                <Option value="usa">Cân bằng tải</Option>
                <Option value="usa">Tạo rule fireware</Option>
                <Option value="usa">Cổng dự phòng</Option>
                <Option value="usa">Nâng cổng 100</Option>
                <Option value="usa">Tạo VLAN riêng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ paddingLeft: "29px" }}
              name={["user", "age"]}
              label="Số lượng"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber style={{ marginRight: "20px" }} />
            </Form.Item>
          </div>

          <Form.Item style={{ paddingRight: "150px" }} label="Ghi chú">
            <TextArea style={{ maxWidth: "700px", width: "341px" }} rows={4} />
          </Form.Item>
        </Form>
        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ width: 500 }}
        >
          <Form.Item label="Ngày giờ lên Data center" required>
            <DatePicker
              style={{ width: "285px" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Form.Item label="Lý do lên Data center">
            <Input style={{ width: "285px" }} />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <TextArea style={{ width: "285px", maxWidth: "300px" }} rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 9 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Xác nhận lịch hẹn
              </Button>
              <Button type="primary" danger htmlType="reset">
                Đặt lịch hẹn khác
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ViewDetailRequestForm;
