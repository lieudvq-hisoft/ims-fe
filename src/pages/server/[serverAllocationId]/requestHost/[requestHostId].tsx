"use client";
import { EditOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ModalAcceptRequestHost from "@components/server/requestHost/ModalAcceptRequestHost";
import ModalDenyHost from "@components/server/requestHost/ModalDenyHost";
import ModalUpdate from "@components/server/requestHost/ModalUpdate";
import RequestHostDetailInfor from "@components/server/requestHost/RequestHostDetail";
import ServerDetail from "@components/server/ServerDetail";
import useDispatch from "@hooks/use-dispatch";
import useSelector from "@hooks/use-selector";
import {
  RequestedLocation,
  RequestExpand,
  RequestExpandUpdateModel,
  SuggestLocation,
} from "@models/requestExpand";
import { RequestHost, RequestHostUpdateModel } from "@models/requestHost";
import { RUAppointmentParamGet } from "@models/requestUpgrade";
import { ServerAllocation } from "@models/serverAllocation";
import requestHost from "@services/requestHost";
import serverAllocationService from "@services/serverAllocation";
import { getAppointmentData } from "@slices/requestExpand";
import { Alert, Button, FloatButton, Form, message, Modal } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
const { confirm } = Modal;
const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});
const RequestHostDetail: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [serverAllocationDetail, setServerAllocationDetail] =
    useState<ServerAllocation>();

  const [requestHostDetail, setRequestHostDetail] = useState<RequestHost>();

  const [rUAppointmentParamGet, setRUAppointmentParamGet] =
    useState<RUAppointmentParamGet>({
      PageIndex: 1,
      PageSize: 10,
      RequestUpgradeId: router.query.requestHostId ?? -1,
    } as unknown as RUAppointmentParamGet);

  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);
  const [suggestLocation, setSuggestLocation] = useState<SuggestLocation>();
  const [requestHostUpdate, setRequestHostUpdate] = useState<RequestHost>();
  const { appointmentData } = useSelector((state) => state.requestExpand);
  const [openModalDenyHost, setOpenModalDenyHost] = useState<boolean>(false);
  const [openModalAcceptHost, setOpenModalAcceptHost] =
    useState<boolean>(false);

  const getData = async () => {
    await serverAllocationService
      .getServerAllocationById(
        session?.user.access_token!,
        router.query.serverAllocationId + ""
      )
      .then((res) => {
        setServerAllocationDetail(res);
      });

    await requestHost
      .getDetail(session?.user.access_token!, router.query.requestHostId + "")
      .then((res) => {
        setRequestHostDetail(res);
      });
  };

  const rejectRequestHost = async () => {
    confirm({
      title: "Reject",
      content: (
        <Alert
          message={`Do you want to reject with Id ${requestHostDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestHost
          .rejectRequestHost(
            session?.user.access_token!,
            requestHostDetail?.id + ""
          )
          .then((res) => {
            message.success("Reject request host successful!");
            getData();
          })
          .catch((errors) => {
            message.error(errors.message);
          })
          .finally(() => {});
      },
      onCancel() {},
    });
  };

  const completeRequestHost = async () => {
    confirm({
      title: "Complete",
      content: (
        <Alert
          message={`Do you want to complete with Id ${requestHostDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestHost
          .completeRequestHost(
            session?.user.access_token!,
            requestHostDetail?.id + ""
          )
          .then((res) => {
            message.success("Complete request host successful!");
            getData();
          })
          .catch((errors) => {
            message.error(errors.message);
          })
          .finally(() => {});
      },
      onCancel() {},
    });
  };

  const updateData = async (data: RequestHostUpdateModel) => {
    await requestHost
      .updateData(session?.user.access_token!, data)
      .then(async (res) => {
        message.success("Update successful!");
        await requestHost
          .getDetail(
            session?.user.access_token!,
            router.query.requestHostId + ""
          )
          .then(async (res) => {
            await serverAllocationService
              .getServerAllocationById(
                session?.user.access_token!,
                res.serverAllocationId + ""
              )
              .then((res) => {
                setServerAllocationDetail(res);
              });
            setRequestHostDetail(res);
            setRequestHostUpdate(undefined);
            // if (!res?.requestedLocation && res?.size! > 0) {
            //   await requestExpandService
            //     .getSuggestLocation(
            //       session?.user.access_token!,
            //       requestHostDetail?.id!
            //     )
            //     .then((res) => {
            //       setSuggestLocation(res);
            //     })
            //     .catch((e) => {});
            // }
          });
        getData();
      })
      .catch((errors) => {
        message.error(errors.message);
      });
  };

  const handleBreadCumb = () => {
    var itemBrs = [] as ItemType[];
    var items = router.asPath.split("/").filter((_) => _ != "");
    var path = "";
    items.forEach((element) => {
      path += `/${element}`;
      itemBrs.push({
        href: path,
        title: element,
      });
    });
    setItemBreadcrumbs(itemBrs);
  };

  const saveLocation = async (data: RequestedLocation) => {
    // await requestExpandService
    //   .saveLocation(session?.user.access_token!, requestExpandUpdate?.id!, data)
    //   .then(async (res) => {
    //     message.success("Save location successful!");
    //     getData();
    //   })
    //   .catch((errors) => {
    //     message.error(errors.message);
    //   })
    //   .finally(() => {
    //     setRequestExpandUpdate(undefined);
    //   });
  };

  useEffect(() => {
    if (router.query.serverAllocationId && session) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (router.query.requestHostId && session) {
      handleBreadCumb();
      rUAppointmentParamGet.Id = parseInt(
        router.query.requestHostId!.toString()
      );
      dispatch(
        getAppointmentData({
          token: session?.user.access_token!,
          paramGet: { ...rUAppointmentParamGet },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, rUAppointmentParamGet]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          <div className="flex flex-wrap items-center justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
            <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
            <div>
              <Button
                type="primary"
                className="mb-2"
                icon={<EditOutlined />}
                onClick={async () => {
                  setRequestHostUpdate(requestHostDetail);
                  // if (
                  //   !requestHostDetail?.requestedLocation &&
                  //   requestHostDetail?.size! > 0
                  // ) {
                  //   await requestExpandService
                  //     .getSuggestLocation(
                  //       session?.user.access_token!,
                  //       requestHostDetail?.id!
                  //     )
                  //     .then((res) => {
                  //       setSuggestLocation(res);
                  //     })
                  //     .catch((e) => {});
                  // }
                }}
              >
                Update
              </Button>
            </div>
          </div>

          <div className="md:flex">
            <ServerDetail
              serverAllocationDetail={serverAllocationDetail!}
            ></ServerDetail>
            <RequestHostDetailInfor requestHostDetail={requestHostDetail!} />
          </div>

          {requestHostDetail?.status === "Waiting" && (
            <FloatButton.Group
              trigger="hover"
              type="primary"
              style={{ right: 60, bottom: 505 }}
              icon={<AiOutlineFileDone />}
            >
              <FloatButton
                icon={<MdCancel color="red" />}
                tooltip="Deny"
                onClick={() => setOpenModalDenyHost(true)}
              />
              <FloatButton
                onClick={() => setOpenModalAcceptHost(true)}
                icon={<AiOutlineFileDone color="green" />}
                tooltip="Accept"
              />
            </FloatButton.Group>
          )}
          {Boolean(
            requestHostDetail?.status === "Accepted"
            // && requestHostDetail?.succeededAppointment?.status === "Success"
          ) && (
            <FloatButton.Group
              trigger="hover"
              type="primary"
              style={{ right: 60, bottom: 500 }}
              icon={<AiOutlineFileDone />}
            >
              <FloatButton
                icon={<MdCancel color="red" />}
                tooltip="Fail"
                onClick={() => rejectRequestHost()}
              />
              <FloatButton
                onClick={() => completeRequestHost()}
                icon={<AiOutlineFileDone color="green" />}
                tooltip="Complete"
              />
            </FloatButton.Group>
          )}
          <ModalUpdate
            requestHost={requestHostUpdate!}
            onClose={() => {
              setRequestHostUpdate(undefined);
              setSuggestLocation(undefined);
            }}
            onSubmit={(value) => {
              updateData(value);
            }}
          />
          <ModalDenyHost
            open={openModalDenyHost}
            onClose={() => setOpenModalDenyHost(false)}
            requestHostId={requestHostDetail?.id!}
            getData={() => getData()}
          />

          <ModalAcceptRequestHost
            open={openModalAcceptHost}
            onClose={() => setOpenModalAcceptHost(false)}
            requestHostId={requestHostDetail?.id!}
            getData={() => getData()}
          />
        </>
      }
    />
  );
};

export default RequestHostDetail;
