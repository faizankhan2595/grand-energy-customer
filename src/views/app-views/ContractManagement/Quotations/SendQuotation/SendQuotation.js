import React , {useState} from "react";
import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  Col,
  Row,
  List,
  Divider,
  Tag,
  Button,
  // Avatar,
} from "antd";
import Icon from "@ant-design/icons"
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";
import logo from "assets/grand-energy-logo-small.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
import { PdfIcon } from "../../../ItemsAndServices/svgIcons";
// import logo from "assets/grand-energy-logo.png";
// import { SendIcon } from "assets/svg/icon";
import classes from "./SendQuotation.module.css";
import SendQuotationModal from "./SendQuotationModal";

const { Title, Text } = Typography;

const dataItems = [
  { title: "XYZ Hand Bag", image: HandBagImg },
  { title: "Sneakers", image: SneakersImg },
];

const dataServices = ["Leather Replacement", "Shoe Shine & Polish"];

const dataQty = [1, 1];

const dataPrice = ["S$100.00", "S$100.00"];

const dataTotal = ["S$100.00", "S$100.00"];

const dataGrandTotal = [
  { text: "Subtotal", amt: "S$100.00" },
  { text: "Discount", amt: "S$100.00", tag: { text: "10%", color: "#0099A8" } },
  { text: "Tax", amt: "S$100.00", tag: { text: "10%", color: "#E82E2E" } },
];
const SendQuotation = () => {

  const [showModal , setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(prev => !prev);
  }

  return (
    <React.Fragment>

      {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>}
      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="Quotations / View Quotation"
      />

      <Card>
        <Card className={classes.card}>
          <div className="mt-2 mb-2 w-100">
            <img src={logo} alt="logo" style={{width: '20%'}}/>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <Title strong level={3}>
                  GRAND ENERGY TECHNOLOGIES PTE LTD
                </Title>
                <Text><b>Email:</b> admin@getpl.com.sg</Text>
              </div>
              <div></div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <Text><b>Phone:</b> 6025 3659</Text>
                <br />
                <Text><b>UEN/GST No:</b> 201802457D</Text>
              </div>
              <div className="text-right">
                <Text>Bik 130 Jurong Gateway Road </Text>
                <br />
                <Text>#03-203 Singapore 600130 </Text>
              </div>
            </div>
          </div>
        </Card>
        <Card className={classes.add_details}>
          <div>
            <h5>Billed To:</h5>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mr-5">
              {/* <Title strong level={3}>
                Billed To
              </Title> */}
              <br />
              <Text strong>John Smith</Text>
              <br />
              <Text>1111 ABC Road,XYZ Tower</Text>
              <br />
              <Text>Singapore, 0023</Text>
              <br />
              <br />
              <Text>admin@customer.com</Text>
              <br />
              <Text><b>Phone:</b> 11111111</Text>
            </div>
            <div className="d-flex justify-content-between">
              <div className="mr-4">
                <br />
                <Text strong>Quotation No</Text>
                <br />
                <Text>1111</Text>
                <br />
                <br />
                <Text strong>Quotation Date</Text>
                <br />
                <Text>24 Dec, 2024</Text>
                <br />
              </div>
              <div className="text-right">
                <br />
                <Text strong>Payment Term</Text>
                <br />
                <Text>COD</Text>
                <br />
                <br />
                <Text strong>Validity</Text>
                <br />
                <Text>7 Days</Text>
                <br />
              </div>
            </div>
          </div>
        </Card>

        <div>
          <Row>
            <Col span={3}>
              <Title level={4}>Sr. No.</Title>
              <List
                dataSource={dataItems}
                renderItem={(item, index) => (
                  <List.Item key={item.title} className=" pl-0 border-0">
                    {index + 1}
                  </List.Item>
                )}
              />
            </Col>
            <Col span={21}>
              <Row>
                <Col span={8}>
                  <Title level={4}>Description</Title>
                  <List
                    dataSource={dataServices}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className="d-flex align-items-center"
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={4}>
                  <Title level={4}>Provisional Quantity</Title>
                  <List
                    dataSource={dataQty}
                    renderItem={(item) => (
                      <List.Item key={item} className="border-0">
                        <div
                          style={{ height: "32px" }}
                          className="d-flex align-items-center"
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={6}>
                  <Title level={4}>Unit Price</Title>
                  <List
                    dataSource={dataPrice}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className="d-flex align-items-center"
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={6}>
                  <Title level={4}>TOTAL</Title>
                  <List
                    dataSource={dataTotal}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className="d-flex align-items-center"
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Divider />
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
                      <Text strong>{item.text}</Text>
                      {item.tag && (
                        <div className={classes.total_amt}>
                          <Tag
                            color={item.tag.color}
                            className={`h-100 w-100 ${classes.tag}`}
                          >
                            {item.tag.text}
                          </Tag>
                        </div>
                      )}
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
                    <div className="d-flex align-items-center">{item.amt}</div>
                  </List.Item>
                )}
              />
            </Col>
            <Divider />

            <Title strong level={2}>
              Grand Total: S$100.00
            </Title>
          </Row>
        </div>
      </Card>

      <div className={`d-flex justify-content-end ${classes.action}`}>
        <Button>
          <Icon component={PdfIcon} />
          Download PDF
        </Button>
        
          {/* <Button type="primary" className={classes.send_btn} onClick={showModalHandler}>
            <Icon component={SendIcon} />
            Send
          </Button> */}
      </div>
    </React.Fragment>
  );
};

export default SendQuotation;
