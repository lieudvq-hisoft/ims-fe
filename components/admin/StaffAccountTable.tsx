"use client";

import useSelector from "@hooks/use-selector";
import { TableColumnsType, Tag } from "antd";
import { Button, Space, Table, Tooltip } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import moment from "moment";
import { useRouter } from "next/router";
import { User } from "@models/user";

interface Props {
  onRowClick: (data: DataType) => void;
}

interface DataType {
  key: React.Key;
  id: string;
  phoneNumber?: string;
  userName: string;
  fullname?: string;
  email: string;
  address?: string;
  currenNoticeCount: number;
  roles: string[];
}

const StaffAccountTable: React.FC<Props> = (props) => {
  const {onRowClick} = props;
  const router = useRouter();
  const { userDataLoading, userData } = useSelector((state) => state.user);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      fixed: "left",
    },
    { title: "Staff Name", dataIndex: "fullname", key: "fullname" },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < userData?.data?.length; ++i) {
    data.push({
      key: userData?.data[i].id,
      id: userData?.data[i].id,
      phoneNumber: userData?.data[i].phoneNumber,
      userName: userData?.data[i].userName,
      fullname: userData?.data[i].fullname,
      email: userData?.data[i].email,
      address: userData?.data[i].address,
      currenNoticeCount: userData?.data[i].currenNoticeCount,
      roles: userData?.data[i].roles,
    });
  }

  return (
    <div className="shadow m-5">
      <Table
        loading={userDataLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 400 }}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onRowClick(record);
            },
          };
        }}
      />
    </div>
  );
};

export default StaffAccountTable;
