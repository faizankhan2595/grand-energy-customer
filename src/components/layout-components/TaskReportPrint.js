import React from 'react'
import { Button, Card, DatePicker, Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons'
import { RightIcon } from 'assets/svg/icon';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const TaskReportPrint = () => {

    const param = useParams()
    const tok = localStorage.getItem('token')
    const [taskReport, setTaskReport] = useState({})
    const [taskData, setTaskData] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false)

    const getTask = (id) => {
        axios({
            method: 'post',
            url:`/api/tc/get-task`,
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                id: id
            },
        }).then((response) => {
            // console.log(response.data.data)
            if (response.data.success) {
                setTaskData(response.data.data)
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getReport = () => {
        axios({
            method: 'post',
            url: `/api/tc/get-task-report`,
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                id:param.id
            },
        }).then((response) => {
            // console.log(response.data)
            if (response.data.success) {
                setTaskReport(response.data.data)
                getTask(response.data.data?.tc_job_site_task_id)
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // let data = document.querySelector('.data-loaded')
        // console.log(data)
        getReport()
    }, [])

    useEffect(() => {
        if((Object.keys(taskData)).length) {
            setDataLoaded(true)
            console.log("Data Loaded")
        }
    }, [taskData])

	return (
		<div>
            <div className={dataLoaded ? 'data-loaded' : ''}>
                <Card bordered={false}>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold' style={{fontSize: '1.30rem'}}>Task Completion Report</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Report ID</p>
                    <p className='font-weight-normal'>{taskReport?.id}</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Task ID</p>
                    <p className='font-weight-normal'>{taskReport?.tc_job_site_task_id}</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Task Date</p>
                    <p className='font-weight-normal'>{new Date(taskData?.task_start_date_time).toDateString()}</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Services</p>
                    <p className='font-weight-normal'>{taskData?.service_type}</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Task Description</p>
                    <p style={{ maxWidth: '780px' }} className='font-weight-normal'>{taskData?.task_description}</p>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Check List</p>
                    <div >
                        {taskReport?.check_list?.map((val, idx)=>(
                            <p className='font-weight-normal' id={idx}><Icon component={RightIcon} />{val?.text}</p>
                        ))}
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Service Before Pictures/Videos</p>
                    <div className='d-flex justify-content-between mt-4 mb-2'>
                        {
                            taskReport?.before_images?.map((val, idx)=>(
                                <img style={{ width: '23%' }} className='' src={val.url} alt="" id={idx}/>
                            ))
                        }
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Service After Pictures/Videos</p>
                    <div className='d-flex justify-content-between mt-4 mb-2'>
                        {
                            taskReport?.after_images?.map((val, idx) => (
                                <img style={{ width: '23%' }} className='' src={val.url} alt="" id={idx}/>
                            ))
                        }
                    </div>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Remarks by Staff</p>
                    <p style={{ maxWidth: '780px' }} className='font-weight-normal'>{taskReport?.report}</p>
                </div>
                </Card>
            </div>
		</div>
	)
}

export default TaskReportPrint