"use client";

import useSelector from "@hooks/use-selector";
import { dateAdvFormat, requestUpgradeStatus } from "@utils/constants";
import { Divider, TableColumnsType, Tag } from "antd";
import { Button, Space, Table, Tooltip } from "antd";
import { BiEdit, BiSolidCommentDetail } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { RequestUpgrade } from "@models/requestUpgrade";
import { useRouter } from "next/router";
import { ComponentObj } from "@models/component";

interface Props {
  serverAllocationId?: string;
  urlOncell?: string;
  onEdit: (data: RequestUpgrade) => void;
  onDelete: (data: RequestUpgrade) => void;
}

interface DataType {
  key: React.Key;
  id: number;
  information: string;
  status: string;
  capacity: number;
  serverAllocationId: number;
  componentId: number;
  component: ComponentObj;
  dateCreated: string;
  dateUpdated: string;
}

const RequestUpgradeTable: React.FC<Props> = (props) => {
  const { onEdit, onDelete, urlOncell } = props;
  const router = useRouter();
  const { requestUpgradeDataLoading, requestUpgradeData } = useSelector(
    (state) => state.requestUpgrade
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <p className="text-[#b75c3c] hover:text-[#ee4623]">{text}</p>
      ),
      // onCell: (record, rowIndex) => {
      //   return {
      //     onClick: (ev) => {
      //       router.push(`${urlOncell}/requestUpgrade/${record.id}`);
      //     },
      //   };
      // },
    },
    {
      title: "Component",
      key: "component",
      render: (record: RequestUpgrade) => (
        <p>{`${record.component?.name} - ${record.component?.unit} - ${record.component?.type}`}</p>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: "Status",
      // dataIndex: "status",
      key: "status",
      render: (record: RequestUpgrade) => {
        var statusData = requestUpgradeStatus.find(
          (_) => _.value === record.status
        );
        return (
          <Tag className=" w-4/5 text-center" color={statusData?.color}>
            {statusData?.value}
          </Tag>
        );
      },
    },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    { title: "Date Updated", dataIndex: "dateUpdated", key: "dateUpdated" },
    {
      title: "Action",
      key: "operation",
      render: (record: RequestUpgrade) => (
        <Space wrap>
          <Tooltip title="View detail" color={"black"}>
            <Button
              onClick={() =>
                router.push(`${urlOncell}/requestUpgrade/${record.id}`)
              }
            >
              <BiSolidCommentDetail />
            </Button>
          </Tooltip>
          <Tooltip title="Edit" color={"black"}>
            <Button onClick={() => onEdit(record)}>
              <BiEdit />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" color={"black"}>
            <Button onClick={() => onDelete(record)}>
              <AiFillDelete />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < requestUpgradeData?.data?.length; ++i) {
    data.push({
      key: requestUpgradeData?.data[i].id,
      id: requestUpgradeData?.data[i].id,
      information: requestUpgradeData?.data[i].information,
      component: requestUpgradeData?.data[i].component,
      capacity: requestUpgradeData?.data[i].capacity,
      serverAllocationId: requestUpgradeData?.data[i].serverAllocationId,
      componentId: requestUpgradeData?.data[i].componentId,
      status: requestUpgradeData?.data[i].status,
      dateCreated: moment(requestUpgradeData?.data[i].dateCreated).format(
        dateAdvFormat
      ),
      dateUpdated: moment(requestUpgradeData?.data[i].dateUpdated).format(
        dateAdvFormat
      ),
    });
  }

  return (
    <div className="shadow m-5">
      <Divider orientation="left" plain>
        <h3>Request Upgrade</h3>
      </Divider>
      <Table
        loading={requestUpgradeDataLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1300 }}
        pagination={false}
        className="cursor-pointer"
      />
    </div>
  );
};

export default RequestUpgradeTable;
