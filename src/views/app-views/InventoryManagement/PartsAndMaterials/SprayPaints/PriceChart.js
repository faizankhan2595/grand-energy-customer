import React , {useState} from 'react'

import { Col , Row , Typography , Table , Card } from 'antd'

import Profile from './Profile'

const { Text } = Typography;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
  },
  {
    title: "Po Number",
    dataIndex: "poNumber",
  },
  {
    title: "Cost/Unit",
    dataIndex: "costUnit",
  },
  {
    title: "Qty",
    dataIndex: "qty",
  },

  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Price Difference",
    dataIndex: "priceDifference",
  },
];

const data = [
  {
    key: 1,
    id: "#123456",
    vendorName: "John Smith",
    poNumber: "#123456789",
    costUnit: "S$100",
    qty: "5",
    date: "29/08/22",
    priceDifference: "S$100",
  },
];
for (let i = 2; i <= 2; i++) {
  data.push({
    key: i,
    id: "#123456",
    vendorName: "John Smith",
    poNumber: "#123456789",
    costUnit: "S$100",
    qty: "5",
    date: "29/08/22",
    priceDifference: "S$100",
  });
}

const PriceChart = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler,
  };
  return (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={6}>
          <Profile/>
        </Col>
        <Col span={18}>
        <Card>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              className="w-100"
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default PriceChart