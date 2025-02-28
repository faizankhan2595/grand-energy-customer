import { Button, Card, Checkbox, Col, Divider, List, Row, Table, Typography } from 'antd';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import classes from "./TaskReport.module.css";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import logo from "assets/grand-energy-logo-small.png";
// import Icon from 'components/util-components/Icon';
import Icon from "@ant-design/icons"
import generatePDF, { Margin } from 'react-to-pdf';
import { PdfIcon } from 'views/app-views/ItemsAndServices/svgIcons';
import Todo from "../../../../assets/check-list 1.png"
import moment from 'moment';
const { Title, Text } = Typography;

const options = {
    page: {
        margin: Margin.SMALL,
    }
};
function TaskReport() {
    const history = useHistory()
    const targetRef = useRef(null);
    const [taskData, setTaskData] = useState({})
    const [contractData, setContractData] = useState({})
    const [tableData, setTableData] = useState([])
    const param = useParams()
    const tok = localStorage.getItem('token')
    const getContract = (res) => {
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
                const userId = res.user_id
                console.log(res.status)
                // console.log(response.data.users.filter((item) => item.id === userId)[0].name)
                setTableData(
                    [
                        {
                            key: '1',
                            report_by: response.data.data.users.filter((item) => item.id === userId)[0].name,
                            customer: response.data.data?.customer?.name,
                            job_site: response.data.data?.job_site?.name,
                            start_date: response.data.data?.task_start_date_time ? moment(response.data.data?.task_start_date_time).format("DD-MM-YYYY") : "-",
                            end_date: response.data.data?.task_end_date_time ? moment(response.data.data?.task_end_date_time).format("DD-MM-YYYY") : "-",
                            time: moment(response.data.data?.task_start_date_time).format("hh:mm A") + " - " + moment(response.data.data?.task_end_date_time).format("hh:mm A"),
                            task_status: res.status
                        }
                    ]
                )
                setTaskData({
                    id: res.id,
                    submitted_by: response.data.data.users.filter((item) => item.id === userId)[0].name,
                    created_at: moment(res.created_at).format("DD-MM-YYYY"),
                    task_name: response.data.data.task_name,
                    remarks: res.report,
                    before_images: res.before_images,
                    after_images: res.after_images,
                    check_list: res.check_list
                })
                // setContractData(response.data.data)

            }
        }).catch((err) => {
            console.log(err)
        });
    }
    const getData = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task-report-by-task-and-user-id",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                task_id: param?.taskId,
                user_id: param?.userId
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {

                setTaskData(response.data.data)
                getContract(response.data.data)
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        getData()
        // getContract()
    }, [])


    const columns = [
        {
            title: "Report By",
            dataIndex: "report_by",
        },
        {
            title: "Customer",
            dataIndex: "customer",
        },
        {
            title: "Jobsite",
            dataIndex: "job_site",
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
        },
        {
            title: "End Date",
            dataIndex: "end_date",
        },

        {
            title: "Time",
            dataIndex: "time",
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                if (record.task_status === 'COMPLETED') return <span style={{ color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Completed</span>
                else if (record.task_status === 'STARTED') return <span style={{ color: '#0077b6', backgroundColor: '#DEEFFF', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Started</span>
                else if (record.task_status === 'PENDING') return <span style={{ color: '#F0A500', backgroundColor: '#FEF3DD', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Pending</span>
                else return <span style={{ color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>{record.task_status}</span>
            }
        },
    ]
    return (
        <React.Fragment>

            {/* {showModal && <Modal onClose={showModalHandler}><SendQuotationModal/></Modal>} */}
            <PageHeading
                //   svg={ItemsAndServicesPageIcon}
                title="Task Completion Report"
            />

            <Card className="quotation-card">
                <div ref={targetRef}>
                    <Card className={classes.card}>
                        <div className="mt-2 mb-2 w-100">
                            <img src={logo} alt="logo" style={{ width: '20%' }} />
                            <div className="d-flex justify-content-between mt-3">
                                <div>
                                    <Title strong level={3}>
                                        GRAND ENERGY TECHNOLOGIES PTE LTD
                                    </Title>
                                    <Text><b>Email:</b> admin@getpl.com.sg</Text>
                                </div>
                                <div></div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Text><b>Phone:</b> 6025 3659</Text>
                                    <br />
                                    <Text><b>UEN/GST No:</b> 201802457D</Text>
                                </div>
                                <div className="text-right">
                                    <Text>Bik 130 Jurong Gateway Road </Text>
                                    <br />
                                    <Text>#03-203 Singapore 600130 </Text>
                                </div>
                            </div>
                        </div>
                    </Card>




                    <div style={{
                        display: "flex",
                        gap: "20px",
                    }}>
                        <div>
                            <img src={Todo} />
                        </div>
                        <div>
                            <div>Task Completion Report - #{taskData.id}</div>
                            <div>Report Date: {taskData.created_at}</div>
                        </div>
                    </div>

                    <Table dataSource={tableData} columns={columns} pagination={false} />

                    <div style={{
                        marginTop: "50px",
                    }}>
                        <Title level={4}>Task Details</Title>
                        <div>
                            {taskData.task_name}
                        </div>
                    </div>
                    <div style={{
                        marginTop: "50px",
                    }}>
                        <Title level={4}>Task Description</Title>
                        <div>
                            {taskData.remarks}
                        </div>
                    </div>

                    <div style={{
                        marginTop: "50px",
                    }}>
                        <Title level={4}>Checklist</Title>
                        <div>
                            {
                                taskData.check_list && taskData.check_list.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Checkbox checked={item.isChecked}>
                                                <div style={{
                                                    textDecoration: item.isChecked ? "line-through" : "none"
                                                }}>
                                                    {item.text}
                                                </div>
                                            </Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div style={{
                        marginTop: "50px",
                    }}>
                        <Title level={4}>Task Before Pictures</Title>
                        <div style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",

                        }}>
                            {
                                taskData.before_images && taskData.before_images.map((item, index) => {
                                    return (
                                        <div style={{
                                            width: "23%",
                                            height: "400px",

                                        }} key={index}>
                                            <img src={item.url} alt="task" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div style={{
                        marginTop: "50px",
                    }}>
                        <Title level={4}>Task After Pictures</Title>
                        <div style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",

                        }}>
                            {
                                taskData.after_images && taskData.after_images.map((item, index) => {
                                    return (
                                        <div style={{
                                            width: "23%",
                                            height: "400px",

                                        }} key={index}>
                                            <img src={item.url} alt="task" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <Divider />


                    <div>Submitted By</div>
                    <div style={{
                        fontWeight: "bold",
                    }}>
                        {taskData.submitted_by}
                    </div>
                    <div>
                        {moment().format("DD-MM-YYYY HH:mm A")}
                    </div>

                </div>
            </Card>

            <div className={`d-flex justify-content-between ${classes.action}`}>
                <div className="d-flex">
                    <Button className="mr-1" onClick={() => { history.goBack() }}>
                        Back
                    </Button>

                </div>
                <Button onClick={() => {
                    console.log("Downloading Quotation...");
                    generatePDF(targetRef, options, { filename: 'taskReport.pdf' });
                }}>
                    <Icon component={PdfIcon} />
                    Download PDF
                </Button>
            </div>



        </React.Fragment>
    )
}

export default TaskReport