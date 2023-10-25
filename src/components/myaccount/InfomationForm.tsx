"use client";
import useSelector from "@/hooks/use-selector";
import { User } from "@/models/user";
import { setAccountInfo } from "@/slices/myAccount";
import { Button, Card, Form, Input } from "antd";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import authService from "@/services/user";
import { toast } from "react-toastify";
import useDispatch from "@/hooks/use-dispatch";
import Email from "next-auth/providers/email";

const InfomationForm: React.FC = () => {
  const [myAccount, setMyAccount] = useState<User | null>(null);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { myAccountInfo } = useSelector(
    (state) => state.myAccount
  );

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

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await authService.updateUserAccount(values, session?.user.access_token!)
      .then((result: User) => {
        dispatch(
          setAccountInfo(
            result
          )
        )
        toast.success("Update Account Info Success");
      })

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ["userName"]: myAccountInfo.userName,
            ["fullname"]: myAccountInfo.fullname,
            ["email"]: myAccountInfo.email,
            ["password"]: myAccountInfo.password,
            ["phoneNumber"]: myAccountInfo.phoneNumber,
            ["address"]: myAccountInfo.address
          }}
        >
          <Form.Item label="Tên tài khoản" name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tài khoản",
                whitespace: true
              }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Họ Và Tên" name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
                whitespace: true
              }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
                whitespace: true
              },
              {
                type: "email",
                message: "Vui lòng nhập email hợp lệ"
              }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
                whitespace: true
              },
              {
                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})"),
                message: "Vui lòng nhập mật khảu tối thiểu 8 ký tự, có chữ thường, chữ hoa và ký tự đặc biệt!"
              }]}>
            <Input placeholder="New Password" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
                whitespace: true
              },
              {
                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})"),
                message: "Vui lòng nhập mật khảu tối thiểu 8 ký tự, có chữ thường, chữ hoa và ký tự đặc biệt!"
              }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
                whitespace: true
              }]}>
            <Input />
          </Form.Item>

          <div
            style={{ display: "flex", paddingLeft: "80px", paddingTop: "20px" }}
          >
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item> */}
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
