import { RequestHost } from "@models/requestHost";
import { dateAdvFormat, requestHostStatus } from "@utils/constants";
import { Descriptions, Divider, Tag } from "antd";
import { count } from "console";
import moment from "moment";
import React from "react";

interface Props {
  requestHostDetail: RequestHost;
}

const RequestHostDetailInfor: React.FC<Props> = (props) => {
  const { requestHostDetail } = props;

  return (
    <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] m-5 rounded-md">
      <Divider orientation="left" plain>
        <h3>IP Request Information </h3>
      </Divider>{" "}
      <Descriptions className="p-5" column={2}>
        <Descriptions.Item label="Request's Status">
          <Tag
            className="text-center"
            color={
              requestHostStatus.find(
                (_) => _.value === requestHostDetail?.status
              )?.color
            }
          >
            {
              requestHostStatus.find(
                (_) => _.value === requestHostDetail?.status
              )?.value
            }
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {requestHostDetail?.type === "Additional"
            ? "IP"
            : requestHostDetail?.type}
        </Descriptions.Item>
        <Descriptions.Item label="Date Created">
          {moment(requestHostDetail?.dateCreated).format(dateAdvFormat)}
        </Descriptions.Item>
        <Descriptions.Item label="Purpose">
          {requestHostDetail?.isRemoval
            ? "Remove"
            : requestHostDetail?.isUpgrade
            ? "Upgrade"
            : "Add"}
        </Descriptions.Item>
        <Descriptions.Item label="Customer" span={2}>
          {requestHostDetail?.customer.companyName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Quantity"
          span={
            requestHostDetail?.type === "Port" &&
            (requestHostDetail?.ipAddresses === null ||
              requestHostDetail?.ipAddresses.length === 0)
              ? 0
              : 2
          }
        >
          {requestHostDetail?.quantity}
        </Descriptions.Item>
        {Boolean(requestHostDetail?.type === "Port") && (
          <Descriptions.Item label="Ports" span={2}>
            {requestHostDetail?.capacities.map((l, index) => (
              <>
                Port {index + 1} - {l === 0.1 ? "100 Mbps" : "1 Gbps"}
                <br />
              </>
            ))}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Customer Note" span={2}>
          {requestHostDetail?.note}
        </Descriptions.Item>
        <Descriptions.Item label="Sales Staff">
          {requestHostDetail?.evaluator?.fullname}
        </Descriptions.Item>
        <Descriptions.Item label="Sales Staff Note" span={2}>
          {requestHostDetail?.saleNote}
        </Descriptions.Item>
        <Descriptions.Item label="Technical Staff">
          {requestHostDetail?.executor?.fullname}
        </Descriptions.Item>
        <Descriptions.Item label="Technical Staff Note" span={2}>
          {requestHostDetail?.techNote}
        </Descriptions.Item>

        <Descriptions.Item label="Date Approval">
          {requestHostDetail?.dateEvaluated !== null
            ? moment(requestHostDetail?.dateEvaluated).format(dateAdvFormat)
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Date Completed">
          {requestHostDetail?.dateExecuted !== null
            ? moment(requestHostDetail?.dateExecuted).format(dateAdvFormat)
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Date Customer Confirmed" span={2}>
          {requestHostDetail?.dateConfirm !== null
            ? moment(requestHostDetail?.dateConfirm).format(dateAdvFormat)
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Discontinued Service Letter" span={4}>
          {requestHostDetail?.removalRequestDocument !== null && (
            <a href={`${requestHostDetail?.removalRequestDocument}`}>
              Công văn ngưng (dịch vụ IP)
            </a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Acceptance Report" span={4}>
          {requestHostDetail?.inspectionReportFilePath !== null && (
            <a href={`${requestHostDetail?.inspectionReportFilePath}`}>
              Biên bản nghiệm thu (dịch vụ sử dụng IP)
            </a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Acceptance Report (Signed)">
          {requestHostDetail?.finalInspectionReport !== null && (
            <a href={`${requestHostDetail?.finalInspectionReport}`}>
              Hình ảnh chữ ký
            </a>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RequestHostDetailInfor;
