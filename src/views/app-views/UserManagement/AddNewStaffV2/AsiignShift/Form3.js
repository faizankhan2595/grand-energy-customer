import { Table } from 'antd'
import React from 'react'
import { useState } from 'react'

let schedule = [
  {
    key : 1,
    day : 'Monday',
    startTime : '08:30',
    endTime : '17:00',
    minOver : 0.00,
    halfDay : 'NO',
    restDay : 'NO',
  }
]



const week = ['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday']

for (let i = 2; i < 8; i++) {
  schedule.push({
    key : i,
    day : week[i-1],
    startTime : '08:30',
    endTime : '17:00',
    minOver : 0.00,
    halfDay : 'NO',
    restDay : 'NO',
  })
  
}

function Form3() {

  const [scheduleData, setScheduleData] = useState(schedule)
  
  const [isLoading, setIsLoading] = useState(false);

  const scheduleColumns = [
    {
      title: "Day",
      dataIndex: "day",
      render : (text) =>{
        return <div style={{ color: "#000B23" }} className='font-size-base font-weight-semibold'>{text}</div>
      }
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Min Over Time in Minutes",
      dataIndex: "minOver",
    },
    {
      title: "Half Day",
      dataIndex: "halfDay",
    },
    {
      title: "Rest Day",
      dataIndex: "restDay",
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
        columns={scheduleColumns}
        dataSource={scheduleData}
        loading={isLoading}
      />
    </>
  )
}

export default Form3