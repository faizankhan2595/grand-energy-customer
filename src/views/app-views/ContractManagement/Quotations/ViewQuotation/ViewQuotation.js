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
  TimePicker,
  message
  // Avatar,
} from "antd";
import Icon from "@ant-design/icons"
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import logo from "assets/grand-energy-logo-small.png";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";
import { PdfIcon } from "../../../ItemsAndServices/svgIcons";
// import Modal from "components/UI/Modal";
// import logo from "assets/grand-energy-logo.png";
// import { SendIcon } from "assets/svg/icon";
// import SendQuotationModal from "./SendQuotationModal";
import classes from "./ViewQuotation.module.css";
import generatePDF, { Margin } from 'react-to-pdf';
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;
const options = {
    page: {
       margin: Margin.SMALL,
    }
};

// const dataItems = [
//   { title: "XYZ Hand Bag", image: HandBagImg },
//   { title: "Sneakers", image: SneakersImg },
// ];
// const dataServices = ["Leather Replacement", "Shoe Shine & Polish"];
// const dataQty = [1, 1];
// const dataPrice = ["S$100.00", "S$100.00"];
// const dataTotal = ["S$100.00", "S$100.00"];
// let dataGrandTotal = [
//     { text: "Subtotal", amt: "S$0" },
//   //   { text: "Discount", amt: "S$100.00", tag: { text: "10%", color: "#E82E2E" } },
//     { text: "GST", amt: "S$100.00", tag: { text: "10%", color: "#0099A8" } },
//   ];

