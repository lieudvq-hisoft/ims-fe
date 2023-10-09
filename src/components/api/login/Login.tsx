"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import styles from "@/styles/login.module.css";
import { Card } from "antd/lib";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginComponent: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res: any = await signIn("cusCredentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });
    if (res.error) {
      return toast.error(res.error);
    } else {
      return router.push("/");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "90vh" }}>
      <Col span={6}>
        <Card className={styles["login-card"]}>
          <h1 style={{ textAlign: "center" }}>LOGIN</h1>
          <Form
            name="normal_login"
            className={styles["login-form"]}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                style={{ float: "right" }}
                href=""
              >
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginComponent;
