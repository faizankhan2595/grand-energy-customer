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
import axios from 'axios'

function Action({ id, onDelete, onEdit }) {


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
        axios
        .post(
          "/api/tc/delete-customer-job-site",
          {
            id: id
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization:"Bearer Y2xlc2I0MGpiMDAwMHhweGEyeGphM3BiZA.W-CzxjoKG2d6nyBbVRGmblbO-U2N4j_fLy8lutqG0QC_M5wIjhWVE03aSrhn"
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
        setOpenDeleteModal(false);
        
    };

    const changeOnEdit = () =>{
        onEdit(id)
    }

    return (
        <>

            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item onClick={ShowDeleteModal}>
                            <span className="d-flex align-items-center">
                                <Icon className="mr-2" component={DeleteIcon} />
                                Delete
                            </span>
                        </Menu.Item>
                        <Menu.Item onClick={changeOnEdit}>
                            {/* <span className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} />
                                 Edit
                            </span> */}
                            <Link to={`/app/customer-management/customer-accounts/add-new/?jobsite=${id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} />
                                Edit 
                            </Link>
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
                <p style={{ color: '#72849A' }} className="font-weight-normal font-size-sm">Job site ID #123 of evergreen hotel customer will be deleted.</p>
            </Modal>
            
        </>
    )
}

export default Action