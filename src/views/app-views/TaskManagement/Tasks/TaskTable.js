import { Avatar, Modal, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import avatar from "assets/Avatar2.png";
import Action from './Action';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import { Successfully } from 'configs/svgIcons';
import axios from 'axios';
import moment from 'moment';
import TaskTableAction from './TaskTableAction';


function TaskTable({searchText, selectedFilter, selectedCustomerFilter, selectedJobsiteFilter, selectedStatusFilter}) {
    // const [currActiveKey, setCurrActiveKey] = useState("1");
    const [contractsData, setContractsData] = useState([])
    const tok = localStorage.getItem('token')
    const customer_id = localStorage.getItem('customer_id')
    // console.log(process.env.REACT_APP_Authorization)
    
    const columns = [
        {
            title: 'Contract ID',
            dataIndex: 'id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Jobsite',
            dataIndex: 'jobsite_name',

        },
        {
            title: 'No of Tasks',
            dataIndex: 'total_tasks',
        },
        {
            title: 'Staff Assign',
            dataIndex: 'total_staffs',
            width: 120,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_,record) => {
                if(record.status.toUpperCase()==='ACTIVE') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
                else if(record.status.toUpperCase()==='INACTIVE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
                else return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Expired</span>
            }
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <TaskTableAction
                        record={record}
                    />
                )
            }
        },
    ]

    const [page, setPage] = useState(1);
    const [cpage, setCpage] = useState(0)
    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // const selectChangeHandler = (newSelectedRowKeys) => {
    //     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: selectChangeHandler,
    // };

    const handlechange = (pagination) => {
        if (cpage <= pagination.current) {
            setPage(pagination.current)
            setCpage(pagination.current)
        }
    }

    const getTaskTable = (currPage) => {
        axios({
            method: 'post',
            url: "/api/tc/get-contracts",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                page_index: currPage,
                page_size: 15,
                search : searchText ? searchText : null,
                customer_id: customer_id,
                job_site_id: selectedJobsiteFilter || null,
                status: selectedStatusFilter || null,
            },
        }).then((response) => {
            let res = response.data.data.data;
            let fdata = res.map((elem, index) => {
                return {
                  key: elem.id,
                  id: elem.id,
                  customer_name: elem.customer_name || elem.tc_customer_id,
                  jobsite_name: elem.job_site_name ,
                  contract_type: elem.type,
                  commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
                  expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
                  contract_type: elem.type,
                  total_tasks: elem.task_count  || 0,
                  total_staffs: elem.staff_count  || 0,
                  status: elem.status,
                };
            });
            if (response.data.success) {
                if(currPage ===1 ){
                    setContractsData(fdata);
                }else{
                    setContractsData([...contractsData, ...fdata]);
                }
            } else {
                console.log(response)
            }
        });
    }

    useEffect(() => {
        getTaskTable(page);
    }, [page])
    useEffect(() => {
        getTaskTable(1);
    }, [searchText])
    useEffect(() => {
        axios({
            method: 'post',
            url: "/api/tc/get-contracts",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                page_index: page,
                page_size: 15,
                search : searchText ? searchText : null,
                customer_id: customer_id,
                job_site_id: selectedJobsiteFilter || null,
                status: selectedStatusFilter || null,
            },
        }).then((response) => {
            let res = response.data.data.data;
            let fdata = res.map((elem, index) => {
                return {
                  key: elem.id,
                  id: elem.id,
                  customer_name: elem.customer_name || elem.tc_customer_id,
                  jobsite_name: elem.job_site_name ,
                  contract_type: elem.type,
                  commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
                  expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
                  contract_type: elem.type,
                  total_tasks: elem.task_count  || 0,
                  total_staffs: elem.staff_count  || 0,
                  status: elem.status,
                };
            });
            if (response.data.success) {
                if(page ===1 ){
                    setContractsData(fdata);
                }else{
                    setContractsData([...contractsData, ...fdata]);
                }
            } else {
                console.log(response)
            }
        });
    }, [selectedFilter])

    return (
        <>
            <div>
                <Table
                    rowKey='id'
                    // scroll={{
                    //     x: 1300,
                    // }}
                    columns={columns}
                    dataSource={contractsData}
                    onChange={handlechange}
                    // rowSelection={rowSelection}
                    // loading={isLoading}
                />
            </div>
            <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={() => { setShowDeletedSuccess(false) }}>
                <SuccessSubmit icon={Successfully} title="Job site deleted successfully!" desc='Job site ID # of customer deleted.' />
            </Modal>
        </>
    );
}

export default TaskTable