import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect, useState } from 'react'
import TaskManagement from "assets/svg/TaskManagement.svg";
import { Avatar, Button } from 'antd';
import SearchBox from 'components/shared-components/SearchBox';
import Filter from 'views/app-views/UserManagement/UserList/Filter';
import { Link, useHistory, useParams } from 'react-router-dom';
import filterIcon from "assets/svg/filterIcon.svg";
import exportIcon from "assets/svg/exportIcon.svg";
import JobCompletionReportTable from './JobCompletionReportTable';
import axios from 'axios';



function TaskCompletionReport() {


    const param = useParams()
    const history = useHistory()
    const tok = localStorage.getItem('token') 
    const [searchText, setSearchText] = useState('')
    const [taskData, setTaskData] = useState([])

    const getTask = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task",
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: {
                id: param.id
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
        <div>
            <PageHeading
                icon={TaskManagement}
                title="Task Management / Job Sites Tasks / Job Completion Reports "
            />
            <div className='d-flex justify-content-between'>
                <div>
                    <p className='font-weight-bolder text-size-md text-primary'>Tasks</p>
                    <p className='text-size-md'>{taskData?.task_name}</p>
                </div>
                <div>
                    <p className='font-weight-bolder text-size-md text-primary'>Customer</p>
                    <p className='text-size-md'>{taskData?.customer?.name}</p>
                </div>
                <div>
                    <p className='font-weight-bolder text-size-md text-primary'>Job Site</p>
                    <p className='text-size-md'>{`${taskData?.job_site?.street_number !==null ? taskData?.job_site?.street_number:''} ${taskData?.job_site?.block_number!==null ? taskData?.job_site?.block_number:''} ${taskData?.job_site?.postal_code!==null ? taskData?.job_site?.postal_code:''} ${taskData?.job_site?.country!==null ? taskData?.job_site?.country:''}`}</p>
                </div>
                <div>
                    <p className='font-weight-bolder text-size-md text-primary'>Task Type</p>
                    <p className='text-size-md'>{`Recurring ${taskData?.task_recurrence}-Repeat`}</p>
                </div>
                <div>
                    <p className='font-weight-bolder text-size-md text-primary'>Staff Assigned</p>
                    <Avatar.Group
                        maxCount={2}
                        maxPopoverTrigger="click"
                        size="small"
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: 'pointer',
                        }}
                    >
                        {taskData?.users?.map((val,idx)=>(
                            <Avatar size='small' src={val?.profile_pic} />
                        ))}
                    </Avatar.Group>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3 mb-3">
                <div className=" d-flex align-items-center justify-content-between">
                    <SearchBox setSearchText={setSearchText} />
                    {/* <Filter>
                        <Button className="d-flex align-items-center ml-2">
                            <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
                            Filters
                        </Button>
                    </Filter> */}

                    <Button className="d-flex align-items-center ml-2" >
                        <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
                    </Button>
                </div>
                <div>
                    
                        <Button onClick={history.goBack}
                            className="d-flex align-items-center"
                            size="middle"
                        >
                            Back
                        </Button>
                    
                </div>
            </div>
            <div>
                <JobCompletionReportTable searchText={searchText} taskId = {param.id} />
            </div>
        </div>
    )
}

export default TaskCompletionReport