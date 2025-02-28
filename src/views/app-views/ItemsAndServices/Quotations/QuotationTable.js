import React , {useState} from 'react'

import {Table , Button , Tag} from 'antd';

import Avatar from 'assets/Avatar2.png'

import Actions from './Actions';


const columns = [
  {
    title: 'Quotation Id',
    dataIndex: 'quotationId',
  },
  {
    title: '',
    dataIndex: 'image',
    render: (image) => {
      
      return(
      <img src={image}/>
        )
    }
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.customerName - b.customerName,
  },
  {
    title: 'Items',
    dataIndex: 'items',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.items - b.items,
  },
  {
    title: 'Quotation Date',
    dataIndex: 'quotationDate',
    
  },
  {
    title: 'Pickup Date',
    dataIndex: 'pickupDate',
   
  },
  {
    title: 'Pickup Slot',
    dataIndex: 'pickupSlot',
   
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
   
  },
  {
    title: 'Status',
    dataIndex: 'status',
    

    render: (status) => {
      const color = (status === 'Inactive') ? "volcano" : "green";
      return(
      <span>
        <Tag color={color} key={status}>
          {status}
        </Tag>
        </span>
        )
    }
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Actions/>,
  },
];

const data = [
  {
    key: 1,
    quotationId: 'HC12345-QTN',
    image: Avatar,
    customerName: 'John Smith',
    items: 'XYZ Hand Bag,Sneakers',
    quotationDate: '20/08/2022',
    pickupDate: '22/08/2022',
    pickupSlot: '09-02 Pm',
    amount: 'S$120.23',
    status: 'Inactive',

  }
];
for(let i = 2 ; i <= 10 ; i++){
  data.push({
    key: i,
    quotationId: 'HC12345-QTN',
    image: Avatar,
    customerName: 'John Smith',
    items: 'XYZ Hand Bag,Sneakers',
    quotationDate: '20/08/2022',
    pickupDate: '22/08/2022',
    pickupSlot: '09-02 Pm',
    amount: 'S$120.23',
    status: 'Active',
  })
}

const QuotationTable = () => {
  const [selectedRowKeys , setSelectedRowKeys] = useState([]);

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler
  }
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}

export default QuotationTable