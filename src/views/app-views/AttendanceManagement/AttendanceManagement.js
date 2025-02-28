import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom';
import ShiftManagement from './ShiftManagement/ShiftManagement';
import DailyAttendanceProfile from './DailyAttendance/DailyAttendanceProfile';
import DailyAttendance from './DailyAttendance/DailyAttendance';
import AddNewShift from './AddNewShift';

function AttendanceManagement() {
    const match = useRouteMatch();
    // console.log(match.path)
    return (
      <div>
        <Route path={`${APP_PREFIX_PATH}/attendance-management`} exact>
          <Redirect to={`${match.path}/daily-attendance`}/>
        </Route>
        <Route path={`${match.path}/daily-attendance/:user_id`} exact>
          <DailyAttendanceProfile/>
        </Route>
        <Route path={`${match.path}/daily-attendance`} exact>
          <DailyAttendance/>
        </Route>
        {/* <Route path={`${match.path}/shift-management`} exact>
          <ShiftManagement/>
        </Route>
        <Route path={`${match.path}/shift-management/add-shift`} exact>
          <AddNewShift/>
        </Route> */}
      </div>
    )
}

export default AttendanceManagement