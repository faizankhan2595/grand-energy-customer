import { Button, Menu, Switch, Modal, Table } from 'antd'
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
]

function Gst() {

    const [notificationData, setNotificationData] = useState([])
    const [showEdit, setShowEdit] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'srNo'
        },
        {
            title: 'Tax Name',
            dataIndex: 'title'
        },
        {
            title: 'Tax percentage',
            dataIndex: '',
            render : (_,record)=>{
                return <div>8</div>
            }
        },
        {
            title: 'Updated On',
            dataIndex: 'updated_at'
        },
        {
            title: 'Action',
            dataIndex: '',
            render : (_,record)=>{
                return <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item>
                          {/* <span onClick={ShowEditModal()}> */}
                          <span>
                            <Icon className="mr-2" component={EditIcon} /> Editt
                          </span>
                        </Menu.Item>
                    </Menu>
                }
                />
            }
        },
    ]

    const getAllGst = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-notification-alerts",
            data: {},
        }).then(function (response) {
            if(response.data.success) {
                console.log(response.data.data)
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
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    const updateGst = (data)=> {
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
                getAllGst()
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    const ShowEditModal = () => {
        setOpenEditModal(true);
    };
    const handleOk = () => {
        
    };
    const handleCancel = () => {
        setOpenEditModal(false);
        setShowEdit(false)
    };

    useEffect(() => {
      getAllGst()
    }, [])
    

    return (
        <div>
            <div>
                <PageHeading
                    icon={Setting}
                    title="CMS / GST"
                />
            </div>
            <Link to={`/app/masters/gst/add-new`} style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4'>
            <Button type='primary' className="px-4">Add New</Button>
            </Link>
            <div>
                <Table
                    columns={columns}
                    dataSource={notificationData}
                    className='mx-2'
                />

                <Modal
                visible={openEditModal}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                    <Button style={{ color: '#000B23' }} onClick={handleCancel} className='font-weight-bold'>Cancel</Button>,
                    <Button style={{ backgroundColor: '#F78DA7', color: '#F5F5F5' }} className='font-weight-bold' onClick={handleOk}>Save</Button>
                ]}
                >
                    <div   div style={{ color: '#000B23' }} className="font-weight-bolder font-size-lg">Edit GST</div>
                </Modal>
            </div>
        </div>
    )
}

export default Gst