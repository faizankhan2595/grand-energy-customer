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
  Typography,
  Modal,
  message,
  Table,
  // Divider,
  // Radio,
  // Cascader,
  // TreeSelect,
  // Switch,
  // Checkbox,
} from "antd";
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {Title , Text} = Typography;

const Form1 = ({form, customers, jobsData, setJobsData, setJobFile, jobFile}) => {
  const customer_id = localStorage.getItem('customer_id')
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
    {
      title: 'Action',
      dataIndex: '',
      render: (_,record) => {
        return <Button type="danger" className='mt-2' onClick={()=>{removeJob(record)}}>Remove</Button>
      },
    },
  ];
  const removeJob = (record) => {
    let jobs = jobsData.filter((e) => e != record);
    setJobsData(jobs)
  }
  
  
  const [value, setValue] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');
  const [selectedJobsite, setSelectedJobsite] = useState(0);
  const [uploadedFile, setUploadedFile] = useState({
    name: '',
    url: ''
  });
  const [allJobsites, setAllJobsites] = useState([]);
  const tok = localStorage.getItem('token');
  const [jobDetailsTemp, setJobDetailsTemp] = useState({
      sr_no: 0, 
      id: 0, 
      description: '', 
      provisionalQty: 0, 
      unitPrice: 0
    });
    // const [quoteDescription, setQuoteDescription] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);

  const [openUploadPdfModal, setOpenUploadPdfModal] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);

  const handleCancel = () => {
    setOpenUploadPdfModal(false);
    setOpenJobModal(false);
  };

  const handleUploadOk = () => {
    setJobFile(uploadedFile);
    setOpenUploadPdfModal(false);
  };
  const handleUploadCancel = () => {
    setOpenUploadPdfModal(false);
  };

  const handleJobOk = () => {
    if(!description) message.error("Please fill Description");
    if(!quantity) message.error("Please fill Provisional Quantity");
    if(!unitPrice) message.error("Please fill Unit Price");

    setJobsData([...jobsData, {
      sr_no: jobsData.length+1,
      name: description,
      quantity: quantity,
      price: unitPrice,
      total: (+quantity * +unitPrice) || 0
      // total: (+jobDetailsTemp.provisionalQty * +jobDetailsTemp.unitPrice) || 0
    }]);

    setDescription('');
    setQuantity(0);
    setUnitPrice(0);
    setOpenJobModal(false);
  };
  const handleJobCancel = () => {
    setOpenJobModal(false);
  };

  let filelist = []

  const image_props = {
    name: 'file',
    multiple: false,
    action: `${axios.defaults.baseURL}/api/tc/upload-document`,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    // fileList: filelist,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploadedFile({
          name: info.file.name,
          url: info.file.response.url
        });
        console.log(filelist)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
      setUploadedFile({
        name: '',
        url: ''
      });
    },
  };

  const funOpenUploadModal = () => {
    setOpenUploadPdfModal(true)
  }

  const funOpenJobModal = () => {
    setOpenJobModal(true)
  }

  const onChangeDesc = (event) => {
    setDescription(event.target.value)
  }

  const onChangeProvisional = (value) => {
    setQuantity(value)
  }

  const onChangeUnit = (value) => {
    setUnitPrice(value)
  }

  const getJobSites = (currPage) => {
    if(form.getFieldValue("customer_id")) {
      axios({
          method: 'post',
          url: "/api/tc/get-customer-job-sites",
          headers: {
              // 'content-type': `multipart/form-data`,
              Authorization: `Bearer ${tok}`
          },
          data: {
              // customer_id: form.getFieldValue("customer_id") || 0,
              customer_id: customer_id,
              page_index: 1,
              page_size: 100000,
              search : ''
          }
      }).then((response) => {
          console.log(response.data)
          if (response.data.success) {
            setAllJobsites(response.data.data.data)
          }
      }).catch((err) => {
          console.log(err)
      });
    }
  }

  useEffect(() => {
    getJobSites()
  }, [])

  useEffect(() => {
    form.setFieldsValue ({
        customer_id: +customer_id
    })
    
  }, [customers])
  
  return (
    <>
      <Card className="mt-3">
          
      <Row align="top">
        <Col span={12}>
          <Form.Item name="customer_id" label="Customer Name" rules={[{ required: true, message: 'Please select Customer!' }]}>
            <Select onChange={getJobSites} disabled>
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
      </Row>

      <div className="d-flex justify-content-between heading-container my-4">
          <div className="heading">Job Details</div>
          <div className="heading d-flex justify-content-between align-items-center">
            {jobFile && <div className="mr-3" style={{color: 'blue'}}>{jobFile.name}</div>}
            <Button style={{ color: '#000B23' }} onClick={funOpenUploadModal} className='font-weight-bold'>Upload Pdf</Button>
          </div>
      </div>

      <div className="mb-3">
        <Table columns={columns} dataSource={jobsData} />
        <div className="d-flex justify-content-end">
          <Button type="primary" onClick={funOpenJobModal} className='mt-2'>Add Job</Button>
        </div>
      </div>

      {/* <Divider /> */}

      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Quotation Date"
            name="quotationDate"
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker format={'DD-MM-YYYY'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Validity (Days)"
            name="validity"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input type="number"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Payment Term"
            name="paymentTerm"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
                showSearch
                placeholder="Payment Term"
                value={paymentTerm}
            >
              <Select.Option title={'Immediate'} key={0} value={'Immediate'}>{'Immediate'}</Select.Option>
              <Select.Option title={'15 Days'} key={15} value={'15 Days'}>{'15 Days'}</Select.Option>
              <Select.Option title={'30 Days'} key={30} value={'30 Days'}>{'30 Days'}</Select.Option>
              <Select.Option title={'45 Days'} key={45} value={'45 Days'}>{'45 Days'}</Select.Option>
              <Select.Option title={'60 Days'} key={60} value={'60 Days'}>{'60 Days'}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
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
            >
                {allJobsites.map((val, id) => (
                    <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        <div style={{margin:'0px 0px', width:'100%'}} >
          <Form.Item
            label="Description"
            name="remarks"
            rules={[{ required: true, message: "Description is Required" }]}
          >
            <ReactQuill
              style={{ borderRadius: "12px", paddingBottom: "5%" }}
              theme="snow"
              value={value}
              onChange={setValue}
              formats={formats}
              modules={modules}
            />
          </Form.Item>
        </div>
        </Col>
      </Row>
      </Card>

      <Modal
        visible={openUploadPdfModal}
        centered
        maskClosable
        onCancel={handleCancel}
        title={'Upload Pdf'}
        footer={[
            <Button type="primary" className='font-weight-bold' onClick={handleUploadOk}>Save</Button>,
            <Button style={{ color: '#000B23' }} onClick={handleUploadCancel} className='font-weight-bold'>Cancel</Button>,
      ]}
      >
        <div>
          <Dragger {...image_props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Files supported:pdf only
            </p>
          </Dragger>
        </div>
      </Modal>

      <Modal
        visible={openJobModal}
        centered
        maskClosable
        onCancel={handleCancel}
        title={'Job Details'}
        footer={[
            <Button type="primary" className='font-weight-bold' onClick={handleJobOk}>Save</Button>,
            <Button style={{ color: '#000B23' }} onClick={handleJobCancel} className='font-weight-bold'>Cancel</Button>,
      ]}
      >   
        <div>
            <h4 className="mb-2">Description</h4>
            <TextArea rows={4} onChange={onChangeDesc} value={description}/>
        </div>

        <div>
            <h4 className="mb-2 mt-2">Provisional Quantity</h4>
            <InputNumber min={0} onChange={onChangeProvisional} value={quantity} />
        </div>

        <div>
            <h4 className="mb-2 mt-2">Unit Price</h4>
            <InputNumber min={0} onChange={onChangeUnit} value={unitPrice} />
        </div>
      </Modal>
    </>
  );
};
export default Form1;
