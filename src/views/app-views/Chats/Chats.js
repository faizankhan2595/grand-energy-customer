import React from 'react'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import ChatLayout from './ChatLayout';


function Chats() {

    const match = useRouteMatch();

    return (
        <div style={{backgroundColor:'#F5F7FB'}} >
            <Route path={`${APP_PREFIX_PATH}/chats`} exact>
                <Redirect to={`${match.path}/initial/:single`} />
            </Route>
            <Route path={`${APP_PREFIX_PATH}/chats/initial/:type`} exact>
                <ChatLayout/>
            </Route>
            {/* <Route path={`${APP_PREFIX_PATH}/chats/:id`} exact>
                <ChatLayout/>
            </Route> */}
        </div>
    )
}

export default Chats