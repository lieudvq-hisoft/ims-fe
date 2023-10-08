"use client";
import { Button, Card, Form, Input } from "antd";
import React from "react";

const InfomationForm: React.FC = () => {
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Card
        style={{
          width: "auto",
          maxWidth: "450px",
          margin: "0 auto",
          padding: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 11 }}
          layout="horizontal"
          style={{ width: 500 }}
        >
          <Form.Item label="Tên tài khoản">
            <Input />
          </Form.Item>
          <Form.Item label="Họ">
            <Input />
          </Form.Item>
          <Form.Item label="Tên">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input />
          </Form.Item>
          <div
            style={{ display: "flex", paddingLeft: "80px", paddingTop: "20px" }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Lưu thông tin
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default InfomationForm;
