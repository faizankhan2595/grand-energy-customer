import React from 'react'

import { Card , Table , Typography , Space} from 'antd'
import Icon from "@ant-design/icons"

import { BagBlueIcon } from '../SvgIcon'
import BagImg from '../Assets/Bag.png'

const {Title , Text} = Typography

const columns = [
  {
    title: 'Item Id',
    dataIndex: 'itemId',
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    width: 200,

    render: (item) => {
      return (
        <Space>
          <img src={item.image} alt="item image"/>
        <Text>
          {item.name}
        </Text>
        </Space>
      )
    }
  },
  {
    title: 'Service',
    dataIndex: 'service',
    width: 200,
  },
  {
    title: 'Item Type',
    dataIndex: 'itemType',
    key: 'itemType',

    render: (icons) => {
      return (
        <div className='d-flex justify-content-around'>
          {icons.map((icon) => (
            <Icon component={icon}/>
          ))}
        </div>

      )
    } 
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
  },
  {
    title: 'Order Amount',
    dataIndex: 'orderAmount',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Net Total',
    dataIndex: 'netTotal',
  },
]

const data = [
  {
    key: 1,
    itemId: " HCI1234-ORD-(1-1)",
    item: {image: BagImg , name: "LV NEVERFULL (vachetta leather)" },
    service: "Full Vachetta leather replacement",
    itemType: [BagBlueIcon],
    qty: "1 Set",
    orderAmount: "S$100",
    discount: "00",
    netTotal: "S$100",
  }
]

const ScheduleDeliveryTable = () => {
  return (
    <React.Fragment>
      <Card>
      <Title strong level={3} className="mb-3">
      Items & Services
        </Title>
       <Table columns={columns} dataSource={data} pagination={false}/>
      </Card>
    </React.Fragment>
  )
}

export default ScheduleDeliveryTable