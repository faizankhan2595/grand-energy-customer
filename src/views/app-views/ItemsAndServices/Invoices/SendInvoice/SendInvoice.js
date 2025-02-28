import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  Col,
  Row,
  List,
  Avatar,
  Divider,
  Tag,
  Button,
} from "antd";
import Icon from "@ant-design/icons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";

import logo from "assets/quotation-logo.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
import { SendIcon } from "../../svgIcons";
import { PdfIcon } from "../../svgIcons";

import classes from "./SendInvoice.module.css";
// import SendQuotationModal from "./SendQuotationModal";

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

const dataPaymentDetails = [
  { text: "Transaction Id:", val: "N/A" },
  { text: "Payment Date:", val: "06/11/2022, 10:00 Am" },
  { text: "Payment Method", val: "Cash" },
];
const SendInvoice = () => {
  // const [showModal , setShowModal] = useState(false);

  // const showModalHandler = () => {
  //   setShowModal(prev => !prev);
  // }

  return (
    <React.Fragment>
      {/* {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>} */}
      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="quotation / Quotations"
      />

      <Card>
        <Card className={classes.card}>
          <div className="mt-2 mb-2">
            <img src={logo} alt="logo" />
          </div>
        </Card>
        <Card className={classes.add_details}>
          <div className="d-flex justify-content-between">
            <div>
              <Title className={`${classes.textColor}`} strong level={3}>
                HCI1234-QTN
              </Title>
              <br />
              <Text className={`${classes.textColor}`}>Honest Crafters</Text>
              <br />
              <Text className={`${classes.textColor}`} >honestcrafters@contact.com</Text>
              <br />
              <br />

              <Text className={`${classes.textColor}`} >510, Kampong Bahru </Text>
              <br />
              <Text className={`${classes.textColor}`} >Rd, Street 123,Singapore 456589 </Text>
              <br />
              <Text className={`${classes.textColor}`} >Phone:(123) 456-7890</Text>
            </div>
            <div style={{textAlign:"right"}} className="mr-5 text-right">
              <Title className={`${classes.textColor}`}  strong level={3}>
                Billed To
              </Title>
              <br />
              <Text className={`${classes.textColor}`}  strong>John Smith</Text>
              <br />
              <br />

              <Text className={`${classes.textColor}`} >1111 ABC Road,XYZ Tower</Text>
              <br />
              <Text className={`${classes.textColor}`} >Singapore, 0023</Text>
            </div>
          </div>
        </Card>

        <div>
          <Title>Items & Services</Title>
          <Row>
            <Col span={9}>
              <Title level={4}>ITEMS & SERVICES</Title>
              <List
                dataSource={dataItems}
                renderItem={(item) => (
                  <List.Item key={item.title} className=" pl-0 border-0">
                    <div className="d-flex align-items-center">
                      <img className="mr-3" src={item.image} />
                      {item.title}
                    </div>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={15}>
              <Row>
                <Col span={8}>
                  <Title level={4}>SERVICE</Title>
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
                  <Title level={4}>QTY</Title>
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
                  <Title level={4}>PRICE</Title>
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
        <Divider />
        <div className="d-flex justify-content-start">
          <Row
            style={{ width: "50%" }}
            className="d-flex justify-content-center"
          >
            <Col span={12}>
              <List
                dataSource={dataPaymentDetails}
                renderItem={(item) => (
                  <List.Item
                    key={item.text}
                    className="pl-0 border-0 "

                  >
                    <div className="d-flex align-items-center ">
                      <Title level={4} strong>
                        {item.text}
                      </Title>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <List
                dataSource={dataPaymentDetails}
                renderItem={(item) => (
                  <List.Item
                    key={item.val}
                    className="pl-0 border-0"
                  >
                    <div className="d-flex align-items-center" style={{ height: "32.3px" }}>
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
                      {item.val}
                    </div>
                  </List.Item>
                )}
              />
            </Col>

          </Row>
        </div>
      </Card>
      <div className={`d-flex justify-content-end ${classes.action}`}>
        <Button>
          <Icon component={PdfIcon} />
          Download PDF
        </Button>

        <Button type="primary" className={classes.send_btn}>
          <Icon component={SendIcon} />
          Send
        </Button>
      </div>
    </React.Fragment>
  );
};

export default SendInvoice;
