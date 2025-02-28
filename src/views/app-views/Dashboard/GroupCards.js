import React from 'react'

import DataDisplayWidget from "components/shared-components/DataDisplayWidget";

import {
  DashboardOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const GroupCards = () => {
  return (
    <>
    <div className="d-flex ml-2">
          <div>
            <div style={{ width: 300 }} className="mr-4">
              <DataDisplayWidget
                icon={<BarChartOutlined />}
                value="$37,212"
                title="Net Profit"
                color="cyan"
                size={"md"}
                avatarSize={100}
                vertical={true}
                alignItems="center"
              />
            </div>
            <div style={{ width: 300 }}>
              <DataDisplayWidget
                icon={<BarChartOutlined />}
                value="$37,212"
                title="Net Profit"
                color="cyan"
                size={"md"}
                avatarSize={100}
                vertical={true}
                classes="my-card"
                alignItems="center"
              />
            </div>
          </div>
          <div>
            <div style={{ width: 300 }} className="mr-4">
              <DataDisplayWidget
                icon={<BarChartOutlined />}
                value="$37,212"
                title="Net Profit"
                color="cyan"
                size={"md"}
                avatarSize={100}
                vertical={true}
                alignItems="center"
              />
            </div>
            <div style={{ width: 300 }}>
              <DataDisplayWidget
                icon={<BarChartOutlined />}
                value="$37,212"
                title="Net Profit"
                color="cyan"
                size={"md"}
                avatarSize={100}
                vertical={true}
                classes="my-card"
                alignItems="center"
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default GroupCards