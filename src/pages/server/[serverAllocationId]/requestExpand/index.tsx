"use client";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ServerDetail from "@components/server/ServerDetail";
import RequestExpandTable from "@components/server/requestExpand/RequestExpandTable";
import ModalCreateRemoval from "@components/server/requestExpand/ModalCreateRemoval";
import useDispatch from "@hooks/use-dispatch";
import useSelector from "@hooks/use-selector";
import { RequestExpandData } from "@models/requestExpand";
import {
  RUParamGet,
  RequestUpgrade,
  RequestUpgradeUpdateModel,
} from "@models/requestUpgrade";
import { ServerAllocation } from "@models/serverAllocation";
import requestUpgradeService from "@services/requestUpgrade";
import serverAllocationService from "@services/serverAllocation";
import { getRequestExpandData } from "@slices/requestExpand";
import {
  ROLE_CUSTOMER,
  ROLE_MANAGER,
  ROLE_SALES,
  ROLE_TECH,
} from "@utils/constants";
import { areInArray, parseJwt } from "@utils/helpers";
import { Alert, Button, FloatButton, Modal, Pagination, message } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { IoIosSend } from "react-icons/io";
import {
  SHCParamGet,
  ServerHardwareConfigData,
} from "@models/serverHardwareConfig";
import serverHardwareConfig from "@services/serverHardwareConfig";
import ModalCreate from "@components/server/requestExpand/ModalCreate";

const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});
const { confirm } = Modal;
const RequestExpand: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { requestExpandData } = useSelector((state) => state.requestExpand);

  const [paramGet, setParamGet] = useState<RUParamGet>({
    PageIndex: 1,
    PageSize: 10,
    ServerAllocationId: router.query.serverAllocationId ?? -1,
  } as unknown as RUParamGet);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [requestUpgradeUpdate, setRequestUpgradeUpdate] = useState<
    RequestUpgrade | undefined
  >(undefined);
  const [openModalCreateRemoval, setOpenModalCreateRemoval] =
    useState<boolean>(false);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [serverAllocationDetail, setServerAllocationDetail] =
    useState<ServerAllocation>();
  const [param, setParam] = useState<SHCParamGet>({
    PageIndex: 1,
    PageSize: 10,
  } as unknown as SHCParamGet);
  const [hardware, setHardware] = useState<ServerHardwareConfigData>();

  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);

  const getData = async () => {
    var customerId = "",
      userId = "";
    if (areInArray(session?.user.roles!, ROLE_SALES)) {
      userId = parseJwt(session?.user.access_token!).UserId;
    } else if (session?.user.roles.includes("Customer")) {
      customerId = parseJwt(session.user.access_token).UserId;
    }
    await serverAllocationService
      .getServerAllocationById(
        session?.user.access_token!,
        router.query.serverAllocationId + ""
      )
      .then(async (res) => {
        setServerAllocationDetail(res);
        await serverHardwareConfig
          .getServerHardwareConfigData(session?.user.access_token!, {
            ...param,
            ServerAllocationId: res.id,
          } as SHCParamGet)
          .then((res) => {
            setHardware(res);
          });
      });
    dispatch(
      getRequestExpandData({
        token: session?.user.access_token!,
        paramGet: {
          ...paramGet,
          CustomerId: customerId,
          UserId: userId,
        },
      })
    ).then(({ payload }) => {
      var res = payload as RequestExpandData;
      if (res?.totalPage < paramGet.PageIndex && res.totalPage != 0) {
        setParamGet({ ...paramGet, PageIndex: res.totalPage });
      }
    });
  };

  const deleteData = (requestUpgrade: RequestUpgrade) => {
    confirm({
      title: "Delete",
      content: (
        <Alert
          message={`Do you want to delete with Id ${requestUpgrade.id}?`}
          // description={`${serverAllocation.id}`}
          type="warning"
        />
      ),
      async onOk() {
        setLoadingSubmit(true);
        await requestUpgradeService
          .deleteData(session?.user.access_token!, requestUpgrade.id.toString())
          .then(() => {
            getData();
            message.success(`Delete Request successfully`, 1.5);
          })
          .catch((errors) => {
            message.error(errors.response.data ?? "Delete Request failed", 1.5);
            setLoadingSubmit(false);
          });
      },
      onCancel() {},
    });
  };

  const handleBreadCumb = () => {
    var itemBrs = [] as ItemType[];
    var items = router.asPath.split("/").filter((_) => _ != "");
    var path = "";
    items.forEach((element) => {
      switch (element) {
        case serverAllocationDetail?.id + "":
          path += `/${element}`;
          itemBrs.push({
            href: path,
            title: serverAllocationDetail?.name,
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
    if (router.query.serverAllocationId && session) {
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverAllocationDetail]);

  useEffect(() => {
    if (router.query.serverAllocationId && session) {
      paramGet.ServerAllocationId = parseInt(
        router.query.serverAllocationId!.toString()
      );
      getData();
      handleBreadCumb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, paramGet]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          {areInArray(
            session?.user.roles!,
            ROLE_SALES,
            ROLE_TECH,
            ROLE_CUSTOMER
          ) && (
            <>
              <div className="flex flex-wrap items-center justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
                <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
                {Boolean(
                  serverAllocationDetail?.status === "Working" &&
                    areInArray(session?.user.roles!, ROLE_CUSTOMER)
                ) && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<IoIosSend />}
                    onClick={() => {
                      setOpenModalCreateRemoval(true);
                    }}
                  >
                    Create Server Removal Request
                  </Button>
                )}

                {Boolean(
                  serverAllocationDetail?.status === "Waiting" &&
                    areInArray(session?.user.roles!, ROLE_CUSTOMER)
                ) && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<IoIosSend />}
                    onClick={() => {
                      setOpenModalCreate(true);
                    }}
                  >
                    Create Server Allocation Request
                  </Button>
                )}
              </div>

              <ModalCreate
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                onSubmit={() => {
                  setOpenModalCreate(false);
                  getData();
                }}
              />

              <ModalCreateRemoval
                open={openModalCreateRemoval}
                onClose={() => setOpenModalCreateRemoval(false)}
                onSubmit={() => {
                  setOpenModalCreateRemoval(false);
                  getData();
                }}
              />
              <ServerDetail
                serverAllocationDetail={serverAllocationDetail!}
                hardware={hardware!}
              ></ServerDetail>
              <RequestExpandTable
                urlOncell={`/server/${serverAllocationDetail?.id}`}
                serverAllocationId={serverAllocationDetail?.id.toString()}
                onEdit={(record) => {
                  setRequestUpgradeUpdate(record);
                }}
                onDelete={async (record) => {
                  deleteData(record);
                }}
              />
              {requestExpandData?.totalPage > 0 && (
                <Pagination
                  className="text-end m-4"
                  current={paramGet?.PageIndex}
                  pageSize={requestExpandData?.pageSize ?? 10}
                  total={requestExpandData?.totalSize}
                  onChange={(page, pageSize) => {
                    setParamGet({
                      ...paramGet,
                      PageIndex: page,
                      PageSize: pageSize,
                    });
                  }}
                />
              )}
            </>
          )}
        </>
      }
    />
  );
};

export default RequestExpand;
