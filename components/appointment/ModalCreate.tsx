import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Modal, Row, Select, Card, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Form } from "antd";
import useSelector from "@hooks/use-selector";
import customerService from "@services/customer";
import { AppointmentCreateModel } from "@models/appointment";
import { dateAdvFormat } from "@utils/constants";
import { ServerAllocation } from "@models/serverAllocation";
import { useSession } from "next-auth/react";
import { ParamGet, ParamGetWithId } from "@models/base";
import { parseJwt } from "@utils/helpers";
const { Option } = Select;
const { confirm } = Modal;

interface Props {
  open: boolean;
  onClose: () => void;
  // loadingSubmit: boolean;
  onSubmit: (data: AppointmentCreateModel) => void;
}

const ModalCreate: React.FC<Props> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { onSubmit, open, onClose } = props;
  const { data: session, update: sessionUpdate } = useSession();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [server, setServer] = useState<ServerAllocation[]>([]);
  const [pageSizeCus, setPageSizeCus] = useState<number>(6);
  const [totalPageCus, setTotalPageCus] = useState<number>(2);
  const [pageIndexCus, setPageIndexCus] = useState<number>(0);

  const disabled = async () => {
    var result = false;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      result = true;
    }
    return result;
  };

  const getMoreServer = async () => {
    await customerService
      .getServerById(session?.user.access_token!, {
        PageIndex: pageIndexCus + 1,
        PageSize: pageSizeCus,
        Id: parseJwt(session?.user.access_token).UserId,
      } as ParamGetWithId)
      .then(async (data) => {
        setTotalPageCus(data.totalPage);
        setPageIndexCus(data.pageIndex);
        setServer([...server, ...data.data]);
      });
  };  

  useEffect(() => {
    session && getMoreServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <Modal
        title={<span className="inline-block m-auto">Create customer</span>}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={() => {
          onClose();
          form.resetFields();
        }}
        footer={[
          <Button
            // loading={loadingSubmit}
            className="btn-submit"
            key="submit"
            onClick={async () => {
              if (!(await disabled()))
                confirm({
                  title: "Do you want to save?",
                  async onOk() {
                    onSubmit({
                      appointedCustomer: form.getFieldValue("appointedCustomer"),
                      dateAppointed: form.getFieldValue("dateAppointed"),
                      reason: form.getFieldValue("reason"),
                      note: form.getFieldValue("note"),
                      // requestUpgradeIds:[0],
                      // requestExpandId:0,
                    } as AppointmentCreateModel);
                    form.resetFields();
                  },
                  onCancel() {},
                });
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="flex max-w-md flex-col gap-4 m-auto">
          <Form
            ref={formRef}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="appointedCustomer"
              label="Visitor"
              rules={[{ required: true }]}
            >
              <Input placeholder="Visitor" allowClear />
            </Form.Item>
            <Form.Item
              name="dateAppointed"
              label="Visit date"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Visit date"
                showTime
                format={dateAdvFormat}
                onChange={(value) =>
                  form.setFieldsValue({
                    dateCheckedIn: value,
                  })
                }
              />{" "}
            </Form.Item>
            <Form.Item
              name="reason"
              label="Reason"
              rules={[{ required: true, message: "Reason must not empty!" }]}
            >
              <Select
                labelInValue
                allowClear
              >
                <Option value="Install">Server Installation</Option>
                <Option value="Uninstall">Server Gỡ</Option>
                <Option value="Upgrade">Server Nâng phần cứng</Option>
                <Option value="Support">Server Hỗ trợ</Option>
                <Option value="Incident">Server Sự cố</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="serverAllocationId"
              label="Server"
              labelAlign="right"
              rules={[{ required: true, message: "Server must not empty!" }]}
            >
              <Select
                labelInValue
                allowClear
                listHeight={160}
                onPopupScroll={async (e: any) => {
                  const { target } = e;
                  if (
                    (target as any).scrollTop + (target as any).offsetHeight ===
                    (target as any).scrollHeight
                  ) {
                    if (pageIndexCus < totalPageCus) {
                      getMoreServer();
                    }
                  }
                }}
              >
                {server.map((l, index) => (
                  <Option value={l.id} label={`${l?.name} - ${l?.masterIp}`} key={index}>
                    {`${l?.name} - ${l?.masterIp}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="note"
              label="Note"
              rules={[{ required: true, max: 2000 }]}
            >
              <Input.TextArea
                placeholder="Note"
                allowClear
                autoSize={{ minRows: 1, maxRows: 6 }}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
