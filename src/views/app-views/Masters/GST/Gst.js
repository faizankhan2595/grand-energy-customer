import React, { useEffect } from 'react'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { EditIcon, DeleteIcon } from 'assets/svg/ActionsSvg';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Icon from "@ant-design/icons"
import axios from 'axios';
import moment from 'moment'
import { Button, Menu, Table, Switch, Modal, message } from 'antd'
import Setting from "assets/svg/Setting.svg";


function Gst() {
    const [gstData, setGstData] = useState([]);

    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'srNo'
        },
        {
            title: 'GST(%)',
            dataIndex: 'percentage',
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
            title: 'Action',
            dataIndex: '',
            render : (_,record)=>{
                return <EllipsisDropdown
                menu={
                    <Menu>
                            <Menu.Item key={'edit'}>
                                <Link to={`/app/masters/gst/edit/${record.id}`}>
                                    <span><Icon className="mr-2" component={EditIcon} />Edit</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={'delete'} onClick={() => {deleteGst(record.id)}}>
                                <span>
                                    <Icon className="mr-2" component={DeleteIcon} />Delete
                                </span>
                            </Menu.Item>
                    </Menu>
                }
                />
            }
        },
    ]

    const deleteGst = (gst_id)=> {
        axios({
            method: 'post',
            url: "/api/tc/delete-gst",
            data: {id: gst_id},
        }).then(function (response) {
            if(response.data.success) {
                message.success("GST deleted successfully")
                getAllGst();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    const getAllGst = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-all-gsts",
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
                    percentage: elem.percentage,
                    description: elem.description,
                    created_at: moment(elem.created_at).format("DD-MM-YYYY"),
                    updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
                };
                });
                setGstData(fdata);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
      getAllGst()
    }, [])
    

    return (
        <div style={{ padding: "20px 20px 0px 20px" }}>
            <div className="d-flex justify-content-between">
                <PageHeading
                    // icon={Setting}
                    title="GST"
                />
                <Link to={`/app/masters/gst/add-new`} style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4'>
                <Button type='primary' className="px-4 mr-2">Add New</Button>
                </Link>
            </div>
            <div className='pb-3'>
                <Table
                    columns={columns}
                    dataSource={gstData}
                    className='mx-2'
                />
            </div>
        </div>
    )
}

export default Gst