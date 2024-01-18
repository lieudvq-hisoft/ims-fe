import { RequestHostCompleteModel } from "@models/requestHost";
import requestHost from "@services/requestHost";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
const { confirm } = Modal;
const { Option } = Select;

interface Props {
  requestHostId: number;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const ModalCompletetHost: React.FC<Props> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { open, onClose, onRefresh, requestHostId } = props;
  const { data: session, update: sessionUpdate } = useSession();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const disabled = async () => {
    var result = false;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      result = true;
    }
    return result;
  };

  const completeRequestHost = async (data: RequestHostCompleteModel) => {
    setLoading(true);
    await requestHost
      .completeRequestHost(session?.user.access_token!, requestHostId, data)
      .then((res) => {
        message.success("Complete IP Request successfully!", 1.5);
        onRefresh();
        onClose();
        form.resetFields();
      })
      .catch((errors) => {
        message.error(errors.response.data, 1.5);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        title={<span className="inline-block m-auto">Complete IP Request</span>}
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
                    completeRequestHost({
                      qtName: form.getFieldValue("qtName"),
                      position: form.getFieldValue("position"),
                      location: form.getFieldValue("location"),
                      good: true,
                      note: form.getFieldValue("note"),
                    } as RequestHostCompleteModel);
                  },
                  onCancel() {},
                });
            }}
          >
            Complete
          </Button>,
        ]}
      >
        <div className="flex max-w-md flex-col gap-4 m-auto">
          {loading === true ? (
            <Spin size="large" tip="Completing...">
              <Form
                ref={formRef}
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                style={{ width: "100%" }}
              >
                {/* <Form.Item name="good" label="Good">
                  <Switch
                    onChange={(value) =>
                      form.setFieldsValue({
                        good: value,
                      })
                    }
                  />{" "}
                </Form.Item> */}
                <Form.Item name="note" label="Note" rules={[{ max: 2000 }]}>
                  <Input placeholder="Note" allowClear />
                </Form.Item>
              </Form>
            </Spin>
          ) : (
            <Form
              ref={formRef}
              form={form}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              style={{ width: "100%" }}
            >
              {/* <Form.Item name="good" label="Good">
                <Switch
                  onChange={(value) =>
                    form.setFieldsValue({
                      good: value,
                    })
                  }
                />{" "}
              </Form.Item> */}
              <Form.Item name="note" label="Note" rules={[{ max: 2000 }]}>
                <Input placeholder="Note" allowClear />
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCompletetHost;
