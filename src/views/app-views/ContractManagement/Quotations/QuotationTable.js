import React , {useState, useEffect} from 'react'
import {Table , Button , Tag, Input, InputNumber, Select, Radio, DatePicker, TimePicker, Modal, message} from 'antd';
import Actions from './Actions';
import axios from "axios";
import moment from "moment";
// import get from 'lodash/get';
// import Avatar from 'assets/Avatar2.png'

const {TextArea} = Input

const QuotationTable = ({ setsetPage, statuses, searchText, selectedFilter, selectedCustomerFilter, selectedJobsiteFilter, selectedStatusFilter }) => {
  const [quotationsData , setQuotationsData] = useState([]);
  // const [selectedRowKeys , setSelectedRowKeys] = useState([]);
  const [jobSiteData , setJobSiteData] = useState(false);
  const customer_id = localStorage.getItem("customer_id");
  
  const [openContractModal , setOpenContractModal] = useState(false);
  const [quoteData , setQuoteData] = useState(null);
  const [commencementDate , setCommencementDate] = useState(false);
  const [expiryDate , setExpiryDate] = useState(false);
  const [remindersData , setRemindersData] = useState([]);
  const [contractType , setContractType] = useState(false);

  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [status, setStatus] = useState("Accepted");
  const [remark, setRemark] = useState(false);

  const removeReminder =(record) => {
    let newRemindersData = remindersData.filter((elem) => elem.sr_no !== record.sr_no);
    setRemindersData(newRemindersData);
  }

  // const getQuotationJobsite = (jobsite_id) => {
  //   let jobsite = jobSiteData.find((elem) => elem.id === jobsite_id);
  //   return jobsite ? jobsite.name : '';
  // }

  const columns = [
    {
      title: 'Quotation Id',
      dataIndex: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Jobsite',
      dataIndex: 'jobsite',
      render: (_,record) => <span>{record.jobsite || "-"}</span>,
      
    },
    {
      title: 'Inquiry Date',
      dataIndex: 'inquiryDate',
      
    },
    {
      title: 'Quotation Date',
      dataIndex: 'quotationDate',
      
    },
    {
      title: 'Amount(S$)',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_,record) => {
        if(record.status==='Accepted') return <span style={{color: "#00AB6F", backgroundColor: "#01D2891A", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Quote Accepted</span>
        if(record.status==='Contract Generated') return <span style={{color: "#5772FF", backgroundColor: "#5772FF1A", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Contract Generated</span>
        if(record.status==='Rejected') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Quote Rejected</span>
        else return <span style={{color: "#0698A6", backgroundColor: "#07B1C11A", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Quote Sent</span>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_,record) => <Actions setOpenContractModal={setOpenContractModal} id={record.id} 
      quotationData={record} setOpenStatusModal={setOpenStatusModal} setQuoteData={setQuoteData} getQuotations={getQuotations} />,
    },
  ];
  
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
            }}/>
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
            }}/>
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
            }}/>
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
            }}/>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_,record) => <Button type='danger' onClick={() => {removeReminder(record)}} className='font-weight-bold'>remove</Button>,
    },
  ];

  // const ShowContractModal = () => {
  //   setOpenContractModal(true);
  // };

  const handleCancel = () => {
    setOpenContractModal(false);
  };

  const handleContractOk = () => {
    console.log(quoteData);
    // let data = quotationsData.find((elem) => elem.id === quoteData.quotation_id);
    // console.log(data);
    axios
      .post(
        "/api/tc/new-contract",
        {
          tc_quotation_id: quoteData.quotation_id,
          tc_customer_id: quoteData.customer_id,
          tc_customer_job_site_id: quoteData.customer_job_site_id || null,
          start_date: moment(commencementDate),
          // end_date: moment(expiryDate),
          reminders: remindersData,
          type: contractType,
          status: 'Active'
        },
      )
      .then((response) => {
        console.log(response);
        setCommencementDate(null);
        setExpiryDate(null);
        setContractType(null);
        setRemindersData([]);
        setOpenContractModal(false);
        message.success('Contract created successfully');
        updateQuotationStatus();
      })
      .catch((error) => {
        console.log(error);
        setOpenContractModal(false);
        message.error('Contract cannot be created, please try again later');
      });
  };

  const updateQuotationStatus = () => {
    console.log(quoteData);
    axios
    .post(
      "/api/tc/update-quotation",
      {
        ...quoteData,
        id: quoteData.id,
        tc_customer_id: quoteData.customer_id,
        status: 'Contract Generated'
      },
    )
    .then((response) => {
      let res = response.data;
      console.log(res);
      getQuotations();
    })
    .catch((error) => {
      console.log(error);
    }); 
  };

  const handleContractCancel = () => {
    setOpenContractModal(false);
  };

  const handleAddReminder = () => {
    setRemindersData([...remindersData, {
      sr_no: remindersData.length + 1,
      date: null,
      title: '',
      description: '',
    }]);
  };

  const getJobSites = () => {
    axios({
        method: 'post',
        url: "/api/tc/get-customer-job-sites",
        data: {
            page_index: 1,
            page_size: 100000,
            search : '',
            customer_id: null
        }
    }).then((response) => {
        console.log(response.data.data.data)
        if (response.data.success) {
          setJobSiteData(response.data.data.data)
        }
    }).catch((err) => {
        console.log(err)
    });
  }

  const commencementDateChange = (date) => {
    // contractData.date_of_commencement = date;
    // let newContractData = contractData;
    // newContractData.date_of_commencement = date;
    // console.log(newContractData);

    setCommencementDate(date);
  }

  const expiryDateChange = (date) => {
    setExpiryDate(date);
  }

  const contractTypeChange = (event) => {
    setContractType(event);
  }

  const handleStatusOk = () => {
    console.log(quoteData);
    axios
    .post(
      "/api/tc/update-quotation",
      {
        ...quoteData,
        id: quoteData.id,
        tc_customer_id: quoteData.customer_id,
        status: status
      },
    )
    .then((response) => {
      let res = response.data;
      console.log(res);
      setOpenStatusModal(false);
      getQuotations();
    })
    .catch((error) => {
      console.log(error);
    });
      
  };
  const handleStatusCancel = () => {
      setStatus("")
      setRemark("")
      setOpenStatusModal(false);
  };

  const getQuotations = () => {
    axios
      .post(
        "/api/tc/get-quotations",
        {
          page_index: 1,
          page_size: 15,
          statuses: [],
          search : searchText ? searchText : '',
          customer_id: customer_id
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            key: ind,
            id: elem.id,
            customer_id: elem.tc_customer_id,
            jobsite_id: elem.tc_customer_job_site_id,
            customerName: elem.customer_name,
            jobsite: elem.jobsite_name,
            inquiryDate: elem.inquiry_date ? moment(elem.inquiry_date).format('DD-MM-YYYY HH:mm A'):'-',
            // quotationDate: moment(elem.task_period_from_date),
            quotationDate: moment(elem.task_period_from_date).format('DD-MM-YYYY'),
            amount: elem.total,
            status: elem.status || 'Quote Sent',
            
            tc_customer_id: elem.tc_customer_id,
            task_period_from_date: moment(elem.task_period_from_date),
            task_period_to_date: moment(elem.task_period_to_date),
            due_date: moment(elem.due_date),
            sub_total: elem.sub_total || 0,
            tax: elem.gst || 8,
            discount: elem.discount || 0,
            total: elem.total,
            tc_quotation_file: elem.tc_quotation_file,
            quotation_remarks: elem.quotation_remarks || '',
            line_items: elem.line_items || [],
          };
        });
        setQuotationsData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-quotations",
        {
          page_index: 1,
          page_size: 15,
          statuses: [],
          search : searchText ? searchText : '',
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          customer_id: customer_id
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            key: ind,
            id: elem.id,
            customer_id: elem.tc_customer_id,
            jobsite_id: elem.tc_customer_job_site_id,
            customerName: elem.customer_name,
            jobsite: elem.job_site_name,
            inquiryDate: elem.inquiry_date ? moment(elem.inquiry_date).format('DD-MM-YYYY HH:mm A'):'-',
            // quotationDate: moment(elem.task_period_from_date),
            quotationDate: moment(elem.task_period_from_date).format('DD-MM-YYYY'),
            amount: elem.total,
            status: elem.status || 'Quote Sent',
            
            tc_customer_id: elem.tc_customer_id,
            task_period_from_date: moment(elem.task_period_from_date),
            task_period_to_date: moment(elem.task_period_to_date),
            due_date: moment(elem.due_date),
            sub_total: elem.sub_total || 0,
            tax: elem.gst || 8,
            discount: elem.discount || 0,
            total: elem.total,
            tc_quotation_file: elem.tc_quotation_file,
            quotation_remarks: elem.quotation_remarks || '',
            line_items: elem.line_items || [],
          };
        });
        setQuotationsData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText]);

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-quotations",
        {
          page_index: 1,
          page_size: 15,
          statuses: [],
          search : searchText ? searchText : '',
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          customer_id: customer_id
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            key: ind,
            id: elem.id,
            customer_id: elem.tc_customer_id,
            jobsite_id: elem.tc_customer_job_site_id,
            customerName: elem.customer_name,
            jobsite: elem.job_site_name,
            inquiryDate: elem.inquiry_date ? moment(elem.inquiry_date).format('DD-MM-YYYY HH:mm A'):'-',
            // quotationDate: moment(elem.task_period_from_date),
            quotationDate: moment(elem.task_period_from_date).format('DD-MM-YYYY'),
            amount: elem.total,
            status: elem.status || 'Quote Sent',
            
            tc_customer_id: elem.tc_customer_id,
            task_period_from_date: moment(elem.task_period_from_date),
            task_period_to_date: moment(elem.task_period_to_date),
            due_date: moment(elem.due_date),
            sub_total: elem.sub_total || 0,
            tax: elem.gst || 8,
            discount: elem.discount || 0,
            total: elem.total,
            tc_quotation_file: elem.tc_quotation_file,
            quotation_remarks: elem.quotation_remarks || '',
            line_items: elem.line_items || [],
          };
        });
        setQuotationsData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFilter]);

  useEffect(() => {
    getJobSites()
  }, [])
  

  return (
    <div>
      <Table columns={columns} dataSource={quotationsData} scroll={{ x:1100 }} />

      <Modal
        visible={openStatusModal}
        centered
        maskClosable
        onCancel={() => {setOpenStatusModal(false);}}
        title={'Quotation Status'}
        footer={[
            <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleStatusOk}>Save</Button>,
            <Button key={'cancel'} style={{ color: '#000B23' }} onClick={handleStatusCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
        >   
        <div>
            <Radio.Group
                size="small" 
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={"Accepted"}
            >
                <Radio value="Accepted" defaultChecked> Accepted </Radio>
                <Radio value="Rejected"> Rejected</Radio>
            </Radio.Group>
        </div>

        <div>
            <h4 className="mb-2 mt-4">Remarks</h4>
            <TextArea rows={4} onChange={(e) => setRemark(e.target.value)} value={remark} />
        </div>
      </Modal>

      <Modal
          visible={openContractModal}
          centered
          maskClosable
          width={900}
          onCancel={handleCancel}
          title={'Create Contract'}
          footer={[
              <Button style={{ color: '#F5F5F5' }} type='primary' className='font-weight-bold' onClick={handleContractOk}>Save</Button>,
              <Button style={{ color: '#000B23' }} onClick={handleContractCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
        >
          <div className='w-50'>
              <h4 className="mb-2 mt-4">Date Of Commencement of Work</h4>
              <DatePicker value={commencementDate} onChange={commencementDateChange}/>
          </div>

          {/* <div className='w-50'>
              <h4 className="mb-2 mt-4">Date of Expiration of Work</h4>
              <DatePicker value={expiryDate} onChange={expiryDateChange}/>
          </div> */}

          {/* <div>
              <h4 className="mb-2 mt-4">Reminders</h4>
              <Table columns={reminderColumns} dataSource={remindersData} />
              <Button type='primary' className='font-weight-bold mt-2' onClick={handleAddReminder}>Add Reminder</Button>
          </div> */}

          <div className='w-50'>
              <h4 className="mb-2 mt-4">Contract Type</h4>
              <Select
                className='w-100'
                showSearch
                placeholder="Contract Type"
                value={contractType}
                onChange={contractTypeChange}
              >
                <Select.Option title={'None'} key={0} value={'None'}>{'None'}</Select.Option>
                <Select.Option title={'Ad Hoc'} key={1} value={'Ad Hoc'}>{'Ad Hoc'}</Select.Option>
                <Select.Option title={'Routine'} key={2} value={'Routine'}>{'Routine'}</Select.Option>
              </Select>
          </div>
      </Modal>
    </div>
  )
}

export default QuotationTable