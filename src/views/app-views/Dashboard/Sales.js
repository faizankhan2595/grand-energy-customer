import React from 'react'
import { Typography } from 'antd'

import dasboardIcon from "../../../assets/dashboard-icon.svg";
import SalesOrders from './SalesOrders';
import InquiriesChart from './InquiriesChart';
import Inquiries from './Inquiries';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';

const {Title} = Typography;

const Sales = () => {
  return (
    <div>
      {/* Heading */}
      <PageHeading icon={dasboardIcon} title="Dashboard"/>
      {/* Heading */}

      {/* Orders */}  

      <SalesOrders/>

      {/* Orders End */}

      {/* Inquiries */}

      <InquiriesChart/>

      {/*  Inquiries End*/}

      {/*  Inquiries*/}

      <Inquiries/>

      {/* Inquiries End */}
    </div>
  )
}

export default Sales