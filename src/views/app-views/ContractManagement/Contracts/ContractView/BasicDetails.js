import { Card } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

function BasicDetails({customerData}) {

  return (
    <div>
      <Card style={{ background: "#FAFAFB", textAlign: 'start' }} >
        <div className='d-flex justify-content-between'>
          <div className='w-25'>
            <div className='d-flex justify-content-start my-1'>
               <h5>Customer Name: &emsp;</h5>
            </div>
            <div className='d-flex justify-content-start my-1'>
              <h5>Job Site Name: &emsp;</h5>
            </div>
            <div className='d-flex justify-content-start my-1'>
              <h5>Commence Date: &emsp;</h5>
            </div>
            <div className='d-flex justify-content-start my-1'>
              <h5>Type: &emsp;</h5>
            </div>
          </div>
          <div className='w-75'>
            <div className='d-flex justify-content-start my-1'>
              <h5>{ customerData.customer_name }</h5>
            </div>
            <div className='d-flex justify-content-start my-1'>
              <h5>{ customerData.job_site_name }</h5>
            </div>
            <div className='d-flex justify-content-start my-1'>
              <h5>{ moment(customerData.start_date).format("DD-MM-YYYY") }</h5>
             </div> 
            <div className='d-flex justify-content-start my-1'>
              <h5>{ customerData.type }</h5>
              </div>

          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicDetails

// "tc_customer_id": 18,
// "tc_customer_job_site_id": 19,
// "tc_quotation_id": 14,
// "start_date": "2025-02-20",
// "end_date": null,
// "reminder_date": null,
// "type": "None",
// "created_at": "2025-02-19 06:17:07",
// "updated_at": "2025-02-19 06:17:07",
// "reminders": "[]",
// "status": "Upcoming",
// "customer_name": "Tony Test Co",
// "job_site_name": "Test Location KS",
// "customer_image": "https://grand-energy.s3.ap-southeast-1.amazonaws.com/task_document/1736995329359-sMN7.jpeg",
// "tasks": []