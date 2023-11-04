"use client";
import React, { useEffect, useState } from "react";
import { Button, Badge, Space, Table, Descriptions, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DescriptionsProps } from "antd";
import { useRouter } from "next/navigation";
import useSelector from "@/hooks/use-selector";
import { PaginationParam } from "@/models/base";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { getDeviceData } from "@/slices/device";
import { Device, DeviceData } from "@/models/device";

const DeviceListTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<PaginationParam>({
    PageIndex: 1,
    PageSize: 10,
  } as PaginationParam);

  const router = useRouter();
  const { deviceDataLoading, deviceData } = useSelector(
    (state) => state.device
  );

  const [filterDeviceStatus, setFilterDeviceStatus] = useState<string | null>(
    null
  );

  const getData = () => {
    dispatch(
      getDeviceData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as DeviceData;
      if (payload) {
        var res = payload as DeviceData;
        if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
          setParamGet({ ...paramGet, PageIndex: res.totalPage });
        }
      }
    });
  };

  useEffect(() => {
    session && getData();
  }, [session, paramGet]);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số thiết bị",
      children: "5",
    },
    {
      key: "2",
      label: "Đang hoạt động",
      children: "0",
    },
    {
      key: "3",
      label: "Tạm ngừng",
      children: "0",
    },
    {
      key: "4",
      label: "Ngừng hoạt động",
      children: "0",
    },
  ];

  const columns: ColumnsType<Device> = [
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Thay đổi gần nhất",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        let badgeStatus;

        switch (text) {
          case "Ngừng hoạt động":
            badgeStatus = "error";
            break;
          case "Tạm ngừng":
            badgeStatus = "warning";
            break;
          case "Đang hoạt động":
            badgeStatus = "success";
            break;
          default:
            badgeStatus = "default";
        }

        return (
          <Badge
            status={badgeStatus as "error" | "warning" | "success" | "default"}
            text={text}
          />
        );
      },
    },

    {
      title: "Công suất (W)",
      dataIndex: "basePower",
      key: "basePower",
    },
    {
      title: "Kích thước (U)",
      dataIndex: "baseSize",
      key: "baseSize",
    },
    {
      title: "Vị trí",
      dataIndex: "rack",
      key: "rack",
    },

    {
      title: "Tùy Chọn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              // router.push(`/technical/serverlist/server-detail`);
            }}
          >
            Chi tiết{" "}
          </a>
          <a>Chỉnh sửa</a>
        </Space>
      ),
    },
  ];

  const [filteredDeviceData, setFilteredDeviceData] = useState<Device[]>([]);

  useEffect(() => {
    const newData = deviceData?.data?.map((item) => ({
      id: item.id,
      dateCreated: item.dateCreated,
      dateUpdate: item.dateUpdate,
      type: item.type,
      baseSize: item.baseSize,
      basePower: item.basePower,
      rack: item.rack,
      status: item.status,
    }));

    if (filterDeviceStatus) {
      setFilteredDeviceData(
        newData?.filter((item) => item.status === filterDeviceStatus) ?? []
      );
    } else {
      setFilteredDeviceData(newData ?? []);
    }
  }, [deviceData, filterDeviceStatus]);

  const handleFilter = (status: string) => {
    setParamGet((prevParamGet) => ({
      ...prevParamGet,
      PageIndex: 1,
      status: status === "all" ? null : status,
    }));
  };

  return (
    <>
      <Descriptions
        column={4}
        title="Thông số thiết bị"
        items={items}
        style={{ paddingLeft: "20px" }}
      />
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button onClick={() => handleFilter("all")}>Tất cả</Button>
        <Button onClick={() => handleFilter("Ongoing")}>Đang hoạt động</Button>
        <Button onClick={() => handleFilter("Stopped")}>Tạm ngừng</Button>
        <Button onClick={() => handleFilter("Ended")}>Ngừng hoạt động</Button>
      </Space>
      <Table
        pagination={false}
        loading={deviceDataLoading}
        columns={columns}
        dataSource={filteredDeviceData}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      />
      {deviceData.totalPage > 0 && (
        <Pagination
          style={{ paddingBottom: "15px" }}
          className="text-end m-5"
          current={paramGet.PageIndex}
          pageSize={deviceData.pageSize ?? 10}
          total={deviceData.totalSize}
          onChange={(page, pageSize) => {
            setParamGet((prevParamGet) => ({
              ...prevParamGet,
              PageIndex: page,
              PageSize: pageSize,
            }));
          }}
        />
      )}
    </>
  );
};

export default DeviceListTable;
