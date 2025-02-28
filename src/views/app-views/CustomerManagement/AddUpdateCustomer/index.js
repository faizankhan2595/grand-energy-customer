import PageHeading from "components/shared-components/PageHeading/PageHeading";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Upload, Select, InputNumber, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import {
//   AddressDetailsActiveIcon,
//   AddressDetailsIcon,
//   BasicDetailsActiveIcon,
//   BasicDetailsIcon,
// } from "views/app-views/UserManagement/SvgIcons";
// import Icon from "@ant-design/icons";
// import { UserManagementIcon } from "configs/svgIcons";
// import { API_BASE_URL, GE_API_STAGING_URL } from "configs/AppConfig";

import country from "./country";
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

function AddUpdateCustomer(props) {
  const param = useParams()
  const isEdit = (window.location.href).includes('edit') ? true : false;
  // const [cId, setCId] = useState(null);
  // const [currActiveKey, setCurrActiveKey] = useState("1");
  // const [isUpdate, setIsUpdate] = useState(false);

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const history = useHistory()
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileUploadedList, setFileUploadedList] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [statusActive, setStatusActive] = useState(false);
  const tok = localStorage.getItem('token');

  const dragger_props = {
    name: 'file',
    multiple: false,
    // fileList: fileUploadedList,
    action: `${axios.defaults.baseURL}/api/tc/upload-document`,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(fileUploadedList);
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        form.setFieldsValue({
          uploaded_file: {
            name: info.file.name,
            url: info.file.response.url,
          }
        })
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      message.success(`${e.dataTransfer.files} file is deleted.`);
      console.log('Dropped files', e.dataTransfer.files);
      form.setFieldsValue({
        uploaded_file: null
      })
    },
  };

  // const [pincodeUpdate, setPincodeUpdate] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const getPostalCode = (text) => {
    axios
      .post(
        "/api/get-pincode",
        {
          pin_code: text
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let result = response.data.results;
          if(response.data.results.length) console.log(response.data.results)
          // result = result.filter(item => item.POSTAL && (item.POSTAL).toUpperCase() != 'NIL');
          setOptions(result)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const selectAddress = (postal) => {
    const address = options.filter((item) => item.POSTAL == postal)
    // console.log(address)

    if (address.length > 0) {
      let street_no = ''
      if (address[0].ROAD_NAME) {
        street_no = address[0].ROAD_NAME
      }

      form.setFieldsValue({
        block_number: address[0].BLK_NO,
        street_number: street_no,
        postal_code: address[0].POSTAL,
      });
    }
  }

  useEffect(() => {
    getPostalCode(value)
    console.log(value)
  }, [value])

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    // console.log(file.url || file.preview)
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
    const formData = new FormData();
    if(newFileList[0].url){
      setProfilePictureUrl(newFileList[0].url);
      return;
    }
    formData.append("file", newFileList[0].originFileObj);
    axios({
      method: "post",
      url: "/api/tc/upload-document",
      data: formData,
      headers: {
        "content-type": `multipart/form-data`,
        Authorization: `Bearer ${tok}`,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setProfilePictureUrl(response.data.url);
          // console.log(response.data.url);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
          width: "250px",
        }}
      >
        Upload Picture
      </div>
    </div>
  );

  const finishHandler = (e) => {
    console.log(e.status)
    let data_creater = localStorage.getItem('name');
    if (isEdit && (param.id || props.id)) {
      axios
        .post(
          "/api/tc/update-customer",
          {
            id: param.id,
            name: e.name,
            profile_pic: profilePictureUrl,
            email: e.email,
            phone: String(e.phone),
            status: e.status,
            other_details: JSON.stringify({
              contact_name: e.contact_name,
              office_contact_number: e.office_contact_number,
              uen_number: e.uen_number,
              postal_code: e.postal_code,
              block_number: e.block_number,
              level_number: e.level_number,
              unit_number: e.unit_number,
              street_number: e.street_number,
              country: e.country,
              created_by: e.created_by || data_creater,
              uploaded_file: e.uploaded_file || '',
            })
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          if(!response.data.success){
            message.warn(response.data.msg)
            return;
          }
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
      return
    } else {
      axios
        .post(
          "/api/tc/new-customer",
          {
            name: e.name,
            profile_pic: profilePictureUrl,
            email: e.email,
            phone: String(e.phone),
            status: "Pending Approval",
            other_details: JSON.stringify({
              contact_name: e.contact_name,
              office_contact_number: e.office_contact_number,
              uen_number: e.uen_number,
              postal_code: e.postal_code,
              block_number: e.block_number,
              level_number: e.level_number,
              unit_number: e.unit_number,
              street_number: e.street_number,
              country: e.country,
              created_by: data_creater,
              uploaded_file: e.uploaded_file || '',
            })
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          console.log(response)
          if(!response.data.success){
            if(response.data.msg) message.warn(response.data.msg)
            else message.error('Something went wrong');
            return;
          }
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const checkStatus = () => {
  //   if(form.getFieldValue().status === 'Active') {
  //     return true
  //   }
  //   return false
  // }
  // const handleStatusChange = (checked) => {
  //   let status = form.getFieldValue().status;
  //   setStatusActive(checked)
  // }
  // const getFilledFields = (type) => {};

  useEffect(() => {
    if(!isEdit) {
      form.setFieldsValue({
        status: true
      })
    }
  }, []);

  useEffect(() => {
    console.log('Is Customer Edit :',isEdit)
    if(isEdit && param.id) {
      axios
      .post(
        "/api/tc/get-customer",
        {
          id: param.id,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        let res = response.data.data;
        if(res.other_details) {
          let other_details = JSON.parse(res.other_details);
          res = {...res, ...other_details}
        }
        console.log(res)
        let data_creater = localStorage.getItem('name');

          form.setFieldsValue({
            customerId: res.id,
            email: res.email,
            name: res.name,
            phone: res.phone,
            status: res.status,
            profile_pic: res?.profile_pic,
            contact_name: res?.contact_name,
            office_contact_number: res?.office_contact_number,
            uen_number: res?.uen_number,
            postal_code: res?.postal_code,
            block_number: res?.block_number,
            level_number: res?.level_number,
            unit_number: res?.unit_number,
            street_number: res?.street_number,
            country: res?.country,
            created_by: res?.created_by || data_creater,
          })
          if(res.profile_pic) setFileList([{url:res.profile_pic}])
          setStatusActive(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [props.id]);

  return (
    <>
      <PageHeading
        title={!isEdit ? "Add New Customer" : "Edit Customer"}
      />

      <div>
        <div>
            <Form
                form={form}
                labelCol={{
                span: 10,
                }}
                wrapperCol={{
                span: 18,
                }}
                layout="vertical"
                onFinish={finishHandler}
            >
                <Card className="mt-2">
                  <div className="d-flex justify-content-end" style={{color: 'red'}}>
                      <div>* Indicates Mandatory Fields</div>
                  </div>

                  <div className="d-flex justify-content-between heading-container my-3">
                      <div className="heading">Customer Details</div>
                      {/* <div>0 out of 15 fields completed</div> */}
                  </div>

                  <Row align="bottom">
                      <Col span={12}>
                      <Form.Item name="profile_pic">
                          <Upload
                          listType="picture-card"
                          fileList={fileList}
                          accept="image/*"
                          // onPreview={handlePreview}
                          onChange={handleChange}
                          beforeUpload={() => {
                              return false;
                          }}
                          >
                          {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                      </Form.Item>
                      </Col>
                  </Row>
                  
                  <Row align="top">
                      <Col span={12}>
                      {isEdit && <Form.Item name="customerId" label="Customer ID" >
                          <Input disabled />
                      </Form.Item>}
                      <Form.Item name="contact_name" label="Contact Person Name" >
                          <Input />
                      </Form.Item>
                      <Form.Item name="office_contact_number" label="Office Contact Number">
                          <Input />
                      </Form.Item>
                      <Form.Item name="uen_number" label="UEN Number" rules={[{ required: true, message: 'Please input Company Name!' }]}>
                          <Input />
                      </Form.Item>
                      </Col>
                      <Col span={12}>
                      <Form.Item name="name" label="Company Name" rules={[{ required: true, message: 'Please input Company Name!' }]}>
                          <Input />
                      </Form.Item>
                      <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your valid Phone Number!' },
                      {
                          message: 'Phone number must have atleast 8 digits',
                          validator: (_, value) => {
                          if (/^\d{8,}$/.test(value)) {
                              return Promise.resolve();
                          } else {
                              return Promise.reject('Some message here');
                          }
                          }
                      }]}>
                          <Input style={{ width: "100%" }} minLength={8} />
                      </Form.Item>
                      <Form.Item name="email" label="Email Id" rules={[{ required: true, type: 'email', message: 'Please input your valid Email Id!' }]}>
                          <Input />
                      </Form.Item>
                      </Col>
                  </Row>

                  <div className="d-flex justify-content-start heading-container">
                      <div className="heading">Other Details</div>
                  </div>

                  <div className="heading mt-3 mb-2">
                      Company Address
                  </div>

                  <div>
                      <Row align="top">
                      <Col span={12}>
                          <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input Country!' }]} >
                              <Select showSearch>
                                {country.map((elem, index) => {
                                  return (
                                    <Select.Option key={index} value={elem}>
                                      {elem}
                                    </Select.Option>
                                  );
                                })}
                              </Select>
                          </Form.Item>
                          
                          <Form.Item name="street_number" label="Street Name" rules={[{ required: true, message: 'Please input Street Number!' }]} >
                              <Input />
                          </Form.Item>
                          <Form.Item name="level_number" label="Level - Unit No" rules={[{ required: true, message: 'Please input Level Number!' }]} >
                              <Input />
                          </Form.Item>
                      </Col>
                      <Col span={12}>
                          <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true, message: 'Please input Postal code!' }]}>
                              <Input />
                              {/* <Select
                                placeholder="postal code"
                                showSearch
                                value={value}
                                onSearch={setValue}
                                onChange={setValue}
                                onSelect={selectAddress(value)}
                              > {options.map((val, id) => (
                                  <Select.Option title={val.POSTAL} key={id} value={val?.POSTAL}>{val.ADDRESS}</Select.Option>
                                ))} 
                              </Select> */}
                          </Form.Item>
                          <Form.Item name="block_number" label="Block No" rules={[{ required: true, message: 'Please input Block Number!' }]} >
                              <Input />
                          </Form.Item>
                          {/* <Form.Item name="unit_number" label="Unit No" rules={[{ required: true, message: 'Please input Unit Number!' }]} >
                              <Input />
                          </Form.Item> */}
                      </Col>
                      </Row>
                  </div>

                  <div className="heading mb-3">
                      Upload Files
                  </div>

                  <Dragger {...dragger_props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Files supported: pdf,doc,etc.
                    </p>
                  </Dragger>

                </Card>
                

                <Form.Item className={`d-flex align-items-end Button`}>
                  <Button onClick={history.goBack}>Cancel</Button>
                  <Button
                      onClick={() => {
                        form.resetFields();
                        setFileList([]);
                        setFileUploadedList([]);
                      }}
                      className="mx-3"
                  >
                      Clear All
                  </Button>

                  <Button type="primary" htmlType="submit">
                      Save
                  </Button>
                </Form.Item>
            </Form>
            <Modal
                visible={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}     
            >
                <img
                className="myimg"
                alt="example"
                style={{
                    width: "100%",
                }}
                src={previewImage}
                />
            </Modal>
        </div>
        
      </div>
    </>
  );
}

export default AddUpdateCustomer;
