import Icon from "@ant-design/icons";
import { Button, Table } from "antd";
import { AbsentIcon, PresentIcon } from "assets/svg/icon";
import React from 'react'
import { useState } from "react";
import './AttendanceProfileTable.css'

let data = [
    {
        key : 1,
        id : '123',
        date : '01/12/12',
        weekDay : 'Monday',
        status : 'Present',
        remarks : '',
        timing :'',
        location :'',
    }
]

for (let i = 2; i < 9; i++) {
    data.push({
        key : i,
        id : '123'+i,
        date : `0${i}/12/12`,
        weekDay : 'Monday',
        status : 'Absent',
        remarks : '',
        timings : '10:00:00-18:00:00',
        location :'5061 Ang Mo Kio Industrial Park 2 # 01-1319 Singapore',
    })
    
}

function AttendanceProfileTable() {


    const [attendanceProfileData, setAttendanceProfileData] = useState(data)

    const columns = [
        {
            title : "ID",
            dataIndex : "id",
        },
        {
            title : "Date",
            dataIndex : "date",
        },
        {
            title : "Week Day",
            dataIndex : "weekDay",
        },
        {
            title : "Present / Absent",
            dataIndex : "",
            render : (_,record) =>{
                return record.status ==='Absent'? <Icon component={AbsentIcon}/> : <Icon component={PresentIcon}/>
            }
        },
        {
            title : "Status",
            dataIndex : "status",
            render : (text) =>{
                return <div className={`${text === 'Absent'? 'absentStatus':'presentStatus'} py-1 px-2 font-weight-bold rounded`} >{text}</div>
            }
        },
        {
            title : "Remarks",
            dataIndex : "remarks",
        },
        {
            title : "Timings",
            dataIndex : "timings",
        },
        {
            title : "Location",
            dataIndex : "location",
        },
        {
            title : "Action",
            dataIndex : "",
            render : (_,record) =>{
                return <Button className={record.status === 'Absent'? 'absentColor':'presentColor'}>{record.status === 'Absent'? 'Mark As Present':'Mark As Absent'}</Button>
            }
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
        scroll={{
            x: 1000,
        }} 
        rowSelection={rowSelection} columns={columns} dataSource={attendanceProfileData} />
        // </div>
    )
}

export default AttendanceProfileTable