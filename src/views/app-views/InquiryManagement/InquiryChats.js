import React from 'react'

import { Card } from 'antd'

import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import AllInbox from './AllInbox'
import ChatingSection from './ChatingSection'


import { InquiryManagementPageIcon } from 'assets/svg/icon'
import Inquiries from './Inquiries'

const InquiryChats = () => {
  return (
    <>
      <div>
        <PageHeading
          icon={InquiryManagementPageIcon}
          svg={InquiryManagementPageIcon}
          title="Inquiry Management / Chats"
        />
      </div>

      <Card >
        <Card.Grid style={{width: "20%"}}><AllInbox/></Card.Grid>
        <Card.Grid style={{width: "30%"}}><Inquiries/></Card.Grid>
        <Card.Grid style={{width: "50%"}}><ChatingSection/></Card.Grid>
      </Card>

    </>
  )
}

export default InquiryChats