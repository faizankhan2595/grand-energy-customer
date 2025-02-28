import { Button, Menu, Switch, Modal, Table, message } from 'antd'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { EditIcon, DeleteIcon } from 'assets/svg/ActionsSvg';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Icon from "@ant-design/icons"
import axios from 'axios';
import moment from 'moment'
import Setting from "assets/svg/Setting.svg";


function TaskCategory() {
    const [TaskCategoriesData, setTaskCategoriesData] = useState([]);

    const columns = [
        {
            title: 'Sr No',
            dataIndex: 'srNo'
        },
        {
            title: 'Category Image',
            dataIndex: 'category_pic',
            render: (category_pic) => {
                return (
                    <img src={category_pic} style={{width: '50px', height: '50px', borderColor: '#FFF', borderRadius: '50%'}}/>
                )
            }
        },
        {
            title: 'Category Title',
            dataIndex: 'category_title',
            // render : (_,record)=>{
            //     return <div>8</div>
            // }
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
                        <Menu.Item>
                        <Link to={`/app/masters/task-categories/edit/${record.id}`}>
                            <span>
                                <Icon className="mr-2" component={EditIcon} />Edit
                            </span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item onClick={() => {deleteTaskCategory(record.id)}}>
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

    const getAllTaskCategories = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-task-categories",
            data: {},
        }).then(function (response) {
            console.log(response.data.data)
            if(response.data.success) {
                let res = response.data.data;

                let fdata = res.map((elem, ind) => {
                    return {
                        key: elem.id,
                        id: elem.id,
                        srNo: ind+1,
                        category_pic: elem.picture,
                        category_title: elem.title,
                        created_at: moment(elem.created_at).format("DD-MM-YYYY"),
                        updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
                    };
                });
                setTaskCategoriesData(fdata);
                console.log(fdata)
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    const deleteTaskCategory = (id)=> {
        axios({
            method: 'post',
            url: "/api/tc/delete-task-category",
            data: {id: id},
        }).then(function (response) {
            console.log(response.data.data)
            if(response.data.success) {
                message.success("Task Category deleted successfully");
                getAllTaskCategories();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
      getAllTaskCategories();
    }, [])
    
    return (
        <div style={{ padding: "20px 20px 0px 20px" }}>
            <div className="d-flex justify-content-between">
                <PageHeading
                    title="Task Category"
                />
                <Link to={`/app/masters/task-categories/add-new`} style={{ marginLeft: 'auto',gap:'12px',width:"fit-content" }} className='d-flex mb-4'>
                <Button type='primary' className="px-4 mr-2">Add New</Button>
                </Link>
            </div>
            <div className='pb-4'>
                <Table
                    columns={columns}
                    dataSource={TaskCategoriesData}
                    className='mx-2'
                />
            </div>
        </div>
    )
}

export default TaskCategory