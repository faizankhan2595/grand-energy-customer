import React from "react";
import { Button, Modal, Radio, Input, message } from "antd";
import Icon from "@ant-design/icons"
import { VisibilityIcon, DeleteIcon, EditIcon, AccountStatus } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'

const {TextArea} = Input

function Action({ id, customerData, onDelete, getCustomers }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [status, setStatus] = useState("Approved");
    const [remark, setRemark] = useState(false);
    const tok = localStorage.getItem('token')
    
    const ShowDeleteModal = () => {
        setOpenDeleteModal(true);
       
    };
    const ShowAccountStatusModal = () => {
        setOpenStatusModal(true);
    };
    const handleOk = () => {
        onDelete(id)
        // setOpenDeleteModal(true)
        // setTimeout(() => {
        //     setOpenDeleteModal(false);
        // }, 3000);

        axios
        .post(
          "/api/tc/delete-customer",
          {
            id: id
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          let res = response.data;
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
        
    };
    const handleCancel = () => {
        // setOpenDeleteModal(false);
        setOpenStatusModal(false);
    };
    const handleStatusOk = () => {
        console.log(customerData)
        axios
        .post(
          "/api/tc/update-customer",
          {
            ...customerData,
            id: id,
            name: customerData.company,
            status: status
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          let res = response.data;
          console.log(res);
          message.success('Account status updated successfully');
          setOpenStatusModal(false);
          getCustomers();
        })
        .catch((error) => {
            console.log(error);
            message.error('Something went wrong! please try again later');
            setOpenStatusModal(false);
        });
        
    };
    const handleStatusCancel = () => {
        setStatus(false)
        setRemark('')
        setOpenStatusModal(false);
    };

    return (
        <>
            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item >
                            <Link to={`/app/customer-management/customer-accounts/customer-details/${id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={VisibilityIcon} />
                                View Details
                            </Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link to={`/app/customer-management/customer-accounts/edit/${id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} />
                                Edit Details
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={ShowDeleteModal}>
                            <span className="d-flex align-items-center">
                                <Icon className="mr-2" component={DeleteIcon} />
                                Delete
                            </span>
                        </Menu.Item>
                        <Menu.Item onClick={ShowAccountStatusModal}>
                            <span className="d-flex align-items-center">
                                <Icon className="mr-1" component={AccountStatus} />
                                Account Status
                            </span>
                        </Menu.Item>
                    </Menu>
                }
            />
            <Modal
                visible={openDeleteModal}
                // onOk={handleOk}
                // onCancel={handleCancel}
                centered
                footer={[
                    <Button style={{ color: '#000B23' }} onClick={handleCancel} className='font-weight-bold'>No, Cancel</Button>,
                    <Button style={{ backgroundColor: '#F78DA7', color: '#F5F5F5' }} className='font-weight-bold' onClick={handleOk}>Yes, Confirm</Button>
                ]}
            >
                <div style={{ color: '#000B23' }} className="font-weight-bolder font-size-md">Are you sure you want to delete?</div>
                <p style={{ color: '#72849A' }} className="font-weight-normal font-size-sm">Customer name will be deleted from the system.</p>
            </Modal>
            <Modal
                visible={openStatusModal}
                centered
                maskClosable
                onCancel={handleCancel}
                title={'Account Status'}
                footer={[
                    <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleStatusOk}>Save</Button>,
                    <Button key={'cancel'} style={{ color: '#000B23' }} onClick={handleStatusCancel} className='font-weight-bold'>Cancel</Button>,
                ]}
            >   
                <div>
                    <Radio.Group
                        size="small" 
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue={"Approved"}
                    >
                        <Radio value="Approved"> Approve </Radio>
                        <Radio value="Rejected"> Reject </Radio>
                    </Radio.Group>
                </div>

                <div>
                    <h4 className="mb-2 mt-4">Remarks</h4>
                    <TextArea rows={4} onChange={(e) => setRemark(e.target.value)} value={remark} />
                </div>
            </Modal>
        </>
    )
}

export default Action