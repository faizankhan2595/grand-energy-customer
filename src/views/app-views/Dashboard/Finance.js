import React, { useEffect, useState } from "react";

import dasboardIcon from "../../../assets/dashboard-icon.svg";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { Typography } from "antd";
import Chart from "./Chart";
// import {payment} from '../../../assets/svg/icon'
import invoiceIcon from '../../../assets/svg/invoice.svg'
import payment from "../../../assets/svg/payment.svg";
import profit  from "assets/svg/profit.svg";
import  paymentDue  from "assets/svg/paymentDue.svg";

import {
  DashboardOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import moment from "moment";
import axios from "axios";


const { Title } = Typography;

const Finance = () => {
  // console.log(DashboardOutlined);
  const [dashboardData, setDashboardData] = useState({})

  const getDashboardData = () => {
    axios
    .post(
        "/api/api/dashboard-grand-energy",
        {
          start_date: moment().startOf('year'),
          end_date: moment().endOf('year'),
        },
      )
      .then((response) => {
        let res = response.data;
        console.log(res);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDashboardData()
  }, [])
  

  return (
    <>
      {/* Heading */}
  
      <PageHeading icon={dasboardIcon} title="Dashboard" />
      {/* Heading */}




      {/* Main */}
      <div className="d-lg-flex ">




        {/* {Left Side} */}
        <div className="mr-2 w-50">
          <div className="w-100" >
            <DataDisplayWidget
              // icon={<BarChartOutlined />}
              value="$0"
              title="Revenue"
              text="Compare to last year (2023)"
              color="cyan"
              size={"lg"}
              avatarSize={50}
              vertical={true}
              alignItems="start"
              elementName= "left"
            />
          </div>
          <div className="w-100">
            <DataDisplayWidget
              // icon={<BarChartOutlined />}
              value="$0"
              title="Sales"
              text="Compare to last year (2023)"
              color="cyan"
              size={"lg"}
              avatarSize={50}
              vertical={true}
              alignItems="start"
              elementName= "left"
            />
          </div>
          <div className="w-100">
            <DataDisplayWidget
              // icon={<BarChartOutlined />}
              value="$0"
              title="Expenses"
              text="Compare to last year (2023)"
              color="cyan"
              size={"lg"}
              avatarSize={50}
              vertical={true}
              alignItems="start"
              elementName= "left"
            />
          </div>
        </div>
        {/* {Left side end} */}





        {/* {Right side} */}
        <div className="d-block ml-4 w-50">
          <div className="d-flex">
            <div className="mr-4 w-50">
              <DataDisplayWidget
                icon={invoiceIcon}
                value="$0"
                text="Total Invoices"
                color="cyan"
                size={"md"}
                
                vertical={true}
                alignItems="center"
                elementName= "right"
                iconBgColor= "#FFF5CC"
              />
            </div>
            <div className="w-50">
              <DataDisplayWidget
                icon={profit}
                value="$0"
                text="Total Profit"
                color="cyan"
                size={"md"}
                
                vertical={true}
                classes="my-card"
                alignItems="center"
                elementName= "right"
                iconBgColor= "#EAE6FF"
              />
            </div>
          </div>
          <div className="d-flex">
            <div  className="mr-4 w-50">
              <DataDisplayWidget
                icon={payment}
                value="$0"
                text="Payments"
                color="cyan"
                size={"md"}
                
                vertical={true}
                alignItems="center"
                elementName= "right"
                iconBgColor= "#D8FCE5"
              />
            </div>
            <div className="w-50">
              <DataDisplayWidget
                icon={paymentDue}
                value="$0"
                text="Payments Due"
                color="cyan"
                size={"md"}
                
                vertical={true}
                classes="my-card"
                alignItems="center"
                elementName= "right"
                iconBgColor= "#FFE5E5"
              />
            </div>
          </div>
        </div>
        {/* {Right side end} */}




      </div>

      {/* {Main end} */}


      <div>
        <Chart/>
      </div>

      
    </>
  );
};

export default Finance;
