// import { useSearchParams  } from 'next/navigation';

// const RackDetailPage = () => {
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id');

//     return (
//         <div>
//             <h1>Rack Information</h1>
//             <p>Rack ID: {id}</p>
//         </div>
//     );
// };

// export default RackDetailPage;

import { useSearchParams } from "next/navigation";
import { Col, Row, Divider, List, Popover, Segmented } from "antd";
const RackDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const data = [
    {
      id: 1,
      lable: "Reserved",
      active: false,
    },
    {
      id: 2,
      lable: "small server",
      active: true,
    },
    {
      id: 3,
      lable: "Reserved",
      active: false,
    },
    {
      id: 4,
      lable: "+",
      active: false,
    },
    {
      id: 5,
      lable: "+",
      active: false,
    },
    {
      id: 6,
      lable: "big server",
      active: true,
    },
    {
      id: 7,
      lable: "Reserved",
      active: false,
    },
    {
      id: 8,
      lable: "+",
      active: false,
    },
    {
      id: 9,
      lable: "+",
      active: false,
    },
  ];
  const text = <span>Title</span>;
  const contentLeft = (
    <div>
      <p>hover</p>
      <p>contentLeft</p>
    </div>
  );
  const contentRight = (
    <div>
      <p>click</p>
      <p>contentRight</p>
    </div>
  );
  return (
    <div>
      <h1>Rack Information</h1>
      <p>Rack ID: {id}</p>
      <Row style={{ justifyContent: "center" }}>
        <Col span={6}>
          <Divider orientation="left">Front Rack</Divider>
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ display: "block" }}>
                <Row wrap={false}>
                  <Col flex="none">
                    <Popover
                      placement="left"
                      title={text}
                      content={contentLeft}
                      arrow={true}
                    >
                      <div>{`U${item.id} |`}</div>
                    </Popover>
                  </Col>
                  <Popover
                    placement="right"
                    title={text}
                    content={contentRight}
                    trigger="click"
                  >
                    <Col flex="auto" style={{ textAlign: "center" }}>
                      {item.lable}
                    </Col>
                  </Popover>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RackDetailPage;
