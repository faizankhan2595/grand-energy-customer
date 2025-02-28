import { Input, Table } from 'antd'
import React from 'react'
import { useState } from 'react'


let data =[
  {
    key:1,
    name:"Location 1",
    address:"5061 Ang Mo Kio,Industrial Park 2 #01-1319,Sing",
    radius:82.34,
    action:"",
  }
]

for (let i = 2; i < 5; i++) {
  data.push({
    key:i,
    name:"Location 1",
    address:"5061 Ang Mo Kio,Industrial Park 2 #01-1319,Sing",
    radius:82.34,
    action:"",
  })
  
}
function Locations() {

  const [locationData, setlocationData] = useState(data)

  const columns =[
    {
      title:'Name',
      dataIndex:'name',
      render : (text) =>{
        return <Input  defaultValue={text}/>
      }
    },
    {
      title:'Address',
      dataIndex:'address',
      render : (text) =>{
        return <Input  defaultValue={text}/>
      }
    },
    {
      title:'Radius',
      dataIndex:'radius',
      render : (text) =>{
        return <Input  defaultValue={text}/>
      }
    },
    {
      title:'Action',
      dataIndex:'action',
    },
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const selectChangeHandler = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: selectChangeHandler
    }

    return (
        // <div>
        <Table 
        // scroll={{
        //     x: 1300,
        // }} 
        rowSelection={rowSelection} columns={columns} dataSource={locationData} />
        // </div>
    )
}

export default Locations