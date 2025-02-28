import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import React from 'react'
import AttendanceManagementIcon from 'assets/svg/AttendanceManagement.svg'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import SearchBox from 'components/shared-components/SearchBox'
import plusIcon from "assets/svg/plus.svg";
import ShiftManagementTable from './ShiftManagementTable'

function ShiftManagement() {
  return (
    <>
      <div>
        <PageHeading
          icon={AttendanceManagementIcon}
          title="Attendance Management / Shift Management"
        />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className=" d-flex align-items-center justify-content-between">
          {/* <SearchBox onSearch={(text) => setSearchText(text)} onChange={(e) => setSearchText(e.target.value)} /> */}
          <SearchBox />
        </div>
        <div>
          <Link to="/app/attendance-management/shift-management/add-shift">
            <Button
              className="d-flex align-items-center"
              type="danger"
              size="large"
            >
              <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
              Add New Shift
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <ShiftManagementTable />
      </div>
    </>
  )
}

export default ShiftManagement