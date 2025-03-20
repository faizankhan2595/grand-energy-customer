import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect, useState } from 'react'
import TaskManagement from "assets/svg/TaskManagement.svg";
import SearchBox from 'components/shared-components/SearchBox';
import { Avatar, Button, Modal, Menu, Table, Tabs, Dropdown, Card, Tag, Select, Drawer } from 'antd';
import filterIcon from "assets/svg/filterIcon.svg";
import exportIcon from "assets/svg/exportIcon.svg";
import plusIcon from "assets/svg/plus.svg";
import { Link, useParams } from 'react-router-dom';
import Filter from 'views/app-views/UserManagement/UserList/Filter';
import Action from './Action';
import { Successfully } from 'configs/svgIcons';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import axios from 'axios';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { FilterIcon } from "assets/svg/icon";
import Icon from "@ant-design/icons"





function JobSiteTasks() {


    const param = useParams()
    const [searchText, setSearchText] = useState('')
    const [allContractsData, setAllContractsData] = useState([]);
    // console.log(searchText)
    const [currActiveKey, setCurrActiveKey] = useState("1");
    const [current, setCurrent] = useState(['All'])
    const [statusFilter, setStatusFilter] = useState([])
    const [typeFilter, setTypeFilter] = useState([])
    const [jobSiteTasksByCustomerIdData, setjobSiteTasksByCustomerIdData] = useState([])
    const [contractData, setContractData] = useState({})
    const [JobSiteID, setJobSiteID] = useState(null)
    const tok = localStorage.getItem('token')
    const headers = [
        { label: "Contract ID", key: "id" },
        { label: "Customer Name", key: "customer_name" },
        { label: "Jobsite", key: "jobsite_name" },
        { label: "No of Tasks", key: "total_tasks" },
        { label: "Staff Assigned", key: "total_Staffs" },
        { label: "Status", key: "status" }
    ];

    const [selectedStaffFilter , setSelectedStaffFilter] = useState(false);
    const [selectedTaskTypeFilter , setSelectedTaskTypeFilter] = useState(false);
    const [selectedFilter , setSelectedFilter] = useState(false);
    const [allStaff , setAllStaff] = useState(false);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const columns = [
        {
            title: 'Task ID',
            dataIndex: 'id',
        },
        {
            title: 'Task Name',
            dataIndex: 'task_name',
        },
        {
            title: 'Start Date',
            dataIndex: 'task_start_date_time',
            render: (text) => {
                return <div>{new Date(text).toDateString()}</div>
            }
        },
        {
            title: 'End Date',
            dataIndex: 'recur_until',
            render: (text) => {
                return <div>{new Date(text).toDateString()}</div>
            }
        },
        {
            title: 'Time',
            dataIndex: '',
            render: (record) => {
                return (
                    <div>{moment(record?.task_start_date_time, "YYYY-MM-DD HH:mm:ss").format("hh:mm A")} - {moment(record?.task_end_date_time,"YYYY-MM-DD HH:mm:ss" ).format("hh:mm A")}</div>
                )
            }
        },
        {
            title: 'Task Type',
            dataIndex: 'task_recurrence',
        },
        {
            title: 'Staff Assign',
            dataIndex: 'staffAssign',
            render: (_, record) => {
                return <Avatar.Group
                    maxCount={2}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                        cursor: 'pointer',
                    }}
                >
                    {record?.staffs?.map((data, i) => {
                        return <Avatar src={data?.profile_pic} />
                    })}
                </Avatar.Group>
            }
        },
        {
            title: 'Status',
            dataIndex: 'task_status',
            render: (_, record) => {
                if (record.task_status === 'COMPLETED') return <span style={{ color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Completed</span>
                else if (record.task_status === 'STARTED') return <span style={{ color: '#0077b6', backgroundColor: '#DEEFFF', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Started</span>
                else if (record.task_status === 'PENDING') return <span style={{ color: '#F0A500', backgroundColor: '#FEF3DD', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Pending</span>
                else return <span style={{ color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>{record.task_status}</span>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <Action
                        record={record}
                        // dataSet={setjobSiteTasksByCustomerIdData}
                        // Id='id'
                        onDelete={deleteJobsiteTasks}
                        index={currActiveKey}
                        contractData={contractData}
                        Id={record.id}
                        CustomerName={contractData.customer_name}

                    />
                )
            }
        },
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [cpage, setCpage] = useState(0)
    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
    const [totalJobSite, setTotalJobSite] = useState([])

    const getPdf = async () => {
        try {
            const response = await axios.post(
                "/api/tc/get-tasks",
                {
                    page_index: 1,
                    page_size: 100000,
                    job_site_id: JobSiteID,
                    search: searchText ? searchText : null,
                    export_type: "pdf",
                },
            );
            console.log(response.data.url); // add this line to log the PDF URL
            if (response.data.status) {
                return response.data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function downloadPDF() {
        try {
            const pdfUrl = await getPdf();
            if (pdfUrl) {
                window.open(pdfUrl);
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    }


    const selectChangeHandler = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: selectChangeHandler,
    };

    const tabChangeHandler = (key) => {
        setCurrActiveKey(key);
        setStatusFilter([])
        setTypeFilter([])
        setCurrent(["All"])
    };

    // const getJobSiteTasks = () => {
    //     axios({
    //         method: 'post',
    //         url: "/api/tc/get-tasks",
    //         data: {
    //             show_my_tasks: true,
    //             show_staff_tasks: true,
    //             page_size: 100000
    //         },
    //         headers: {
    //             Authorization: `Bearer ${tok}`
    //         },
    //     }).then((response) => {
    //         console.log(response.data.data.data)
    //     });
    // }

    const deleteJobsiteTasks = (record, Id, index) => {
        axios({
            method: 'post',
            url: "/api/tc/delete-task",
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: { id: record[Id] }
        }).then((response) => {
            console.log(response)
            if (response.data.success) {
                setjobSiteTasksByCustomerIdData((pre) => {
                    return pre.filter((member) => member[Id] !== record[Id])
                })

                setShowDeletedSuccess(true)
                setTimeout(() => {
                    setShowDeletedSuccess(false)
                }, 3000);
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    const getContract = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-contract",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: { 
                id: param.id,
                search_task: searchText,
                task_staff_assigned: [selectedStaffFilter],
                task_type: [selectedTaskTypeFilter],
             }
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setContractData(response.data.data)
                setjobSiteTasksByCustomerIdData(response.data.data.tasks)
                // setTotalJobSite(response.data.data.data)
                // handleJobsiteChangeData(response.data.data.data[0].id)
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    // const handleJobsiteChangeDataPagination = (id, currPage) => {
    //     setJobSiteID(id)
    //     console.log("jobsite_Id", id)
    //     axios({
    //         method: 'post',
    //         url: "/api/tc/get-tasks",
    //         headers: {
    //             Authorization: `Bearer ${tok}`
    //         },
    //         data: {
    //             customer_id: +param?.id,
    //             job_site_id: id,
    //             page_index: currPage,
    //             page_size: 15,
    //             search: searchText ? searchText : null,
    //             statuses: statusFilter,
    //             task_recurrences: typeFilter,
    //             show_my_tasks: true,
    //             show_staff_tasks: true,
    //             // task_date: moment(new Date())
    //         }
    //     }).then((response) => {
    //         console.log(`response for job site ${id}`, response.data.data)
    //         console.log(`current data for showing site ${id}`,)
    //         if (currPage === 1) {
    //             setjobSiteTasksByCustomerIdData(response.data.data);
    //         } else {
    //             // setjobSiteTasksByCustomerIdData([...jobSiteTasksByCustomerIdData,...response.data.data.data])
    //             setjobSiteTasksByCustomerIdData(response.data.data);
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    // }

    const handlechange = (pagination) => {
        if (cpage <= pagination.current) {
            setPage(pagination.current)
            setCpage(pagination.current)
        }
    }

    const handleFilterClick = (e) => {
        console.log(e)
        setCurrent([e.key])
        if (e.key !== 'All') {
            if (e.key !== 'AllStatus' && (e.key === 'Completed' ||
                e.key === 'Started' ||
                e.key === 'Pending' ||
                e.key === 'Overdue' ||
                e.key === 'BLOCKER')) {
                setStatusFilter([e.key])
                console.log([e.key])
            } else {
                setStatusFilter([])
            }

            if (e.key !== 'AllType' && (e.key === 'Daily' ||
                e.key === 'Weekly' ||
                e.key === 'Monthly' ||
                e.key === 'Yearly' ||
                e.key === 'One Time')) {
                setTypeFilter([e.key])
                console.log([e.key])
            } else {
                setTypeFilter([])
            }
        } else {
            setStatusFilter([])
            setTypeFilter([])
        }
    }

    const menuFilter = (
        <Menu onClick={handleFilterClick} selectedKeys={current}>
            <Menu.Item key={'All'}>All</Menu.Item>
            <Menu.SubMenu title="Status">
                <Menu.Item key={'AllStatus'}>All</Menu.Item>
                <Menu.Item key={'Completed'}>Completed</Menu.Item>
                <Menu.Item key={'Started'}>Started</Menu.Item>
                <Menu.Item key={'Pending'}>Pending</Menu.Item>
                <Menu.Item key={'Overdue'}>Overdue</Menu.Item>
                <Menu.Item key={'BLOCKER'}>Blocker</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Task Type">
                <Menu.Item key={'AllType'}>All</Menu.Item>
                <Menu.Item key={'Daily'}>Daily</Menu.Item>
                <Menu.Item key={'Weekly'}>Weekly</Menu.Item>
                <Menu.Item key={'Monthly'}>Monthly</Menu.Item>
                <Menu.Item key={'Yearly'}>Yearly</Menu.Item>
                <Menu.Item key={'One Time'}>One Time</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );

    const drawerHandler = () => {
        setDrawerIsOpen((prevState) => {
          console.log("Drawer " + (!prevState ? 'Open':'Closed'));
    
          return !prevState
        });
        // setDrawerIsOpen(true);
      };
    
      const handleDrawerOk = () => {
        setSelectedFilter((previousState) => !previousState)
        setDrawerIsOpen(false);
      };
    
      const onDrawerClose = () => {
        console.log("Closed")
        setDrawerIsOpen(false);
      };
    
      const handleDrawerReset = () => {
        setSelectedFilter((previousState) => !previousState)
        setSelectedStaffFilter(false)
        setSelectedTaskTypeFilter(false)
    
        setDrawerIsOpen(false);
      };

      const getAllStaff = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-users",
            // data: values,
            headers: {
                Authorization: `Bearer ${tok}`
            },
        }).then(function (response) {
            console.log(response.data);
            if (response.data.success) {
                setAllStaff(response.data.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
      };


    // useEffect(() => {
    //     handleJobsiteChangeDataPagination(JobSiteID)
    // }, [page])
    // useEffect(() => {
    //     handleJobsiteChangeDataPagination(JobSiteID, 1)
    // }, [searchText])
    // useEffect(() => {
    //     handleJobsiteChangeDataPagination(JobSiteID)
    // }, [current])

    useEffect(() => {
        getContract();
        getAllStaff();
    }, [])

    useEffect(() => {
        getContract();
    }, [searchText])
    
    useEffect(() => {
        getContract();
    }, [selectedFilter])

    return (
        <>
            <div className='d-flex justify-content-between'>
                <PageHeading
                    title="Tasks List" />
                <div className="d-flex justify-content-between mb-3">
                    <div className=" d-flex align-items-center justify-content-between">
                        <SearchBox setSearchText={setSearchText} />

                        <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
                            <Icon className="mr-2" component={FilterIcon} />
                            Filters
                        </Button>

                        <CSVLink data={allContractsData}
                            headers={headers}
                            filename={"All-Quotations.csv"}
                        >
                            <Button className="d-flex align-items-center ml-2" >
                                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
                            </Button>
                        </CSVLink>

                        {/* <Link to={`/app/task-management/add-task/${contractData.tc_customer_id}/${contractData.tc_customer_job_site_id}/${contractData.id}`}>
                            <Button
                                className="d-flex align-items-center ml-2"
                                type="primary"
                            >
                                <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
                                Add New Tasks
                            </Button>
                        </Link> */}


                    </div>
                </div>
            </div>

            <Card>
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <div style={{
                        width: "50px", height: "50px", borderRadius: "100%",
                    }}>
                        <img src={contractData.customer_image} style={{
                            borderRadius: "100%",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover"
                        }} />
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column"
                    }}>
                        <div>
                            <div style={{
                                color: "#5772FF",
                                fontSize: "14px"
                            }}>{
                                    contractData.customer_name
                                } 
                                {contractData.status && 
                                (contractData.status.toUpperCase()==='ACTIVE' ? 
                                    <span className='ml-2' style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span> :
                                    (contractData.status.toUpperCase()==='EXPIRED' ? <span className='ml-2' style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>{contractData.status}</span> : 
                                    <span className='ml-2' style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>{'Inactive'}</span> )
                                )}
                            </div>
                        </div>
                        <div>
                            <div ><span style={{
                                fontWeight: "bold"
                            }}>Jobsite:  </span>{
                                    contractData.job_site_name
                                } </div>
                        </div>
                        <div>
                            {contractData.type} | {moment(contractData.created_at).format("DD-MM-YYYY")}
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "30px"
                        }}>
                            <div>Date of Commencement <span style={{
                                fontWeight: "bold"
                            }}>{moment(contractData.start_date).format("DD-MM-YYYY")}</span></div>
                            <div>Date of Expire <span style={{
                                fontWeight: "bold"
                            }}>
                                {moment(contractData.end_date).format("DD-MM-YYYY")}
                            </span></div>
                        </div>

                    </div>
                </div>
            </Card>



            <Table
                scroll={{
                    x: 1350,
                }}
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={jobSiteTasksByCustomerIdData}
                onChange={handlechange}
            //   loading={isLoading}
            />

            <Drawer title="Filter"
                placement="right"
                onClose={onDrawerClose} 
                open={drawerIsOpen}
                closable={true}
                // getContainer={false}
                visible={drawerIsOpen}
                footer={[
                    <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold mr-2' onClick={handleDrawerOk}>Apply</Button>,
                    <Button key={'cancel'} style={{ color: '#000B23' }} onClick={() => {handleDrawerReset()}} className='font-weight-bold'>Reset</Button>,
            ]}
            >
            <div className="mb-2">
                <h4>Staff Assign</h4>
                <Select
                    showSearch
                    placeholder="Jobsite"
                    value={selectedStaffFilter}
                    onChange={(e) => {setSelectedStaffFilter(e)}}
                    className="w-100"
                >
                    <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                    {allStaff && allStaff.map((val, id) => (
                        <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                    ))}
                </Select>
            </div>
            {/* <div>
                <h4>Task Type</h4>
                <Select
                    showSearch
                    placeholder="Task Type"
                    value={selectedTaskTypeFilter}
                    onChange={(e) => {setSelectedTaskTypeFilter(e)}}
                    className="w-100"
                >
                    <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                    <Select.Option title={'One Time'} key={'One Time'} value={'One Time'}>{'One Time'}</Select.Option>
                    <Select.Option title={'Recurring'} key={'Recurring'} value={'Recurring'}>{'Recurring'}</Select.Option>
                </Select>
            </div> */}
            </Drawer>
            <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={() => { setShowDeletedSuccess(false) }}>
                <SuccessSubmit icon={Successfully} title="Job site task deleted successfully!" desc='deleted successfully' />
            </Modal>
        </>
    )
}

export default JobSiteTasks