import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Switch, Upload, message } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import '../AddNewCustomer/BasicDetails.css'
import { useHistory, useParams } from 'react-router-dom';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import Icon from "@ant-design/icons";
import { BoyIcon, GirlIcon } from 'assets/svg/icon';
import { Successfully } from 'configs/svgIcons';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import moment from 'moment'
import axios from 'axios';
import { useEffect } from 'react';


// const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
function AddNewUser(props) {

    const [form] = Form.useForm()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])
    const [selectedAssociateType, setSelectedAssociateType] = useState('Individual');
    const tok = localStorage.getItem('token')
    const param = useParams()
    const [documentUrl, setDocumentUrl] = useState("");
    const [customerData, setCustomerData] = useState({});
    const history = useHistory()
    const [statusActive, setStatusActive] = useState(true);
    const [isEdit, setIsEdit] = useState(false);

    const handleCancel = () => setPreviewOpen(false);

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
        console.log(newFileList);
        const formData = new FormData();

        if(newFileList.length > 0) {
            // if(newFileList[0].url){
            //     console.log("check-1")
            //     setDocumentUrl(newFileList[0].url);
            //     return;
            // }
            
            formData.append("file", newFileList[0].originFileObj);
            axios({
                method: "post",
                url: "/api/tc/upload-document",
                data: formData,
                headers: {
                    "content-type": `multipart/form-data`,
                    Authorization: `Bearer ${tok}`,
                },
                })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.success) {
                    setDocumentUrl(response.data.url);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                    width: '250px'
                }}
            >
                Upload Picture
            </div>
        </div>
    );

    const [showAddedSuccess, setShowAddedSuccess] = useState(false);

    const finishHandler = (e) => {
        if(param.customer_id) {
            axios({
                method: 'post',
                url: "/api/tc/new-customer-user",
                data: {
                    tc_customer_id: +param.customer_id,
                    name: e.userName,
                    profile_pic: documentUrl,
                    email: e.EmailId,
                    phone: String(e.PhoneNumber),
                    nric_fin: e.associate_type == 'Individual' ? e.nrixfin : e.uen_number,
                    dob: null,
                    job_sites: [1],
                    status: statusActive ? "Active":"Inactive",
                    associate_type: e.associate_type,
                    uen_number: e.uen_number,
                    
                    residnecy_status: e.associate_type,
                    nationality: e.uen_number,
                    gender: e.office_contact_number,
                    // job_sites: e.office_contact_number,
                    // dob: moment(e.dob).format('YYYY-MM-DD'),
                    // gender: e.gender === 1 ? 'Male':'Female',
                },
                headers: {
                    Authorization: `Bearer ${tok}`
                },
            }).then(function (response) {
                console.log(response.data);
                if(response.data.success) {
                    setShowAddedSuccess(true)
                    setTimeout(() => {
                        setShowAddedSuccess(false)
                        history.goBack()
                    }, 1500);
                } else {
                    message.error(response.data.msg)
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios({
                method: 'post',
                url: "/api/tc/update-customer-user",
                data: {
                    id: param.id,
                    tc_customer_id: customerData.id,
                    name: e.userName,
                    profile_pic: documentUrl,
                    email: e.EmailId,
                    phone: String(e.PhoneNumber),
                    nric_fin:  e.associate_type == 'Individual' ? e.nrixfin : e.uen_number,
                    dob: moment(e.dob).format('YYYY-MM-DD'),
                    job_sites: [1],
                    status: statusActive ? "Active" : "Inactive",
                    associate_type: e.associate_type,
                    uen_number: e.uen_number,

                    residnecy_status: e.associate_type,
                    nationality: e.uen_number,
                    gender: e.office_contact_number,
                },
                headers: {
                    Authorization: `Bearer ${tok}`
                },
            }).then(function (response) {
                if(response.data.success) {
                    setShowAddedSuccess(true)
                    setTimeout(() => {
                        setShowAddedSuccess(false)
                        history.goBack()
                    }, 1500);
                } else {
                    message.error(response.data.msg)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    const getCustomerData = (id) => {
        console.log(id)
        axios({
            method: 'post',
            url: "/api/tc/get-customer",
            data: {
                id: id
            },
            headers: {
                Authorization: `Bearer ${tok}`
            },
        }).then(function (response) {
            let res = response.data.data;
            if (response.data.success) {
                form.setFieldsValue({
                    customerName: res.name
                })
                setCustomerData(res)
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const getCustomerUserData = () => {
        console.log(param.id)
        axios({
            method: 'post',
            url: "/api/tc/get-customer-user",
            data: {
                id: param.id
            },
            headers: {
                Authorization: `Bearer ${tok}`
            },
        }).then(function (response) {
            let res = response.data.data;
            if (response.data.success) {
                form.setFieldsValue({
                    customerName: res.name,
                    EmailId: res.email,
                    userName: res.name,
                    PhoneNumber: res.phone,
                    residency: res.residnecy_status,
                    nrixfin: res.nric_fin,
                    nationality: res.nationality,
                    dob: moment(res.dob),
                    gender: res.gender === 'Male' ? 1 : 2,
                    jobSite: res.job_sites,
                    status: res.status === 'Active' ? true : false,
                    profile_pic: res?.profile_pic,
                    associate_type: res?.associate_type || res?.residnecy_status,
                    uen_number: res?.uen_number || res?.nationality,
                    office_contact_number: res?.office_contact_number || res?.gender,
                })
                setDocumentUrl(res.profile_pic)
                if(res.profile_pic) setFileList([{url:res.profile_pic}])
                setStatusActive(form.getFieldValue().status)
                getCustomerData(res.tc_customer_id)
                // getAllJobSites(res.tc_customer_id)
                console.log(res.tc_customer_id)
            }
            
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleStatusChange = (checked) => {
        setStatusActive(checked)
      }

    useEffect(() => {
        if(param.id) {
            getCustomerUserData()
            setIsEdit(true)
        }
        if(param.customer_id) {
            getCustomerData(param.customer_id)
            setIsEdit(false)
        }
    }, [])


    return (
        <div>

            <PageHeading
                // icon={UserManagementIcon}
                title={isEdit ? "Edit Associate Customer":"Add New Associate Customer"}
            />
            <Form
                form={form}
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="vertical"
                onFinish={finishHandler}
            >
                <Card className="mt-3">
                    <div className="d-flex justify-content-end" style={{color: 'red'}}>
                      <div>* Indicates Mandatory Fields</div>
                    </div>

                    <Row
                        align='bottom'
                    >
                        <Col span={12} >
                            <Form.Item name='photo' label='Profile Picture'>
                                <Upload
                                    // onPreview={handlePreview}
                                    listType="picture-card"
                                    fileList={fileList}
                                    accept="image/*"
                                    onChange={handleChange}
                                    maxCount={1}
                                    beforeUpload={() => {
                                        return false;
                                    }}
                                    showUploadList={{
                                        showPreviewIcon: false,
                                    }}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </Form.Item>
                            {/* <div>
                                <Button onClick={()=> {
                                    // setDocumentUrl('');
                                    setFileList([]);
                                    handleChange(fileList);
                                }}>
                                    Delete Picture
                                </Button>
                            </div> */}

                            {/* <Form.Item name='customerName' label='Customer Name'>
                                <Input disabled/>
                            </Form.Item> */}
                            <Form.Item name='associate_type' label='Associate Type'>
                                <Select
                                    showSearch
                                    placeholder="Associate Type"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                                    }
                                    value={selectedAssociateType}
                                    onChange={setSelectedAssociateType}
                                >
                                    <Select.Option value={'Individual'}>Individual</Select.Option>
                                    <Select.Option value={'Company'}>Company</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name='EmailId' label='Email Id' rules={[{ required: true, type: 'email', message: 'Please input your valid email id!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name='office_contact_number' label='Office Contact Number' rules={[{ required: true, message: 'Please input Office Contact Number!' }]}>
                                <Input />
                            </Form.Item>
                            
                            
                        </Col>
                        <Col span={12} >
                            <Form.Item name='userName' label='Name' rules={[{ required: true, message: 'Please input Name!' }]}>
                                <Input />
                            </Form.Item>
                            
                            <Form.Item name='PhoneNumber' label='Phone Number' rules={[{ required: true, message: 'Please input Phone number!' },
                            {
                                message: 'Phone number must have atleast 8 digits',
                                validator: (_, value) => {
                                    if (/^\d{8,}$/.test(Number(value))) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Some message here');
                                    }
                                }
                            }]}>
                                <Input style={{ width: "100%" }} minLength={8} />
                            </Form.Item>
                            {/* <Form.Item name='residency' label='Residency Status'>
                                <Select>
                                    <Select.Option value='PERMANENT RESIDENT' >PERMANENT RESIDENT</Select.Option>
                                    <Select.Option value='CITIZEN' >CITIZEN</Select.Option>
                                    <Select.Option value='FOREIGNER' >NON-native/Expat</Select.Option>
                                </Select>
                            </Form.Item> */}
                            {selectedAssociateType === 'Individual' && <Form.Item name='nrixfin' label='NRIC/FIN' rules={[
                                {
                                    required: true,
                                    message: 'The NRIC/FIN is required.',
                                },
                                {
                                    message: 'First letter of the NRIC/FIN must contain either S, T, F, G, M, followed by 7 digits and ends with a capital letter',
                                    validator: (_, value) => {
                                        if (/^[STFGM]\d{7}[A-Z]$/.test(value)) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('Some message here');
                                        }
                                    }
                                }
                            ]}>
                                <Input />
                            </Form.Item>}
                            {selectedAssociateType === 'Company' && <Form.Item name='uen_number' label='UEN Number' rules={[{ required: true, message: 'The UEN Number is required!' }]}>
                                <Input />
                            </Form.Item>}

                            
                            {/* <Form.Item name='nationality' label='Nationality' rules={[{ required: true, message: 'Please input your nationality!' }]}>
                                <Select>
                                    <Select.Option value='India' >India</Select.Option>
                                    <Select.Option value='China' >China</Select.Option>
                                    <Select.Option value='Singapore' >Singapore</Select.Option>
                                </Select>
                            </Form.Item> */}
                            {/* <Form.Item name='dob' label='Date of Birth' rules={[{ required: true, message: 'Please input your date of birth!' }]}>
                                <DatePicker disabledDate={(current) => current && current >= moment().startOf('day')} format='DD/MM/YYYY' />
                            </Form.Item> */}
                            {/* <Form.Item name='gender' label='Gender' style={{alignContent: 'start'}}>
                                <Radio.Group name="genderGroup" defaultValue={1}>
                                    <Radio value={1}><Icon component={BoyIcon} /> Male</Radio>
                                    <Radio value={2}><Icon component={GirlIcon} /> Female</Radio>
                                </Radio.Group>
                            </Form.Item> */}
                        </Col>
                    </Row>
                    <Row align="bottom">
                        <Col span={12}>
                            <Form.Item name="status" label="Status" style={{alignContent: 'start'}}>
                            {statusActive ? "ACTIVE":"INACTIVE"}<Switch checked={statusActive} onClick={handleStatusChange} className="ml-2"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Form.Item className={`d-flex align-items-end Button`}>
                    <Button onClick={history.goBack}>Back</Button>
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setFileList([])
                        }}
                        className='mx-3'
                    >Clear All</Button>

                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>

            <Modal centered visible={showAddedSuccess} footer={[null]} onCancel={() => { setShowAddedSuccess(false) }}>
                {param.customer_id && <SuccessSubmit icon={Successfully} title="Customer Added Successfully!" desc='Customer is added in the system' />}
                {param.id && <SuccessSubmit icon={Successfully} title="Customer updated Successfully!" desc='Customer is updated in the system' />}
            </Modal>
        </div>
    )
}

export default AddNewUser