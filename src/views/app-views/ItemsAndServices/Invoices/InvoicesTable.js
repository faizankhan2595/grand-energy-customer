import React , {useState} from 'react'

import {Table , Button , Tag} from 'antd';

import Avatar from 'assets/Avatar2.png'

import Actions from './Actions';


const columns = [
  {
    title: 'Invoice Id',
    dataIndex: 'invoiceId',
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
    title: 'Invoice Date',
    dataIndex: 'invoiceDate',
    
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
   
  },
  {
    title: 'Payment Type',
    dataIndex: 'paymentType',
   
  },
  {
    title: 'Status',
    dataIndex: 'status',
    

    render: (status) => {
      const text = status.text;
      const color = status.color;

      console.log(text , color);
      
      return(
      <span>
        <Tag color={color} key={text}>
          {text}
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

const status = [
  {text: "Paid" , color: "green" , paymentType: 'cash'},
  {text: "Unpaid" , color: "warning" , paymentType: 'Debit Card'},
  {text: "Invalid" , color: "error" ,paymentType: 'Debit Card'},
  {text: "Partial" , color: "purple" ,  paymentType: 'G Pay'},
  {text: "Paid" , color: "green" , paymentType: 'Credit Card'}
]

const data = [
  {
    key: 1,
    invoiceId: 'HC12345-QTN',
    image: Avatar,
    customerName: 'John Smith',
    items: 'XYZ Hand Bag,Sneakers',
    invoiceDate: '20/08/2022',
    amount: 'S$120.23',
    paymentType: status[0].paymentType,
    status: status[0],

  }
];
for(let i = 2 ; i <= 5 ; i++){
  data.push({
    key: 1,
    invoiceId: 'HC12345-QTN',
    image: Avatar,
    customerName: 'John Smith',
    items: 'XYZ Hand Bag,Sneakers',
    invoiceDate: '20/08/2022',
    amount: 'S$120.23',
    paymentType: status[i - 1].paymentType,
    status: status[i - 1],
  })
}

const InvoicesTable = () => {
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

export default InvoicesTable