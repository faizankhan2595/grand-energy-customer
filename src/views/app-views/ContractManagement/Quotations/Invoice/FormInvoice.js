import React, { useState, useEffect } from "react";
import { formats, modules } from "utils/textEditorModules";
import ReactQuill from "react-quill";
import axios from "axios";

import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  InputNumber,
  Upload,
  Row,
  Col,
  Card, 
  Modal,
  message,
  Table,
  Typography,
} from "antd";
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { TextArea } = Input;
// const { RangePicker } = DatePicker;
// const {Title , Text} = Typography;

const FormInvoice = ({form, customers, customer_id, jobsData, setJobsData, setJobFile, jobFileUrl}) => {
    const columns = [
      {
        title: 'SR NO',
        dataIndex: 'sr_no',
      },
      {
        title: 'DESCRIPTION',
        dataIndex: 'name',
      },
      {
        title: 'PROVISIONAL QTY',
        dataIndex: 'quantity',
      },
      {
        title: 'UNIT PRICE',
        dataIndex: 'price',
      },
      {
        title: 'SUBTOTAL',
        dataIndex: 'total',
      },
    ];

    const customerColumns = [
      {
        title: 'Customer ID',
        dataIndex: 'id',
      },
      {
        title: 'Customer Name',
        dataIndex: 'name',
      },
      {
        title: 'Mobile Number',
        dataIndex: 'phone',
      },
      {
        title: 'Email Address',
        dataIndex: 'email',
      },
      {
        title: 'Customer Since',
        dataIndex: 'created_at',
      },
      {
        title: 'Status',
        dataIndex: '',
        render: (_,record) => {
          return <Button style={{backgroundColor: ''}} className='mt-2 p-1 px-2' >{record.status}</Button>
        },
      },
    ];
    const removeJob = (record) => {
      let jobs = jobsData.filter((e) => e != record);
      setJobsData(jobs)
    }
    
    
    const [customerData, setCustomerData] = useState('');
    const [value, setValue] = useState('');
    const [paymentTerm, setPaymentTerm] = useState('');
    const [selectedJobsite, setSelectedJobsite] = useState(0);
    const [uploadedFile, setUploadedFile] = useState({
      name: '',
      url: ''
    });
    const [allJobsites, setAllJobsites] = useState([]);
    const [allContracts, setAllContracts] = useState([]);
    const tok = localStorage.getItem('token');
    // const [jobDetailsTemp, setJobDetailsTemp] = useState({
    //     sr_no: 0, 
    //     id: 0, 
    //     description: '', 
    //     provisionalQty: 0, 
    //     unitPrice: 0
    //   });
    // const [description, setDescription] = useState('');
    // const [quoteDescription, setQuoteDescription] = useState('');
    // const [quantity, setQuantity] = useState(0);
    // const [unitPrice, setUnitPrice] = useState(0);
    // const [openUploadPdfModal, setOpenUploadPdfModal] = useState(false);
    // const [openJobModal, setOpenJobModal] = useState(false);
  
    const getAllJobSites = () => {
      axios({
          method: 'post',
          url: "/api/tc/get-customer-job-sites",
          headers: {
              // 'content-type': `multipart/form-data`,
              Authorization: `Bearer ${tok}`
          },
          data: {
              customer_id: form.getFieldValue("customer_id") || 0,
              page_index: 1,
              page_size: 100000,
              search : ''
          }
      }).then((response) => {
          console.log(response.data)
          if (response.data.success) {
            setAllJobsites(response.data.data.data)
          }
          // form.setFieldsValue(
          //   {
          //     ...form.getFieldsValue(),
          //     jobsite_id: res.id,
          //   }
          // )
      }).catch((err) => {
          console.log(err)
      });
    }
  
    const getAllContracts = () => {
      axios({
          method: 'post',
          url: "/api/tc/get-contracts",
          headers: {
              // 'content-type': `multipart/form-data`,
              Authorization: `Bearer ${tok}`
          },
          data: {
              customer_id: customer_id || null,
              page_index: 1,
              page_size: 100000,
              search : ''
          }
      }).then((response) => {
          console.log(response.data)
          let res = response.data.data.data[0];
          if (response.data.success) {
            setAllContracts(response.data.data.data);
          }
          form.setFieldsValue(
            {
              ...form.getFieldsValue(),
              contract_id: res.id,
            }
          )
      }).catch((err) => {
          console.log(err)
      });
    }
  
    useEffect(() => {
      getAllJobSites();
      getAllContracts();

      // setCustomerData([{
      //   id: form.getFieldValue().customer_id,
      //   customer_id: form.getFieldValue().customer_id,
      //   customer_name: form.getFieldValue().customer_name,
      //   phone: form.getFieldValue().phone,
      //   email: form.getFieldValue().email,
      //   status: form.getFieldValue().status,
      // }])

      setCustomerData([form.getFieldsValue()]);
    }, [])
    
    return (
      <>
        <Card className="mt-3">
            
        <Row align="top">
          <Col span={12}>
            <Form.Item name="customer_id" label="Customer Name" rules={[{ required: true, message: 'Please select Customer!' }]}>
              <Select onChange={getAllJobSites} disabled>
                {customers.map((elem, index) => {
                  return (
                    <Select.Option key={index} value={elem.id}>
                      {elem.company}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <Table className="my-3" columns={customerColumns} dataSource={customerData} pagination={false}/>
          </Col> */}
        </Row>

        <Row >
          <Col span={12}>
            <Form.Item
              label="Jobsite"
              name="jobsite_id"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                  showSearch
                  placeholder="Jobsite"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                  }
                  value={selectedJobsite}
                  onChange={setSelectedJobsite}
                  disabled
              >
                  {allJobsites.map((val, id) => (
                      <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contract"
              name="contract_id"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                  showSearch
                  placeholder="contract"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                  }
                  value={selectedJobsite}
                  onChange={setSelectedJobsite}
                  disabled
              >
                  {allContracts.map((val, id) => (
                      <Select.Option title={val.id} key={id} value={val?.id}>#{val.id}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
  
        <div className="d-flex justify-content-between heading-container my-4">
            <div className="heading">Job Details</div>
            <div className="heading d-flex justify-content-end align-items-center">
              {jobFileUrl && <div className="mr-3" style={{color: 'blue'}}>
                              <a href={jobFileUrl} target="_blank">Quotation_File</a>
                          </div>
              }
            </div>
        </div>
  
        <div className="mb-3">
          <Table columns={columns} dataSource={jobsData} />
        </div>
  
        <Row>
          <Col span={12}>
            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="number"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="invoice_due_date"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        </Card>
      </>
    );
  };

export default FormInvoice