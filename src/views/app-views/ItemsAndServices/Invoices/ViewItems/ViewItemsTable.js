import React , {useState} from 'react'

import {Table , Button , Tag} from 'antd';
import Icon from "@ant-design/icons"

import Avatar from 'assets/Avatar2.png'
import HandBagImg from "assets/HandBag.png";
import SneakersImg from "assets/Sneakers.png";

import Actions from './Actions';


const columns = [
  {
    title: 'Item Id',
    dataIndex: 'itemId',
  },
 
  {
    title: 'Items',
    dataIndex: 'items',
    

    render: (item) => {
      const {text , icon} = item;

      
      
      return(
      <span>
        <img component={icon}/>
        {text}
        </span>
        );
    }
  },  
  
  {
    title: 'Qty',
    dataIndex: 'qty',
   
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
   
  },
  {
    title: 'Service Type',
    dataIndex: 'serviceType',
   
  },
  {
    title: 'Craftsman',
    dataIndex: 'craftsman',
   
  },
  {
    title: 'Service Date',
    dataIndex: 'serviceDate',
   
  },
  {
    title: 'Status',
    dataIndex: 'status',
    

    render: (status) => {
      

      
      
      return(
      <span>
        <Tag color="orange" key={status}>
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
    itemId: 'HCI1234-ORD-1-1',
    items: {text: "XYZ Hand Bag" , Icon: {HandBagImg}},
    qty: "1 set",
    amount: 'S$100.00',
    serviceType: "In House",
    craftsman: "N/A",
    serviceDate: "N/A", 
    status: "Pending Collection",
  

  }
];
for(let i = 2 ; i <= 2 ; i++){
  data.push({
    key: i,
    itemId: 'HCI1234-ORD-1-2',
    items: {text: "Sneakers" , Icon: {SneakersImg}},
    qty: "1 set",
    amount: 'S$100.00',
    serviceType: "In House",
    craftsman: "N/A",
    serviceDate: "N/A", 
    status: "Pending Collection",
  })
}

const ViewItemsTable = () => {
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

export default ViewItemsTable