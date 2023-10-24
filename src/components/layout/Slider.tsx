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
import { useSession } from "next-auth/react";

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
  getItem("Sơ Đồ Server", "maps-tech", <TableOutlined />, [
    getItem("Khu A", "khuA", <TableOutlined />, [
      getItem("A1", "technical/maps"),
      getItem("A2", "A"),
    ]),
    getItem("Khu B", "khuB", <TableOutlined />, [
      getItem("B1", "B1"),
      getItem("B2", "B2"),
    ]),
  ]),
  getItem("Yêu cầu Khách hàng", "requests-tech", <SnippetsOutlined />, [
    getItem("Chờ xét duyệt", "technical/requests"),
    getItem("Thành công", ""),
    getItem("Thất bại", ""),
  ]),
  getItem("Customers", "sales/customers", <UserOutlined />),
  getItem("Tickets", "sales/tickets", <UserOutlined />),
  getItem("Tài khoản của tôi", "myaccount", <UserOutlined />),
];

const { Sider } = Layout;
const SliderComponent: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const { collapsed, sliderMenuItemSelectedKey } = useSelector(
    (state) => state.global
  );

  const getFilteredItems = (role: string) => {
    switch (role) {
      case "Admin":
        return items.filter((item) =>
          ["sub1", "myaccount"].some((str) =>
            String((item ?? { key: "" }).key).includes(str)
          )
        );
      case "Tech":
        return items.filter((item) =>
          ["requests-tech", "maps-tech", "myaccount"].some((str) =>
            String((item ?? { key: "" }).key).includes(str)
          )
        );

      case "Sale":
        return items.filter((item) =>
          ["sales/customers", "sales/tickets", "myaccount"].some((str) =>
            String((item ?? { key: "" }).key).includes(str)
          )
        );
      default:
        return []; // Nếu không phải Admin, Manager, Sale, trả về mảng rỗng
    }
  };

  return (
    <Sider
      className={className}
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
        items={getFilteredItems(session?.user?.role as string)}
        onSelect={async (info) => {
          dispatch(setSliderMenuItemSelectedKey(info.key));
          router.push(` ${info.key === "home" ? `/` : `/${info.key}`}`);
        }}
      />
    </Sider>
  );
};

export default SliderComponent;
