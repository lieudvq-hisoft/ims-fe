"use client";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import ServerDetail from "@components/server/ServerDetail";
import RequestExpandDetailInfor from "@components/server/requestExpand/RequestExpandDetail";
import { RequestExpand } from "@models/requestExpand";
import { RUAppointmentParamGet } from "@models/requestUpgrade";
import { ServerAllocation } from "@models/serverAllocation";
import requestExpandService from "@services/requestExpand";
import serverAllocationService from "@services/serverAllocation";
import { getAppointmentData } from "@slices/requestExpand";
import { Alert, FloatButton, Modal, Pagination, message } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import useSelector from "@hooks/use-selector";
import useDispatch from "@hooks/use-dispatch";
import AppointmentTable from "@components/server/requestUpgrade/AppointmentTable";
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

  const [rUAppointmentParamGet, setRUAppointmentParamGet] =
    useState<RUAppointmentParamGet>({
      PageIndex: 1,
      PageSize: 10,
      RequestUpgradeId: router.query.requestExpandId ?? -1,
    } as unknown as RUAppointmentParamGet);

  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);
  const { appointmentData } = useSelector((state) => state.requestExpand);

  const getData = async () => {
    await serverAllocationService
      .getServerAllocationById(
        session?.user.access_token!,
        router.query.serverAllocationId + ""
      )
      .then((res) => {
        setServerAllocationDetail(res);
      });

    await requestExpandService
      .getDetail(session?.user.access_token!, router.query.requestExpandId + "")
      .then((res) => {
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
            message.success("Reject request expand successful!");
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
            message.success("Complete request expand successful!");
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
    if (router.query.serverAllocationId && session) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (router.query.requestExpandId && session) {
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
  }, [session, rUAppointmentParamGet]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          <div className="flex flex-wrap items-center justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
            <BreadcrumbComponent itemBreadcrumbs={itemBreadcrumbs} />
          </div>
          <div className="md:flex">
            <ServerDetail
              serverAllocationDetail={serverAllocationDetail!}
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
          {Boolean(
            requestExpandDetail?.status === "Accepted" &&
              requestExpandDetail?.succeededAppointment?.status === "Success"
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
        </>
      }
    />
  );
};

export default RequestExpandDetail;
