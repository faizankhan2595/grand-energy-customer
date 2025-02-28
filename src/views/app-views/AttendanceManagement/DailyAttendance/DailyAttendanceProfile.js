import { Button, Card, Col, DatePicker, Form, Row } from 'antd';
import { ExportIcon } from 'assets/svg/icon';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import SearchBox from 'components/shared-components/SearchBox';
import React from 'react'
import Icon from "@ant-design/icons";
import AttendanceManagementIcon from 'assets/svg/AttendanceManagement.svg'
import { useState } from 'react';


import AttendanceProfileTable from './AttendanceProfileTable';
import Profile from 'views/app-views/CustomerManagement/CustomerAccounts/Profile';

function DailyAttendanceProfile() {

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
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className=" d-flex align-items-center justify-content-between">
                    {/* <SearchBox onSearch={(text) => setSearchText(text)} onChange={(e) => setSearchText(e.target.value)} /> */}
                    <SearchBox />
                    <Button className="d-flex align-items-center ml-2" onClick={exportHandler}>
                        <Icon className="mr-2" component={ExportIcon} />Export
                    </Button>
                </div>
                <Form>
                    <Form.Item>
                        <DatePicker.RangePicker format={"DD/MM/YYYY"} />
                    </Form.Item>
                </Form>
            </div>
            <div className='mw-100'>
                <Row gutter={20}>
                    <Col span={6}>
                        <Profile />
                    </Col>
                    <Col span={18}>
                        <Card>
                            <AttendanceProfileTable/>
                        </Card>
                    </Col>
                </Row>

            </div>

        </>
    )
}

export default DailyAttendanceProfile