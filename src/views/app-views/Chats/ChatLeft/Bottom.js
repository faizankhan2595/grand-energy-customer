import { Tabs } from 'antd'
import React from 'react'
import './Bottom.css'
import CustomerChats from './CustomerChats'
import StaffChats from './StaffChats'

function Bottom() {
    return (
        <div className='BottomChats' >
            <Tabs
                defaultActiveKey='1'
                // activeKey={currActiveKey}
                size="large"
                centered
                tabBarStyle={{width:'100%',display:'flex'}}
                // onChange={tabChangeHandler}
                // tabBarExtraContent={extraBottons}
                className='chatLeftTabsContainer'
            >
                <Tabs.TabPane
                className='chatLeftTab'
                    tab={
                        <div className="d-flex font-weight-bold align-items-center hover-color">
                            {/* <Icon
                                component={currActiveKey === "1" ? tabs[0].activeIcon : tabs[0].icon}
                            /> */}
                            Staff
                        </div>
                    }
                    key="1"
                // disabled={disable[0]}
                >
                    <StaffChats/>
                </Tabs.TabPane>
                <Tabs.TabPane
                className='chatLeftTab'
                    tab={
                        <div className="d-flex font-weight-bold align-items-center hover-color">
                            {/* <Icon
                                component={currActiveKey === "2" ? tabs[1].activeIcon : tabs[1].icon}
                            /> */}
                            Customer
                        </div>
                    }
                    key="2"
                // disabled={disable[0]}
                >
                    <CustomerChats/>
                </Tabs.TabPane>
                <Tabs.TabPane
                className='chatLeftTab'
                    tab={
                        <div className="d-flex font-weight-bold align-items-center hover-color">
                            {/* <Icon
                                component={currActiveKey === "2" ? tabs[1].activeIcon : tabs[1].icon}
                            /> */}
                            Group Chat
                        </div>
                    }
                    key="3"
                // disabled={disable[0]}
                >
                    <CustomerChats/>
                </Tabs.TabPane>

            </Tabs>
        </div>
    )
}

export default Bottom