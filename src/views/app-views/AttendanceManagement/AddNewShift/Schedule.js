import { Input, Switch, Table, TimePicker } from 'antd';
import React, { useState } from 'react'
import dayjs from 'dayjs';

let data = [
  {
    key : 1,
    day:'Monday',
    startTime:"08:30",
    endTime:"17:00",
    dayEndTime:"23:59",
    MinOtInMinutes:'60',
    halfDay:false,
    restDay:false,
    action : 'copy to other days'
  }
]

let weeks = ["Tuesday","Wednesday","Thirsday","Friday","Saturday","Sunday"];

for (let i = 2; i < 8; i++) {
  data.push({
    key : i,
    day:weeks[i-2],
    startTime:"08:30",
    endTime:"17:00",
    dayEndTime:"23:59",
    MinOtInMinutes:"60",
    halfDay:true,
    restDay:true,
    action : 'copy to other days'
  })
  
}

function Schedule() {


  const [scheduleData, setScheduleData] = useState(data)
  const columns = [
    {
      title : "Day",
      dataIndex : "day",
    },
    {
      title : "Start Time",
      dataIndex : "startTime",
      render : (text) =>{
        return <TimePicker  format='HH:mm'/>
      }
    },
    {
      title : "End Time",
      dataIndex : "endTime",
      render : (text) =>{
        return <TimePicker  format='HH:mm'/>
      }
    },
    {
      title : "Day End Time",
      dataIndex : "dayEndTime",
      render : (text) =>{
        return <TimePicker  format='HH:mm'/>
      }
    },
    {
      title : "Min Overtime In Minutes",
      dataIndex : "MinOtInMinutes",
      render : (text) =>{
        return <Input  defaultValue={text}/>
      }
    },
    {
      title : "Half Day",
      dataIndex : "halfDay",
      render : (text) =>{
        return <Switch defaultChecked={text}/>
      }
    },
    {
      title : "Rest Day",
      dataIndex : "restDay",
      render : (text) =>{
        return <Switch defaultChecked={text}/>
      }
    },
    {
      title : "Action",
      dataIndex : "action",
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
        rowSelection={rowSelection} columns={columns} dataSource={scheduleData} />
        // </div>
    )
}

export default Schedule