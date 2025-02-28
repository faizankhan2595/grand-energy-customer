import React from "react";

import { Tabs, Button, Row, Col , Table , Card , List , Divider , Typography, Space} from "antd";
import Icon from "@ant-design/icons";

import { InventoryManagementPageIcon } from "assets/svg/icon";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { ActivePurchaseOrdersIcon } from "views/app-views/InventoryManagement/TabIcons";
import UploadBox from "components/shared-components/UploadBox";
import AddNewPoForm from "./CreatePoForm";
import { useHistory } from "react-router-dom";

// import classes from "./AddNewPo.module.css";

const {Title , Text} = Typography

const columns = [
  {
    title:"Part & Material",
    dataIndex: 'partAndMaterial',
    key: 'partAndMaterial'
  },
  {
    title:"Qty",
    dataIndex: 'qty',
    key: 'qty'
  },
  {
    title:"Purchase Price(S$)",
    dataIndex: 'purchasePrice',
    key: 'purchasePrice'
  },
  {
    title:"Discount(S$)",
    dataIndex: 'discount',
    key: 'discount'
  },
  {
    title:"Tax(%)",
    dataIndex: 'tax',
    key: 'tax'
  },
  {
    title:"Tax Amount",
    dataIndex: 'taxAmount',
    key: 'taxAmount'
  },
  {
    title:"Unit Cost(S$)",
    dataIndex: 'unitCost',
    key: 'unitCost'
  },
  {
    title:"Total Cost",
    dataIndex: 'totalCost',
    key: 'totalCost'
  },
]

const dataSource = [
  {
    key: '1',
    partAndMaterial: 'Part 1',
    qty: '15',
    purchasePrice: '1000',
    discount: '50',
    tax: '0',
    taxAmount: '0',
    unitCost: '1000',
    totalCost: 'Total Cost (S$)'
  },
  {
    key: '2',
    partAndMaterial: 'Part 2',
    qty: '15',
    purchasePrice: '1000',
    discount: '50',
    tax: '0',
    taxAmount: '0',
    unitCost: '1000',
    totalCost: 'Total Cost (S$)'
  },
]

const dataGrandTotal = [
  { text: "Subtotal", amt: "S$100.00" },
  { text: "Discount", amt: "S$100.00" },
  { text: "Tax", amt: "S$100.00" },
];



const CreatePo = () => {

  const history = useHistory();

  const backHandler = () => {
    history.goBack();
  }

  const content = (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          <AddNewPoForm />
        </Col>
        <Col span={8}>
          <UploadBox
            title="Attachments"
            text={`Drag & drop files here or Choose Files`}
            hint="Files supported:jpg,png,jpeg,etc"
          />
        </Col>
      </Row>
  
      <Card>
        <Table dataSource={dataSource} columns={columns} pagination={false}/>;
        <div className="d-flex justify-content-end">
            <Row
              style={{ width: "40%" }}
              className="d-flex justify-content-center"
            >
              <Col span={12}>
                <List
                  dataSource={dataGrandTotal}
                  renderItem={(item) => (
                    <List.Item
                      key={item.text}
                      className="pl-0 border-0 d-flex justify-content-center"
                    >
                      <div className="d-flex align-items-center ">
                        <Text>{item.text}</Text>
                        
                      </div>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <List
                  dataSource={dataGrandTotal}
                  renderItem={(item) => (
                    <List.Item
                      key={item.amt}
                      className="pl-0 border-0 d-flex justify-content-center"
                    >
                      <Text strong className="d-flex align-items-center">{item.amt}</Text>
                    </List.Item>
                  )}
                />
              </Col>
              
  
              
            </Row>
          </div>
          <Divider />
  
  
          <div className="d-flex justify-content-end">
            <Row
              style={{ width: "40%" }}
              className="d-flex justify-content-center"
            >
              <Col span={12} className="text-center">
              <Text strong className="mr-4">Total</Text>
              </Col>
              <Col span={12} className="text-center">
              <Text strong className="mr-4">S$100.00</Text>
              </Col>
              
  
              
            </Row>
          </div>
          
      </Card>
  
      <Space size="middle" className={`d-flex justify-content-end`}>
        <Button style={{minWidth: "125px"}} onClick={backHandler}>Back</Button>
        <Button style={{minWidth: "125px"}}>Clear All</Button>
  
        <Button style={{minWidth: "125px"}} type="primary">
          Save
        </Button>
      </Space>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <PageHeading
        title="Inventory Management / Parent & Material / Spray paints / Add New PO"
        svg={InventoryManagementPageIcon}
      />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <div className="d-flex align-items-center">
                <Icon component={ActivePurchaseOrdersIcon} />
                PO Details
              </div>
            ),
            children: content,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default CreatePo;
