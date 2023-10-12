"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Space, Dropdown } from "antd";
import { signOut } from "next-auth/react";

const Ava: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "0",
    },
    {
      label: (
        <span
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </span>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Space>
        <Avatar size="default" icon={<UserOutlined />}>
          Trần Anh Tuấn
        </Avatar>
      </Space>
    </Dropdown>
  );
};

export default Ava;
