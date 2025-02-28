import { Table } from 'antd'
import React from 'react'
import { useState } from 'react'


let shiftLocation = [
    {
      key : 1,
      name: "Location 1",
      address : "5061 Ang Mo Kio,Industrial Park 2 #01-1319,Sing..",
      radius : 83.83,
    }
  ]

function Form4() {

    const [isLoading, setIsLoading] = useState(false);
    const [shiftLocationData, setShiftLocationData] = useState(shiftLocation)

    const shiftColumns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "Radius",
          dataIndex: "radius",
        },
      ]

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
    <>
      <div style={{ color: "#000B23" }} className='font-size-base font-weight-bold mb-4'>Schedule</div>
      <Table
        rowSelection={rowSelection}
        columns={shiftColumns}
        dataSource={shiftLocationData}
        loading={isLoading}
      />
    </>
  )
}

export default Form4