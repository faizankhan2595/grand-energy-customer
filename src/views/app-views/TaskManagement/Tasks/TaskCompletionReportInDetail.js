import React from 'react'
import TaskManagement from "assets/svg/TaskManagement.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import { Button, Card, DatePicker, Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons'
import { PageIcon } from 'assets/svg/ActionsSvg';
import { RightIcon } from 'assets/svg/icon';
import { PdfIcon } from 'views/app-views/ItemsAndServices/svgIcons';
import Image1 from 'assets/image1.png'
import Image2 from 'assets/img2.png'
import Image3 from 'assets/image3.png'
import Image4 from 'assets/img4.png'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';



function TaskCompletionReportInDetail() {

    const param = useParams()
    const tok = localStorage.getItem('token') 
    const history = useHistory()
    const [taskReport, setTaskReport] = useState({})
    const [taskData, setTaskData] = useState([])
    const [downloadingReport, setDownloadingReport] = useState(false)
    const [form] = Form.useForm()

    const getTask = (id) => {
        axios({
            method: 'post',
            url: "/api/tc/get-task",
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: {
                id: id
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

    const getReport = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task-report",
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: {
                id:param.id
            },
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setTaskReport(response.data.data)
                getTask(response.data.data?.tc_job_site_task_id)
                // form.setFieldsValue({
                //     dateOfCompletion: response.data.data?.updated_at
                // })
                console.log(moment(taskReport?.updated_at).format('DD-MM-YYYY'))
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const downloadReport = () => {
    
    let domain = '';
    if(window.location.hostname.includes("local")) {
      domain = `${axios.defaults.baseURL}`
    } else {
      domain = window.location.protocol + "//" + window.location.hostname;
    }

    setDownloadingReport(true)
    
    let dataDownload = {
      "url": domain + "/task-completion-report-print/" + param.id,
      "no-download": true,
      "folder_name": 'task-reports',
    }
    axios({
        method: 'post',
        url: "/api/tc/download-task-report",
        headers: {
            Authorization: `Bearer ${tok}`
        },
        data: dataDownload,
    }).then((response) => {
        console.log(response.data)
        setDownloadingReport(false)
        if (response.data.success) {
            window.open(response.data.url, '_blank');
        }
    }).catch((err) => {
        console.log(err)
        setDownloadingReport(false)
    })

    }

    useEffect(() => {
        getReport()
    }, [])

    console.log(taskReport?.before_images)

    return (
        <div>
            <PageHeading
                icon={TaskManagement}
                title="Task Management / Job Sites Tasks / Job Completion Reports "
            />
            <div className='d-flex justify-content-between'>
                <div>
                    <p className='font-weight-bolder font-size-md' ><Icon component={PageIcon} />  Task Completion Report</p>
                </div>
                <Form style={{ gap: '10px' }} className='d-flex' form={form}>
                    <Form.Item>
                        <Link>
                            <Button onClick={history.goBack} className='px-5' size='middle'>Back</Button>
                        </Link>
                    </Form.Item>
                    <Form.Item >
                        <DatePicker format="dddd, DD MMM YYYY" 
                        value={moment(taskReport?.updated_at)} 
                        inputReadOnly
                        allowClear={false}/>
                        {/* {taskData.updated_at && <p className='py-2'>Date: {new Date(taskData?.updated_at).toLocaleDateString('en-GB')}</p>} */}
                    </Form.Item>
                </Form>
            </div>
            <Card>
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
                        {taskReport?.check_list?.map((val,idx)=>(
                            <p className='font-weight-normal' ><Icon component={RightIcon} />{val?.text}</p>
                        ))}
                        
                        {/* <p className='font-weight-normal' ><Icon component={RightIcon} /> Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='font-weight-normal' ><Icon component={RightIcon} /> Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='font-weight-normal' ><Icon component={RightIcon} /> Lorem ipsum dolor sit amet consectetur.</p> */}
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Service Before Pictures/Videos</p>
                    <div className='d-flex justify-content-between mt-4 mb-2'>
                        {
                            taskReport?.before_images?.map((val,idx)=>(
                                <img style={{ width: '23%' }} className='' src={val.url} alt="" />
                            ))
                        }
                        {/* <img style={{ width: '23%' }} className='' src={Image1} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image2} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image3} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image4} alt="" /> */}
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Service After Pictures/Videos</p>
                    <div className='d-flex justify-content-between mt-4 mb-2'>
                        {
                            taskReport?.after_images?.map((val, idx) => (
                                <img style={{ width: '23%' }} className='' src={val.url} alt="" />
                            ))
                        }
                        {/* <img style={{ width: '23%' }} className='' src={Image1} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image2} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image3} alt="" />
                        <img style={{ width: '23%' }} className='' src={Image4} alt="" /> */}
                    </div>
                </div>
                <div className='mb-4'>
                    <p className='m-0 p-0 mb-2 font-weight-bold'>Remarks by Staff</p>
                    <p style={{ maxWidth: '780px' }} className='font-weight-normal'>{taskReport?.report}</p>
                </div>
            </Card>
            <div className={`d-flex align-items-end justify-content-end mt-2 Button`}>
                <Button onClick={history.goBack} className='px-5' >Back</Button>
                <Button icon={<PdfIcon />} className='ml-2 text-center d-flex align-items-center' type="primary" htmlType="submit" onClick={downloadReport} loading={downloadingReport}> Download</Button>
            </div>
        </div>
    )
}

export default TaskCompletionReportInDetail