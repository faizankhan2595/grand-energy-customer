import React , {useState} from 'react'

import { Col , Row , Typography , Table , Card , Tag } from 'antd'

import Profile from './Profile'
import Actions from './Actions';

const { Text } = Typography;

const columns = [
  {
    title: "Quote Number",
    dataIndex: "quoteNumber",
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Cost/Unit",
    dataIndex: "costUnit",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiryDate",
  },
  {
    title: 'Status',
    dataIndex: 'status',
    

    render: (status) => {
      return(
      <span>
        <Tag color={status === "Active" ? "green" : "error"} key={status}>
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

  {
    title: "Action",
    dataIndex: "action",

    render: () => <Actions/>
  }
];

const data = [
  {
    key: 1,
    quoteNumber: "#123456",
    vendorName: "John Smith",
    date: "29/08/22",
    costUnit: "S$100",
    expiryDate: "#29/08/22",
    status: "Active",
    createdBy: "Admin",
  },
];
for (let i = 2; i <= 2; i++) {
  data.push({
    key: i,
    quoteNumber: "#123456",
    vendorName: "John Smith",
    date: "29/08/22",
    costUnit: "S$100",
    expiryDate: "#29/08/22",
    status: "In Active",
    createdBy: "Admin",
  });
}

const Quotations = () => {

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

export default Quotations