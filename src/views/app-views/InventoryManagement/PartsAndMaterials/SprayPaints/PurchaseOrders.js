import React , {useState} from 'react'

import { Col , Row , Typography , Table , Card , Tag } from 'antd'

import Profile from './Profile'

const { Text } = Typography;

const columns = [
  {
    title: "Po Number",
    dataIndex: "poNumber",
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
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
    title: "Total Cost",
    dataIndex: "totalCost",
  },

  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: 'Status',
    dataIndex: 'status',
    

    render: (status) => {
      return(
      <span>
        <Tag color={status === "Stock Received" ? "green" : "yellow"} key={status}>
          {status}
        </Tag>
        </span>
        )
    }
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
  },
];

const data = [
  {
    key: 1,
    poNumber: "#123456",
    vendorName: "John Smith",
    costUnit: "S$100",
    qty: "5",
    totalCost: "S$100",
    date: "29/08/22",
    status: "Pending Approval",
    createdBy: "Admin"
  },
];
for (let i = 2; i <= 5; i++) {
  data.push({
    key: i,
    poNumber: "#123456",
    vendorName: "John Smith",
    costUnit: "S$100",
    qty: "5",
    totalCost: "S$100",
    date: "29/08/22",
    status: "Stock Received",
    createdBy: "Admin"
  });
}

const PurchaseOrders = () => {

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

export default PurchaseOrders