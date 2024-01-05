import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { areInArray } from "@utils/helpers";
import { RequestHostUpdateModel } from "@models/requestHost";
import { useSession } from "next-auth/react";
import { ROLE_CUSTOMER, ROLE_SALES, ROLE_TECH } from "@utils/constants";
import requestHostService from "@services/requestHost";
import serverAllocation from "@services/serverAllocation";
import ipAddress from "@services/ipAddress";
import { IpAddress, IpAddressParamGet } from "@models/ipAddress";
import { useRouter } from "next/router";
import { error } from "console";

const { Option } = Select;
const { confirm } = Modal;

interface Props {
  open: boolean;
  requestHost: RequestHostUpdateModel | undefined;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalUpdateRemoval: React.FC<Props> = (props) => {
  const formRef = useRef(null);
  const router = useRouter();
  const [form] = Form.useForm();
  const { onSubmit, requestHost, onClose, open } = props;
  const { data: session } = useSession();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>(
    (requestHost && requestHost.capacities) || []
  );
  const [hiddenQuantity, setHiddenQuantity] = useState(false);
  const [requestType, setRequestType] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPageCus, setTotalPageCus] = useState<number>(2);
  const [pageIndexCus, setPageIndexCus] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean | undefined>(undefined);
  const [initialIp, setInitialIp] = useState<IpAddress[]>([]);

  const disabled = async () => {
    var result = false;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      result = true;
    }
    return result;
  };

  const setFieldsValueInitial = async () => {
    if (formRef.current && requestHost) {
      const res = await ipAddress.getData(session?.user.access_token!, {
        RequestHostId: requestHost.id!,
      } as IpAddressParamGet);

      setInitialIp(res.data);

      const initialValues = {
        id: requestHost.id,
        note: requestHost.note,
        saleNote: requestHost.saleNote,
        techNote: requestHost.techNote,
        quantity: requestHost.quantity,
        type: requestHost.type === "Additional" ? "IP" : "Port",
        // capacities: requestHost?.capacities || [],
        capacities: requestHost?.capacities?.map((value) => ({ value })) || [],
        ipAddressIds: res.data.map((i) => ({ label: i.address, value: i.id })),
      };
      form.setFieldsValue(initialValues);
      setRequestType(requestHost.type);
    }
  };
  const getMoreIp = async () => {
    await ipAddress
      .getData(session?.user.access_token!, {
        PageIndex: pageIndexCus + 1,
        PageSize: pageSize,
        ServerAllocationId: parseInt(router.query.serverAllocationId+""),
        AssignmentTypes: requestType,
        IsAssigned: true,
      } as IpAddressParamGet)
      .then(async (data) => {
        setTotalPageCus(data.totalPage);
        setPageIndexCus(data.pageIndex);
        setIpAddresses([...ipAddresses, ...data.data]);
        setMaxQuantity(ipAddresses.length);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      session && (await getMoreIp());
      if (session) {
        setFieldsValueInitial();
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    setFieldsValueInitial();
  }, [open]);

  return (
    <>
      <Modal
        title={
          <span className="inline-block m-auto">Update IP Removal Request</span>
        }
        open={openModal === undefined ? open : openModal}
        confirmLoading={confirmLoading}
        onCancel={() => {
          onClose();
          setOpenModal(undefined);
          form.resetFields();
        }}
        footer={[
          <Button
            className="btn-submit"
            key="submit"
            onClick={async () => {
              if (!(await disabled())) {
                confirm({
                  title: "Do you want to save?",
                  async onOk() {
                    let formData: RequestHostUpdateModel;
                    let ipData: number[];
                    const submittedCapacities =
                      requestHost?.type === "Additional"
                        ? undefined
                        : selectedCapacities;
                    ipData = form
                      .getFieldValue("ipAddressIds")
                      ?.map((l) => l.value);
                    form.resetFields();
                    formData = {
                      id: requestHost?.id,
                      saleNote: form.getFieldValue("saleNote"),
                      techNote: form.getFieldValue("techNote"),
                      quantity: submittedCapacities
                        ? submittedCapacities.length
                        : form.getFieldValue("ipAddressIds").length,
                      note: form.getFieldValue("note"),
                      type: requestHost?.type,
                      capacities: submittedCapacities,
                    } as RequestHostUpdateModel;
                    setLoading(true);
                    await requestHostService
                      .updateData(session?.user.access_token!, formData)
                      .then(async (res) => {
                        await requestHostService
                          .saveProvideIps(
                            session?.user.access_token!,
                            requestHost?.id!,
                            ipData
                          )
                          .then((res) => {
                            message.success("Update successfully!", 1.5);
                            form.resetFields();
                            setOpenModal(undefined);
                            onClose();
                          })
                          .catch((errors) => {
                            setOpenModal(true);
                            message.error(errors.response.data, 1.5);
                          })
                          .finally(() => {
                            onSubmit();
                            setLoading(false);
                          });
                      })
                      .catch((errors) => {
                        setOpenModal(true);
                        message.error(errors.response.data, 1.5);
                      });
                  },
                  onCancel() {},
                });
              }
            }}
          >
            Edit
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
            name="dynamic_form_complex"
          >
            <Form.Item name="type" label="Remove Type">
              <Input readOnly></Input>
            </Form.Item>
            <>
              {requestType && (
                <>
                  <Form.Item
                    name="ipAddressIds"
                    label="IP Addresses"
                    labelAlign="right"
                    rules={[
                      {
                        required: true,
                        message: "IP Addresses must not empty!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      labelInValue
                      placeholder="Please select IPs to remove"
                      allowClear
                      listHeight={160}
                      onChange={(res) => {}}
                      onPopupScroll={async (e: any) => {
                        const { target } = e;
                        if (
                          (target as any).scrollTop +
                            (target as any).offsetHeight ===
                          (target as any).scrollHeight
                        ) {
                          if (pageIndexCus < totalPageCus) {
                            getMoreIp();
                          }
                        }
                      }}
                    >
                      {requestType === "Additional"
                        ? ipAddresses
                            .filter((l) => l.assignmentType === "Additional")
                            .map((l, index) => (
                              <Option value={l.id} key={index}>
                                {`${l.address}`}
                              </Option>
                            ))
                        : ipAddresses
                            .filter((l) => l.assignmentType === "Port")
                            .map((l, index) => (
                              <Option value={l.id} key={index}>
                                {`${l.address} - ${
                                  l.capacity! === 0.1 ? "100 Mbps" : "1 GBps"
                                }`}
                              </Option>
                            ))}
                    </Select>
                  </Form.Item>
                </>
              )}
            </>
            <Form.Item name="note" label="Note" rules={[{ max: 2000 }]}>
              <Input placeholder="Note" allowClear />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateRemoval;
