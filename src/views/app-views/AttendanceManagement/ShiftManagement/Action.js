import React from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Button, Modal } from "antd";
import Icon from "@ant-design/icons"
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { useState } from "react";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";
import { Link } from "react-router-dom";


function Action({ id, onDelete }) {


    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
    const ShowDeleteModal = () => {
        setOpenDeleteModal(true);
        // console.log('first')
    };
    const handleOk = () => {
        onDelete(id)
        // setOpenDeleteModal(true)
        setTimeout(() => {
            // setOpenDeleteModal(false);
        }, 3000);
        
    };
    const handleCancel = () => {
        setOpenDeleteModal(false);
        
    };

    return (
        <>

            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item >
                            <Link to="/app/attendance-management/shift-management/add-shift" className="d-flex align-items-center">
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
                <div style={{ color: '#000B23' }} className="font-weight-bolder font-size-md">Sure you want to delete?</div>
                <p style={{ color: '#72849A' }} className="font-weight-normal font-size-sm">Shift name shift 1 will be deleted from system.</p>
            </Modal>
            
        </>
    )
}

export default Action