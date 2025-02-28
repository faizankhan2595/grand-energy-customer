import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
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
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';

const AddNew = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(content);
  const history = useHistory();
  const param = useParams();
  const tok = localStorage.getItem('token')
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);

  const handleSave = () => {
    console.log(value);
    // setValue()
  };

  const finishHandler = (e) => {
    console.log(e)
    if(param.id) {
        axios({
          method: 'post',
          url: "/api/tc/update-notification-alert",
          data: {
              id: param.id,
              title: e.notificationTitle,
              description: e.notificationText,
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
        url: "/api/tc/new-notification-alert",
        data: {
            title: e.notificationTitle,
            description: e.notificationText,
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

  const getNotificationData = ()=> {
    axios({
      method: 'post',
      url: "/api/tc/get-notification-alert",
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
            notificationTitle: res.title,
            notificationText: res.description,
          })
        }
    }).catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    console.log(param.id)
    if(param.id) getNotificationData();
  }, [])
  

  return (
    <div>
      
      
      <Form
        form={form}
        // onSubmit={e => e.preventDefault()}
        layout="vertical"
        onFinish={finishHandler}
        style={{padding: '20px', paddingTop: '0px'}}
      >
        <div className="d-flex justify-content-between" style={{paddingTop: '20px', paddingBottom: '0px'}}>
          <PageHeading
            icon={Setting}
            title={"CMS / Notifications & Alerts" + (param.id ? " / Edit":"")}
          />

          <Form.Item>
            <div style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-0'>
              <Button onClick={history.goBack} className="px-4 mr-2">Back</Button>

              <Button onClick={handleSave} type='primary' htmlType="submit" className="px-4">Save</Button>
            </div>
          </Form.Item>
        </div>
        <Card className="py-4">
          <div style={{ maxWidth: '780px', margin: '0px auto' }} >
            <Form.Item label='Notification Title' name='notificationTitle' >
              <Input />
            </Form.Item>
            <Form.Item label='Notification Text' name='notificationText'>
              <ReactQuill
                style={{  borderRadius: "12px", paddingBottom: "10%", width:"100%" }}
                theme="snow"
                value={value}
                onChange={setValue}
                formats={formats}
                modules={modules}
              />
            </Form.Item>

          </div>
        </Card>
      </Form>
      <Modal centered visible={showAddedSuccess} footer={[null]} onCancel={() => { setShowAddedSuccess(false) }}>
        {!(param.id) && <SuccessSubmit icon={Successfully} title="Notification Alert Added Successfully!" desc='Notification Alert is added in the system' />}
        {param.id && <SuccessSubmit icon={Successfully} title="Notification Alert Updated Successfully!" desc='Notification Alert is updated in the system' />}
      </Modal>

    </div>
  );
}

export default AddNew