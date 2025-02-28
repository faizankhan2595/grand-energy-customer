import React from "react";
import { Form, InputNumber, Select, Input , Card, Upload, Row, Col } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { formats, modules } from "utils/textEditorModules";

const { TextArea } = Input;

const AddNewForm = () => {
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = useState('');
  const [categoryPictureUrl, setCategoryPictureUrl] = useState("");

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
    const formData = new FormData();
    if(newFileList[0].url){
      setCategoryPictureUrl(newFileList[0].url);
      return;
    }
    formData.append("file", newFileList[0].originFileObj);
    axios({
      method: "post",
      url: "/api/tc/upload-document",
      data: formData,
      // headers: {
      //   "content-type": `multipart/form-data`,
      //   Authorization: `Bearer ${tok}`,
      // },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setCategoryPictureUrl(response.data.url);
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

  return (
    <>
        <Row align="bottom" gutter={[16,16]}>
          <Col span={14}>
          <Form.Item
            // label="Category Picture"
            name="productPicture"
            rules={[
              {
                required: true,
              },
            ]}
            
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              accept="image/*"
              onChange={handleChange}
              beforeUpload={() => {
                  return false;
              }}
              >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Product Category"
              name="productCategory"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Category" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Product Title"
              name="productTitle"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Make"
              name="productMake"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Make" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Model"
              name="productModel"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Model" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Location"
              name="productLocation"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="location" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Cost Price"
              name="productCostPrice"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Cost Price" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Selling Price"
              name="productSellingPrice"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Selling Price" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Initial Stock"
              name="productInitialStock"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Initial stock" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Minimum Stock Level"
              name="productMinimumStockLevel"
              rules={[
                {
                  required: true,
                },
              ]}
              
            >
              <Input placeholder="Minimum Stock Level" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Description"
              name="categoryDescription"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea placeholder="Description" rows={4} maxLength={200} showCount/>
            </Form.Item>
          </Col>
        </Row>
    </>
  );
};

export default AddNewForm;
