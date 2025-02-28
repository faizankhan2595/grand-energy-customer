import { Table } from 'antd'
import React from 'react'
import { useState } from 'react'
import Avatar from 'assets/Avatar2.png'
import { useHistory } from 'react-router-dom'

let data = [
    {
        key : 1234,
        user_id: "TC-1234",
        staffName: 'Jane Copper',
        status: 'Absent',
        contact: '+91 7926352921',
        location: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
        attendance: 'Absent',
        shiftName: 'Shift 1',
        shiftStartTime: '10:00:00',
        shiftEndTime: '18:00:00',
        image : Avatar,
    }
]

for (let i = 1234; i < 1243; i++) {
    data.push({
        key : i+1,
        user_id: `TC-${i + 1}`,
        staffName: 'Jane Copper ' + i,
        status: 'Checked In',
        contact: '+91 7926352921',
        location: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
        attendance: 'Present',
        checkInTime: '18 Dec 2022, 10:00AM',
        checkInLocatin: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
        late: '0.00',
        checkOutTime: '18 Dec 2022, 18:00PM',
        checkOutLocation: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
        ut: '0.00',
        ot: '0.00',
        remarks: '',
        shiftName: 'Shift 1',
        shiftStartTime: '10:00:00',
        shiftEndTime: '18:00:00',
        image : Avatar,
    })

}
function AttendanceListTable() {


    const [dailyAttendanceData, setdailyAttendanceData] = useState(data)

    const history = useHistory()
    const columns = [
        {
            title: 'User Id',
            dataIndex: "user_id",
            width: 120,
            render : (text) =>{
                return <div onClick={()=>{history.push(`/app/attendance-management/daily-attendance/${text}`)}} >{text}</div>
            }
        },
        {
            title: '',
            dataIndex: 'image',
            render: (image) => {

                return (
                    <img src={image} />
                )
            }
        },
        {
            title: 'Staff Name',
            dataIndex: "staffName",
            width: 120,
        },
        {
            title: 'Status',
            dataIndex: "status",

        },
        {
            title: 'Contact',
            dataIndex: "contact",
            width: 160,
        },
        {
            title: 'Location',
            dataIndex: "location",
            width: 160,
        },
        {
            title: 'Attendance',
            dataIndex: "attendance",
        },
        {
            title: 'Check IN Time',
            dataIndex: "checkInTime",
            width: 160,
        },
        {
            title: 'Check IN Location',
            dataIndex: "checkInLocatin",
            width: 160,
        },
        {
            title: 'Late (Min)',
            dataIndex: "late",
            width: 120,
        },
        {
            title: 'Check Out Time',
            dataIndex: "checkOutTime",
            width: 160,
        },
        {
            title: 'Check Out Location',
            dataIndex: "checkOutLocation",
            width: 160,
        },
        {
            title: 'UT (Min)',
            dataIndex: "ut",
            width: 100,
        },
        {
            title: 'OT (Min)',
            dataIndex: "ot",
            width: 100,
        },
        {
            title: 'Remarks',
            dataIndex: "remarks",
        },
        {
            title: 'Shift Name',
            dataIndex: "shiftName",
            width: 120,
        },
        {
            title: 'Shift Start Time',
            dataIndex: "shiftStartTime",
            width: 160,
        },
        {
            title: 'Shift End Time',
            dataIndex: "shiftEndTime",
            width: 160,
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
        <Table scroll={{
            x: 1500,
        }} rowSelection={rowSelection} columns={columns} dataSource={dailyAttendanceData} />
        // </div>
    )
}

export default AttendanceListTable