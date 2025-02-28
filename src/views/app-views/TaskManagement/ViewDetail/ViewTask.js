import { Button, Card, Checkbox, Table, Tabs, Tag } from 'antd'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect, useState } from 'react'
import { VisibilityIcon, DeleteIcon, EditIcon, PageIcon, Building, LocationIcon, DocIcon, MessageIcon } from "assets/svg/ActionsSvg";
// import Icon from 'components/util-components/Icon';
import Icon from "@ant-design/icons"
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

function ViewTask() {

    const param = useParams()

    const [contractData, setContractData] = useState({})
    const [taskReportData, setTaskReportData] = useState([])


    const tok = localStorage.getItem('token')


    const getContract = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                id: param?.taskId
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setContractData(response.data.data)
                // setTotalJobSite(response.data.data.data)
                // handleJobsiteChangeData(response.data.data.data[0].id)
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    const getTaskReport = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task-reports",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                task_id: param?.taskId,
                page_index: 1,
                page_size: 10000000
            }
        }).then((response) => {

            if (response.data.success) {
                setTaskReportData(response.data.data.data)
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        getContract()
        getTaskReport()
    }, [])

    const column = [
        {
            title: 'Report ID',
            dataIndex: 'id',
        },
        {
            title: 'Staff Name',
            dataIndex: 'submitted_by_name',
        },
        {
            title: "Submission Date",
            dataIndex: "created_at",
            render: (date) => {
                return moment(date).format("DD-MM-YYYY")
            }
        },
        {
            title: "Report",
            dataIndex: "report",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div>
                        <Link to={`/app/task-management/task/view-task-report/${param.taskId}/${record.user_id}`} className="d-flex align-items-center">
                            <Icon className="mr-2" component={VisibilityIcon} />

                        </Link>

                    </div>
                )
            }
        }
    ]
    return (
        <>
            <div className='d-flex justify-content-between'>
                <PageHeading
                    // icon={TaskManagement}
                    title=" Tasks Details"
                />
                <div className="d-flex justify-content-between mb-3">
                    <div className=" d-flex align-items-center justify-content-between">

                        {/* <Button className="d-flex align-items-center ml-2" >
                            View Task reports
                        </Button> */}

                    </div>
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px"
            }}>
                {/* <TaskTable searchText={searchText} /> */}
                <Card style={{
                    width: "30%",
                    minHeight: "700px",
                    overflowY: "auto"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div>TASK OVERVIEW
                            {/* <span className="ml-2" >
                                <Icon component={EditIcon} />
                            </span> */}
                        </div>
                        {

                            // if (record.task_status === 'COMPLETED') return <span style={{ color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Completed</span>
                            // else if (record.task_status === 'STARTED') return <span style={{ color: '#0077b6', backgroundColor: '#DEEFFF', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Started</span>
                            // else if (record.task_status === 'PENDING') return <span style={{ color: '#F0A500', backgroundColor: '#FEF3DD', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Pending</span>
                            // else return <span style={{ color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>{record.task_status}</span>

                            contractData.task_status === 'COMPLETED' ? <Tag color="success">Completed</Tag> :
                                contractData.task_status === 'STARTED' ? <Tag color="processing">Started</Tag> :
                                    contractData.task_status === 'PENDING' ? <Tag color="warning">Pending</Tag> :
                                        <Tag color="error">{contractData.task_status}</Tag>

                        }
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        // justifyContent: "space-between",
                        marginTop: "20px"

                    }}>
                        <div style={{
                            height: "100px",
                            width: "32%",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            background: "#297BF6"
                        }}>
                            <div>{
                                taskReportData.length
                            }</div>
                            <div>Task Reports</div>

                        </div>
                        <div style={{
                            height: "100px",
                            width: "32%",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            background: "#EC9900"
                        }}> <div>{
                                    moment(contractData.task_end_date_time).diff(moment(), 'days')
                            }</div>
                            <div>Days Remain</div>
                        </div>

                    </div>
                    <div style={{
                        marginTop: "10px",
                        width: "80%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center"
                        }}>
                            <div><Icon component={Building} /></div>
                            <div>{contractData.customer?.name} </div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center"
                        }}>
                            <div><Icon component={LocationIcon} /></div>
                            <div>{contractData.job_site?.address} </div>
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center"
                        }}>
                            <div><Icon component={DocIcon} /></div>
                            <div>{contractData.task_name}</div>
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center"
                        }}>
                            <div><Icon component={MessageIcon} /></div>
                            <div>{contractData.task_description}</div>
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "10px",
                            // alignItems: "center",
                        }}>
                            <div><Icon component={DocIcon} /></div>
                            <div>
                                <div>Staff Assigned</div>
                                {
                                    contractData.users?.map((staff, index) => {
                                        return (
                                            <div style={{
                                                fontWeight: "bold",
                                                marginTop: "5px"
                                            }} key={index}>{staff.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Card>
                <Card style={{
                    width: "70%"
                }}>
                    <Tabs>
                        <Tabs.TabPane tab="Task Details" key="1">
                            <Card title="Checklist" style={{
                                minHeight: "300px",
                                overflowY: "auto"
                            }}>
                                <div style={{
                                    display: "flex",
                                    gap: "10px",
                                    flexDirection: "column"

                                }}>
                                    {
                                        contractData.check_list?.map((checklist, index) => {
                                            return (
                                                <div style={{
                                                    background: "#FBFBFB",
                                                    padding: "10px"
                                                }} key={index}>
                                                    <Checkbox disabled style={{
                                                        marginRight: "10px"
                                                    }}></Checkbox>{checklist.text}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Card>

                            <Card title="Task TIMELINE" style={{
                                minHeight: "300px",
                                overflowY: "auto"
                            }}>
                                <div style={{
                                    display: "flex",
                                    gap: "100px",
                                    flexDirection: "row"

                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }}>

                                        <div>Task Type</div>
                                        <div>Start Date</div>
                                        <div>End Date</div>
                                        <div>Task Time</div>
                                        <div>Recur Forever</div>
                                        <div>Skip Weekends</div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }}>
                                        <div>Need to check</div>
                                        <div>{contractData.task_start_date_time && moment(contractData.task_start_date_time).format("DD-MM-YYYY")}</div>
                                        <div>{contractData.task_end_date_time && moment(contractData.task_end_date_time).format("DD-MM-YYYY")}</div>
                                        <div>{moment(contractData.task_start_date_time).format("HH:mm a")} -
                                            {moment(contractData.task_end_date_time).format("HH:mm a")}</div>
                                        <div>
                                            {contractData.recur_forever ? "Yes" : "No"}
                                        </div>
                                        <div>
                                            {contractData.skip_weekends ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Task Reports" key="2">
                            <Table
                                columns={column}
                                dataSource={taskReportData}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}

export default ViewTask