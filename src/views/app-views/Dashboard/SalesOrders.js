import React from 'react'

import {Card , Col , Row , Typography} from 'antd'
import Icon from "@ant-design/icons"

import { BarChart } from './BarChart'
import { OrdersDeliveredIcon, TotalCustomerIcon, TotalInquiriesIcon, TotalOrdersIcon } from './SvgIcons'

const {Title , Text} = Typography

const SalesOrders = () => {
  return (
    <React.Fragment>
      <Row gutter={20}>
        <Col span={16}>
          
            <BarChart/>
          
        </Col>
        <Col span={8}>
          <Row gutter={20}>
          <Col span={12}>
            <Card className='text-center'>
              <Icon component={TotalCustomerIcon}/>
              <Title strong>10K</Title>
              <Text strong>Total Customers</Text>
            </Card>
            <Card className='text-center'>
              <Icon component={TotalOrdersIcon}/>
              <Title strong>995</Title>
              <Text strong>Total Orders</Text>
            </Card>
          </Col>
          <Col span={12}>
          <Card className='text-center'>
              <Icon component={TotalInquiriesIcon}/>
              <Title strong>1205</Title>
              <Text strong>Total Inquiries</Text>
            </Card>
            <Card className='text-center'>
              <Icon component={OrdersDeliveredIcon}/>
              <Title strong>950</Title>
              <Text strong>Orders Delivered</Text>
            </Card>
          </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SalesOrders