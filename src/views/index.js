import React from "react";
import { Route, Switch, Redirect, withRouter, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider, message } from 'antd';
import { 
  APP_PREFIX_PATH, 
  AUTH_PREFIX_PATH, 
  GE_STAGING_URL, 
  GE_PROD_URL, 
  GE_API_STAGING_URL, 
  GE_API_PROD_URL, 
  GE_HRMS_STAGING_URL, 
  GE_HRMS_PROD_URL 
} from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import TaskPrintLayout from "layouts/task-print-layout";
import axios from 'axios';

export const Views = (props) => {
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const param = useParams();
  let tok = localStorage.getItem('token');
  let url_base = window.location.href;
  
  useBodyClass(`dir-${direction}`);

  const getUserLoggedInDetails = async ()=> {
    axios({
      method: 'get',
      url: "/api/getLoggedInUsersDetails",
      headers: {
          Authorization: `Bearer ${tok}`
      },
      data: {}
    }).then((response) => {
        if(response.data.success) {
          const res = response.data.user_details
          localStorage.setItem("name", res.name);
          localStorage.setItem("email", res.email);
          localStorage.setItem("profile_pic", res.profile_pic);
          return true
        } else {
          if(response.data.errors) {
            console.log(response.data.errors.message)
            message.error(response.data.errors.message);
          } else message.error('Something went wrong! please try again later');
          return false
        }
      }).catch((err) => {
        console.log(err);

        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profile_pic");

        // message.error('Invalid token expired, please login again');
        return false
    });
  }
  
  React.useEffect(() => {
    let is_staging = (window.location.href).includes('grandenergy-ops-staging');
    let is_prod = (window.location.href).includes('grandenergy-ops-prod');

    if(is_prod || is_staging) {
      if (token) {
        localStorage.setItem("token", token);
        tok = token;
        let loginCheck = getUserLoggedInDetails();
        console.log(loginCheck, token);
        if(!loginCheck) {
          message.error('Login expired, please login again');
          // setTimeout(() => {
          //   if((window.location.href).includes('grandenergy-ops-staging')) {
          //     window.location.href = GE_HRMS_STAGING_URL
          //   } else if((window.location.href).includes('grandenergy-ops-prod')) {
          //     window.location.href = GE_HRMS_PROD_URL
          //   }
          // }, 1000);
        }
      } 
      // else {
      //   setTimeout(() => {
      //     if((window.location.href).includes(GE_STAGING_URL)) {
      //       window.location.href = GE_HRMS_STAGING_URL
      //     } else if((window.location.href).includes(GE_PROD_URL)) {
      //       window.location.href = GE_HRMS_PROD_URL
      //     }
      //   }, 1000);
      // }
    }
    else {
      let loginCheck = getUserLoggedInDetails();
      if (!loginCheck) {
        message.error('Login token expired, please login again');
        setTimeout(() => {
          if((window.location.href).includes(GE_STAGING_URL)) {
            window.open(GE_HRMS_STAGING_URL, 'blank')
          } else if((window.location.href).includes(GE_PROD_URL)) {
            window.open(GE_HRMS_PROD_URL, 'blank')
          }
        }, 500);
      } else {
        localStorage.setItem("token", 
          'Y203bXoyeTYyMDAwMDRvdzVhNW15ZzlwNw.FDC8fZuL8b9vm8ID6MtDE15kHVVOIdnUMH8K4fJz78Eyra4YNT2Fer2ggX-n');
        tok = localStorage.getItem("token");
        getUserLoggedInDetails();
      }
    }
    
    if(url_base.includes(GE_PROD_URL)) {
      axios.defaults.baseURL = GE_API_PROD_URL
    } else {
      axios.defaults.baseURL = GE_API_STAGING_URL
    }
  }, [])
  
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location}/>
          </Route>
          <Route path={`/task-completion-report-print/:id`} exact>
            <TaskPrintLayout direction={direction} location={location} id={param.id}/>
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  return { locale, token, direction }
};

export default withRouter(connect(mapStateToProps)(Views));