import React, { useState, useEffect } from 'react'

import { Table, Button, Tag, Input, Modal, DatePicker, TimePicker, message, Select, InputNumber } from 'antd';
import Avatar from 'assets/Avatar2.png'
import Actions from './Actions';
import axios from "axios";
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { set } from 'lodash';



const ContractTable = ({ setPage, searchText, statuses, selectedFilter, selectedCustomerFilter, selectedJobsiteFilter, selectedTypeFilter, selectedStatusFilter }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [contractsData, setContractsData] = useState([]);
  const [openContractModal, setOpenContractModal] = useState(false);
  const [commencementDate, setCommencementDate] = useState(null);
  const [quoteData, setQuoteData] = useState({});
  const [expiryDate, setExpiryDate] = useState(null);
  const [direct_to_pc, setDirect_to_pc] = useState('');
  const [co_regn_no, setCo_regn_no] = useState('');
  const [contract_number, setContract_number] = useState('');
  const location = useLocation();
  const [wbs_element, setWbs_element] = useState('');
  const [network_activity, setNetwork_activity] = useState('');
  const [officer_in_charge, setOfficer_in_charge] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const { TextArea } = Input;
  const [allUsers, setAllUsers] = useState([])
  const removeJob = (record) => {
    let jobs = jobsData.filter((e) => e != record);
    setJobsData(jobs)
  }
  const onChangeDesc = (event) => {
    setDescription(event.target.value)
  }

  const onChangeProvisional = (value) => {
    setQuantity(value)
  }

  const onChangeUnit = (value) => {
    setUnitPrice(value)
  }
 const columns2 = [
    {
      title: 'SR NO',
      dataIndex: 'sr_no',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'name',
    },
    {
      title: 'QTY',
      dataIndex: 'quantity',
    },
    {
      title: 'UNIT PRICE',
      dataIndex: 'price',
    },
    {
      title: 'SUBTOTAL',
      dataIndex: 'total',
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_,record) => {
        return <Button type="danger" className='mt-2' onClick={()=>{removeJob(record)}}>Remove</Button>
      },
    },
  ];

    const handleJobOk = () => {
      if(!description) message.error("Please fill Description");
      if(!quantity) message.error("Please fill Quantity");
      if(!unitPrice) message.error("Please fill Unit Price");
  
      setJobsData([...jobsData, {
        sr_no: jobsData.length+1,
        name: description,
        quantity: quantity,
        price: unitPrice,
        total: (+quantity * +unitPrice) || 0
        // total: (+jobDetailsTemp.provisionalQty * +jobDetailsTemp.unitPrice) || 0
      }]);
      setDescription('');
      setQuantity(null);  
      setUnitPrice(null);
      setOpenJobModal(false);
    }
  const getAllUsers = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-users",
      // data: values,

    }).then(function (response) {
      console.log(response.data);
      if (response.data.success) {
        setAllUsers(response.data.data)

      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  const [remindersData, setRemindersData] = useState([]);
  const removeReminder = (record) => {
    let newRemindersData = remindersData.filter((elem) => elem.sr_no !== record.sr_no);
    setRemindersData(newRemindersData);
  }


  const selectChangeHandler = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleContractCancel = () => {
    setOpenContractModal(false);
  };


  const columns = [
    {
      title: 'Contract Id',
      dataIndex: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.customerName - b.customerName,
    },
    {
      title: 'Jobsite',
      dataIndex: 'jobsite_name',

    },
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',

    },
    {
      title: 'Commence On',
      dataIndex: 'commence_on',

    },
    // {
    //   title: 'Expired On',
    //   dataIndex: 'expire_on',

    // },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => {
        const statusStyles = {
          color: "#00AB6F",
          backgroundColor: "#EDFFF9",
          padding: "4px 8px",
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: "14px",
        };

        if (record.status === "Completed") {
          return <span style={statusStyles}>Completed</span>;
        }
        const isBeforeToday = moment(record.start_date, "YYYY-MM-DD").isBefore(moment().startOf("day"));

        return (
          <span style={statusStyles}>
            {isBeforeToday ? "Ongoing" : "Upcoming"}
          </span>
        );
        // if(record.status.toUpperCase()==='EXPIRED') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Expired</span>
        // else if(record.status.toUpperCase()==='INACTIVE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
        // else return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <Actions updateStatus={updateStatus} setQuoteData={setQuoteData} contract_id={record.id} record={record} setOpenContractModal={setOpenContractModal} getData={getData} />,
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler
  }

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-contracts",
        {
          page_index: 1,
          page_size: 10,
          // statuses: ["ACTIVE", "INACTIVE"],
          statuses: null,
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            ...elem,
            key: elem.id,
            id: elem.id,
            customer_name: elem.customer_name || elem.tc_customer_id,
            jobsite_name: elem.job_site_name || (elem.tc_customer_job_site_id || '-'),
            contract_type: elem.type,
            commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
            expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
            contract_type: elem.type,
            status: elem.status,
            start_date: elem.start_date,
          };
        });
        setContractsData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText]);

  useEffect(() => {
    getAllUsers()
    axios
      .post(
        "/api/tc/get-contracts",
        {
          page_index: 1,
          page_size: 10,
          statuses: null,
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            ...elem,
            key: elem.id,
            id: elem.id,
            customer_name: elem.customer_name || elem.tc_customer_id,
            jobsite_name: elem.job_site_name || (elem.tc_customer_job_site_id || '-'),
            contract_type: elem.type,
            commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
            expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
            contract_type: elem.type,
            status: elem.status,
            start_date: elem.start_date,
          };
        });
        setContractsData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFilter]);


  const getData = () => {
    axios
      .post(
        "/api/tc/get-contracts",
        {
          page_index: 1,
          page_size: 10,
          statuses: null,
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
        },
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);

        let fdata = res.map((elem, ind) => {
          return {
            ...elem,
            key: elem.id,
            id: elem.id,
            customer_name: elem.customer_name || elem.tc_customer_id,
            jobsite_name: elem.job_site_name || (elem.tc_customer_job_site_id || '-'),
            contract_type: elem.type,
            commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
            expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
            contract_type: elem.type,
            status: elem.status,
            start_date: elem.start_date,
          };
        });
        setContractsData(fdata);
      })
      .catch((error) => {
        console.log(error);
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


  const handleCancel = () => {
    setOpenContractModal(false);
    setOpenJobModal(false);
    setCommencementDate(null);
    setExpiryDate(null);
    setRemindersData([]);
    setDirect_to_pc('');
    setCo_regn_no('');
    setContract_number('');
    setWbs_element('');
    setNetwork_activity('');
    setOfficer_in_charge('');
    setDescription('');
    setQuantity(null);
    setUnitPrice(null);
    setJobsData([]);
  };

  const handleContractOk = () => {
    console.log(quoteData);
    if (!commencementDate || !expiryDate || !direct_to_pc || !co_regn_no || !contract_number || !wbs_element || !network_activity || !officer_in_charge) {
      message.error('Please fill all the fields');
      return;
    }
    if(jobsData.length === 0){
      message.error('Please add job details');
      return;
    }

    // let data = quotationsData.find((elem) => elem.id === quoteData.quotation_id);
    // console.log(data);
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
    axios
      .post(
        "/api/tc/new-work-order",
        {
          tc_quotation_id: quoteData.quotation_id,
          date: moment(),
          tc_contract_id: quoteData.id,
          tc_customer_id: quoteData.tc_customer_id,
          tc_customer_job_site_id: quoteData.tc_customer_job_site_id || null,
          tc_quotation_id: quoteData.tc_quotation_id,
          start_date: moment(commencementDate),
          end_date: moment(expiryDate),
          reminders: remindersData,
          direct_to_pc: direct_to_pc,
          co_regn_no: co_regn_no,
          contract_number: contract_number,
          wbs_element: wbs_element,
          network_activity: network_activity,
          officer_in_charge: officer_in_charge,
          line_items: jobsData,
          // reminders: remindersData,
          // type: contractType,
          status: 'Active'
        },
      )
      .then((response) => {
        console.log(response);
        setCommencementDate(null);
        setExpiryDate(null);

        setRemindersData([]);
        setOpenContractModal(false);
        setDirect_to_pc('');
        setCo_regn_no('');
        setContract_number('');
        setWbs_element('');
        setNetwork_activity('');
        setOfficer_in_charge('');



        message.success('Word Order created successfully');
        // updateQuotationStatus();
      })
      .catch((error) => {
        console.log(error);
        setOpenContractModal(false);
        message.error('Work Order creation failed');
      });
  };
  const updateStatus = (record, status) => {


    // id: schema.number(),
    // tc_customer_id: schema.number(),
    // tc_customer_job_site_id: schema.number.optional(),
    // tc_quotation_id: schema.number(),
    // start_date: schema.date(),
    // end_date: schema.date(),
    // reminder_date: schema.date.optional(),
    // reminders: schema.array().members(schema.object().anyMembers()),
    // type: schema.string(),
    // status: schema.string.optional(),
    axios({
      method: 'post',
      url: "/api/tc/update-contract",
      data: {
        id: record.id,
        tc_customer_id: record.tc_customer_id,
        tc_customer_job_site_id: record.tc_customer_job_site_id,
        tc_quotation_id: record.tc_quotation_id,
        start_date: moment(record.start_date, "YYYY-MM-DD"),
        end_date: moment(record.end_date, "YYYY-MM-DD"),
        // reminder_date:  ,
        reminders: JSON.parse(record.reminders),
        type: record.type,
        status: status,
      },

    }).then(function (response) {
      if (response.data.success) {
        message.success("Contract Status Updated Successfully")

        getData();
      } else {
        message.error(response.data.msg)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
  const handleJobCancel = () => {
    setOpenJobModal(false);
  };
  const funOpenJobModal = () => {
    setOpenJobModal(true)
  }

  return (
    <div>
      <Table columns={columns} dataSource={contractsData} />
      <Modal
        visible={openContractModal}
        centered
        maskClosable
        width={900}
        onCancel={handleCancel}
        title={'Create Work Order'}
        footer={[
          <Button style={{ color: '#F5F5F5' }} type='primary' className='font-weight-bold' onClick={handleContractOk}>Save</Button>,
          <Button style={{ color: '#000B23' }} onClick={handleContractCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
      >
        <div className='w-100'>
          <h4 className="mb-2 mt-4">Date Of Commencement of Work</h4>
          <DatePicker value={commencementDate} onChange={commencementDateChange} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Date of Expiration of Work</h4>
          <DatePicker value={expiryDate} onChange={expiryDateChange} />
        </div>
        <div className='w-100'>
          <h4 className="mb-2 mt-4">Direct to PC</h4>
          <Input value={direct_to_pc} onChange={(e) => setDirect_to_pc(e.target.value)} />


        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">CO Regn No.</h4>
          <Input value={co_regn_no} onChange={(e) => setCo_regn_no(e.target.value)} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Contract Number</h4>
          <Input value={contract_number} onChange={(e) => setContract_number(e.target.value)} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">WBS Element</h4>
          <Input value={wbs_element} onChange={(e) => setWbs_element(e.target.value)} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Network Activity</h4>
          <Input value={network_activity} onChange={(e) => setNetwork_activity(e.target.value)} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Officer in Charge</h4>
          {/* <Input type='number' value={officer_in_charge} onChange={(e) => setOfficer_in_charge(e.target.value)}
                
              /> */}
          <Select
            // suffixIcon={<AddUserIcon/>}
            showSearch
            style={{
              width: 200,
            }}
            // mode='multiple'
            placeholder="Officer in Charge"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            value={officer_in_charge}
            onChange={(e) => setOfficer_in_charge(e)}
          >
            {allUsers.map((val, id) => (
              <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
            ))}
            {/* <Select.Option value={1}>John Smith</Select.Option>
                                            <Select.Option value={2}>Jane Cooper</Select.Option> */}
          </Select>
        </div>

        <div className="mb-3">
          <Table columns={columns2} dataSource={jobsData} />
          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={funOpenJobModal} className='mt-2'>Add Job</Button>
          </div>
        </div>

        <div>
          <h4 className="mb-2 mt-4">Reminders</h4>
          <Table columns={reminderColumns} dataSource={remindersData} />
          <Button type='primary' className='font-weight-bold mt-2' onClick={handleAddReminder}>Add Reminder</Button>
        </div>

      </Modal>
      <Modal
        visible={openJobModal}
        centered
        maskClosable
        onCancel={handleCancel}
        title={'Job Details'}
        footer={[
            <Button type="primary" className='font-weight-bold' onClick={handleJobOk}>Save</Button>,
            <Button style={{ color: '#000B23' }} onClick={()=>{
              setDescription('');
              setQuantity(null);  
              setUnitPrice(null);
              setOpenJobModal(false);
            }} className='font-weight-bold'>Cancel</Button>,
      ]}
      >   
        <div>
            <h4 className="mb-2">Description</h4>
            <TextArea rows={4} onChange={onChangeDesc} value={description}/>
        </div>

        <div>
            <h4 className="mb-2 mt-2"> Quantity</h4>
            <InputNumber min={0} onChange={onChangeProvisional} value={quantity} />
        </div>

        <div>
            <h4 className="mb-2 mt-2">Unit Price</h4>
            <InputNumber min={0} onChange={onChangeUnit} value={unitPrice} />
        </div>
      </Modal>
    </div>
  )
}

export default ContractTable