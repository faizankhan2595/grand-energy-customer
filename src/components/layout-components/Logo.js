import React from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { APP_NAME } from 'configs/AppConfig';
import { connect } from "react-redux";
import utils from 'utils';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  if(isMobile && !props.mobileLogo) {
    return 0
  }
  if(isNavTop) {
    return 'auto'
  }
  if(navCollapsed) {
    return `${32}px`
  } else {
    return `${65}px`
  }
}

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;
  if (navCollapsed) {
    return '/img/grand-energy-logo-small.png'
  }
  return '/img/grand-energy-logo-white.png'
}

const getLogoDisplay = (isMobile, mobileLogo) => {
  if(isMobile && !mobileLogo) {
    return 'd-none'
  } else {
    return 'logo'
  }
}

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  return (
    <div
      style={{height: `${getLogoWidthGutter(props, isMobile)}`}}>
      <img src={getLogo(props)} alt={`${APP_NAME} logo`} style={{ height: `100%`}}/>
    </div>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } =  theme;
  return { navCollapsed, navType }
};

export default connect(mapStateToProps)(Logo);
