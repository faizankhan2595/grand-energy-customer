import { Button, Menu, Switch, Table } from 'antd'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Setting from "assets/svg/Setting.svg";
import { Link } from 'react-router-dom';
import { EditIcon } from 'assets/svg/ActionsSvg';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Icon from "@ant-design/icons"
import axios from 'axios';
import moment from 'moment'


let data = [
    {
        key: 1,
        srNo: '1',
        notificationTitle: 'Task Assigned',
        createdOn: '18 Dec 2022',
        updatedOn: '20 Dec 2022',
        status: 'Inactive',
    },
    {
        key: 2,
        srNo: '2',
        notificationTitle: 'Payments',
        createdOn: '18 Dec 2022',
        updatedOn: '20 Dec 2022',
        status: 'Active',
    }
]

function NotificationAndAlert() {

    const [notificationData, setNotificationData] = useState([])
    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'srNo'
        },
        {
            title: 'Notification Title',
            dataIndex: 'title'
        },
        {
            title: 'Created On',
            dataIndex: 'created_at'
        },
        {
            title: 'Updated On',
            dataIndex: 'updated_at'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_,record) => {
                if(record.status==='Active') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600'}}>{record.status}</span>
                else return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600'}}>{record.status}</span>
            }
        },
        {
            title: <div className='text-center'>{"Active/Inactive"}</div>,
            dataIndex: 'isActive',
            render: (_,record) => {
                return <div className='d-flex justify-content-center'>
                    <Switch checked={record.isActive} onClick={()=>{
                    record.isActive=!record.isActive;
                    updateNotificationAlert(record)
                  }}/>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            render : (_,record)=>{
                return <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item >
                            <Link to={`/app/cms/notification-&-alert/edit/${record.id}`} className="d-flex align-items-center">
                            <Icon className="mr-2" component={EditIcon} />
                                Edit
                            </Link>
                        </Menu.Item>
                    </Menu>
                }
                />
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

    const getNotificationAlerts = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-notification-alerts",
            data: {
                // status: "Active",
            },
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
        }).then(function (response) {
            if(response.data.success) {
                console.log(response.data.data)
                // setNotificationData(response.data.data)
                let res = response.data.data.data;

                let fdata = res.map((elem, ind) => {
                return {
                    key: elem.id,
                    id: elem.id,
                    srNo: ind+1,
                    title: elem.title,
                    desc: elem.description,
                    created_at: moment(elem.created_at).format("DD-MM-YYYY"),
                    updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
                    status: elem.status,
                    isActive: elem.status === 'Active' ? 1:0,
                };
                });
                setNotificationData(fdata);
                // setNotificationData(notificationData.concat(fdata));
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    const updateNotificationAlert = (data)=> {
        console.log(data)
        axios({
            method: 'post',
            url: "/api/tc/update-notification-alert",
            data: {
                id: data.id,
                title: data.title,
                description: data.desc,
                status: data.isActive ? 'Active':'Inactive',
            },
        }).then(function (response) {
            if(response.data.success) {
                console.log(response.data)
                getNotificationAlerts()
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
      getNotificationAlerts()
    }, [])
    

    return (
        <div style={{ padding: "20px 20px 10px 20px" }}>
            <div className="d-flex justify-content-between align-items-center">
                <PageHeading
                    icon={Setting}
                    title="CMS / Notifications & Alerts"
                />
                <Link to={`/app/cms/notification-&-alert/add-new`} style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4'>
                    <Button type='primary' className="px-4">Add New</Button>
                </Link>
            </div>
            <div>
                <Table
                    // scroll={{
                    //     x:1300,
                    // }}
                    // rowSelection={rowSelection}
                    //   loading={isLoading}
                    columns={columns}
                    dataSource={notificationData}
                    className='mx-0'
                />
            </div>
        </div>
    )
}

export default NotificationAndAlert