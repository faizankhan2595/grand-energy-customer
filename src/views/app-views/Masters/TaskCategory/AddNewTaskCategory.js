import React, { useState } from "react";
import { Button, Card, Form, Input, Row, Col, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Setting from "assets/svg/Setting.svg";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { content, formats, modules } from "utils/textEditorModules";
import axios from 'axios';
import { useEffect } from 'react';
import { Modal } from 'antd';
import { Successfully } from 'configs/svgIcons';
import { PlusOutlined } from "@ant-design/icons";
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';

const { TextArea } = Input;

const AddNewTaskCategory = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(content);
  const history = useHistory();
  const param = useParams();
  const tok = localStorage.getItem('token')
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [documentUrl, setDocumentUrl] = useState("");

  const handleSave = () => {
    console.log(value);
    // setValue()
  };

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
          console.log(response.data.url);
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
    console.log(e)
    if(param.id) {
        axios({
          method: 'post',
          url: "/api/tc/update-task-category",
          data: {
              id: param.id,
              picture: documentUrl,
              title: e.categoryTitle,
              description: e.categoryDescription,
              // status: "Active",
          },
          headers: {
              Authorization: `Bearer ${tok}`
          },
      }).then(function (response) {
          if(response.data.success) {
              setShowAddedSuccess(true)
              setTimeout(() => {
                  setShowAddedSuccess(false)
                  history.goBack()
              }, 1500);
          }
      }).catch(function (error) {
          console.log(error);
      });
    } else {
      axios({
        method: 'post',
        url: "/api/tc/new-task-category",
        data: {
            picture: documentUrl,
            title: e.categoryTitle,
            description: e.categoryDescription,
            status: "Active",
        },
        headers: {
            Authorization: `Bearer ${tok}`
        },
      }).then(function (response) {
          console.log(response.data);
          if(response.data.success) {
              setShowAddedSuccess(true)
              setTimeout(() => {
                  setShowAddedSuccess(false)
                  history.goBack()
              }, 1500);
          }
          
      }).catch(function (error) {
          console.log(error);
      });
    }
  }

  const getTaskCategoryData = ()=> {
    axios({
      method: 'post',
      url: "/api/tc/get-task-category",
      data: {
          id: param.id,
      },
      headers: {
          Authorization: `Bearer ${tok}`
      },
    }).then(function (response) {
        if(response.data.success) {
          console.log(response.data.data)
          let res = response.data.data
          form.setFieldsValue({
            category_pic: res.picture,
            categoryTitle: res.title,
            categoryDescription: res.description,
          })
          setFileList([{
            name: 'category_pic',
            url: res.picture
          }])
        }
    }).catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    console.log(param.id)
    if(param.id) getTaskCategoryData();
  }, [])
  

  return (
    <div>
      <div style={{ padding: "20px 20px 0px 20px" }}>
        <PageHeading
          // icon={Setting}
          title="TASK CATEGORIES / ADD NEW CATEGORY"
        />
      </div>
      <Form
        form={form}
        // onSubmit={e => e.preventDefault()}
        layout="vertical"
        onFinish={finishHandler}
        style={{ padding: "0px 20px 0px 20px" }}
      >
        <Card className="py-2 my-2">
          <div style={{ maxWidth: '780px', margin: '0px auto' }} >
                <Form.Item name="category_pic">
                    <Upload
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
            <Form.Item label='Category Title' name='categoryTitle' >
              <Input />
            </Form.Item>
            <Form.Item label='Description' name='categoryDescription'>
              <TextArea rows={4} maxLength={200} showCount/>
            </Form.Item>
          </div>
        </Card>

        <Form.Item>
          <div style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4 mt-2'>
            <Button onClick={history.goBack} className="px-4">Back</Button>
            <Button onClick={handleSave} type='primary' htmlType="submit" className="px-4">Save</Button>
          </div>
        </Form.Item>
      </Form>

      <Modal centered visible={showAddedSuccess} footer={[null]} onCancel={() => { setShowAddedSuccess(false) }}>
        {!(param.id) && <SuccessSubmit icon={Successfully} title="Task Category Added Successfully!" desc='Task Category is added in the system' />}
        {param.id && <SuccessSubmit icon={Successfully} title="Task Category Updated Successfully!" desc='Task Category is updated in the system' />}
      </Modal>

    </div>
  );
}

export default AddNewTaskCategory