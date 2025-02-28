import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React from 'react'
import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import Icon from "@ant-design/icons";
import { PaymentsActiveIcon } from 'views/app-views/UserManagement/SvgIcons';
import dayjs from 'dayjs';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { Successfully } from 'configs/svgIcons';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';


function AddNewPayments() {

    const history = useHistory()


    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);

    const finishHandler = (e) => {
        setShowDeletedSuccess(true)
        setTimeout(() => {
            setShowDeletedSuccess(false)
            history.push('customer-details')
        }, 3000);
    }

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.htmk.com',
        listType: "picture",
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }

    return (
        <div>
            <PageHeading
                icon={UserManagementIcon}
                title="Customer Management / Customer Accounts / Customer Details / Create New Payment"
            />
            <Form
                // form={form}
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="vertical"
                // onValuesChange={onFormLayoutChange}
                onFinish={finishHandler}
            >

                <Row >
                    <Col className='mr-4' span={16}>
                        <Card className="mt-3">
                            <p style={{ color: '#000B23' }} className='d-flex align-items-center font-size-md font-weight-bold mb-4'> <Icon className='mr-2' component={PaymentsActiveIcon} /> Payments Details</p>
                            <Row align='bottom'>
                                <Col span={12}>
                                    <Form.Item name='paymentId ' label='Payment ID'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='customer ' label='Customer'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='selectJobSites' label='Select Job Sites'>
                                        <Select>
                                            <Select.Option value='India' >India</Select.Option>
                                            <Select.Option value='China' >China</Select.Option>
                                            <Select.Option value='Singapore' >Singapore</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name='totalTasksPerformed ' label='Total Tasks Performed'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='amount ' label='Amount'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='tax/GST ' label='Tax/GST'>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name='selectTaskTypes' label='Select Tasks Types'>
                                        <Select>
                                            <Select.Option value='India' >India</Select.Option>
                                            <Select.Option value='China' >China</Select.Option>
                                            <Select.Option value='Singapore' >Singapore</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name='PaymentPeriod ' label='Payment Period'>
                                        <DatePicker.RangePicker
                                            defaultValue={[dayjs('2015/01/01', 'DD/MM/YYYY'), dayjs('2015/01/01', 'DD/MM/YYYY')]}
                                            format="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                    <Form.Item name='discount ' label='Discount'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='netTotal ' label='Net Total'>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name='remarks ' label='Remarks'>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card className="mt-3">
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="font-size-md">Drag & drop files here</p>
                                <p className="font-size-md" >or</p>
                                <p className="ant-upload-hint text-danger">Choose Files</p>
                            </Dragger>
                        </Card>
                    </Col>
                </Row>

                <Form.Item className={`d-flex align-items-end Button`}>
                    <Button>Back</Button>
                    <Button
                        // onClick={() => form.resetFields()}
                        className='mx-3'
                    >Clear All</Button>

                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
                <Modal centered visible={showDeletedSuccess} footer={[null]} onCancel={() => { setShowDeletedSuccess(false) }}>
                    <SuccessSubmit icon={Successfully} title="Customer Added Successfully!" desc='Customer ID #1234 added in the system' />
                </Modal>

            </Form>
        </div>
    )
}

export default AddNewPayments