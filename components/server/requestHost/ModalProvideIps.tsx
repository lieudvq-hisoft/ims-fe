import { SuggestAdditionalModel } from "@models/ipSubnet";
import { ServerAllocation } from "@models/serverAllocation";
import requestHost from "@services/requestHost";
import { Button, Descriptions, Form, Modal, message } from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
const { confirm } = Modal;

interface Props {
  provideIpsData: SuggestAdditionalModel;
  quantity: number;
  requestHostId: number;
  onClose: () => void;
  onRefresh: () => void;
}

const ModalProvideIps: React.FC<Props> = (props) => {
  const { onClose, provideIpsData, quantity, requestHostId, onRefresh } = props;
  const { data: session } = useSession();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ipAddressId, setIpAddressId] = useState<number[]>([]);
  const [server, setServer] = useState<ServerAllocation>();

  const getServerMasterIp = async () => {
    await requestHost
      .getDetail(session?.user.access_token!, requestHostId + "")
      .then((res) => {
        setServer(res.serverAllocation);
      });
  };

  useEffect(() => {
    var idAdress = [] as number[];
    provideIpsData?.ipAddresses.forEach((item) => {
      idAdress.push(item.id);
    });
    setIpAddressId(idAdress);
    getServerMasterIp();
  }, [provideIpsData]);

  return (
    <>
      <Modal
        title={<span className="inline-block m-auto">Provide Ips</span>}
        open={Boolean(provideIpsData)}
        confirmLoading={confirmLoading}
        onCancel={() => {
          onClose();
        }}
        footer={[
          <Button
            // loading={loadingSubmit}
            className="btn-submit"
            key="submit"
            onClick={async () => {
              confirm({
                title: "Do you want to save?",
                async onOk() {
                  await requestHost
                    .saveProvideIps(
                      session?.user.access_token!,
                      requestHostId,
                      ipAddressId
                    )
                    .then((res) => {
                      message.success("Save successfully!", 1.5);
                      onRefresh();
                      onClose();
                    })
                    .catch((errors) => {
                      message.error(errors.response.data, 1.5);
                    })
                    .finally(() => {});
                },
                onCancel() {},
              });
            }}
          >
            Save
          </Button>,
        ]}
      >
        <div>
          <Descriptions className="pl-5">
            <Descriptions.Item label="Server" span={4}>
              {server?.name + " - " + server?.serialNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Server's master IP" span={4}>
              {server?.masterIpAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity" span={4}>
              {quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Suggestion" span={4}>
              <></>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions className="pl-10">
            <Descriptions.Item label="Subnets" span={4}>
              <>
                {provideIpsData?.ipSubnets.map((m, index) => {
                  return (
                    <>
                      {`${m.firstOctet}.${m.secondOctet}.${m.thirdOctet}.${m.fourthOctet}/${m.prefixLength}`}
                      <br />
                    </>
                  );
                })}
              </>
            </Descriptions.Item>
            <Descriptions.Item label="IP Addresses" span={4}>
              <>
                {provideIpsData?.ipAddresses.map((m, index) => {
                  return (
                    <>
                      {m.address}
                      <br />
                    </>
                  );
                })}
              </>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </>
  );
};

export default ModalProvideIps;
