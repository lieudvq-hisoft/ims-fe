"use client";
import React, { useEffect, useState } from "react";
import { Descriptions, Space, Table, Button, Pagination, Badge } from "antd";
import type { DescriptionsProps } from "antd";

import type { ColumnsType } from "antd/es/table";
import useSelector from "@/hooks/use-selector";
import { useRouter } from "next/navigation";
import { PaginationParam } from "@/models/base";
import { Request, RequestData } from "@/models/request";
import useDispatch from "@/hooks/use-dispatch";
import { useSession } from "next-auth/react";
import { getRequestData } from "@/slices/request";

interface DataType {
  id: string;
  dateCreated: string;
  companyName: string;
  type: string;
  customerId: string;
  status: string;
}

const RequestListTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [paramGet, setParamGet] = useState<PaginationParam>({
    PageIndex: 1,
    PageSize: 10,
  } as PaginationParam);

  const { requestDataLoading, requestData } = useSelector(
    (state) => state.request
  );

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Request[]>([]);

  const showEditTicketModal = () => {
    setOpen(true);
  };

  const getData = () => {
    dispatch(
      getRequestData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as RequestData;
      if (payload) {
        var res = payload as RequestData;
        if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
          setParamGet({ ...paramGet, PageIndex: res.totalPage });
        }
      }
    });
  };

  useEffect(() => {
    session && getData();
  }, [session, paramGet]);

  const handleFilter = (status: string) => {
    setParamGet((prevParamGet) => ({
      ...prevParamGet,
      PageIndex: 1,
      status: status === "all" ? null : status,
    }));
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tổng số thiết bị",
      children: 0,
    },
    {
      key: "2",
      label: "Đang hoạt động",
      children: 0,
    },
    {
      key: "3",
      label: "Tạm ngừng",
      children: 0,
    },
    {
      key: "4",
      label: "Ngừng hoạt động",
      children: 0,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Người tạo",
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Dịch vụ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "IP Server / Thiết bị",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        let badgeStatus;

        switch (text) {
          case "Chờ xét duyệt":
            badgeStatus = "processing";
            break;
          case "Đang hoạt động":
            badgeStatus = "warning";
            break;
          case "Thành công":
            badgeStatus = "success";
            break;
          case "Không thành công":
            badgeStatus = "error";
            break;
          default:
            badgeStatus = "default";
        }

        return (
          <Badge
            status={
              badgeStatus as
                | "error"
                | "warning"
                | "success"
                | "default"
                | "processing"
            }
            text={text}
          />
        );
      },
    },
    {
      title: "Tùy Chọn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              router.push(`/technical/requests/request-detail`);
            }}
          >
            Chi tiết{" "}
          </a>
          <a onClick={() => showEditTicketModal()}>Chỉnh sửa </a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];

  useEffect(() => {
    const newData = requestData?.data?.map((item) => ({
      id: item.id,
      dateCreated: item.dateCreated,
      companyName: item.companyName,
      type: item.type,
      customerId: item.customerId,
      status: item.status,
    }));

    if (filterStatus) {
      setFilteredData(
        newData?.filter((item) => item.status === filterStatus) ?? []
      );
    } else {
      setFilteredData(newData ?? []);
    }
  }, [requestData, filterStatus]);

  return (
    <>
      <Descriptions
        column={4}
        title="Thông số server"
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
        <Button onClick={() => handleFilter("Pending")}>Chờ xét duyệt</Button>
        <Button onClick={() => handleFilter("Ongoing")}>Đang hoạt động</Button>
        <Button onClick={() => handleFilter("Accepted")}>Thành công</Button>
        <Button onClick={() => handleFilter("Denied")}>Không thành công</Button>
        <Button onClick={() => handleFilter("Incomplete")}>
          Chưa hoàn thiện
        </Button>
      </Space>
      <Table
        pagination={false}
        loading={requestDataLoading}
        columns={columns}
        dataSource={filteredData}
      />
      {requestData.totalPage > 0 && (
        <Pagination
          style={{ paddingBottom: "15px" }}
          className="text-end m-5"
          current={paramGet.PageIndex}
          pageSize={requestData.pageSize ?? 10}
          total={requestData.totalSize}
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

export default RequestListTable;
