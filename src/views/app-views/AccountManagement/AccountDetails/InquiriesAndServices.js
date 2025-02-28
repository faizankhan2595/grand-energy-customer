import React , {useState} from 'react'
import {Table , Button, Tag} from 'antd';
import Actions from './Actions';

const columns = [
  {
    title: 'Item Id',
    dataIndex: 'itemId',
  },
  {
    title: 'Item',
    dataIndex: 'item',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.item - b.item,
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
    title: 'Status',
    dataIndex: 'status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.satus - b.status,

    render: (status) => {
      return(
      <span>
        <Tag color="green" key={status}>
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
    itemId: "HC11234-ORD-(1 - 1)",
    item: "XYZ Hand Bag",
    qty: "1 set",
    amount: "S$100.00",
    serviceType: "In House",
    status: "Delivered",

  }
];
for(let i = 2 ; i <= 7 ; i++){
  data.push({
    key: i,
    itemId: `HC11234-ORD-(1 - ${i})`,
    item: "XYZ Hand Bag",
    qty: "1 set",
    amount: "S$100.00",
    serviceType: "In House",
    status: "Delivered",
  })
}

const InquiriesAndServices = () => {
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
    <div >
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} className="w-100"/>
    </div>
  )
}

export default InquiriesAndServices