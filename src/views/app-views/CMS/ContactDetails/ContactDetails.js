import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
import { useHistory } from "react-router-dom";
import Setting from "assets/svg/Setting.svg";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import axios from 'axios';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import { Successfully } from 'configs/svgIcons';



const ContactDetails = () => {
  const [form] = Form.useForm()
  const tok = localStorage.getItem('token')
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);

  const handleSave = () => {
    // console.log(value);
    // setValue()
  };

  const finishHandler = (e) => {
    console.log(e)
    axios({
      method: 'post',
      url: "/api/tc/save-contact-details",
      data: {
          email: e.email,
          mobile: String(e.mobile),
          tel: String(e.tel),
          address: e.address,
      },
      headers: {
          // 'content-type': `multipart/form-data`,
          Authorization: `Bearer ${tok}`
      },
  }).then(function (response) {
      console.log(response.data);
      if(response.data.success) {
          setShowAddedSuccess(true)
          setTimeout(() => {
              setShowAddedSuccess(false)
              getContactDetails()
              // history.push(`/app/customer-management/customer-accounts/edit/${+param.customer_id}`)
          }, 1500);
      }
      
  }).catch(function (error) {
      console.log(error);
  });
  }

  const getContactDetails = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-contact-details",
      data: {},
      headers: {
          // 'content-type': `multipart/form-data`,
          Authorization: `Bearer ${tok}`
      },
  }).then(function (response) {
      console.log(response.data);
      // if(response.data.success) {
        //     setShowAddedSuccess(true)
        //     setTimeout(() => {
          //         setShowAddedSuccess(false)
          //         history.push(`/app/customer-management/customer-accounts/edit/${+param.customer_id}`)
          //     }, 1500);
          // }
          
      let res = response.data.data
      form.setFieldsValue({
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
    getContactDetails()
  }, [])
  

  return (
    <div style={{ padding: "20px 20px 5px 20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={finishHandler}
      >
      <div className="d-flex justify-content-between">
        <PageHeading
          // icon={Setting}
          title="CMS / Contact Details"
        />
        <Form.Item>
          <Button style={{ marginLeft: 'auto' }} onClick={handleSave} type='primary' className="d-flex px-4"
          htmlType="submit">Save</Button>
        </Form.Item>
      </div>
        <Card className="py-0">
          <div style={{ maxWidth: '780px',margin:'0px auto' }} >
            <Form.Item label='Email Address' name='email' >
              <Input />
            </Form.Item>
            <Form.Item label='Office Telephone Number' name='tel' >
              <Input />
            </Form.Item>
            <Form.Item label='Office Mobile Number' name='mobile' >
              <Input />
            </Form.Item>
            <Form.Item label='Address' name='address' >
              <Input />
            </Form.Item>

          </div>
        </Card>
      </Form>
      <Modal centered visible={showAddedSuccess} footer={[null]} onCancel={() => { setShowAddedSuccess(false) }}>
                <SuccessSubmit icon={Successfully} title="Contact Details saved Successfully!" desc='Contact details are saved in the system' />
            </Modal>
    </div>
  );
}

export default ContactDetails