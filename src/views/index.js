import React, {useState} from "react";
import { Route, Switch, Redirect, withRouter, useLocation, useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const currentAppLocale = AppLocale[locale];
  const search = useLocation().search;
  const token = localStorage.getItem("token");
  const param = useParams();
  let url_base = window.location.href;
  
  useBodyClass(`dir-${direction}`);

  const getUserLoggedInDetails = async ()=> {
    // let tok = localStorage.getItem("token");
    // console.log(tok)
    axios({
        method: 'get',
        url: "/api/getLoggedInUsersDetails",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {}
      }).then((response) => {
        // console.log(response)
        if(response.data.success) {
          const res = response.data.user_details;
          localStorage.setItem("name", res.name);
          localStorage.setItem("email", res.email);
          localStorage.setItem("profile_pic", res.profile_pic);
          return true
        } else {
          if(response.data.errors) {
            console.log(response.data.errors.message)
            message.error(response.data.errors.message);
            history.push('/auth/login')
          } else message.error('Something went wrong! please try again later');
          return false
        }
      }).catch((err) => {
        console.log(err.message);
        if(err.status == 401) {
          message.error('Session expired! please login again');
          // localStorage.clear();
          history.push('/auth/login')
        } else {
          message.error('Something went wrong! please try again later');
        }
        return false
    });
  }
  
  React.useEffect(() => {
    let is_staging = (window.location.href).includes('grand-energy-customer-staging');
    let is_prod = (window.location.href).includes('grand-energy-customer-prod');
    let is_local = (window.location.href).includes('localhost');

    if(is_prod 
      || is_staging 
      || is_local
    ) {
      let loginCheck = getUserLoggedInDetails();
      if (token) {
      } else {
        setTimeout(() => {
        }, 1000);
      }
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
        localStorage.setItem(
          "token",
          "Y203eWdvdjN3MDAwMGNmdzVhbjl2aHN0ZQ.M8FLmyX-_GjRHLQgzaLS_jF4K0fhccDMVswWywar0qTKlPJzFqLIaaQCZ3HS");
        // tok = localStorage.getItem("token");
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
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location} />
          </Route>
          <Route path={`/task-completion-report-print/:id`} exact>
            <TaskPrintLayout
              direction={direction}
              location={location}
              id={param.id}
            />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  return { locale, token, direction }
};

export default withRouter(connect(mapStateToProps)(Views));