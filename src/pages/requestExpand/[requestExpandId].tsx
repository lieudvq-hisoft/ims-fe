"use client";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ServerDetail from "@components/server/ServerDetail";
import RequestExpandDetailInfor from "@components/server/requestExpand/RequestExpandDetail";
import {
  RequestedLocation,
  RequestExpand,
  RequestExpandUpdateModel,
  SuggestLocation,
} from "@models/requestExpand";
import { RUAppointmentParamGet } from "@models/requestUpgrade";
import { ServerAllocation } from "@models/serverAllocation";
import requestExpandService from "@services/requestExpand";
import serverAllocationService from "@services/serverAllocation";
import { getAppointmentData } from "@slices/requestExpand";
import { Alert, Button, FloatButton, Modal, Pagination, message } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import useSelector from "@hooks/use-selector";
import useDispatch from "@hooks/use-dispatch";
import { CaretLeftOutlined, EditOutlined } from "@ant-design/icons";
import AppointmentTable from "@components/server/requestUpgrade/AppointmentTable";
import ModalUpdate from "@components/server/requestExpand/ModalUpdate";
import { areInArray } from "@utils/helpers";
import { ROLE_CUSTOMER, ROLE_SALES, ROLE_TECH } from "@utils/constants";
import ModalDeny from "@components/server/requestExpand/ModalDeny";
import serverHardwareConfig from "@services/serverHardwareConfig";
import {
  ServerHardwareConfigData,
  SHCParamGet,
} from "@models/serverHardwareConfig";
import { error } from "console";
import ModalAcceptExpand from "@components/server/requestExpand/ModalAccept";
const { confirm } = Modal;
const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});
const RequestExpandDetail: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [serverAllocationDetail, setServerAllocationDetail] =
    useState<ServerAllocation>();

  const [requestExpandDetail, setRequestExpandDetail] =
    useState<RequestExpand>();
  const [suggestLocation, setSuggestLocation] = useState<SuggestLocation>();

  const [rUAppointmentParamGet, setRUAppointmentParamGet] =
    useState<RUAppointmentParamGet>({
      PageIndex: 1,
      PageSize: 10,
      RequestUpgradeId: router.query.requestExpandId ?? -1,
    } as unknown as RUAppointmentParamGet);
  const [paramGet, setParamGet] = useState<SHCParamGet>({
    PageIndex: 1,
    PageSize: 10,
  } as unknown as SHCParamGet);
  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);
  const [requestExpandUpdate, setRequestExpandUpdate] =
    useState<RequestExpand>();

  const [openModalDeny, setOpenModalDeny] = useState<boolean>(false);
  const [openModalAccept, setOpenModalAccept] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

  const { appointmentData } = useSelector((state) => state.requestExpand);
  const [hardware, setHardware] = useState<ServerHardwareConfigData>();

  const getData = async () => {
    await requestExpandService
      .getDetail(session?.user.access_token!, router.query.requestExpandId + "")
      .then(async (res) => {
        await serverAllocationService
          .getServerAllocationById(
            session?.user.access_token!,
            res.serverAllocationId + ""
          )
          .then(async (res) => {
            setServerAllocationDetail(res);
            await serverHardwareConfig
              .getServerHardwareConfigData(session?.user.access_token!, {
                ...paramGet,
                ServerAllocationId: res.id,
              } as SHCParamGet)
              .then((res) => {
                setHardware(res);
              });
          });
        setRequestExpandDetail(res);
      });
  };

  const rejectRequestExpand = async () => {
    confirm({
      title: "Reject",
      content: (
        <Alert
          message={`Do you want to reject with Id ${requestExpandDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestExpandService
          .rejectRequestExpand(
            session?.user.access_token!,
            requestExpandDetail?.id + ""
          )
          .then((res) => {
            message.success(
              "Reject Server Allocation Request successfully!",
              1.5
            );
            getData();
          })
          .catch((errors) => {
            message.error(errors.response.data, 1.5);
          })
          .finally(() => {});
      },
      onCancel() {},
    });
  };

  const completeRequestExpand = async () => {
    confirm({
      title: "Complete",
      content: (
        <Alert
          message={`Do you want to complete with Id ${requestExpandDetail?.id}?`}
          type="warning"
        />
      ),
      async onOk() {
        await requestExpandService
          .completeRequestExpand(
            session?.user.access_token!,
            requestExpandDetail?.id + ""
          )
          .then((res) => {
            message.success(
              "Complete Server Allocation Request successfully!",
              1.5
            );
            getData();
          })
          .catch((errors) => {
            message.error(errors.response.data, 1.5);
          })
          .finally(() => {});
      },
      onCancel() {},
    });
  };

  const saveLocation = async (data: RequestedLocation) => {
    await requestExpandService
      .saveLocation(session?.user.access_token!, requestExpandUpdate?.id!, data)
      .then(async (res) => {
        message.success("Save location successfully!", 1.5);
        getData();
      })
      .catch((errors) => {
        message.error(errors.response.data, 1.5);
      })
      .finally(() => {
        setRequestExpandUpdate(undefined);
      });
  };

  const handleBreadCumb = () => {
    var itemBrs = [] as ItemType[];
    var items = router.asPath.split("/").filter((_) => _ != "");
    var path = "";
    items.forEach((element) => {
      switch (element) {
        case requestExpandDetail?.id + "":
          path += `/${element}`;
          itemBrs.push({
            href: path,
            title: "Detail Information",
          });
          break;
        default:
          path += `/${element}`;
          itemBrs.push({
            href: path,
            title: element,
          });
          break;
      }
    });
    setItemBreadcrumbs(itemBrs);
  };

  useEffect(() => {
    if (router.query.requestExpandId && session) {
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestExpandDetail]);

  useEffect(() => {
    if (router.query.requestExpandId && session) {
      getData();
      handleBreadCumb();
      rUAppointmentParamGet.Id = parseInt(
        router.query.requestExpandId!.toString()
      );
      dispatch(
        getAppointmentData({
          token: session?.user.access_token!,
          paramGet: { ...rUAppointmentParamGet },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, rUAppointmentParamGet, router.query.requestExpandId]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          <ModalDeny
            open={openModalDeny}
            onClose={() => setOpenModalDeny(false)}
            onSubmit={() => {
              getData();
              setOpenModalDeny(false);
            }}
            requestExpandId={parseInt(router.query.requestExpandId + "")}
          />
          {areInArray(
            session?.user.roles!,
            ROLE_TECH,
            ROLE_SALES,
            ROLE_CUSTOMER
          ) && (
            <>
              <div className="flex flex-wrap items-center justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
                <div>
                  <Button
                    type="primary"
                    className="mb-2"
                    icon={<CaretLeftOutlined />}
                    onClick={() => router.back()}
                  ></Button>
                  <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
                </div>
                <div>
                  {areInArray(session?.user.roles!, ROLE_TECH) && (
                    <Button
                      type="primary"
                      className="mb-2"
                      icon={<EditOutlined />}
                      onClick={async () => {
                        setOpenModalUpdate(true);
                        if (
                          !requestExpandDetail?.requestedLocation &&
                          requestExpandDetail?.size! > 0
                        ) {
                          await requestExpandService
                            .getSuggestLocation(
                              session?.user.access_token!,
                              requestExpandDetail?.id!
                            )
                            .then((res) => {
                              setSuggestLocation(res);
                            })
                            .catch((e) => {});
                        }
                      }}
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
              <div className="md:flex">
                <ServerDetail
                  serverAllocationDetail={serverAllocationDetail!}
                  hardware={hardware!}
                ></ServerDetail>
                <RequestExpandDetailInfor
                  requestExpandDetail={requestExpandDetail!}
                />
              </div>

              <AppointmentTable
                typeGet="ByRequestExpandId"
                urlOncell=""
                onEdit={(record) => {}}
                onDelete={async (record) => {}}
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

              {requestExpandDetail?.status === "Waiting" && (
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
                    onClick={() => setOpenModalAccept(true)}
                    icon={<AiOutlineFileDone color="green" />}
                    tooltip="Accept"
                  />
                </FloatButton.Group>
              )}
              {Boolean(
                requestExpandDetail?.status === "Accepted" &&
                  requestExpandDetail?.succeededAppointment?.status ===
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
                    onClick={() => rejectRequestExpand()}
                  />
                  <FloatButton
                    onClick={() => completeRequestExpand()}
                    icon={<AiOutlineFileDone color="green" />}
                    tooltip="Complete"
                  />
                </FloatButton.Group>
              )}

              <ModalUpdate
                onSaveLocation={(data) => saveLocation(data)}
                suggestLocation={suggestLocation}
                requestExpand={requestExpandUpdate!}
                open={openModalUpdate}
                onClose={() => {
                  setRequestExpandUpdate(undefined);
                  setOpenModalUpdate(false);
                  setSuggestLocation(undefined);
                }}
                onSubmit={() => {
                  setOpenModalUpdate(false);
                  getData();
                }}
              />
              <ModalAcceptExpand
                open={openModalAccept}
                onClose={() => setOpenModalAccept(false)}
                onSubmit={() => {
                  getData();
                  setOpenModalAccept(false);
                }}
                requestExpandId={parseInt(router.query.requestExpandId + "")}
              />
            </>
          )}
        </>
      }
    />
  );
};

export default RequestExpandDetail;
