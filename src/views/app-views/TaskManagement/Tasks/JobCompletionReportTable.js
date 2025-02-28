import React from 'react'
import avatar from "assets/Avatar2.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "@ant-design/icons";
import { PageIcon } from 'assets/svg/ActionsSvg';
import { Avatar, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';


let data = [
    {
        key: 1,
        id: '2311',
        submittedBy: { img: avatar, name: "John Smith" },
        submittedOn: '4 jan 2023',
        remarks: 'Loreum ispum is dummy text.Loreum ispum is dummy text.Loreum ispum is dummy text.',
        status: 'Blocker',
    }
]

for (let i = 2; i < 9; i++) {
    data.push({
        key: i,
        id: '231' + i,
        submittedBy: { img: avatar, name: "Wade Warren" },
        submittedOn: '4 jan 2023',
        remarks: 'Loreum ispum is dummy text.Loreum ispum is dummy text.Loreum ispum is dummy text.',
        status: 'Completed',
    })
}


function JobCompletionReportTable({taskId,searchText}) {

    // console.log(taskId)
    const [jobCompletionData, setjobCompletionData] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.id)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.submittedBy)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.submittedOn)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.report)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.status)
                .toLowerCase()
                .includes(value.toLowerCase())
            },
        },
        {
            title: 'Submitted By',
            width : 180,
            render: (item) => {
                return (
                    <div className='d-flex align-items-center'>
                        <Avatar src={item.submitted_by_image} />
                        <p className='m-0 p-0 ml-3 '>{item?.submitted_by_name}</p>
                    </div>
                );
            },
        },
        {
            title: 'Submitted On',
            width : 140,
            render: (item) => {
                return (
                    <div className='d-flex align-items-center'>
                        {moment(new Date(item?.updated_at)).format('dddd, DD MMM YYYY')}
                    </div>
                );
            },
        },
        {
            title: 'Remarks',
            dataIndex: 'report'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return <Link to={`/app/task-management/task/task-completion-report/${record.id}`}><Icon component={PageIcon} /> </Link>
            }
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


    const tok = localStorage.getItem('token') 


    const getReports = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task-reports",
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: {
                task_id:taskId,
                statuses:["COMPLETED"]
            },
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setjobCompletionData(response.data.data.data)
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getReports()
    }, [])



    return (
        <Table
            // scroll={{
            //     x: 1000,
            // }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={jobCompletionData}
        //   loading={isLoading}
        />
    )
}

export default JobCompletionReportTable