"use client";
import React from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { setSliderMenuItemSelectedKey } from "@/slices/global";
import {
  UserOutlined,
  TableOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import useDispatch from "@/hooks/use-dispatch";
import useSelector from "@/hooks/use-selector";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Accounts", "sub1", <UserOutlined />, [
    getItem("All Account", "admin/accounts"),
    getItem("Customer", "customer"),
    getItem("Manager", "manager"),
  ]),
  getItem("Sơ Đồ Server", "technical/maps", <TableOutlined />, [
    getItem("Xem toàn bộ sơ đồ", "technical/maps"),
    getItem("Khu A", "khuA", <TableOutlined />, [
      getItem("A1", "techical/maps/"),
      getItem("A2", "A"),
    ]),
    getItem("Khu B", "khuB", <TableOutlined />, [
      getItem("B1", "B1"),
      getItem("B2", "B2"),
    ]),
  ]),
  getItem("Yêu cầu Khách hàng", "technical/requests", <SnippetsOutlined />, [
    getItem("Đã duyệt", "technical/requests"),
    getItem("Ủy quyền", ""),
  ]),
  getItem("Customers", "sales/customers", <UserOutlined />),
  getItem("Tickets", "sales/tickets", <UserOutlined />),
  getItem("Tài khoản của tôi", "myaccount", <UserOutlined />),
];

const { Sider } = Layout;
const SliderComponent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { collapsed, sliderMenuItemSelectedKey } = useSelector(
    (state) => state.global
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        marginTop: "16px",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[sliderMenuItemSelectedKey]}
        items={items}
        onSelect={async (info) => {
          dispatch(setSliderMenuItemSelectedKey(info.key));
          router.push(` ${info.key === "home" ? `/` : `/${info.key}`}`);
        }}
      />
    </Sider>
  );
};

export default SliderComponent;