const ViewQuotation = () => {
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
    const [contactData, setContactData] = useState([]);
    const [gstData, setGstData] = useState([]);
    const [openContractModal , setOpenContractModal] = useState(false);
    const [commencementDate , setCommencementDate] = useState(false);
    const [expiryDate , setExpiryDate] = useState(false);
    const [remindersData , setRemindersData] = useState([]);
    const [contractType , setContractType] = useState(false);
    const [grandTotal , setGrandTotal] = useState([
      // { text: "Grand Total", amt: "0" }
    ]);
    const [dataGrandTotal , setDataGrandTotal] = useState([
      // { text: "Subtotal", amt: "0" },
      // { text: "GST", amt: "0", tag: { text: "0%", color: "#0099A8" } },
    ]);

    const removeReminder =(record) => {
        let newRemindersData = remindersData.filter((elem) => elem.sr_no !== record.sr_no);
        setRemindersData(newRemindersData);
    }

    const reminderColumns = [
        {
          title: 'Sr. No.',
          dataIndex: 'sr_no',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          render: (_, record) => {
            return (
              <div>
                <DatePicker value={record.date} className='w-100' onChange={(e) => {
                  let data = remindersData
                  let index = remindersData.findIndex((elem) => elem === record)
                  data[index].date = e
                  setRemindersData([...data])
                }}/>
              </div>
            );
          },
        },
        {
          title: 'Time',
          dataIndex: 'time',
          render: (_, record) => {
            return (
              <div>
                <TimePicker value={record.time} className='w-100' format={'HH:mm A'} use12Hours={true} onChange={(e) => {
                  let data = remindersData
                  let index = remindersData.findIndex((elem) => elem === record)
                  data[index].time = e;
                  setRemindersData([...data])
                }}/>
              </div>
            );
          },
        },
        {
          title: 'Title',
          dataIndex: 'title',
          render: (_, record) => {
            return (
              <div>
                <Input value={record.title} className='w-100' onChange={(e) => {
                  let data = remindersData
                  let index = remindersData.findIndex((elem) => elem === record)
                  data[index].title = e.target.value
                  setRemindersData([...data])
                }}/>
              </div>
            );
          },
        },
        {
          title: 'Content',
          dataIndex: 'description',
          render: (_, record) => {
            return (
              <div>
                <Input value={record.description} className='w-100' onChange={(e) => {
                  let data = remindersData
                  let index = remindersData.findIndex((elem) => elem === record)
                  data[index].description = e.target.value
                  setRemindersData([...data])
                }}/>
              </div>
            );
          },
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (_,record) => <Button type='danger' onClick={() => {removeReminder(record)}} className='font-weight-bold'>remove</Button>,
        },
    ];

    const handleContractOk = () => {
        console.log(quoteData);
        axios
          .post(
            "/api/tc/new-contract",
            {
              tc_quotation_id: quoteData.id,
              tc_customer_id: quoteData.customer_id,
              tc_customer_job_site_id: quoteData.customer_job_site_id || null,
              start_date: moment(commencementDate),
              end_date: moment(expiryDate),
              reminders: remindersData,
              type: contractType,
              status: 'Active'
            },
          )
          .then((response) => {
            console.log(response);
            setCommencementDate(null);
            setExpiryDate(null);
            setContractType(null);
            setRemindersData([]);
            setOpenContractModal(false);
            message.success('Contract created successfully');
            updateQuotationStatus();
          })
          .catch((error) => {
            console.log(error);
            setOpenContractModal(false);
            message.error('Contract cannot be created, please try again later');
          });
      };

      const updateQuotationStatus = () => {
        console.log(quoteData);
        axios
        .post(
          "/api/tc/update-quotation",
          {
            ...quoteData,
            id: quoteData.id,
            tc_customer_id: quoteData.customer_id,
            status: 'Contract Generated'
          },
        )
        .then((response) => {
          let res = response.data;
          console.log(res);
          getQuotationData();
        })
        .catch((error) => {
          console.log(error);
        }); 
      };
    
      const handleContractCancel = () => {
        setOpenContractModal(false);
      };

      const handleCancel = () => {
        setOpenContractModal(false);
      };
    
      const handleAddReminder = () => {
        setRemindersData([...remindersData, {
          sr_no: remindersData.length + 1,
          date: null,
          title: '',
          description: '',
        }]);
      };

      const generateInvoiceHandler = () => {
        history.push(`/app/contract-management/quotations/generate-invoice/${+param.id}`)
      }

      const commencementDateChange = (date) => {
        setCommencementDate(date);
      }
    
      const expiryDateChange = (date) => {
        setExpiryDate(date);
      }
    
      const contractTypeChange = (event) => {
        setContractType(event);
      }
    
      const getQuotationData = () => {
        axios
        .post(
            "/api/tc/get-quotation",
            {
            id: +param.id,
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
                payment_term: res?.payment_term || '',
                validity: res?.validity || '',
            })
            console.log(quoteData);

            if(res.tc_customer_id) getCustomerData(res.tc_customer_id);
            // getAllGst(res.total);
            let subtotal_amount = res.sub_total || res.total;
            let total_amount = res.total;
            let gst_percentage = res?.tax;
            let gst_amount = ((gst_percentage/100)*subtotal_amount);


            if(res.total) {
                setDataGrandTotal([
                    { text: "Subtotal", amt: `${subtotal_amount || 0}` },
                    { text: "GST", amt: `${gst_amount.toFixed(2) || 0}`, tag: { text: `${gst_percentage || 0}%`, color: "#0099A8" } },
                ]);
                setGrandTotal([
                    // { text: "Grand Total", amt: (res.total + (gst_percentage/100)*res.sub_total).toFixed(2) }
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
      //   axios({
      //       method: 'post',
      //       url: "/api/tc/get-all-gsts",
      //       data: {},
      //   }).then(function (response) {
      //       if(response.data.success) {
      //           console.log(response.data.data)
      //           let res = response.data.data.data;
      //           let fdata = res.map((elem, ind) => {
      //             return {
      //                 key: elem.id,
      //                 id: elem.id,
      //                 srNo: ind+1,
      //                 percentage: elem.percentage,
      //                 description: elem.description,
      //                 created_at: moment(elem.created_at).format("DD-MM-YYYY"),
      //                 updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
      //             };
      //           });
      //           setGstData(fdata);
      //           console.log(fdata)
      //           let gst_percentage = fdata[fdata.length-1].percentage || 0;
      //           let gst_amount = ((gst_percentage/100)*total).toFixed(2);

      //           if(total) {
      //             setDataGrandTotal([
      //               { text: "Subtotal", amt: `${total || 0}` },
      //               { text: "GST", amt: `${gst_amount || 0}`, tag: { text: `${gst_percentage || 9}%`, color: "#0099A8" } },
      //             ]);
      //             setGrandTotal([
      //               { text: "Grand Total", amt: (total + (gst_percentage/100)*total).toFixed(2) }
      //             ])
      //           }
      //       }
      //   }).catch(function (error) {
      //       console.log(error);
      //   });
      // };

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
          getQuotationData();
          getContactDetails();
      }, []);
  
    return (
      <React.Fragment>
  
        {/* {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>} */}
        <PageHeading
          svg={ItemsAndServicesPageIcon}
          title="Quotations / View Quotation"
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
                        <Text>130 Jurong Gateway Road </Text>
                        <br />
                        <Text>#03-203 Singapore (600130) </Text>
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
                        <Text strong>Quotation No</Text>
                        <br />
                        <Text>#{quoteData.id}</Text>
                        <br />
                        <br />
                        <Text strong>Quotation Date</Text>
                        <br />
                        <Text>{quoteData.quotationDate}</Text>
                        <br />
                        </div>
                        <div className="text-right">
                        <br />
                        <Text strong>Payment Term</Text>
                        <br />
                        <Text>{quoteData.payment_term || '-'}</Text>
                        <br />
                        <br />
                        <Text strong>Validity</Text>
                        <br />
                        <Text>{quoteData.validity || '0'} Days</Text>
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
                      <Divider />
                      <h5><b>Customer Signature</b></h5>
                      <div style={{color: '#72849A'}}>Name: </div>
                      <div style={{color: '#72849A'}}>Designation: </div>
                      <div style={{color: '#72849A'}}>Date: </div>
                   </div>
                </div>
            </div>
        </Card>
  
        <div className={`d-flex justify-content-between ${classes.action}`}>
            <div className="d-flex">
                <Button onClick={() => {history.goBack()}}>
                    Back
                </Button>
                <Button style={{backgroundColor: '#5772FF', color: '#fff'}} onClick={() => {generateInvoiceHandler()}}>
                    Generate Invoice
                </Button>
                {quoteData.status !=='Contract Generated' && <Button style={{backgroundColor: '#5772FF', color: '#fff'}} onClick={() => {setOpenContractModal(true)}}>
                    Create Contract
                </Button>}
            </div>
            <div className="d-flex justify-content-end">
            <Button onClick={() => {
              console.log("Downloading Attachment...");
              window.open(quoteData.tc_quotation_file);
            }}>
              {/* <Icon component={PdfIcon} /> */}
              View Attachment
            </Button>

            <Button onClick={() => {
              console.log("Downloading Quotation...");
              generatePDF(targetRef, options, {filename: 'Quotation.pdf'});
            }}>
              <Icon component={PdfIcon} />
              Download Quotation
            </Button>
            </div>
        </div>

        <Modal
          visible={openContractModal}
          centered
          maskClosable
          width={900}
          onCancel={handleCancel}
          title={'Create Contract'}
          footer={[
              <Button style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleContractOk}>Save</Button>,
              <Button style={{ color: '#000B23' }} onClick={handleContractCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
        >
          <div className='w-50'>
              <h4 className="mb-2 mt-4">Date Of Commencement of Work</h4>
              <DatePicker value={commencementDate} onChange={commencementDateChange}/>
          </div>

          <div className='w-50'>
              <h4 className="mb-2 mt-4">Date of Expiration of Work</h4>
              <DatePicker value={expiryDate} onChange={expiryDateChange}/>
          </div>

          <div>
              <h4 className="mb-2 mt-4">Reminders</h4>
              <Table columns={reminderColumns} dataSource={remindersData} />
              <Button type='primary' className='font-weight-bold mt-2' onClick={handleAddReminder}>Add Reminder</Button>
          </div>

          <div className='w-50'>
              <h4 className="mb-2 mt-4">Contract Type</h4>
              <Select
                className='w-100'
                showSearch
                placeholder="Contract Type"
                value={contractType}
                onChange={contractTypeChange}
              >
                <Select.Option title={'None'} key={0} value={'None'}>{'None'}</Select.Option>
                <Select.Option title={'Ad Hoc'} key={1} value={'Ad Hoc'}>{'Ad Hoc'}</Select.Option>
                <Select.Option title={'Routine'} key={2} value={'Routine'}>{'Routine'}</Select.Option>
              </Select>
          </div>
        </Modal>
      </React.Fragment>
    );
}

export default ViewQuotation