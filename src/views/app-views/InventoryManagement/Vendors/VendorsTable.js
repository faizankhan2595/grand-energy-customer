import React ,{useState} from 'react'

import { Table , Typography} from 'antd'


import ProfilePic from '../Assets/ProfilePic.png'

import Actions from './Actions'

const {Text} = Typography

const columns = [
  {
    title: "Vendor Id",
    dataIndex: 'vendorId',
    key: 'vendorId'
  },
  {
    title: "Company",
    dataIndex: 'company',
    key: 'company',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.company - b.company,
  },
  {
    title: "Vendor Name",
    dataIndex: 'vendorName',
    key: 'vendorName',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.vendorName - b.vendorName,

    render: (item) => {
      return (
        <div className='d-flex align-items-center'>
          <img src={item.image} className="mr-2"/>
          <Text strong>{item.name}</Text>
        </div>
      )
    }
  },
  {
    title: "Phone Number",
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.phoneNumber - b.phoneNumber,
  },
  {
    title: "Quotations",
    dataIndex: 'quotations',
    key: 'quotations',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.quotations - b.quotations,
  },
  {
    title: "PO",
    dataIndex: 'po',
    key: 'po',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.po - b.po,
  },
  {
    title: "Address",
    dataIndex: 'address',
    key: 'address',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.address - b.address,
  },
  
  {
    title: "Last Order",
    dataIndex: 'lastOrder',
    key: 'lastOrder',

    defaultSortOrder: 'descend',
    sorter: (a, b) => a.lastOrder - b.lastOrder,
  },
  {
    title: "Action",
    dataIndex: 'action',
    key: 'action',
    
    render: () => <Actions/>

    
  },
]

const vendors = [10 , 20 , 10 , 20 , 10];

const dataSource = []


for(let i = 0 ; i < 5 ; i++){
  dataSource.push({
    key: i + 1,
    vendorId: "VN 123456",
    company: "ABC Painters",
    vendorName: {image: ProfilePic , name: "John Smith"},
    phoneNumber: "+65 123456789",
    quotations: vendors[i],
    po: vendors[i],
    address: "15 Changi Business Park Cres Singapore",
    lastOrder: "22/08/2022",
  })
}

const VendorsTable = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler,
  };
  return (
    <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
  )
}

export default VendorsTable