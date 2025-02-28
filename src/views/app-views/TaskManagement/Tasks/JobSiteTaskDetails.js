import React, { useEffect, useState } from 'react'
import TaskManagement from "assets/svg/TaskManagement.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import { Avatar, Button, Card, Col, DatePicker, Form, Input, Row } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons'
import { PageIcon } from 'assets/svg/ActionsSvg';
import { RightIcon } from 'assets/svg/icon';
import { PdfIcon } from 'views/app-views/ItemsAndServices/svgIcons';
import Image1 from 'assets/image1.png'
import Image2 from 'assets/img2.png'
import Image3 from 'assets/image3.png'
import Image4 from 'assets/img4.png'
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom'



function JobSiteTaskDetails() {

    const param = useParams()
    const history = useHistory()
    const tok = localStorage.getItem('token') 

    const [taskData, setTaskData] = useState([])
    const search = useLocation().search;
    const isScheduleView = new URLSearchParams(search).get('isScheduleView');

    const getTask = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                id: +param.jobSiteTaskId
            },
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setTaskData(response.data.data)
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTask()
    }, [])



    return (
        <div style={{ backgroundColor: '#F5F7FB' }} >
            <div style={{
                backgroundColor: "#FFFFFF", margin: "-25px",
                background: "#ffffff",
                padding: "25px",
                paddingBottom: "0px",
                marginBottom: "25px"
            }}>
                <PageHeading
                    icon={TaskManagement}
                    title="Task Management / Job Sites Tasks / Task Details "
                />
                <div className='d-flex justify-content-between pb-4'>
                    <div>
                        <p className='font-weight-bolder font-size-md' ><Icon component={PageIcon} />  Task Details</p>
                    </div>
                    <div style={{ gap: '10px' }} className='d-flex' >
                        {/* <Link to=> */}
                        <Button onClick={history.goBack} className='px-5' size='middle'>Back</Button>
                        {/* </Link> */}
                        {!isScheduleView && <Link to={`/app/task-management/task/edit/${taskData?.job_site?.name}/${taskData?.customer?.name}/${taskData?.tc_customer_job_site_id}/${taskData?.tc_customer_id}/${taskData?.id}/${param.jobSiteCount}`}>
                            <Button className='px-5' type='primary' size='middle'>Edit</Button>
                        </Link>}
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#F5F7FB' }}>
                <Card>
                    <div className='mb-4 d-flex justify-content-between'>
                        <div >
                            <p className='m-0 p-0 mb-2 font-weight-bold'>Task ID</p>
                            <p className='font-weight-normal'>{taskData?.id}</p>
                        </div>
                        <div className='text-right'>
                            {taskData.task_status === 'COMPLETED' && <Button style={{ backgroundColor: '#00AB6F', color: '#FFFFFF' }} className='px-4 mb-2 font-weight-semibold font-size-normal ' size="small" >{taskData?.task_status}</Button>}
                            {taskData.task_status === 'PENDING' && <Button style={{ backgroundColor: '#fca311', color: '#FFFFFF' }} className='px-4 mb-2 font-weight-semibold font-size-normal ' size="small" >{taskData?.task_status}</Button>}
                            {taskData.task_status === 'Blocker' && <Button style={{ backgroundColor: '#F53434', color: '#FFFFFF' }} className='px-4 mb-2 font-weight-semibold font-size-normal ' size="small" >{taskData?.task_status}</Button>}
                            {taskData.task_status === 'COMPLETED' && <p className='font-weight- text-right'>Completion Date: {moment(new Date(taskData?.updated_at)).format('dddd, DD MMM YYYY')}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Company</p>
                        <p className='font-weight-normal'> <Avatar src={taskData?.customer?.profile_pic} className='mr-2'/> {taskData?.customer?.name} </p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Job Site</p>
                        <p className='font-weight-normal'>{taskData?.job_site?.name}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Task Name</p>
                        <p className='font-weight-normal'>{taskData?.task_name}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Task Description</p>
                        <p style={{ maxWidth: '780px' }} className='font-weight-normal'>{taskData?.task_description}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Check List</p>
                        <div >
                            {taskData?.check_list?.map((val, idx) => (
                                <p key={idx} className='font-weight-normal' ><Icon component={RightIcon} /> {val?.text}</p>
                            ))}
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Images</p>
                        <div className='d-flex justify-content-start mt-4 mb-2'>
                            {taskData?.images?.map((val, idx) => (
                                <img key={idx} style={{ width: '23%' }} className='mr-2' src={val?.url} alt="" />
                            ))}
                            {taskData?.before_images?.map((val, idx) => (
                                <img key={idx} style={{ width:'23%', height: '10%' }} className='mr-2' src={val?.url} alt="" />
                            ))}
                            {taskData?.after_images?.map((val, idx) => (
                                <img key={idx} style={{ width:'23%', height: '10%' }} className='mr-2' src={val?.url} alt="" />
                            ))}
                            {/* <img style={{ width: '23%' }} className='' src={Image1} alt="" />
                            <img style={{ width: '23%' }} className='' src={Image2} alt="" />
                            <img style={{ width: '23%' }} className='' src={Image3} alt="" />
                            <img style={{ width: '23%' }} className='' src={Image4} alt="" /> */}
                        </div>
                    </div>
                </Card>
                <Card>
                    <p className='mb-4 font-size-md font-weight-bold'>Task Timeline</p>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Task Date</p>
                        <p className='font-weight-normal'>{new Date(taskData?.task_end_date_time).toGMTString().slice(0, 17)}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Time</p>
                        <p className='font-weight-normal'>{moment(taskData?.task_start_date_time, "HH:mm").format("hh:mm A")} - {moment(taskData?.task_end_date_time, "HH:mm").format("hh:mm A")} </p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>Recur</p>
                        <p className='font-weight-normal'>{taskData?.task_recurrence}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='m-0 p-0 mb-2 font-weight-bold'>End Cycle Date</p>
                        <p className='font-weight-normal'>{new Date(taskData?.recur_until).toGMTString().slice(0, 17)}</p>
                    </div>
                </Card>
                <Card>
                    <p className='mb-4 font-size-md font-weight-bold'>Task Assigned To</p>
                    {/* <div className='mb-5'>
                        <p className='font-weight-normal d-flex align-items-center'>
                            <Avatar.Group maxCount={2} maxStyle={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                            }}>
                                {taskData?.users?.map((val, idx) => (
                                    <Avatar key={idx} src={val?.profile_pic} />
                                ))}
                            </Avatar.Group>
                        </p>
                    </div> */}
                    <div style={{ gap: '15px', display: 'flex', flexDirection: "column" }} >
                        {taskData?.users?.map((val, idx) => (
                            <Row key={idx} className='d-flex align-items-center' >
                                <Col span={6} className='font-weight-normal d-flex align-items-center'> <Avatar src={val?.profile_pic} /> <span style={{ color: '#5f7087' }} className='font-weight-bold ml-2'>{val?.name}</span></Col>
                                {/* <Col style={{ color: '#a0a3af' }} className='font-size-sm font-weight-semibold'>16 task on progress</Col> */}
                            </Row>
                        ))}
                        {/* <Row className='d-flex align-items-center' >
                            <Col span={6} className='font-weight-normal d-flex align-items-center'> <Avatar src='https://joesch.moe/api/v1/random?key=3' /> <span style={{color:'#5f7087'}} className='font-weight-bold ml-2'>Evergreen Hotel</span></Col>
                            <Col style={{color:'#a0a3af'}} className='font-size-sm font-weight-semibold'>16 task on progress</Col>
                        </Row>
                        <Row className='d-flex align-items-center' >
                            <Col span={6} className='font-weight-normal d-flex align-items-center'> <Avatar src='https://joesch.moe/api/v1/random?key=4' /> <span style={{color:'#5f7087'}} className='font-weight-bold ml-2'>Evergreen Hotel</span></Col>
                            <Col style={{color:'#a0a3af'}} className='font-size-sm font-weight-semibold'>16 task on progress</Col>
                        </Row>
                        <Row className='d-flex align-items-center' >
                            <Col span={6} className='font-weight-normal d-flex align-items-center'> <Avatar src='https://joesch.moe/api/v1/random?key=1' /> <span style={{color:'#5f7087'}} className='font-weight-bold ml-2'>Evergreen Hotel</span></Col>
                            <Col style={{color:'#a0a3af'}} className='font-size-sm font-weight-semibold'>16 task on progress</Col>
                        </Row> */}
                    </div>
                </Card>
                {taskData?.task_status == 'Blocker' && <Card>
                    <p className='mb-4 font-size-md font-weight-bold'>Blocker Remarks</p>
                    <div className='mb-4'>
                        <p className='font-weight-normal'>{taskData?.task_remark}</p>
                    </div>
                </Card>}
            </div>
        </div >
    )
}

export default JobSiteTaskDetails