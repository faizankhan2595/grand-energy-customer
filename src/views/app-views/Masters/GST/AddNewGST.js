import React, { useState } from "react";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Setting from "assets/svg/Setting.svg";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import "quill/dist/quill.snow.css";
import { content, formats, modules } from "utils/textEditorModules";
import axios from 'axios';
import { useEffect } from 'react';
import { Modal } from 'antd';
import { Successfully } from 'configs/svgIcons';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import ReactQuill from "react-quill";

const { TextArea } = Input;

const AddNewGST = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(content);
  const history = useHistory();
  const param = useParams();
  const tok = localStorage.getItem('token')
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);
  const isEdit = param.id ? true : false;

  const handleSave = () => {
    console.log(value);
    // setValue()
  };

  const finishHandler = (e) => {
    console.log(e)
    if(param.id) {
        axios({
          method: 'post',
          url: "/api/tc/update-gst",
          data: {
              id: param.id,
              percentage: e.gstPercentage,
              title: e.gstDescription,
          },
          // headers: {
          //     Authorization: `Bearer ${tok}`
          // },
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
        url: "/api/tc/new-gst",
        data: {
          title: e.gstDescription,
          percentage: e.gstPercentage,
        },
        // headers: {
        //   Authorization: `Bearer ${tok}`
        // },
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

  const getGstData = ()=> {
    axios({
      method: 'post',
      url: "/api/tc/get-gst",
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
            gstPercentage: res.percentage,
            gstDescription: res.title,
          })
        }
    }).catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    console.log(param.id)
    if(param.id) getGstData();
  }, [])
  

  return (
    <div>
      <div style={{ padding: "20px 20px 0px 20px" }}>
        <PageHeading
          // icon={Setting}
          title={"GST" + (param.id ? " / Edit" : " / Add New") }
        />
      </div>
      <Form
        form={form}
        // onSubmit={e => e.preventDefault()}
        layout="vertical"
        onFinish={finishHandler}
        style={{ padding: "0px 20px 0px 20px" }}
      >
        <Card className="py-4 my-2">
          <div style={{ maxWidth: '780px', margin: '0px auto' }} >
            <Form.Item label='GST(%)' name='gstPercentage' >
              <Input type="number"/>
            </Form.Item>
            <Form.Item label='Description' name='gstDescription'>
              <TextArea rows={4} maxLength={200} showCount/>
            </Form.Item>
          </div>
        </Card>

        <Form.Item>
          <div style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4 '>
              <Button onClick={history.goBack} className="px-4">Back</Button>
              <Button onClick={handleSave} type='primary' htmlType="submit" className="px-4">Save</Button>
          </div>
        </Form.Item>
      </Form>
      <Modal centered visible={showAddedSuccess} footer={[null]} onCancel={() => { setShowAddedSuccess(false) }}>
        {!(param.id) && <SuccessSubmit icon={Successfully} title="GST Added Successfully!" desc='GST is added in the system' />}
        {param.id && <SuccessSubmit icon={Successfully} title="GST Updated Successfully!" desc='GST is updated in the system' />}
      </Modal>

    </div>
  );
}

export default AddNewGST