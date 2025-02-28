import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
import { Table, Input, InputNumber } from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";

import logo from "assets/grand-energy-logo-small.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
// import { SendIcon } from "../../svgIcons";
// import { PdfIcon } from "../../svgIcons";

import classes from "../../ItemsAndServices/Invoices/SendInvoice/SendInvoice.module.css";
import { useHistory } from "react-router-dom";
// import SendQuotationModal from "./SendQuotationModal";

const { Title, Text } = Typography;

const dataItems = [
  {
    title: "1. Seawoods North",
    // image: HandBagImg
  },
  {
    title: "1. Seawoods North",
    // image: SneakersImg
  },
];

const dataServices = ["Leather Replacement", "Shoe Shine & Polish"];

const dataQty = [1, 1];

const dataPrice = ["S$100.00", "S$100.00"];

const dataTotal = ["S$100.00", "S$100.00"];

const dataGrandTotal = [
  { text: "Subtotal", amt: "S$100.00" },
  {
    text: "Discount",
    amt: "S$100.00",
    // tag: { text: "10%", color: "#0099A8" }
  },
  {
    text: "Tax/GST",
    amt: "S$100.00",
    // tag: { text: "10%", color: "#E82E2E" }
  },
];
const { Column } = Table;
const dataPaymentDetails = [
  { text: "Transaction Id:", val: "N/A" },
  { text: "Payment Date:", val: "06/11/2022, 10:00 Am" },
  { text: "Payment Method", val: "Cash" },
];
const Invoice = () => {
  const param = useParams();
  const tok = localStorage.getItem("token");
  const [invdata, setInvdata] = useState({});
  // const [showModal , setShowModal] = useState(false);
  const history = useHistory()
  // const showModalHandler = () => {
  //   setShowModal(prev => !prev);
  // }

  function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    // console.log(printContents)
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + printContents + "</body>";

    window.print();

    document.body.innerHTML = originalContents;
  }

  useEffect(() => {
    const data = { id: param.id };
    axios({
      method: "post",
      url: "/api/tc/get-invoice",
      data: data,
      headers: {
        // "Content-Type": "multipart/form-data; boundary=-- --WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${tok}`,
      },
    })
      .then((response) => {
        console.log("rse", response.data);
        if (response.data.success) {
          setInvdata(response.data.data);
        } else {
          console.log(response);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  console.log(invdata);

  return (
    <React.Fragment>
      {/* {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>} */}
      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="Customer Management / Customer Accounts / Customer Details / Invoices"
      />

      <Card id="print">
        <Card className={classes.card}>
          <div className="mt-2 mb-2">
            <img src={logo} alt="logo" />
          </div>
        </Card>
        <Card className={classes.add_details}>
          <div className="d-flex justify-content-between">
            <div style={{ maxWidth: "300px" }} className="">
              <p
                className={`${classes.textColor} m-0 font-weight-bolder font-size-lg`}
              >
                INV-12326565
              </p>
              <p
                className={`${classes.textColor} m-0 mt-4  font-weight-bolder`}
              >
                Grand Energy pte ltd
              </p>
              <p className="m-0 mt-2">sales@grandenergy.com</p>
              <p className="m-0 my-2">
                510, Kampong Bahru Rd, Street 123,Singapore 456589{" "}
              </p>
              <p className="m-0">Phone:(123) 456-7890</p>
            </div>
            <div className="mr-5 text-right">
              <p
                className={`${classes.textColor} m-0 font-weight-bolder font-size-lg`}
              >
                Customer Details
              </p>
              <p
                className={`${classes.textColor} m-0 mt-4  font-weight-bolder`}
              >
                Evergreen Hotel
              </p>
              <p className="m-0 mt-2">#12324</p>
              <p className="m-0 my-2">1111 ABC Road,XYZ Tower</p>
              <p className="m-0">Singapore, 0023</p>
            </div>
          </div>
        </Card>

        <div>
          {/* <Row>
            <Col span={9}>
              <p
                style={{ color: "#1A3353" }}
                classname="font-weight-bolder font-size-md"
              >
                JOB SITES
              </p>
              <List
                dataSource={dataItems}
                renderItem={(item) => (
                  <List.Item key={item.title} className=" pl-0 border-0">
                    <div
                      className={`d-flex font-weight-bolder align-items-center ${classes.textColor}`}
                    >
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
                  <p
                    style={{ color: "#1A3353" }}
                    classname="font-weight-bolder font-size-md"
                  >
                    TASK TYPES
                  </p>
                  <List
                    dataSource={dataServices}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className={`d-flex align-items-center ${classes.textColor} font-weight-semibold `}
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={4}>
                  <p
                    classname={`font-weight-bolder font-size-md ${classes.textColor}`}
                  >
                    TASKS QTY
                  </p>
                  <List
                    dataSource={dataQty}
                    renderItem={(item) => (
                      <List.Item key={item} className="border-0">
                        <div
                          style={{ height: "32px" }}
                          className={`d-flex align-items-center ${classes.textColor} font-weight-semibold `}
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={6}>
                  <p
                    classname={`font-weight-bolder font-size-md ${classes.textColor}`}
                  >
                    PRICE
                  </p>
                  <List
                    dataSource={dataPrice}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className={`d-flex align-items-center ${classes.textColor} font-weight-semibold `}
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={6}>
                  <p
                    classname={`font-weight-bolder font-size-md ${classes.textColor}`}
                  >
                    TOTAL
                  </p>
                  <List
                    dataSource={dataTotal}
                    renderItem={(item) => (
                      <List.Item key={item} className="pl-0 border-0">
                        <div
                          style={{ height: "32px" }}
                          className={`d-flex align-items-center ${classes.textColor} font-weight-semibold `}
                        >
                          {item}
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row> */}
          <Table dataSource={invdata.line_items}>
            {/* <Column
              title="ID"
              dataIndex="id"
              key="id"
              render={(text, record) => <p>{text}</p>}
            /> */}
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              render={(text, record) => <p>{text}</p>}
            />
            <Column
              title="Quantity"
              dataIndex="quantity"
              key="quantity"
              render={(text, record) => <p>{text}</p>}
            />
            <Column
              title="Price"
              dataIndex="price"
              key="price"
              render={(text, record) => <p>{text}</p>}
            />
            <Column
              title="Total"
              dataIndex="total"
              key="total"
              render={(text, record) => <p>{text}</p>}
            />
          </Table>
        </div>
        <Divider />
        <div className="d-flex justify-content-end">
          <Row
            style={{ width: "40%" }}
            className="d-flex justify-content-center"
          >
            {/* <Col span={12}>
              <List
                dataSource={dataGrandTotal}
                renderItem={(item) => (
                  <List.Item
                    key={item.text}
                    className="pl-0 border-0 d-flex justify-content-center"
                  >
                    <div style={{ color: '#72849A' }} className="d-flex align-items-center ">
                      <p style={{ color: '#72849A' }} className="m-0">{item.text}</p>
                      {item.tag && (
                        <div className={`${classes.total_amt}`}>
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
            </Col> */}
            <Col span={12}>
              <List>
                <List.Item className="pl-0 border-0 d-flex justify-content-between w-100">
                  <p style={{ color: "#72849A" }} className="m-0">
                    Sub Total :
                  </p>
                  <p
                    className={`m-0 d-flex align-items-center ${classes.textColor} font-weight-bold`}
                  >
                    {invdata.sub_total}
                  </p>
                </List.Item>
                <List.Item className="pl-0 border-0 d-flex justify-content-between w-100">
                  <p style={{ color: "#72849A" }} className="m-0">
                    Discount :
                  </p>
                  <p
                    className={`m-0 d-flex align-items-center ${classes.textColor} font-weight-bold`}
                  >
                    {invdata.discount}
                  </p>
                </List.Item>
                <List.Item className="pl-0 border-0 d-flex justify-content-between w-100">
                  <p style={{ color: "#72849A" }} className="m-0">
                    Tax 7% :
                  </p>
                  <p
                    className={`m-0 d-flex align-items-center ${classes.textColor} font-weight-bold`}
                  >
                    {invdata.tax}
                  </p>
                </List.Item>
              </List>
            </Col>
            <Divider />
            <p
              className={`${classes.textColor} font-size-lg font-weight-bolder`}
            >
              Net Total : {invdata.total}
            </p>
          </Row>
        </div>
        {/* <Divider /> */}
      </Card>
      <div className={`d-flex justify-content-end ${classes.action}`}>
        <Button onClick={history.goBack}>
          {/* <Icon component={PdfIcon} /> */}
          Cancel
        </Button>

        <Button
          type="primary"
          className={classes.send_btn}
          onClick={() => {
            printDiv("print");
          }}
        >
          {/* <Icon component={SendIcon} /> */}
          Download
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Invoice;
