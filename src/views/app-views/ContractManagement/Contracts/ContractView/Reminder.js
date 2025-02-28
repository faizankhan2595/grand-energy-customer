import { Button, DatePicker, Input, message, Table, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'

function Reminder({ reminder,contractData }) {

    const [remindersData, setRemindersData] = useState(reminder);
    const removeReminder = (record) => {
        let newRemindersData = remindersData.filter((elem) => elem.sr_no !== record.sr_no);
        setRemindersData(newRemindersData);
    }
    const handleAddReminder = () => {
        setRemindersData([...remindersData, {
            sr_no: remindersData.length + 1,
            date: null,
            title: '',
            description: '',
        }]);
    };
    const reminderColumns = [
        {
            title: 'Sr. No.',
            dataIndex: 'sr_no',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (_, record) => {
                return (
                    <div>
                        <DatePicker value={record.date} className='w-100' onChange={(e) => {
                            let data = remindersData
                            let index = remindersData.findIndex((elem) => elem === record)
                            data[index].date = e
                            setRemindersData([...data])
                        }} />
                    </div>
                );
            },
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (_, record) => {
                return (
                    <div>
                        <TimePicker value={record.time} className='w-100' format={'HH:mm A'} use12Hours={true} onChange={(e) => {
                            let data = remindersData
                            let index = remindersData.findIndex((elem) => elem === record)
                            data[index].time = e;
                            setRemindersData([...data])
                        }} />
                    </div>
                );
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (_, record) => {
                return (
                    <div>
                        <Input value={record.title} className='w-100' onChange={(e) => {
                            let data = remindersData
                            let index = remindersData.findIndex((elem) => elem === record)
                            data[index].title = e.target.value
                            setRemindersData([...data])
                        }} />
                    </div>
                );
            },
        },
        {
            title: 'Content',
            dataIndex: 'description',
            render: (_, record) => {
                return (
                    <div>
                        <Input value={record.description} className='w-100' onChange={(e) => {
                            let data = remindersData
                            let index = remindersData.findIndex((elem) => elem === record)
                            data[index].description = e.target.value
                            setRemindersData([...data])
                        }} />
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => <Button type='danger' onClick={() => { removeReminder(record) }} className='font-weight-bold'>remove</Button>,
        },
    ];

    const handleSaveReminder = () => {
        for(let i=0; i<remindersData.length; i++){
            if(remindersData[i].date === null || remindersData[i].time === null || remindersData[i].title === '' || remindersData[i].description === ''){
               message.error('Please fill all the fields');
                return;
            }
        }
        updateStatus(contractData);
    }


    const updateStatus = (record) => {
        // date: schema.date(),
        // direct_to_pc: schema.string(),
        // co_regn_no: schema.string(),
        // contract_number: schema.string(),
        // wbs_element: schema.string(),
        // network_activity: schema.string(),
        // officer_in_charge: schema.number(),
        // tc_customer_id: schema.number(),
        // tc_customer_job_site_id: schema.number.optional(),
        // tc_contract_id: schema.number(),
        // tc_quotation_id: schema.number.optional(),
        // start_date: schema.date(),
        // end_date: schema.date(),
        // reminders: schema.array().members(schema.object().anyMembers()),
        // status: schema.string.optional(),

     
        axios({
          method: 'post',
          url: "/api/tc/update-work-order",
          data: {
            id: record.id,
            date:  moment(record.date).format('YYYY-MM-DD'),
            direct_to_pc: record.direct_to_pc,
            co_regn_no: record.co_regn_no,
            contract_number: record.contract_number,
            wbs_element: record.wbs_element,
            network_activity: record.network_activity,
            officer_in_charge: record.officer_in_charge,
            tc_customer_id: record.tc_customer_id,
            tc_customer_job_site_id: record.tc_customer_job_site_id,
            tc_contract_id: record.tc_contract_id,
            tc_quotation_id: record.tc_quotation_id,
            // start_date: record.start_date,
            // end_date: record.end_date,
            start_date: moment(record.start_date).format('YYYY-MM-DD'),
            end_date: moment(record.end_date).format('YYYY-MM-DD'),
            reminders: remindersData,
            status: record.status, 
            line_items: JSON.parse(record.line_items),

          },
    
        }).then(function (response) {
          if (response.data.success) {
            message.success("Reminders Saved Successfully")
    
        
          } else {
            message.error(response.data.msg)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    return (
        <div>
            <div>
                <h4 className="mb-2 mt-4">Reminders</h4>
                <Table columns={reminderColumns} dataSource={remindersData} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '10px',
                }}>
                    <Button type='primary' className='font-weight-bold mt-2' onClick={handleAddReminder}>Add Reminder</Button>
                    <Button type='primary' className='font-weight-bold mt-2 ml-2'
                        onClick={handleSaveReminder}
                    >Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Reminder