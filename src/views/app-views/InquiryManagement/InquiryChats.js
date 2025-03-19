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
          // icon={InquiryManagementPageIcon}
          // svg={InquiryManagementPageIcon}
          title="Inquiry Management / Chats"
        />
      </div>

      <Card >
      <div style={{ display: 'flex', height: '500px' }}>
        <Card.Grid style={{width: "100%"}}>
          <ChatingSection/>
        </Card.Grid>
      </div>
      </Card>

    </>
  )
}

export default InquiryChats