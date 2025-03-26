import React, { useEffect, useState } from "react";

import dasboardIcon from "../../../assets/dashboard-icon.svg";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { Typography, DatePicker } from "antd";
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
import axios from "axios";
import moment from "moment";


const { Title } = Typography;
const { RangePicker } = DatePicker;

const Finance = () => {
  const customer_id = localStorage.getItem("customer_id");
  // console.log(DashboardOutlined);
  const [dashboardData, setDashboardData] = useState({
    "totals": {
        "invoices": 0,
        "contracts": 0,
        "work_orders": 0,
        "invoices_amount": 0,
        "quotations_amount": 0,
        "payments_amount": 0,
        "payments_due": 0
    },
    "chart": {
        "data": [],
        "labels": []
    },
    "top_customers": [],
    "top_services": []
  })
  const [dateRange, setDateRange] = useState([
    moment().startOf('year'),
    moment().endOf('year'),
  ])

  const getDashboardData = (range) => {
    axios
    .post(
        "/api/dashboard-grand-energy",
        {
          // start_date: moment().startOf('year'),
          // end_date: moment().endOf('year'),
          start_date: moment(range[0]).format('YYYY-MM-DD'),
          end_date: moment(range[1]).format('YYYY-MM-DD'),
          customer_id: customer_id
        },
      )
      .then((response) => {
        let res = response.data;
        console.log(res);
        setDashboardData(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDashboardData(dateRange)
  }, [])

  return (
    <>
      {/* Heading */}
      <div className="d-lg-flex justify-content-between">
        <PageHeading title="Dashboard" />
        <div>
          <RangePicker value={dateRange} format={'DD-MM-YYYY'} onChange={(e)=> {
            console.log(e)
            if(e && e[0] && e[1]) {
              // let start = moment(e[0].toDate()).format('YYYY-MM-DD')
              // let end = moment(e[1].toDate()).format('YYYY-MM-DD')
              // console.log(start, end)
              setDateRange(e)
              getDashboardData(e)
            }
          }}/>
        </div>
      </div>
      {/* Heading */}




      {/* Main */}
      <div className="d-lg-flex ">

        {/* {Left Side} */}
        <div className="mr-2 w-50">
          <div className="w-100" >
            <DataDisplayWidget
              // icon={<BarChartOutlined />}
              value={dashboardData.totals.invoices}
              title="Total Invoices"
              // text="Compare to last year (2023)"
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
              value={dashboardData.totals.contracts}
              title="Total Contracts"
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
              value={dashboardData.totals.work_orders}
              title="Total Work Orders"
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
                value={`$ ${dashboardData.totals.invoices_amount}`}
                text="Invoices Total"
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
                value={`$ ${dashboardData.totals.quotations_amount}`}
                text="Quotations Total"
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
                value={`$ ${dashboardData.totals.payments_amount}`}
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
                value={`$ ${dashboardData.totals.payments_due}`}
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
        {/* <Chart/> */}
      </div>

      
    </>
  );
};

export default Finance;
