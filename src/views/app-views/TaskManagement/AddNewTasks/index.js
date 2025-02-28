import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect } from 'react'
import TaskManagement from "assets/svg/TaskManagement.svg";
import { useLocation, useParams } from 'react-router-dom';
import { Avatar, Card, Col, message, Form, Input, Modal, Row, Select, Button, DatePicker, Radio, Switch, Table, Typography, Tag } from 'antd';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import { Successfully } from 'configs/svgIcons';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import Icon from "@ant-design/icons";
import { AddUserIcon } from 'assets/svg/icon';
import { DeleteIconRed } from 'assets/svg/ActionsSvg';
import './index.css'
import axios from 'axios';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
// import { differenceInCalendarDays, differenceInCalendarYears } from 'date-fns'
// import SizeContext from 'antd/es/config-provider/SizeContext';
const {Title} = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function AddNewTasks() {

    const param = useParams()
    const location = useLocation()
    const [form] = Form.useForm();
    const [edit, setEdit] = useState(false)
    const [contractData, setContractData] = useState([])
    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
    const [taskCategoriesData, setTaskCategoriesData] = useState([])
    // const [addNewTaskData, setaddNewTaskData] = useState({
    //     task_recurrence: 'DAILY',
    //     recur_forever: false,
    //     skip_weekends: false,
    // })
    const [recur_forever, setRecurForever] = useState(false)
    const [skip_weekends, setSkipWeekends] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({});
    const tok = localStorage.getItem('token')

    function disabledDate(current) {
        let customDate = moment().format("YYYY-MM-DD");
        return current && current < moment(customDate, "YYYY-MM-DD");
        //    return differenceInCalendarDays(current, new Date())
    }

    const [successMsg, setsuccessMsg] = useState({})

    const [FileList, setFileList] = useState([])
    const [imagesList, setImagesList] = useState([])
    const [documentUrl, setDocumentUrl] = useState('')
    const history = useHistory()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        // console.log(file.url || file.preview)
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
        console.log(FileList)
        // const formData = new FormData();
        // formData.append("file", newFileList[0].originFileObj)
        // axios({
        //     method: 'post',
        //     url: "/api/tc/upload-document",
        //     data: formData,
        //     headers: {
        //         'content-type': `multipart/form-data`,
        //         Authorization: `Bearer ${tok}`
        //     },
        // }).then(function (response) {
        //     console.log(response);
        //     if (response.data.success) {
        //         setDocumentUrl(response.data.url)
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        // });
    };

    const uploadImage = async () => {
        let imagesUrl = [];

        for (let i = 0; i < FileList.length; i++) {
            const formData = new FormData();
            if (FileList[i].url) {
                imagesUrl.push({ url: FileList[i].url })
                continue;
            }
            formData.append("file", FileList[i].originFileObj)
            await axios({
                method: 'post',
                url: "/api/tc/upload-document",
                data: formData,
                headers: {
                    'content-type': `multipart/form-data`,
                    Authorization: `Bearer ${tok}`
                },
            }).then(function (response) {
                console.log(response);
                if (response.data.success) {
                    console.log("response", response.data.url)
                    imagesUrl.push({ url: response.data.url })
                    // setImagesList([...imagesList, { url: response.data.url }])
                    return true;
                }
                return false
            }).catch(function (error) {
                console.log(error);
                return false
            });

        }
        return imagesUrl;
    }


    const finishHandler = async () => {
        const val = form.getFieldsValue()
        if (checkList.length === 0) {
            message.error('Please add checklist item')
            return
        }
        // console.log(val)
        const imagesdata = await uploadImage()
        let newData;
        newData = { ...val }

        const UploadData = (images) => {
            // if (location.pathname === `/app/task-management/task/edit/${param.jobSiteName}/${param.customerName}/${param.jobSiteId}/${param.customerId}/${param.taskId}/${param.jobSiteCount}`) {

            //     createTasks(newData, images, `${axios.defaults.baseURL}/api/tc/update-task`, param.taskId)
            // } else if (location.pathname === `/app/task-management/task/add-new/${param.jobSiteName}/${param.customerName}/${param.jobSiteId}/${param.customerId}/${param.jobSiteCount}`) {
            //     createTasks(newData, images, `${axios.defaults.baseURL}/api/tc/new-task`, false)
            // }

            if (edit) {
                createTasks(newData, images, `${axios.defaults.baseURL}/api/tc/update-task`, param.taskId)
            }
            else {
                createTasks(newData, images, `${axios.defaults.baseURL}/api/tc/new-task`, false)
            }

        }

        UploadData(imagesdata)

        // createTasks(newData, `${axios.defaults.baseURL}/api/tc/new-task)
        // setShowDeletedSuccess(true)
        // setTimeout(() => {
        //     setShowDeletedSuccess(false)
        //     // history.push('customer-details')
        // }, 3000);
    }


    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedTaskCategories, setSelectedTaskCategories] = useState([]);
    const [status, setStatus] = useState('')

    const checkListData = []
    const [checkList, setCheckList] = useState([])
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')

    const [allUsers, setAllUsers] = useState([])


    const handleChangeDate1 = (dates, dateString) => {
        console.log(dates)
        console.log(dateString)
        setStartDateTime(dates)
        // setEndDateTime(dateString[1])
    }
    const handleChangeDate2 = (dates, dateString) => {
        console.log(dates)
        console.log(dateString)
        // setStartDateTime(dateString[0])
        setEndDateTime(dates)
    }

    const handeChecklist = (e) => {
        if (e.target.value === '') {
            message.error('Please enter checklist item')
            return
        }

        // let inputData = new FormData()
        // console.log('handleEnter')
        setCheckList([...checkList, { text: e.target.value, id: checkList.length + 1 }])
        form.setFieldsValue({ ...form.getFieldsValue(), 'checklistItem': '' })
        // inputData.append('checklistItem','')
        // setCheckListInput('')
    }

    const handleDeleteCheckList = (id) => {
        const newCheckList = checkList.filter((val) => { return val.id !== id })
        setCheckList(newCheckList)
    }

    const [endTaskCycleOn, setEndTaskCycleOn] = useState('')

    const createTasks = (values, images, url, id) => {


        // values['task_start_date_time'] = startDateTime
        // values['task_end_date_time'] = endDateTime
        // values['task_status'] = "PENDING"
        // values['recur_until'] = `${endTaskCycleOn} 00:00:00`
        // values['images'] = images
        // values['check_list'] = checkList
        // values['tc_customer_id'] = param?.customerId
        // values['tc_contract_id'] = param?.tc_contract_id
        // values['tc_customer_job_site_id'] = param?.jobSiteId

        values['tc_customer_id'] = param?.customerId
        values['tc_customer_job_site_id'] = param?.jobSiteId
        values['tc_contract_id'] = param?.contractId
        values['name'] = values.task_name
        values['description'] = values.task_description
        values['task_category_id'] = selectedTaskCategories
        values['user_ids'] = selectedItems
        values['task_start_date_time'] = moment(startDateTime).format("YYYY-MM-DD HH:mm:ss")
        values['task_end_date_time'] = moment(endDateTime).format("YYYY-MM-DD HH:mm:ss")
        values['task_recurrence'] = values.task_recurrence
        values['recur_forever'] = recur_forever ? 1 : 0
        values['recur_until'] = `${endTaskCycleOn}`
        values['skip_weekends'] = skip_weekends ? 1 : 0
        values['check_list'] = checkList
        values['images'] = images
        values['task_status'] = status || "PENDING"



        if (id) {
            values['id'] = id
        }
        console.log(values)
        console.log(url)

        axios({
            method: 'post',
            url: url,
            data: values,
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
        }).then(function (response) {
            console.log(response);
            if (response.data.success) {
                setShowDeletedSuccess(true)
                if (id) {
                    setsuccessMsg({ msg: 'Task Updated Successfully!', desc: "Task updated." })
                } else {
                    setsuccessMsg({ msg: 'Task Added Successfully!', desc: `${response.data.total_tasks} tasks added in job site ${param.jobSiteCount}` })
                }
                setTimeout(() => {
                    setShowDeletedSuccess(false)
                    history.push(`/app/task-management/task/job-sites-tasks/${param?.contractId}`)
                }, 3000);
            }
        }).catch(function (error) {
            // console.log(error);
            message.error(error.response.data.message)
        });
    }

    const getAllUsers = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-users",
            // data: values,
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
        }).then(function (response) {
            console.log(response.data);
            if (response.data.success) {
                setAllUsers(response.data.data)
                if (location.pathname.includes("add-task")) {

                } else {
                    getSingleTask()
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleResetFields = () => {
        // form.resetFields()
        history.goBack();
    }


    const handleEndTaskDate = (date, dateString) => {
        setEndTaskCycleOn(dateString)
    }


    const [defaultFileList, setdeFaultFileList] = useState([])

    const getSingleTask = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task",
            // data: values,
            headers: {
                // 'content-type': `multipart/form-data`,
                Authorization: `Bearer ${tok}`
            },
            data: {
                id: param?.taskId
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.data.success) {
                let data = response.data.data
                form.setFieldsValue({
                    id: data.id,
                    task_name: data.task_name,
                    service_type: data.service_type,
                    task_description: data.task_description,
                    user_ids: data?.users.map((val) => val.id),
                    // checklistItem:data.check_list,
                    timeLine1: moment(`${data.task_start_date_time}`),
                    timeLine2: moment(`${data.task_end_date_time}`),
                    task_recurrence: data.task_recurrence.toUpperCase(),
                    recur_forever: data.recur_forever == 1 ? true : false,
                    skip_weekends: Boolean(data.skip_weekends == 1),
                    endTaskDate: moment(`${data.recur_until}`),
                    uploadImage: data.images,
                    task_category: data.task_category_id
                })
                setSelectedItems(data?.users.map((val) => val.id))
                setStatus(data.task_status)
                setRecurForever(data.recur_forever == 1)
                setSkipWeekends(data.skip_weekends == 1)
                setFileList(data.images)
                // setdeFaultFileList(data.images)
                setStartDateTime(data.task_start_date_time)
                setEndDateTime(data.task_end_date_time)
                setEndTaskCycleOn(data.recur_until.slice(0, 10))
                // console.log(data.images[0].url)
                // setDocumentUrl(data.images[0].url)
                setCheckList(data.check_list)
                setSelectedTaskCategories(data.task_category_id)
                // setaddNewTaskData({
                //     task_recurrence: data.task_recurrence,
                //     recur_forever: data.recur_forever == 1,
                //     skip_weekends: data.skip_weekends == 1,
                // })

                // console.log("recure", addNewTaskData.recur_forever);
            }
        }).catch(function (error) {
            message.error(error.response.data.message)
        });
    }

    const getCustomer = (id) => {
        axios
            .post(
                "/api/tc/get-customer",
                {
                    id: id,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${tok}`
                    },
                }
            )
            .then((response) => {
                let res = response.data.data;
                console.log(res)
                setCustomerDetails(res)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    // useEffect(() => {
    // if (location.pathname === `/app/task-management/task/edit/${param.jobSiteName}/${param.customerName}/${param.jobSiteId}/${param.customerId}/${param.taskId}/${param.jobSiteCount}`) {
    //     // console.log(param.jobSiteName)
    //     // console.log(param.customerName)
    //     // console.log(param.jobSiteId)
    //     // console.log(param.customerId)
    //     // console.log(param.taskId)
    //     // console.log(param.jobSiteCount)

    // }

    // }, [])


    const contractColumn = [
        {
            title: "Contract ID",
            dataIndex: "id",
        },
        {
            title: "Customer Name",
            dataIndex: "customer_name",
        },
        {
            title: "Jobsite",
            dataIndex: "job_site_name",
        },
        {
            title: "Contract Start Date",
            dataIndex: "start_date",
            render: (text, record) => (
                moment(record.start_date).format("DD-MM-YYYY")
            )
        },
        {
            title: "Contract End Date",
            dataIndex: "expire_on",
            render: (text, record) => (
                moment(record.end_date).format("DD-MM-YYYY")
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_, record) => {
                if (record.status === 'ACTIVE') return <span style={{ color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Active</span>
                else return <span style={{ color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>Expired</span>
            }
        }
    ]

    const getContract = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-contract",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: { id: param.contractId }
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setContractData([response.data.data])
                // setTotalJobSite(response.data.data.data)
                // handleJobsiteChangeData(response.data.data.data[0].id)
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    const getAllTaskCategories = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-task-categories",
            data: {},
        }).then(function (response) {
            console.log(response.data.data)
            if (response.data.success) {
                let res = response.data.data;

                let fdata = res.map((elem, ind) => {
                    return {
                        // key: elem.id,
                        id: elem.id,
                        // srNo: ind+1,
                        // category_pic: elem.picture,
                        category_title: elem.title,
                        // created_at: moment(elem.created_at).format("DD-MM-YYYY"),
                        // updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
                    };
                });
                setTaskCategoriesData(fdata);
                console.log(fdata)
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        getContract()
        getAllUsers()
        getAllTaskCategories();
        // getCustomer(param.customerId)
        if (location.pathname.includes("add-task")) {
            setEdit(false)
        } else {

            setEdit(true)
        }
    }, [])
    return (
        <>
            <div>
                <PageHeading
                    icon={TaskManagement}
                    title="Create New Tasks"
                />

                <Card>
                    <Table columns={contractColumn} dataSource={contractData} pagination={false} />
                </Card>

                <Form
                    labelCol={{
                        span: 10,
                    }}
                    form={form}
                    // wrapperCol={{
                    //     span: 17,
                    // }}
                    // initialValues={{ ...addNewTaskData }}
                    // onSubmit={e => e.preventDefault()}
                    layout="vertical"
                    onFinish={finishHandler}
                // onValuesChange={onFormLayoutChange}

                >
                    <Row gutter={20} >
                        <Col className='mt-3' span={17}>
                            <Card>
                                <p className='font-weight-bold text-size-md mb-4'>Task Details</p>
                                {edit && <Form.Item name='id' label='Task ID'>
                                    <Input defaultValue='1234' disabled />
                                </Form.Item>}
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    },
                                ]} name='task_name' label='Task Name'>
                                    <Input />
                                </Form.Item>

                                {/* <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please enter service type'
                                    },
                                ]} name='service_type' label='Services'>
                                    <Select>
                                        <Select.Option value='Mopping'>Mopping</Select.Option>
                                        <Select.Option value='Carpet Cleaning'>Carpet Cleaning</Select.Option>
                                        <Select.Option value='Moving'>Moving</Select.Option>
                                        <Select.Option value='Toilet Descaling'>Toilet Descaling</Select.Option>
                                        <Select.Option value='Wipe staircase railing'>Wipe staircase railing</Select.Option>
                                        <Select.Option value='High Dusting'>High Dusting</Select.Option>
                                        <Select.Option value='Flooring & Carpentering'>Flooring & Carpentering</Select.Option>
                                        <Select.Option value='Pest Control'>Pest Control</Select.Option>
                                        <Select.Option value='Aircon Servicing'>Aircon Servicing</Select.Option>
                                        <Select.Option value='Painting'>Painting</Select.Option>
                                        <Select.Option value='Printing services'>Printing services</Select.Option>
                                        <Select.Option value='Food catering'>Food catering</Select.Option>
                                        <Select.Option value='Renovation'>Renovation</Select.Option>
                                        <Select.Option value='Office & Pantry Supplies'>Office & Pantry Supplies</Select.Option>
                                        <Select.Option value='Kitchen Supplies'>Kitchen Supplies</Select.Option>
                                        <Select.Option value='Surveillance Systems'>Surveillance Systems</Select.Option>
                                        <Select.Option value='Interior Design'>Interior Design</Select.Option>
                                    </Select>
                                </Form.Item> */}

                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task description'

                                    },
                                ]} name='task_description' label='Task Description'>
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col className='mt-3 d-flex flex-column ' span={7}>

                            {/* <Row className=''>
                                <Card className='w-100'>
                                    <p className='font-weight-bold text-size-md mb-4'>Images</p>
                                        <Dragger
                                            beforeUpload={() => {
                                                return false;
                                            }}
                                            listType="picture-card"
                                            defaultFileList={defaultFileList}
                                            style={{ minHeight: '40px', minWidth: '40px', maxHeight: "150px", marginBottom: '10px' }}
                                            maxCount={4}
                                            onPreview={handlePreview}
                                            onChange={handleUploadChange}
                                            fileList={FileList}
                                            className='dragUpload' >
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="font-weight-bold text-size-md">Drag & drop files here or <span className='text-danger'>Choose Files</span></p>

                                        </Dragger>
                                        <Modal
                                            visible={previewOpen}
                                            title={previewTitle}
                                            footer={null}
                                            onCancel={handleCancel}

                                        >
                                            <img
                                                className="myimg"
                                                alt="example"
                                                style={{
                                                    width: "100%",
                                                }}
                                                src={previewImage}
                                            />
                                        </Modal>
                                </Card>
                            </Row> */}

                            <Row style={{ flex: "1" }} className='' >
                                <Card className=' w-100' >
                                    <p className='font-weight-bold text-size-md mb-4'>Task Category</p>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Plese select Task Category',
                                        },
                                    ]} className='font-weight-bold text-size-md mb-4' name='task_category'>
                                        <Select
                                            showSearch
                                            mode='single'
                                            placeholder="Task Category"
                                            optionFilterProp="children"
                                            // filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                                            // filterSort={(optionA, optionB) =>
                                            //     (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                                            // }
                                            value={selectedTaskCategories}
                                            onChange={setSelectedTaskCategories}
                                        >
                                            {taskCategoriesData.map((val, id) => (
                                                <Select.Option value={val?.id}>{val.category_title}</Select.Option>
                                            ))}
                                            {/* <Select.Option value={0}>Select</Select.Option> */}
                                        </Select>
                                    </Form.Item>
                                </Card>
                            </Row>

                            <Row style={{ flex: "1" }} className='' >
                                <Card className=' w-100' >
                                    <p className='font-weight-bold text-size-md mb-4'>Assign Staff</p>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Plese assign task',
                                        },
                                    ]} className='font-weight-bold text-size-md mb-4' name='user_ids'>
                                        <Select
                                            // suffixIcon={<AddUserIcon/>}
                                            showSearch
                                            // style={{
                                            //     width: 200,
                                            // }}
                                            mode='multiple'
                                            placeholder="Assign Task to"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                                            }
                                            value={selectedItems}
                                            onChange={setSelectedItems}
                                        >
                                            {allUsers.map((val, id) => (
                                                <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                                            ))}
                                            {/* <Select.Option value={1}>John Smith</Select.Option>
                                            <Select.Option value={2}>Jane Cooper</Select.Option> */}
                                        </Select>
                                    </Form.Item>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={17}>
                            <Card className='pr-5 pb-3'>
                                <p className='font-weight-bold text-size-md mb-4'>Check List</p>
                                {checkList.map((val, idx) => (
                                    <div key={idx} className='d-flex justify-content-between'>
                                        <p className='font-weight-normal'>{val.text}</p>
                                        <Icon onClick={() => { handleDeleteCheckList(val.id) }} component={DeleteIconRed} />
                                    </div>
                                ))}
                                <Form.Item name='checklistItem'>
                                    <Input onPressEnter={(e) => handeChecklist(e)} placeholder='Type here' />
                                    {/* <Button onClick={handeChecklist} type='primary'>Add</Button> */}
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={7}>
                            <Card>
                                <p className='font-weight-bold text-size-md mb-4'>Task Timeline</p>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please select time duration',
                                    },
                                ]} name='timeLine1' >
                                    {/* <DatePicker.RangePicker onChange={handleChangeDate} showTime={{ format: 'HH:mm:ss', }} format="YYYY-MM-DD HH:mm:ss" /> */}
                                    <DatePicker placeholder='select start date and time' onChange={handleChangeDate1} showTime={{ format: 'HH:mm A', }} format="YYYY-MM-DD HH:mm A" disabledDate={disabledDate} />
                                </Form.Item>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please select time duration',
                                    },
                                ]} name='timeLine2'  >
                                    {/* <DatePicker.RangePicker onChange={handleChangeDate} showTime={{ format: 'HH:mm:ss', }} format="YYYY-MM-DD HH:mm:ss" /> */}
                                    <DatePicker placeholder='select end date and time' onChange={handleChangeDate2} showTime={{ format: 'HH:mm A', }} format="YYYY-MM-DD HH:mm A" disabledDate={disabledDate} />
                                </Form.Item>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Please select task recurrence',
                                    },
                                ]} name="task_recurrence">
                                    <Radio.Group defaultValue="DAILY" size="small"
                                        style={{
                                            marginTop: 16,
                                            gap: '10px',
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        }}
                                        buttonStyle='solid'
                                    >
                                        <Radio.Button className='taskTimeLineRadioTabs' defaultChecked value="DAILY">Daily</Radio.Button>
                                        <Radio.Button className='taskTimeLineRadioTabs' value="WEEKLY">Weekly</Radio.Button>
                                        <Radio.Button className='taskTimeLineRadioTabs' value="MONTHLY">Monthly</Radio.Button>
                                        <Radio.Button className='taskTimeLineRadioTabs' value="YEARLY">Yearly</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    className='recur_forever d-flex flex-row'
                                    // label='Recur Forever'
                                    // name='recur_forever'
                                    rules={[{ required: false, message: 'Missing area' }]}
                                >   
                                    <div className='w-75 d-flex justify-content-between'>
                                        <h5 className='mr-5'>Recur Forever</h5>
                                        <Switch checked={recur_forever} onChange={(e) => {
                                            setRecurForever(e)
                                        }} />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    className='skip_weekends d-flex flex-row'
                                    // label='Skip Weekends'
                                    // name='skip_weekends'
                                    rules={[{ required: false, message: 'Missing area' }]}
                                >
                                    <div className='w-75 d-flex justify-content-between'>
                                        <h5 className='mr-5'>Skip Weekends</h5>
                                        <Switch checked={skip_weekends} onChange={(e) => {
                                            setSkipWeekends(e)
                                        }} />
                                    </div>
                                </Form.Item>
                                {/* <div className='d-flex flex-row'>
                                    <span style={{fontSize: '14px'}}>Repeat </span>
                                    <Form.Item rules={[
                                        {
                                            required: false,

                                        },
                                    ]} label='Repeat' name='repeats'>
                                        <Select style={{width: '100px', marginRight: '10px'}}>
                                            <Select.Option value='repeat'>Repeat</Select.Option>
                                            <Select.Option value='do_not_repeat'>No Repeat</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: false,

                                        },
                                    ]} label='Repeat By' name='repeat_by'>
                                        <Input suffix="Times" />
                                    </Form.Item>
                                </div> */}
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Plese Select end task cycle date'
                                    },
                                ]} label='End task cycle on' name='endTaskDate'>
                                    <DatePicker onChange={handleEndTaskDate} format='YYYY-MM-DD' />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                    <Form.Item rules={[
                        {
                            required: true,
                        },
                    ]} className={`d-flex align-items-end justify-content-end Button`}>
                        <Button onClick={handleResetFields}>Cancel</Button>
                        <Button className='ml-3' htmlType='submit' type="primary">Save</Button>
                    </Form.Item>
                </Form>
                <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={() => { setShowDeletedSuccess(false) }}>
                    <SuccessSubmit icon={Successfully} title={successMsg.msg} desc={successMsg.desc} />
                </Modal>
            </div>
        </>
    )
}

export default AddNewTasks