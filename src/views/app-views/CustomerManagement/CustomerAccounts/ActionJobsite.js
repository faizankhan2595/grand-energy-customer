import React from "react";
import Icon from "@ant-design/icons"
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

function ActionJobsite({ id, customer_id}) {
    // const tok = localStorage.getItem('token')
    // const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item >
                            {/* <Link to={`/app/customer-management/customer-accounts/add-new/?jobsite=${id}`} className="d-flex align-items-center"> */}
                            <Link to={`/app/customer-management/customer-accounts/customer-details/${customer_id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} />
                                Edit Details
                            </Link>
                        </Menu.Item>
                    </Menu>
                }
            />
        </>
    )
}

export default ActionJobsite