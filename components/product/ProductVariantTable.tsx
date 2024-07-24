"use client";

import useSelector from "@hooks/use-selector";
import {
  Input,
  TableColumnsType,
  message,
  Space,
  Popconfirm,
  Tag,
  Select,
} from "antd";
import { Table } from "antd";
import useDispatch from "@hooks/use-dispatch";
import productProductServices from "@services/productProduct";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Pvc } from "@models/productProduct";
import { getProductVariants } from "@slices/productProduct";

const { Option } = Select;

interface Props {
  accessToken: string;
  productTmplId: string;
}

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  pvcs: Pvc[];
}

const ProductVariantTable: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { accessToken, productTmplId } = props;
  const { data: productVariantData, loading } = useSelector(
    (state) => state.productProduct
  );
  const [data, setData] = useState<DataType[]>([]);

  const deleteProductProduct = async (record: DataType) => {
    await productProductServices
      .deleteProductProduct(accessToken, record.id)
      .then(() => {
        dispatch(
          getProductVariants({
            token: accessToken,
            productTmplId: productTmplId,
          })
        );
      })
      .catch((error) => {
        message.error(error?.response?.data);
      });
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      key: "name",
      fixed: true,
      width: "30%",
      render: (record: DataType) => (
        <>
          <Input
            required
            readOnly
            style={{ cursor: "pointer" }}
            placeholder="Name"
            variant="borderless"
            defaultValue={record.name}
          />
        </>
      ),
    },
    {
      title: "Variant Values",
      key: "pvcs",
      render: (_, { pvcs, id }) => (
        <>
          <>
            {pvcs?.map((pvc) => {
              return (
                <Tag color="geekblue" key={pvc.attribute}>
                  {`${pvc.attribute}: ${pvc.value}`}
                </Tag>
              );
            })}
          </>
        </>
      ),
    },
    {
      key: "operation",
      width: "15%",
      render: (record: DataType) => (
        <Space wrap>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteProductProduct(record)}
          >
            <AiFillDelete className="cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (productVariantData) {
      const newData: DataType[] = productVariantData.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
        pvcs: item.pvcs,
      }));
      setData(newData);
    }
  }, [productVariantData]);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
      />
    </>
  );
};

export default ProductVariantTable;