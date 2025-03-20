import { DatePicker, Table } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Avatar from 'assets/Avatar2.png'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

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

// for (let i = 1234; i < 1243; i++) {
//     data.push({
//         key : i+1,
//         user_id: `TC-${i + 1}`,
//         staffName: 'Jane Copper ' + i,
//         status: 'Checked In',
//         contact: '+91 7926352921',
//         location: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
//         attendance: 'Present',
//         checkInTime: '18 Dec 2022, 10:00AM',
//         checkInLocatin: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
//         late: '0.00',
//         checkOutTime: '18 Dec 2022, 18:00PM',
//         checkOutLocation: '5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore',
//         ut: '0.00',
//         ot: '0.00',
//         remarks: '',
//         shiftName: 'Shift 1',
//         shiftStartTime: '10:00:00',
//         shiftEndTime: '18:00:00',
//         image : Avatar,
//     })
// }

function AttendanceListTable({dailyAttendanceData}) {



    const history = useHistory()
    const columns = [
        {
            title: 'User Id',
            dataIndex: "user_id",
            // width: 120,
            render : (text) =>{
                return <div onClick={()=>{history.push(`/app/attendance-management/daily-attendance/${text}`)}} >{text}</div>
            }
        },
        // {
        //     title: '',
        //     dataIndex: 'image',
        //     render: (image) => {

        //         return (
        //             <img src={image} />
        //         )
        //     }
        // },
        {
            title: 'Staff Name',
            dataIndex: "name",
            // width: 120,
        },
        // {
        //     title: 'Status',
        //     dataIndex: "status",

        // },
        // {
        //     title: 'Contact',
        //     dataIndex: "contact",
        //     width: 160,
        // },
        {
            title: 'Location',
            dataIndex: "location_name",
            // width: 160,
        },
        {
            title: 'Attendance',
            dataIndex: "status",
        },
        {
            title: 'Check in Time',
            dataIndex: "first_check_in_time",
            // width: 160,
            render: (text) => {
                return text? moment(text).format('DD MMM YYYY, hh:mm A'):null
            }
        },
       
        // {
        //     title: 'Late (Min)',
        //     dataIndex: "late",
        //     width: 120,
        // },
        {
            title: 'Check Out Time',
            dataIndex: "last_check_out_time",
            // width: 160,
            render: (text) => {
                return text? moment(text).format('DD MMM YYYY, hh:mm A'):null
            }
        },
        // {
        //     title: 'Check Out Location',
        //     dataIndex: "checkOutLocation",
        //     width: 160,
        // },
        
        // {
        //     title: 'UT (Min)',
        //     dataIndex: "ut",
        //     width: 100,
        // },
        // {
        //     title: 'OT (Min)',
        //     dataIndex: "ot",
        //     width: 100,
        // },
        // {
        //     title: 'Remarks',
        //     dataIndex: "remarks",
        // },
        // {
        //     title: 'Shift Name',
        //     dataIndex: "shiftName",
        //     width: 120,
        // },
        // {
        //     title: 'Shift Start Time',
        //     dataIndex: "shiftStartTime",
        //     width: 160,
        // },
        // {
        //     title: 'Shift End Time',
        //     dataIndex: "shiftEndTime",
        //     width: 160,
        // },
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
        <>
            <Table scroll={{
                x: 1500,
            }} columns={columns} dataSource={dailyAttendanceData} />
        </>
    )
}

export default AttendanceListTable