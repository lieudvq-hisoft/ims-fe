"use client";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ModalEmpty from "@components/ModalEmpty";
import ServerDetail from "@components/server/ServerDetail";
import AppointmentTable from "@components/server/requestUpgrade/AppointmentTable";
import ModalDeny from "@components/server/requestUpgrade/ModalDeny";
import RequestUpgradeDetailInfor from "@components/server/requestUpgrade/RequestUpgradeDetail";
import useDispatch from "@hooks/use-dispatch";
import useSelector from "@hooks/use-selector";
import { RUAppointmentParamGet, RequestUpgrade } from "@models/requestUpgrade";
import { ServerAllocation } from "@models/serverAllocation";
import { SHCParamGet, ServerHardwareConfigData } from "@models/serverHardwareConfig";
import requestUpgradeService from "@services/requestUpgrade";
import serverAllocationService from "@services/serverAllocation";
import serverHardwareConfig from "@services/serverHardwareConfig";
import { getAppointmentData } from "@slices/requestUpgrade";
import { ROLE_CUSTOMER, ROLE_SALES, ROLE_TECH } from "@utils/constants";
import { areInArray } from "@utils/helpers";
import { Alert, FloatButton, Modal, Pagination, message } from "antd";
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
const RequestUpgradeDetail: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { appointmentData } = useSelector((state) => state.requestUpgrade);

  const [serverAllocationDetail, setServerAllocationDetail] =
    useState<ServerAllocation>();

  const [requestUpgradeDetail, setRequestUpgradeDetail] =
    useState<RequestUpgrade>();

  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);
  const [rUAppointmentParamGet, setRUAppointmentParamGet] =
    useState<RUAppointmentParamGet>({
      PageIndex: 1,
      PageSize: 10,
      RequestUpgradeId: router.query.requestUpgradeId ?? -1,
    } as unknown as RUAppointmentParamGet);
  const [permission, setPermission] = useState<boolean>(true);
  const [openModalDeny, setOpenModalDeny] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [paramGet, setParamGet] = useState<SHCParamGet>({
    PageIndex: 1,
    PageSize: 10,
  } as unknown as SHCParamGet);
  const [hardware, setHardware] = useState<ServerHardwareConfigData>();

  const getData = async () => {
    await serverAllocationService
      .getServerAllocationById(
        session?.user.access_token!,
        router.query.serverAllocationId + ""
      )
      .then((res) => {
        setServerAllocationDetail(res);
      })
      .catch((errors) => {
        setServerAllocationDetail(undefined);
        setContent(errors.response.data);
      });
    await serverHardwareConfig.getServerHardwareConfigData(
      session?.user.access_token!,
      { ...paramGet, ServerAllocationId: serverAllocationDetail?.id! } as SHCParamGet
    ).then((res) => {
      setHardware(res);
    });
    await requestUpgradeService
      .getDetail(
        session?.user.access_token!,
        router.query.requestUpgradeId + ""
      )
      .then(async (res) => {
        await setRequestUpgradeDetail(res);
      })
      .catch((errors) => {
        setRequestUpgradeDetail(undefined);
        setContent(errors.response.data);
      });
  };

  const checkPermission = () => {
    if (
      requestUpgradeDetail?.serverAllocationId + "" !==
      router.query.serverAllocationId
    ) {
      setPermission(false);
    } else {
      setPermission(true);
    }
  };

  const rejectRequestUpgrade = async () => {
    confirm({
      title: "Reject",
      content: (
        <Alert
          message={`Do you want to reject with Id ${requestUpgradeDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestUpgradeService
          .rejectRequestUpgrade(
            session?.user.access_token!,
            requestUpgradeDetail?.id + ""
          )
          .then((res) => {
            message.success("Reject request upgrade successfully!");
            getData();
          })
          .catch((errors) => {
            message.error(errors.response.data);
          })
          .finally(() => { });
      },
      onCancel() { },
    });
  };

  const completeRequestUpgrade = async () => {
    confirm({
      title: "Complete",
      content: (
        <Alert
          message={`Do you want to complete with Id ${requestUpgradeDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestUpgradeService
          .completeRequestUpgrade(
            session?.user.access_token!,
            requestUpgradeDetail?.id + ""
          )
          .then((res) => {
            message.success("Complete request upgrade successfully!");
            getData();
          })
          .catch((errors) => {
            message.error(errors.response.data);
          })
          .finally(() => { });
      },
      onCancel() { },
    });
  };

  const acceptRequestUpgrade = async () => {
    confirm({
      title: "Accept",
      content: (
        <Alert
          message={`Do you want to accept with Id ${requestUpgradeDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestUpgradeService
          .acceptRequestUpgrade(
            session?.user.access_token!,
            requestUpgradeDetail?.id + ""
          )
          .then((res) => {
            message.success("Accept request upgrade successfully!");
            getData();
          })
          .catch((errors) => {
            message.error(errors.response.data);
          })
          .finally(() => { });
      },
      onCancel() { },
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

  useEffect(() => {
    if (
      router.query.serverAllocationId &&
      router.query.requestUpgradeId &&
      session
    ) {
      getData();
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (router.query.requestUpgradeId && session) {
      rUAppointmentParamGet.Id = parseInt(
        router.query.requestUpgradeId!.toString()
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

  useEffect(() => {
    checkPermission();
  }, [requestUpgradeDetail]);

  if (requestUpgradeDetail === undefined) {
    return (<AntdLayoutNoSSR
      content={
        <>
          <ModalEmpty
            isPermission={false}
            content={content}
          />
        </>
      } />)
  } else
    return (
      <AntdLayoutNoSSR
        content={
          <>
            {!permission && (
              <ModalEmpty
                isPermission={true}
                content={content}
              />
            )}
            <ModalDeny
              open={openModalDeny}
              onClose={() => setOpenModalDeny(false)}
              getData={() => getData()}
              requestUpgradeId={parseInt(router.query.requestId + "")}
            />
            {areInArray(
              session?.user.roles!,
              ROLE_SALES,
              ROLE_TECH,
              ROLE_CUSTOMER
            ) && (permission) && (
                <>
                  <div className="flex flex-wrap items-center justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
                    <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
                  </div>
                  <div className="md:flex">
                    <ServerDetail
                      serverAllocationDetail={serverAllocationDetail!}
                      hardware={hardware!}
                    />
                    <RequestUpgradeDetailInfor
                      requestUpgradeDetail={requestUpgradeDetail!}
                    />
                  </div>
                  <AppointmentTable
                    typeGet="ByRequestUpgradeId"
                    urlOncell=""
                    onEdit={(record) => { }}
                    onDelete={async (record) => { }}
                  />
                  {appointmentData?.totalPage > 0 && (
                    <Pagination
                      className="text-end m-4"
                      current={rUAppointmentParamGet?.PageIndex}
                      pageSize={appointmentData?.pageSize ?? 10}
                      total={appointmentData?.totalSize}
                      onChange={(page, pageSize) => {
                        setRUAppointmentParamGet({
                          ...rUAppointmentParamGet,
                          PageIndex: page,
                          PageSize: pageSize,
                        });
                      }}
                    />
                  )}
                  {(requestUpgradeDetail?.status === "Waiting" &&
                    areInArray(session?.user.roles!, ROLE_SALES)) && (
                      <FloatButton.Group
                        trigger="hover"
                        type="primary"
                        style={{ right: 60, bottom: 500 }}
                        icon={<AiOutlineFileDone />}
                      >
                        <FloatButton
                          icon={<MdCancel color="red" />}
                          tooltip="Deny"
                          onClick={() => setOpenModalDeny(true)}
                        />
                        <FloatButton
                          onClick={() => acceptRequestUpgrade()}
                          icon={<AiOutlineFileDone color="green" />}
                          tooltip="Accept"
                        />
                      </FloatButton.Group>
                    )}
                  {Boolean(
                    areInArray(session?.user.roles!, ROLE_TECH) &&
                    requestUpgradeDetail?.status === "Accepted" &&
                    requestUpgradeDetail?.succeededAppointment?.status ===
                    "Success"
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
                          onClick={() => rejectRequestUpgrade()}
                        />
                        <FloatButton
                          onClick={() => completeRequestUpgrade()}
                          icon={<AiOutlineFileDone color="green" />}
                          tooltip="Complete"
                        />
                      </FloatButton.Group>
                    )}
                </>
              )}
          </>
        }
      />
    );
};

export default RequestUpgradeDetail;
