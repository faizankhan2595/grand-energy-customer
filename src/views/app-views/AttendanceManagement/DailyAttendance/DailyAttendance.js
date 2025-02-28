import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React from 'react'
import AttendanceManagementIcon from 'assets/svg/AttendanceManagement.svg'
import SearchBox from 'components/shared-components/SearchBox';
import { ExportIcon, PlusIcon } from 'assets/svg/icon';
import { useState } from 'react';
import { Button, DatePicker, Form } from 'antd';
import Icon from "@ant-design/icons";
import { Link } from 'react-router-dom';
import AttendanceListTable from './AttendanceListTable';


function DailyAttendance() {

    const [showExportOption, setShowExportOption] = useState(false);
    const [searchText, setSearchText] = useState("");

    const exportHandler = () => {
        setShowExportOption(prev => !prev);
    }


    return (
        <>
            <div>
                <PageHeading
                    icon={AttendanceManagementIcon}
                    title="Attendance Management / Daily Attendance"
                />
            </div>
            <div className="d-flex justify-content-between mb-3">
                <div className=" d-flex align-items-center justify-content-between">
                    {/* <SearchBox onSearch={(text) => setSearchText(text)} onChange={(e) => setSearchText(e.target.value)} /> */}
                    <SearchBox/>
                    <Button className="d-flex align-items-center ml-2" onClick={exportHandler}>
                    <Icon className="mr-2" component={ExportIcon}/>Export
                    </Button>
                </div>
                <div>
                    <Form>
                        <Form.Item>
                            <DatePicker format={"DD/MM/YYYY"} placeholder='DD/MM/YYYY'/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className='mw-100'>
                <AttendanceListTable/>
            </div>

        </>
    )
}

export default DailyAttendance