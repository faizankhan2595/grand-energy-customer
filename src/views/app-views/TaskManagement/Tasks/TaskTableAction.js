import React from "react";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Button, Modal } from "antd";
import Icon from "@ant-design/icons"
import { VisibilityIcon, DeleteIcon, EditIcon, PageIcon } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { useState } from "react";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";
import { Link } from "react-router-dom";


function TaskTableAction({ record }) {

    return (
        <>

            <EllipsisDropdown
                menu={
                    <Menu>
                        <Menu.Item >
                            <Link to={`/app/task-management/task/job-sites-tasks/${record.id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={VisibilityIcon} />
                                View Tasks
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item >
                            <Link to={`/app/customer-management/customer-accounts/edit/${record.id}`} className="d-flex align-items-center">
                                <Icon className="mr-2" component={EditIcon} />
                                Edit 
                            </Link>
                        </Menu.Item> */}
                    </Menu>
                }
            />
            
        </>
    )
}

export default TaskTableAction