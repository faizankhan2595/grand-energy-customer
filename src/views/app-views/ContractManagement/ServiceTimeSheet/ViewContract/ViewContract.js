import React , { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Card,
    Typography,
    Col,
    Row,
    List,
    Divider,
    Tag,
    Button,
    Select,
    Table,
    DatePicker,
    Modal,
    Input,
    message
} from "antd";
import Icon from "@ant-design/icons";
import PageHeading from "components/shared-components/PageHeading/PageHeading";

import logo from "assets/grand-energy-logo-small.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
import { PdfIcon } from "../../../ItemsAndServices/svgIcons";
import generatePDF, { Margin } from 'react-to-pdf';
import axios from "axios";
import moment from "moment";
// import Modal from "components/UI/Modal";
// import { Link } from "react-router-dom";
// import logo from "assets/grand-energy-logo.png";
// import { SendIcon } from "assets/svg/icon";

import classes from "./ViewContract.module.css";

const { Title, Text } = Typography;

const options = {
    page: {
       margin: Margin.SMALL,
    }
};

const ViewContract = () => {
    const targetRef = useRef();
    const history = useHistory();
    const param = useParams();

    const [customerData , setCustomerData] = useState({
        customerId: 0,
        email: '',
        name: '',
        phone: '',
        status: '',
        profile_pic: '',
        contact_name: '',
        office_contact_number: '',
        uen_number: '',
        postal_code: '',
        block_number: '',
        level_number: '',
        unit_number: '',
        street_number: '',
        country: '',
        created_by: '',
        other_details: {}
    });
    const [quoteData , setQuoteData] = useState({
        id: 0,
        customer_id: '',
        jobsite_id: '',
        customerName: '',
        jobsite: '',
        inquiryDate: '',
        quotationDate: '',
        amount: '',
        status: '',
        
        tc_customer_id: '',
        task_period_from_date: '',
        task_period_to_date: '',
        due_date: '',
        sub_total: 0,
        tax: 8,
        discount: 0,
        total: 0,
        tc_quotation_file: '',
        quotation_remarks: '',
        line_items: [],
    });
    const [contractData , setContractData] = useState({
        id: 0,
        customer_id: '',
        jobsite_id: '',
        customerName: '',
        jobsite: '',
        start_date: '',
        end_date: '',
    });
    const [gstData, setGstData] = useState([]);
    // const [openContractModal , setOpenContractModal] = useState(false);
    // const [commencementDate , setCommencementDate] = useState(false);
    // const [expiryDate , setExpiryDate] = useState(false);
    // const [remindersData , setRemindersData] = useState([]);
    // const [contractType , setContractType] = useState(false);
    const [grandTotal , setGrandTotal] = useState([
    //   { text: "Grand Total", amt: "0" }
    ]);
    const [dataGrandTotal , setDataGrandTotal] = useState([
    //   { text: "Subtotal", amt: "0" },
    //   { text: "GST", amt: "0", tag: { text: "0%", color: "#0099A8" } },
    ]);
    
    const getContractData = () => {
        axios
        .post(
            "/api/tc/get-contract",
            {
            id: +param.id,
            },
        )
        .then((response) => {
            let res = response.data.data;

            setContractData({
                id: res?.id,
                customer_id: res?.tc_customer_id,
                jobsite_id: res?.tc_customer_job_site_id,
                quotation_id: res?.tc_quotation_id,
                customerName: res?.customer_name,
                jobsite: res?.job_site_name,
                start_date: res?.start_date,
                end_date: res?.end_date,
                // status: res?.status || 'Quote Sent',
                created_at: moment(res.created_at).format('DD-MM-YYYY hh:mm A')
            })
            console.log(contractData);
            getQuotationData(res.tc_quotation_id)

            if(res.tc_customer_id) getCustomerData(res.tc_customer_id);
            // getAllGst(res.total);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const getQuotationData = (q_id) => {
        axios
        .post(
            "/api/tc/get-quotation",
            {
            id: +q_id,
            },
        )
        .then((response) => {
            let res = response.data.data;

            setQuoteData({
                id: res?.id,
                customer_id: res?.tc_customer_id,
                jobsite_id: res?.tc_customer_job_site_id,
                customerName: res?.customer_name,
                jobsite: res?.jobsite_name,
                inquiryDate: res?.inquiry_date ? moment(res?.inquiry_date).format('DD-MM-YYYY HH:mm A'):'',
                quotationDate: moment(res?.task_period_from_date).format('DD-MM-YYYY'),
                amount: res?.total,
                status: res?.status || 'Quote Sent',
                
                tc_customer_id: res?.tc_customer_id,
                task_period_from_date: moment(res?.task_period_from_date),
                task_period_to_date: moment(res?.task_period_to_date),
                due_date: moment(res?.due_date).format('DD-MM-YYYY'),
                sub_total: res?.sub_total || 0,
                tax: res?.gst || 8,
                discount: res?.discount || 0,
                total: res?.total,
                tc_quotation_file: res?.tc_quotation_file,
                quotation_remarks: res?.quotation_remarks || '',
                line_items: res?.line_items || [],
            })
            console.log(quoteData);

            if(res.tc_customer_id) getCustomerData(res.tc_customer_id);

            // getAllGst(res.total);
            let subtotal_amount = res.sub_total || res.total;
            let total_amount = res.total;
            let gst_percentage = res?.tax;
            let gst_amount = (+gst_percentage/100)*subtotal_amount || 0;
            if(gst_amount) {
                total_amount = subtotal_amount + gst_amount;
            }

            if(res.total) {
                setDataGrandTotal([
                    { text: "Subtotal", amt: `${subtotal_amount || 0}` },
                    { text: "GST", amt: `${gst_amount.toFixed(2) || 0}`, tag: { text: (gst_percentage || 0)+`%`, color: "#0099A8" } },
                ]);
                setGrandTotal([
                    { text: "Grand Total", amt: (total_amount).toFixed(2) }
                ])
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const getCustomerData = (cust_id) => {
        axios
        .post(
            "/api/tc/get-customer",
            {
            id: cust_id,
            },
        )
        .then((response) => {
            let res = response.data.data;

            if(res.other_details) {
                let other_details = JSON.parse(res.other_details);
                res = {...res, ...other_details}
            }
            setCustomerData({
                customerId: res.id,
                email: res.email,
                name: res.name,
                phone: res.phone,
                status: res.status,
                profile_pic: res?.profile_pic,
                contact_name: res?.contact_name,
                office_contact_number: res?.office_contact_number,
                uen_number: res?.uen_number,
                postal_code: res?.postal_code || '000000',
                block_number: res?.block_number || '',
                level_number: res?.level_number || '',
                unit_number: res?.unit_number || '',
                street_number: res?.street_number || '',
                country: res?.country || 'Singapore',
                created_by: res?.created_by || '',
                other_details: res?.other_details
            })
            console.log(customerData)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // const getAllGst = (total)=> {
    //     axios({
    //         method: 'post',
    //         url: "/api/tc/get-all-gsts",
    //         data: {},
    //     }).then(function (response) {
    //         if(response.data.success) {
    //             console.log(response.data.data)
    //             let res = response.data.data.data;
    //             let fdata = res.map((elem, ind) => {
    //               return {
    //                   key: elem.id,
    //                   id: elem.id,
    //                   srNo: ind+1,
    //                   percentage: elem.percentage,
    //                   description: elem.description,
    //                   created_at: moment(elem.created_at).format("DD-MM-YYYY"),
    //                   updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
    //               };
    //             });
    //             setGstData(fdata);
    //             console.log(fdata)
    //             let gst_percentage = fdata[fdata.length-1].percentage || 0;
    //             let gst_amount = ((gst_percentage/100)*total);
    //             let total_amount = total + (gst_amount || 0)

    //             if(total) {
    //               setDataGrandTotal([
    //                 { text: "Subtotal", amt: `${total || 0}` },
    //                 { text: "GST", amt: `${gst_amount.toFixed(2) || 0}`, tag: { text: `${gst_percentage || 9}%`, color: "#0099A8" } },
    //               ]);
    //               setGrandTotal([
    //                 { text: "Grand Total", amt: (total_amount || 0).toFixed(2) }
    //               ])
    //             }
    //         }
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // };

      useEffect(() => {
        getContractData();
      }, []);

  return (
    <React.Fragment>

      <PageHeading
        svg={ItemsAndServicesPageIcon}
        title="Contracts / View Contract"
      />

      <Card className="quotation-card">
            <div ref={targetRef}>
                <Card className={classes.add_details}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Text strong>{customerData.name}</Text>
                            <br />
                            <Text>{`${customerData.block_number} ${customerData.street_number}, ${customerData.level_number}, ${customerData.unit_number}`}</Text>
                            <br />
                            <Text>{`${customerData.country}, ${customerData.postal_code}`}</Text>
                            <br />
                            <Text strong>Customer ID: </Text><Text>{customerData.customerId}</Text>
                            <br />
                            <Text strong>Tel Number: </Text><Text>{customerData.phone}</Text>
                            <br />
                            <Text strong>Jobsite: </Text><Text>{contractData.jobsite}</Text>
                        </div>
                        <div className="text-left pr-4">
                            <div style={{fontSize: '1.5rem', fontWeight: '700'}} className="text-center">WORK ORDER</div>
                            <div className="d-flex justify-content-between">
                                <div className="mr-3">
                                    <Text>Contract No: </Text>
                                    <br />
                                    <Text>Date Of Commencement: </Text>
                                    <br />
                                    <Text>Date Of Expire: </Text>
                                    <br />
                                </div>
                                <div>
                                    <Text>#{contractData.id}</Text>
                                    <br />
                                    <Text>{contractData.start_date}</Text>
                                    <br />
                                    <Text>{contractData.end_date}</Text>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
        
                <div>
                    <Row>
                    <Col span={3}>
                        <Title level={4}>Sr. No.</Title>
                        <List
                        // dataSource={dataItems}
                        dataSource={quoteData.line_items}
                        renderItem={(item, index) => (
                            <List.Item key={item.name} className=" pl-0 border-0">
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
                            // dataSource={dataServices}
                            dataSource={quoteData.line_items}
                            renderItem={(item) => (
                                <List.Item key={item.name} className="pl-0 border-0">
                                <div
                                    style={{ height: "32px" }}
                                    className="d-flex align-items-center"
                                >
                                    {item.name}
                                </div>
                                </List.Item>
                            )}
                            />
                        </Col>
                        <Col span={5}>
                            <Title level={4}>Provisional Qty</Title>
                            <List
                            // dataSource={dataQty}
                            dataSource={quoteData.line_items}
                            renderItem={(item) => (
                                <List.Item key={item.quantity} className="border-0">
                                <div
                                    style={{ height: "32px" }}
                                    className="d-flex align-items-center"
                                >
                                    {item.quantity}
                                </div>
                                </List.Item>
                            )}
                            />
                        </Col>
                        <Col span={5}>
                            <Title level={4}>Unit Price(S$)</Title>
                            <List
                            // dataSource={dataPrice}
                            dataSource={quoteData.line_items}
                            renderItem={(item) => (
                                <List.Item key={item.price} className="pl-0 border-0">
                                <div
                                    style={{ height: "32px" }}
                                    className="d-flex align-items-center"
                                >
                                    {item.price}
                                </div>
                                </List.Item>
                            )}
                            />
                        </Col>
                        <Col span={6}>
                            <Title level={4}>SUBTOTAL(S$)</Title>
                            <List
                            // dataSource={dataTotal}
                            dataSource={quoteData.line_items}
                            renderItem={(item) => (
                                <List.Item key={item.total} className="pl-0 border-0">
                                <div
                                    style={{ height: "32px" }}
                                    className="d-flex align-items-center"
                                >
                                    {item.total}
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
                                  <div className={`${classes.total_amt} align-items-center`}>
                                      {/* <Tag
                                      color={item.tag.color}
                                      className={`h-100 w-100 ${classes.tag}`}
                                      style={{borderRadius: '1.5px', paddingTop: '1px'}}
                                      >
                                      {item.tag.text}
                                      </Tag> */}
                                      <span style={{background: (item.tag.color), padding: '1.5px 4px'}}
                                      className="ml-2 "
                                      >{item.tag.text}</span>
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
                              <div className="d-flex align-items-center">S$ {item.amt}</div>
                              </List.Item>
                          )}
                          />
                      </Col>
                      <Divider />

                      <Col span={12}>
                          <List
                          dataSource={grandTotal}
                          renderItem={(item) => (
                              <List.Item
                              key={item.text}
                              className="pl-0 border-0 d-flex justify-content-center"
                              >
                              <div className="d-flex align-items-center ">
                                  <Text strong>{item.text}</Text>
                              </div>
                              </List.Item>
                          )}
                          />
                      </Col>
                      <Col span={12}>
                          <List
                          dataSource={grandTotal}
                          renderItem={(item) => (
                              <List.Item
                              key={item.amt}
                              className="pl-0 border-0 d-flex justify-content-center"
                              >
                              <div className="d-flex align-items-center">S$ {item.amt}</div>
                              </List.Item>
                          )}
                          />
                      </Col>
                    </Row>
                </div>

                <Divider />
                <div className="mt-5 d-flex justify-content-start" style={{fontSize: '14px'}}>
                   <div style={{width: '40%'}}>
                      <Divider />
                      <h5><b>Grand Energy Technologies Pte Ltd</b></h5>
                      <div style={{color: '#72849A'}}>Officer Incharge</div>
                      <div style={{color: '#72849A'}}>{quoteData.quotationDate}</div>
                   </div>
                </div>
            </div>
      </Card>

      <div className={`d-flex justify-content-between ${classes.action}`}>
        <div>
            <Button onClick={() => {history.goBack()}}>
                Back
            </Button>
        </div>
        <Button onClick={() => {
            console.log("Downloading Contract...");
            generatePDF(targetRef, options, {filename: 'Contract.pdf'});
          }}>
            <Icon component={PdfIcon} />
            Download Contract
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ViewContract;
