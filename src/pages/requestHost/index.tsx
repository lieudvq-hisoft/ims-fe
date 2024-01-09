"use client";
import BreadcrumbComponent from "@components/BreadcrumbComponent";
import RequestHostTable from "@components/server/requestHost/RequestHostTable";
import useDispatch from "@hooks/use-dispatch";
import useSelector from "@hooks/use-selector";
import { getRequestHostData } from "@slices/requestHost";
import { Alert, Button, FloatButton, Modal, Pagination, message } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RequestHostData, RequestHost, RequestHostCreateModel, RequestHostIp } from "@models/requestHost";
import { ParamGet } from "@models/base";
import requestHostService from "@services/requestHost";
import { getRequestHostDataAll } from "@slices/requestHost";
import { ROLE_CUSTOMER, ROLE_SALES, ROLE_TECH } from "@utils/constants";
import { areInArray, parseJwt } from "@utils/helpers";
import ModalCreateRemoval from "@components/server/requestHost/ModalCreateRemoval";
import SearchComponent from "@components/SearchComponent";

const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});
const { confirm } = Modal;
const RequestHostList: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { requestHostData } = useSelector((state) => state.requestHost);

  const [paramGet, setParamGet] = useState<ParamGet>({
    PageIndex: 1,
    PageSize: 7,
  } as ParamGet);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [requestHost, setRequestHost] = useState<RequestHostData>();
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [itemBreadcrumbs, setItemBreadcrumbs] = useState<ItemType[]>([]);

  const getData = async () => {
    var customerId = "";
    if (session?.user.roles.includes("Customer")) {
      customerId = parseJwt(session?.user.access_token!).UserId;
    }
    dispatch(
      getRequestHostDataAll({
        token: session?.user.access_token!,
        paramGet: { ...paramGet, CustomerId: customerId },
      })
    ).then(({ payload }) => {
      var res = payload as RequestHostData;
      if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
        setParamGet({ ...paramGet, PageIndex: res.totalPage });
      }
    });
  };

  useEffect(() => {
    if (session)
      {getData(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, paramGet]);

  return (
    <AntdLayoutNoSSR
      content={
        <>
          <div className="flex justify-end mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
            <SearchComponent
              placeholder="Search Name, Description..."
              setSearchValue={(value) =>
                setParamGet({ ...paramGet, SearchValue: value })
              }
            />
          </div>
          {areInArray(session?.user.roles!, ROLE_CUSTOMER, ROLE_TECH, ROLE_SALES) && (
            <>
              <RequestHostTable
                urlOncell=""
                onEdit={(record) => { }}
                onDelete={async (record) => { }}
              />
              {requestHostData?.totalPage > 0 && (
                <Pagination
                  className="text-end m-4"
                  current={paramGet?.PageIndex}
                  pageSize={requestHostData?.pageSize ?? 10}
                  total={requestHostData?.totalSize}
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

export default RequestHostList;
