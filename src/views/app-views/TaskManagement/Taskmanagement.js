import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import Tasks from './Tasks/Tasks';
import Schedule from './Schedule/Schedule';
import JobSiteTasks from './Tasks/JobSiteTasks';
import AddNewTasks from './AddNewTasks';
import TaskCompletionReport from './Tasks/TaskCompletionReport';
import TaskCompletionReportInDetail from './Tasks/TaskCompletionReportInDetail';
import JobSiteTaskDetails from './Tasks/JobSiteTaskDetails';
import TaskReportPrint from 'components/layout-components/TaskReportPrint';
import ViewTask from './ViewDetail/ViewTask';
import TaskReport from './TaskReport/TaskReport';


function CustomerManagement() {

    const match = useRouteMatch();

    return (
        <div>
            <Route path={`${APP_PREFIX_PATH}/task-management`} exact>
                <Redirect to={`${match.path}/task`} />
            </Route>
            {/* <Route path={`${match.path}/task/:user_id`} exact>
                <DailyAttendanceProfile />
            </Route> */}
            <Route path={`${match.path}/task/task-completion-reports/:id`} exact>
                <TaskCompletionReport/>
            </Route>
            <Route path={`${match.path}/task/task-completion-report/:id`} exact>
                <TaskCompletionReportInDetail/>
            </Route>
            <Route path={`${match.path}/task`} exact>
                <Tasks/>
            </Route>
            {/* <Route path={`${match.path}/task/add-new/:jobSiteName/:customerName/:jobSiteId/:customerId/:jobSiteCount`} exact>
                <AddNewTasks/>
            </Route> */}
            <Route path={`${match.path}/edit-task/:customerId/:jobSiteId/:contractId/:taskId`} exact>
                <AddNewTasks/>
            </Route>
            <Route path={`${match.path}/add-task/:customerId/:jobSiteId/:contractId`} exact>
                <AddNewTasks/>
            </Route>
            <Route path={`${match.path}/task/view-details/:customerId/:jobSiteId/:contractId/:taskId`} exact>
                <ViewTask/>
            </Route>
            <Route path={`${match.path}/task/view-task-report/:taskId/:userId`} exact>
                <TaskReport/>
            </Route>
            <Route path={`${match.path}/task/job-sites-tasks/:id`} exact>
                <JobSiteTasks/>
            </Route>
            <Route path={`${match.path}/task/job-sites-tasks/:customerId/:jobSiteTaskId/:jobSiteCount`} exact>
                <JobSiteTaskDetails/>
            </Route>
            <Route path={`${match.path}/schedule`} exact>
                <Schedule/>
            </Route>
        </div>
    )
}

export default CustomerManagement