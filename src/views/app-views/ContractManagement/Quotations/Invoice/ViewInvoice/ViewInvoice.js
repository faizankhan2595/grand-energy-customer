import React , { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
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
  // Avatar,
} from "antd";
import Icon from "@ant-design/icons"
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import logo from "assets/grand-energy-logo-small.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
import { PdfIcon } from "../../../../ItemsAndServices/svgIcons";
import classes from "./ViewInvoice.module.css";
import generatePDF, { Margin } from 'react-to-pdf';
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;
const options = {
    page: {
       margin: Margin.SMALL,
    }
};

const ViewInvoice = () => {
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
    const [invoiceData , setInvoiceData] = useState({
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
    const [gstData, setGstData] = useState([]);
    const [openContractModal , setOpenContractModal] = useState(false);
    const [commencementDate , setCommencementDate] = useState(false);
    const [expiryDate , setExpiryDate] = useState(false);
    const [remindersData , setRemindersData] = useState([]);
    const [contractType , setContractType] = useState(false);
    const [contactData, setContactData] = useState([]);
    const [grandTotal , setGrandTotal] = useState([
      // { text: "Grand Total", amt: "0" }
    ]);
    const [dataGrandTotal , setDataGrandTotal] = useState([
      // { text: "Subtotal", amt: "0" },
      // { text: "Discount", amt: "0", tag: { text: "0%", color: "#E82E2E" } },
      // { text: "GST", amt: "0", tag: { text: "0%", color: "#0099A8" } },
    ]);
    
      const getInvoiceData = () => {
        axios
        .post(
            "/api/tc/get-invoice",
            {
            id: +param.id,
            },
        )
        .then((response) => {
            let res = response.data.data;

            setInvoiceData({
                id: res?.id,
                customer_id: res?.tc_customer_id,
                jobsite_id: res?.tc_customer_job_site_id,
                quotation_id: res?.tc_quotation_id,
                customerName: res?.customer_name,
                jobsite: res?.jobsite_name,
                inquiryDate: res?.inquiry_date ? moment(res?.inquiry_date).format('DD-MM-YYYY HH:mm A'):'',
                quotationDate: moment(res?.task_period_from_date).format('DD-MM-YYYY'),
                amount: res?.total,
                discount: res?.discount,
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
                invoice_date: moment(res.created_at).format('DD-MM-YYYY'),
            })
            console.log(invoiceData);

            // if(res.tc_quotation_id) getQuotationData(res.tc_quotation_id);
            if(res.tc_contract_id) getContractData(res.tc_contract_id,res.discount);
        })
        .catch((error) => {
            console.log(error);
        });
      }

      const getContractData = (contract_id,discount) => {
        axios
        .post(
            "/api/tc/get-contract",
            {
            id: +contract_id,
            },
        )
        .then((response) => {
            let res = response.data.data;

            // setContractData({
            //     id: res?.id,
            //     customer_id: res?.tc_customer_id,
            //     jobsite_id: res?.tc_customer_job_site_id,
            //     quotation_id: res?.tc_quotation_id,
            //     customerName: res?.customer_name,
            //     jobsite: res?.job_site_name,
            //     start_date: res?.start_date,
            //     end_date: res?.end_date,
            //     // status: res?.status || 'Quote Sent',
            //     created_at: moment(res.created_at).format('DD-MM-YYYY hh:mm A')
            // })
            getQuotationData(res.tc_quotation_id, discount)
        })
        .catch((error) => {
            console.log(error);
        });
      }
    
      const getQuotationData = (q_id,discount) => {
        axios
        .post(
            "/api/tc/get-quotation",
            {
            id: q_id,
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
                discount: discount || 0,
                total: res?.total,
                tc_quotation_file: res?.tc_quotation_file,
                quotation_remarks: res?.quotation_remarks || '',
                line_items: res?.line_items || [],
                payment_term: res?.payment_term || '',
                validity: res?.validity || '',
            })
            console.log(quoteData);
            if(res.tc_customer_id) getCustomerData(res.tc_customer_id);

            let subtotal_amount = res.sub_total || res.total;
            let total_amount = res.total;

            let gst_percentage = res?.tax;
            let gst_amount = (gst_percentage/100)*subtotal_amount;
            let discount_percentage = discount;
            let discount_amount = 0;
            if(discount_percentage) {
              discount_amount = (discount_percentage/100)*res.total;
              total_amount = total_amount - discount_amount;
            }

            if(res.total) {
                setDataGrandTotal([
                    { text: "Subtotal", amt: `${subtotal_amount || 0}` },
                    { text: "Discount", amt: discount_amount, tag: { text: `${discount_percentage ||0}%`, color: "#E82E2E" } },
                    { text: "GST", amt: `${gst_amount.toFixed(2) || 0}`, tag: { text: `${gst_percentage || 0}%`, color: "#0099A8" } },
                ]);
                setGrandTotal([
                    { text: "Grand Total", amt: (total_amount).toFixed(2) }
                ])
            }
            // getAllGst(res.total);
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

      const getContactDetails = () => {
        axios({
          method: 'post',
          url: "/api/tc/get-contact-details",
          data: {},
        }).then(function (response) {
          console.log(response.data);
          let res = response.data.data;
          setContactData({
            email: res.email,
            mobile: res.mobile,
            tel: res.tel,
            address: res.address,
          })
        }).catch(function (error) {
            console.log(error);
        });
      }

      useEffect(() => {
        getInvoiceData();
        getContactDetails();
      }, []);
  
    return (
      <React.Fragment>
  
        {/* {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>} */}
        <PageHeading
          svg={ItemsAndServicesPageIcon}
          title="Invoices / View Invoice"
        />
        
        <Card className="quotation-card">
            <div ref={targetRef}>
                <Card className={classes.card}>
                    <div className="mt-2 mb-2 w-100">
                    <img src={logo} alt="logo" style={{width: '20%'}}/>
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                        <Title strong level={3}>
                            GRAND ENERGY TECHNOLOGIES PTE LTD
                        </Title>
                        <Text><b>Email:</b> {contactData.email || ''}</Text>
                        </div>
                        <div></div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                        <Text><b>Phone:</b> {contactData.tel || ''}</Text>
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
                        <Text strong>{customerData.name}</Text>
                        <br />
                        <Text>{`${customerData.block_number} ${customerData.street_number}, ${customerData.level_number}, ${customerData.unit_number}`}</Text>
                        <br />
                        <Text>{`${customerData.country}, ${customerData.postal_code}`}</Text>
                        <br />
                        <br />
                        <Text>{customerData.email}</Text>
                        <br />
                        <Text><b>Phone:</b> {customerData.phone}</Text>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mr-4">
                        <br />
                        <Text strong>Invoice No</Text>
                        <br />
                        <Text>#{invoiceData.id}</Text>
                        <br />
                        <br />
                        <Text strong>Invoice Date</Text>
                        <br />
                        <Text>{invoiceData.invoice_date}</Text>
                        <br />
                        </div>
                        <div className="text-right">
                        <br />
                        <Text strong>Payment Term</Text>
                        <br />
                        <Text>{quoteData.payment_term}</Text>
                        <br />
                        {/* <br /> */}
                        {/* <Text strong>Validity</Text> */}
                        {/* <br /> */}
                        {/* <Text>{quoteData.validity}</Text> */}
                        {/* <br /> */}
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
                                  <div className={classes.total_amt}>
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

                <div className="text-left w-75 mt-2" style={{fontSize: '14px'}}>
                   <h5>Term and Conditions</h5>
                   <ol>
                      <li>{quoteData.customerName} shall obtained all approvals from relevant authorities/stakeholders and facilitate our site personnel for site safety procedures including working at night or weekend/public holidays.</li>
                      <li>{quoteData.customerName} site supervisor shall be presented during the whole course of installation work and final joint measurement.</li>
                      <li>50% downpayment upon confirmation, 50% upon completion of work.</li>
                      <li>All price quote excludes GST.</li>
                      <li>We shall not be liable for any loss, damage or injury or any consequential or indirect loss sustained by you or third parties pertaining to the works.</li>
                      <li>Any other items which is not specifically indicated above. Any liability on this job is limited to half of the relevant sum awarded.</li>
                   </ol>
                   <p>We look forward to your confirmation</p>
                </div>
                <div className="mt-5 d-flex justify-content-between" style={{fontSize: '14px'}}>
                   <div style={{width: '40%'}}>
                      <Divider />
                      <h5><b>Grand Energy Technologies Pte Ltd</b></h5>
                      <div style={{color: '#72849A'}}>GET Manager</div>
                      <div style={{color: '#72849A'}}>{quoteData.quotationDate}</div>
                   </div>
                   <div style={{width: '20%'}}>
                      {/* <Divider />
                      <h5><b>Customer Signature</b></h5>
                      <div style={{color: '#72849A'}}>Name: </div>
                      <div style={{color: '#72849A'}}>Designation: </div>
                      <div style={{color: '#72849A'}}>Date: </div> */}
                   </div>
                </div>
            </div>
        </Card>
  
        <div className={`d-flex justify-content-between ${classes.action}`}>
            <div className="d-flex">
                <Button className="mr-1" onClick={() => {history.goBack()}}>
                    Back
                </Button>
                <Button className="mr-1" style={{backgroundColor: '#5772FF', color: '#fff'}} onClick={() => {history.push(`/app/customer-management/customer-accounts/add-new-payments/${param.id}`)}}>
                    Record Payment
                </Button>
            </div>
            <Button onClick={() => {
              console.log("Downloading Quotation...");
              generatePDF(targetRef, options, {filename: 'Quotation.pdf'});
            }}>
              <Icon component={PdfIcon} />
              Download PDF
            </Button>
        </div>
      </React.Fragment>
    );
}

export default ViewInvoice