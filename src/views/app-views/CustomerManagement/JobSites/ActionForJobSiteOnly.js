import React from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Button, message, Modal } from "antd";
import Icon from "@ant-design/icons"
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
// import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
// import { Successfully } from "configs/svgIcons";
import axios from 'axios'

function ActionForJobSiteOnly({ id, customer_id, setShowModal, viewDetails, record, form, JobSites, shiftLocations, onDelete, onEdit, idFromProp, getJobSites }) {
    console.log(customer_id)
    const history = useHistory();

    const tok = localStorage.getItem('token')  

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
    const ShowDeleteModal = () => {
        setOpenDeleteModal(true);
    };
    const handleOk = () => {
        axios
        .post(
          "/api/tc/delete-customer-job-site",
          {
            id: id
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization:`Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          let res = response.data;
          console.log(res);
          if(res.success) {
            message.success("Jobsite deleted successfully")
          } else {
            if(res.message) message.error(res.message)
            else message.error("Jobsite cannot be deleted")
          }
          setOpenDeleteModal(false);
          getJobSites();
        })
        .catch((error) => {
          console.log(error);
        });
        
    };
    const handleCancel = () => {
        setOpenDeleteModal(false);
        
    };

    const changeOnEdit = () =>{
        console.log(record)
        onEdit(id)

        if(!viewDetails) {
            let jobsiteObj = JobSites.find((e) => e.address === record.address)
            if(jobsiteObj) {
                let location = shiftLocations.find(e => e.location_address === jobsiteObj.address)
                if(location) {
                    form.setFieldsValue({
                        shift_name: location.location_name,
                        address: location.location_address
                    })
                }
            }
            form.setFieldsValue({
                ...record
            })
            setShowModal(true)
        }
        else {
            console.log(record.tc_customer_id)
            history.push(`/app/customer-management/customer-accounts/customer-details/${customer_id}`)
        }
    }

    return (
        <>

            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item onClick={ShowDeleteModal}>
                            <span className="d-flex align-items-center">
                                <Icon className="mr-2" component={DeleteIcon} /> Delete
                            </span>
                        </Menu.Item>
                        <Menu.Item onClick={changeOnEdit}>
                            <span className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} /> Edit 
                            </span>
                        </Menu.Item>

                    </Menu>
                }
            />
            <Modal
                visible={openDeleteModal}
                centered
                onCancel={handleCancel}
                footer={[
                    <Button style={{ color: '#000B23' }} onClick={handleCancel} className='font-weight-bold'>No, cancel</Button>,
                    <Button style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleOk}>Yes, Confirm</Button>
                ]}
            >
                <div style={{ color: '#000B23' }} className="font-weight-bolder font-size-md">Sure you want to delete?</div>
                <p style={{ color: '#72849A' }} className="font-weight-normal font-size-sm">Job site ID #{id} will be deleted.</p>
            </Modal>
            
        </>
    )
}

export default ActionForJobSiteOnly