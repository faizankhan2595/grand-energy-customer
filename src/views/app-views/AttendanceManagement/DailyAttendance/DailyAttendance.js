import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React from 'react'
import AttendanceManagementIcon from 'assets/svg/AttendanceManagement.svg'
import SearchBox from 'components/shared-components/SearchBox';
import { ExportIcon, PlusIcon } from 'assets/svg/icon';
import { useState } from 'react';
import { Button, DatePicker, Form } from 'antd';
import Icon from "@ant-design/icons";
import AttendanceListTable from './AttendanceListTable';
import { Link , useRouteMatch  } from "react-router-dom";
import { InquiryManagementPageIcon , FilterIcon } from "assets/svg/icon";
import axios from "axios";
import exportIcon from "assets/svg/exportIcon.svg";
import { CSVLink } from "react-csv";
import moment from "moment";



function DailyAttendance() {

    const [showExportOption, setShowExportOption] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
    const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
    const [selectedFilter , setSelectedFilter] = useState(false);

    const [allAttendance , setAllAttendance] = useState([]);
    const headers = [
        { label: "Sr. No", key: "sr_no" },
        { label: "Inquiry ID", key: "id" },
        { label: "Customer Name", key: "customer_name" },
        { label: "Email Id", key: "email" },
        { label: "Mobile Number", key: "mobile" },
        { label: "Inquiry Date", key: "inquiry_date" },
        { label: "Inquiry Channel", key: "inquiry_channel" },
        { label: "Status", key: "status" }
    ];

    const exportHandler = () => {
        setShowExportOption(prev => !prev);
    }

    const drawerHandler = () => {
        setDrawerIsOpen((prevState) => !prevState);
      };


      const handleDrawerOk = () => {
        setSelectedFilter((previousState) => !previousState)
        setDrawerIsOpen(false);
      };
    
      const handleDrawerReset = () => {
        setSelectedFilter((previousState) => !previousState)
        setSelectedStatusFilter(false)
    
        setDrawerIsOpen(false);
      };
    
      const onDrawerClose = () => {
        console.log("Closed")
        setDrawerIsOpen(false);
      };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <PageHeading
                    title="Daily Attendance List"
                />
                <div className=" d-flex align-items-center justify-content-end">
                    <SearchBox setSearchText={setSearchText} />

                    <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
                        <Icon className="mr-2" component={FilterIcon} />
                        Filters
                    </Button>
                    
                    <CSVLink data={allAttendance} 
                        headers={headers} 
                        filename={"All-Attendance.csv"}
                        >
                        <Button className="d-flex align-items-center ml-2" >
                            <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
                        </Button>
                    </CSVLink>
                </div>
            </div>
            
            <div className='mw-100'>
                <AttendanceListTable/>
            </div>

        </>
    )
}

export default DailyAttendance