import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import Gst from './GST/Gst';
import TaskCategory from './TaskCategory/TaskCategory';
import AddNewGST from './GST/AddNewGST';
import AddNewTaskCategory from './TaskCategory/AddNewTaskCategory';


function Masters() {

    const match = useRouteMatch();

    return (
        <div style={{backgroundColor:'#F5F7FB'}} >
            <Route path={`${APP_PREFIX_PATH}/masters`} exact>
                <Redirect to={`${match.path}/task-categories`} />
            </Route>
            <Route path={`${match.path}/task-categories`} exact>
                <TaskCategory/>
            </Route>
            <Route path={`${match.path}/task-categories/add-new`} exact>
                <AddNewTaskCategory/>
            </Route>
            <Route path={`${match.path}/task-categories/edit/:id`} exact>
                <AddNewTaskCategory/>
            </Route>
            <Route path={`${match.path}/gst`} exact>
                <Gst/>
            </Route>
            <Route path={`${match.path}/gst/add-new`} exact>
                <AddNewGST/>
            </Route>
            <Route path={`${match.path}/gst/edit/:id`} exact>
                <AddNewGST/>
            </Route>

        </div>
    )
}

export default Masters