import { Button, Card, Col, Form, Input, InputNumber, Row, Upload, Switch, message, } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import "./BasicDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BasicDetails(props) {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const history = useHistory()
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [documentUrl, setDocumentUrl] = useState("");
  const [statusActive, setStatusActive] = useState(false);
  const tok = localStorage.getItem('token')
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
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
      setDocumentUrl(newFileList[0].url);
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
          setDocumentUrl(response.data.url);
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
    if (props.id) {
      axios
        .post(
          "/api/tc/update-customer",
          {
            id: props.id,
            name: e.name,
            profile_pic: documentUrl,
            email: e.email,
            phone: String(e.phone),
            status: statusActive ? "ACTIVE" : "INACTIVE",
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
          props.onNext();
          props.setCId(props.id);
          props.onNext();
          console.log(props.id)
        })
        .catch((error) => {
          console.log(error);
        });
      return
    }
    if (props.id) {
      axios
        .post(
          "/api/tc/new-customer",
          {
            id: props.id,
            name: e.name,
            profile_pic: documentUrl,
            email: e.email,
            phone: String(e.phone),
            status: statusActive ? 'ACTIVE':'INACTIVE',
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
          props.onNext();
          props.setCId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          "/api/tc/new-customer",
          {
            name: e.name,
            profile_pic: documentUrl,
            email: e.email,
            phone: String(e.phone),
            status: statusActive ? "ACTIVE" : "INACTIVE",
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
            message.warn(response.data.msg)
            return;
          }
          props.onNext();
          props.setCId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };

  const checkStatus = () => {
    if(form.getFieldValue().status === 'Active') {
      return true
    }
    return false
  }

  const handleStatusChange = (checked) => {
    let status = form.getFieldValue().status;
    setStatusActive(checked)
    console.log(status)
  }

  useEffect(() => {
    if(!props.id) {
      form.setFieldsValue({
        status: true
      })
    }
  }, []);

  useEffect(() => {
    if(props.id) {
      axios
      .post(
        "/api/tc/get-customer",
        {
          id: props.id,
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
        console.log(res)
          form.setFieldsValue({
            customerId: res.id,
            email: res.email,
            name: res.name,
            phone: res.phone,
            status: res.status === 'ACTIVE',
            profile_pic: res?.profile_pic,
          })
          if(res.profile_pic) setFileList([{url:res.profile_pic}])
          setStatusActive(res.status === 'ACTIVE')
        // );
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [props.id]);

  return (
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
        // onValuesChange={onFormLayoutChange}
        onFinish={finishHandler}
      >
        <Card className="mt-3">
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="profile_pic">
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>

              </Form.Item>
              <Form.Item name="customerId" label="Customer ID" >
                <Input disabled />
              </Form.Item>
              <Form.Item name="email" label="Email Id" rules={[{ required: true, type: 'email', message: 'Please input your valid Email Id!' }]}>
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
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="status" label="Status" style={{alignContent: 'start'}}>
                {statusActive ? "ACTIVE":"INACTIVE"}<Switch checked={statusActive} onClick={handleStatusChange} className="ml-2"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Form.Item className={`d-flex align-items-end Button`}>
          <Button onClick={history.goBack}>Back</Button>
          <Button
            onClick={() => form.resetFields()}
            className="mx-3"
          >
            Clear All
          </Button>

          <Button type="primary" htmlType="submit">
            Next
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
  );
}

export default BasicDetails;
