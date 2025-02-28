import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import {
  Layout,
  Grid,
} from "antd";

import navigationConfig from "configs/NavigationConfig";
import { 
  SIDE_NAV_WIDTH, 
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  DIR_RTL,
  DIR_LTR
} from 'constants/ThemeConstant';
import utils from 'utils';
import { useThemeSwitcher } from "react-css-theme-switcher";
import TaskReportPrint from 'components/layout-components/TaskReportPrint';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const TaskPrintLayout = ({ navCollapsed, navType, location, direction }) => {
  const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg')
  const isNavSide = navType === NAV_TYPE_SIDE
  const isNavTop = navType === NAV_TYPE_TOP
  const param = useParams()
  console.log(param.id)

  const getLayoutGutter = () => {
    if(isNavTop || isMobile) {
      return 0
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    // return 0;
  }

  const { status } = useThemeSwitcher();

  if (status === 'loading') {
    return <Loading cover="page" />;
  }

  const getLayoutDirectionGutter = () => {
    if(direction === DIR_LTR) {
      return {paddingLeft: getLayoutGutter()}
    }  
    if(direction === DIR_RTL) {
      return {paddingRight: getLayoutGutter()}
    }
    return {paddingLeft: getLayoutGutter()}
  }

  return (
    <Layout>
      <Layout className="app-container">
        <Layout className="app-layout" >
          <div >
            <Content>
              <TaskReportPrint />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, locale } =  theme;
  return { navCollapsed, navType, locale }
};

export default connect(mapStateToProps)(React.memo(TaskPrintLayout));