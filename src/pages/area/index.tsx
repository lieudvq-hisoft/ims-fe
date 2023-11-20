"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { ParamGet } from "@models/base";
import useDispatch from "@hooks/use-dispatch";
import useSelector from "@hooks/use-selector";
import { getAreaData } from "@slices/area";
import { AreaCreateModel, AreaUpdateModel, Area, AreaData } from "@models/area";
import { Button, Pagination, message, Modal, Alert } from "antd";
import ModalCreate from "@components/area/ModalCreate";
import areaService from "@services/area";
import ModalUpdate from "@components/area/ModalUpdate";
import AreaTable from "@components/area/AreaTable";
const AntdLayoutNoSSR = dynamic(() => import("@layout/AntdLayout"), {
  ssr: false,
});

const { confirm } = Modal;

const Customer: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { customerData } = useSelector((state) => state.customer);

  const [paramGet, setParamGet] = useState<ParamGet>({
    PageIndex: 1,
    PageSize: 7,
  } as ParamGet);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [areaUpdate, setAreaUpdate] = useState<Area | undefined>(undefined);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const getData = async () => {
    dispatch(
      getAreaData({
        token: session?.user.access_token!,
        paramGet: { ...paramGet },
      })
    ).then(({ payload }) => {
      var res = payload as AreaData;
      if (res.totalPage < paramGet.PageIndex && res.totalPage != 0) {
        setParamGet({ ...paramGet, PageIndex: res.totalPage });
      }
    });
  };

  const createData = async (data: AreaCreateModel) => {
    await areaService
      .createData(session?.user.access_token!, data)
      .then((res) => {
        message.success("Create successful!");
        getData();
      })
      .catch((errors) => {
        message.error(errors.response.data);
      })
      .finally(() => {
        setOpenModalCreate(false);
      });
  };

  const updateData = async (data: AreaUpdateModel) => {
    await areaService
      .updateData(session?.user.access_token!, data)
      .then((res) => {
        message.success("Update successful!");
        getData();
      })
      .catch((errors) => {
        message.error(errors.message);
      })
      .finally(() => {
        setAreaUpdate(undefined);
      });
  };

  const deleteComponent = (area: Area) => {
    confirm({
      title: "Delete",
      content: (
        <Alert
          message={`Do you want to delete with Id ${area.id}?`}
          // description={`${serverAllocation.id}`}
          type="warning"
        />
      ),
      async onOk() {
        setLoadingSubmit(true);
        await areaService
          .deleteData(session?.user.access_token!, area.id)
          .then(() => {
            getData();
            message.success(`Delete area successful!`);
          })
          .catch((errors) => {
            message.error(errors.message ?? "Delete area failed");
            setLoadingSubmit(false);
          });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    session && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, paramGet]);
  return (
    <AntdLayoutNoSSR
      content={
        <>
          <div className="flex justify-between mb-4 p-2 bg-[#f8f9fa]/10 border border-gray-200 rounded-lg shadow-lg shadow-[#e7edf5]/50">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setOpenModalCreate(true);
              }}
            >
              Create
            </Button>
            {/* <SearchComponent
              placeholder="Search Name, Description..."
              setSearchValue={(value) =>
                setParamGet({ ...paramGet, SearchValue: value })
              }
            /> */}
          </div>
          <AreaTable
            onEdit={(record) => {
              setAreaUpdate(record);
            }}
            onDelete={async (record) => {
              deleteComponent(record);
            }}
          />

          <ModalCreate
            open={openModalCreate}
            onClose={() => setOpenModalCreate(false)}
            onSubmit={(data: AreaCreateModel) => {
              createData(data);
            }}
          />
          <ModalUpdate
            area={areaUpdate!}
            onClose={() => setAreaUpdate(undefined)}
            onSubmit={(data: AreaUpdateModel) => {
              updateData(data);
            }}
          />
          {customerData.totalPage > 0 && (
            <Pagination
              className="text-end m-4"
              current={paramGet.PageIndex}
              pageSize={customerData.pageSize ?? 10}
              total={customerData.totalSize}
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
      }
    />
  );
};

export default Customer;