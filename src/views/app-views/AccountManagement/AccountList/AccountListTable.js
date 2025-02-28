import React , {useState} from 'react'
import {Table , Button} from 'antd';
import Actions from './Actions';

const columns = [
  {
    title: 'Customer Id',
    dataIndex: 'customerId',
  },
  {
    title: '',
    dataIndex: 'image',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Email Id',
    dataIndex: 'emailId',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Total Revenue',
    dataIndex: 'totalRevenue',
  },
  {
    title: 'Outstanding Amount',
    dataIndex: 'outstandingAmount',
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
    customerId: 'HC-12345',
    image: '',
    customerName: 'John Smith',
    phoneNumber: '+65 123456789',
    emailId: 'johnsmith@gmail.com',
    totalRevenue: 'S$100',
    outstandingAmount: 'S$100',
    action: ''

  }
];
for(let i = 2 ; i <= 10 ; i++){
  data.push({
    key: i,
    customerId: 'HC-12345',
    image: '',
    customerName: 'John Smith',
    phoneNumber: '+65 123456789',
    emailId: 'johnsmith@gmail.com',
    totalRevenue: 'S$100',
    outstandingAmount: 'S$100',
    action: ''
  })
}

const UserListTable = () => {
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

export default UserListTable