import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


import { Card , Typography , Space, Tag, Row, Form, Select , Input , Col , Button } from 'antd'
import Icon from "@ant-design/icons"

import { PaidIcon , serviceHandoverDate , InvoiceIcon , InquiryIcon , DateRangeIcon } from '../SvgIcon'
import { DeliveryManagementPageIcon } from 'assets/svg/icon'

import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import ScheduleDeliveryTable from './ScheduleDeliveryTable'
import ScheduleDeliveryForm from './ScheduleDeliveryForm'
import Modal from 'components/UI/Modal'
import SubmitPage from './SubmitPage'

const {Title , Text} = Typography
const {TextArea} = Input

const items = [
  {
    icon: InvoiceIcon,
    title: "HCI1234-INV",
    text: "Invoice Id"
  },
  {
    icon: InquiryIcon,
    title: "24/08/2022",
    text: "Inquiry Date"
  },
  {
    icon: serviceHandoverDate,
    title: "30/08/2022",
    text: "Service Handover Date"
  },
  {
    icon: DateRangeIcon,
    title: "06",
    text: "Order Processing Days"
  },
  {
    icon: PaidIcon,
    title: "S$100",
    text: "Order Amount"
  }
]

const SheduleDelivery = () => {

  const history = useHistory();
  const [showModal , setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(prev => !prev)
  }

  return (
    <React.Fragment>
      {showModal && <Modal onClose={showModalHandler}>
        <SubmitPage/></Modal>}
      <PageHeading 
        title="Delivery Management / Delivery Invoices / Scheduled Delivery"
        svg={DeliveryManagementPageIcon}
      />
      <Card>
        <div className='d-flex justify-content-between'>
        {items.map((item) => (
          <div className='d-flex'>
            <Icon className='mt-1' component={item.icon}/>
            <div className='ml-3'>
              <Title className="mb-0" level={3} strong>{item.title}</Title>
              <Text>{item.text}</Text>
            </div>
          </div>
        ))}
        </div>
        <Tag className="mt-3 ml-3 pl-4 pr-4" color="#00AB6F">Paid: S$100</Tag>
      </Card>

      <ScheduleDeliveryTable/>
      <Row gutter={20}>
        <Col span={16}>
          <Card>
          <Title strong level={3} className="mb-3">Scheduled Delivery</Title>
          <ScheduleDeliveryForm/>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <Title strong level={3} className="mb-3">Assign Delivery</Title>
          <Form layout="vertical">
            <Form.Item label="Delivery Staff" name="deliveryStaff">
              <Select defaultValue="Robert Fox"/>
            </Form.Item>
            <Form.Item label="Add Instructions">
              <TextArea placeHolder="Type Here" rows={4}/>
            </Form.Item>
          </Form>
          </Card>
        </Col>
      </Row>

      <Space size="middle" className={`d-flex justify-content-end`}>
        <Button style={{minWidth: "125px"}} onClick = {() => history.goBack()}>Cancel</Button>
        
  
        <Button style={{minWidth: "125px"}} type="primary" onClick={showModalHandler}>
        Schedule Delivery
        </Button>
      </Space>

      
    </React.Fragment>
  )
}

export default SheduleDelivery