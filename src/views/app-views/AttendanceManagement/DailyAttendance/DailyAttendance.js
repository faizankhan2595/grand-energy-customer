import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React, { useEffect } from 'react'
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
    const [dailyAttendanceData, setdailyAttendanceData] = useState([])
    const tok = localStorage.getItem('token');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [allAttendance , setAllAttendance] = useState([]);
    const headers = [
        { label: "User Id", key: "user_id" },
        { label: "Staff Name", key: "name" },
        { label: "Location", key: "location_name" },
        { label: "Attendance", key: "status" },
        { label: "Check in Time", key: "first_check_in_time" },
        { label: "Check Out Time", key: "last_check_out_time" },
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

      const getData = () => {
        axios
        .post(
          `/api/hrms/get-attendance-user-wise-for-approval`,
          {
            customer_id: +localStorage.getItem("customer_id"),
            date: date,
            search: searchText
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          let res = response.data.attendance_register;
            setdailyAttendanceData(res);
            setAllAttendance(res.map((item)=>{
                return {
                    user_id: item.user_id,
                    name: item.name,
                    location_name: item.location_name,
                    status: item.status,
                    first_check_in_time:  item.first_check_in_time?moment(item.first_check_in_time).format('DD MMM YYYY, hh:mm A'):null,
                    last_check_out_time: item.last_check_out_time?moment(item.last_check_out_time).format('DD MMM YYYY, hh:mm A'):null
                }
            }));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(()=>{
        getData();
    },[date,searchText])
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <PageHeading
                    title="Daily Attendance List"
                />
                <div className=" d-flex align-items-center justify-content-end">
                    <SearchBox setSearchText={setSearchText} />

                    {/* <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
                        <Icon className="mr-2" component={FilterIcon} />
                        Filters
                    </Button> */}
                    
                    <CSVLink data={allAttendance} 
                        headers={headers} 
                        filename={"All-Attendance.csv"}
                        >
                        <Button className="d-flex align-items-center ml-2" >
                            <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
                        </Button>
                    </CSVLink>
                    <DatePicker className="ml-2" value={date?moment(date):null} onChange={(date, dateString) => {
                        setDate(dateString)
                    
                    }} />
                </div>
            </div>
            
            <div className='mw-100'>
                <AttendanceListTable
                    dailyAttendanceData={dailyAttendanceData}
                />
            </div>

        </>
    )
}

export default DailyAttendance

