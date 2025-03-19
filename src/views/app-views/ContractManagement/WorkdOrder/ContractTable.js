import React, { useState, useEffect } from 'react'

import { Table, Button, Tag, Input, Modal, DatePicker, TimePicker, message, Select, InputNumber } from 'antd';
import Avatar from 'assets/Avatar2.png'
import Actions from './Actions';
import axios from "axios";
import moment from "moment";
import TextArea from 'antd/lib/input/TextArea';



const ContractTable = ({ setsetPage, searchText, statuses, selectedFilter, selectedCustomerFilter, id, selectedJobsiteFilter, selectedTypeFilter, selectedStatusFilter }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [contractsData, setContractsData] = useState([]);
  const [openContractModal, setOpenContractModal] = useState(false);
  const [commencementDate, setCommencementDate] = useState(null);
  const [contractType, setContractType] = useState(null);
  const [quoteData, setQuoteData] = useState({});
  const [expiryDate, setExpiryDate] = useState(null);
  const customer_id = localStorage.getItem("customer_id");

  const [jobsData, setJobsData] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const [co_regn_no, setCo_regn_no] = useState('');
  const [gl_number, setGl_number] = useState('');
  const [project_number, setProject_number] = useState('');

  const [openJobModal, setOpenJobModal] = useState(false);
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
      title: ' Id',
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
      dataIndex: 'job_site_name',

    },
    // {
    //   title: 'Contract Type',
    //   dataIndex: 'contract_type',

    // },
    {
      title: 'Commence On',
      dataIndex: 'commence_on',

    },
    {
      title: 'Expired On',
      dataIndex: 'expire_on',

    },
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

       
        return (
          <span style={statusStyles} key={record.status}>
            {record.status}
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
      render: (_, record) => <Actions setJobsData={setJobsData} setQuoteData={setQuoteData} contract_id={record.id} record={record} setOpenContractModal={setOpenContractModal} getData={getData} />,
    },
  ];

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
      render: (_, record) => {
        return <Button type="danger" className='mt-2' onClick={() => { removeJob(record) }}>Remove</Button>
      },
    },
  ];

  const handleJobOk = () => {
    if (!description) message.error("Please fill Description");
    if (!quantity) message.error("Please fill Quantity");
    if (!unitPrice) message.error("Please fill Unit Price");

    setJobsData([...jobsData, {
      sr_no: jobsData.length + 1,
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
  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler
  }

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-work-orders",
        {
          page_index: 1,
          page_size: 10,
          ...id && { contract_id: +id },
          // statuses: ["ACTIVE", "INACTIVE"],
          statuses: null,
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
          customer_id: customer_id,
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
            jobsite_name: elem.jobsite_name || (elem.tc_customer_job_site_id || '-'),
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
    axios
      .post(
        "/api/tc/get-work-orders",
        {
          page_index: 1,
          page_size: 10,
          ...id && { contract_id: +id },
          statuses: null,
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
          customer_id: customer_id,
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
            jobsite_name: elem.jobsite_name || (elem.tc_customer_job_site_id || '-'),
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
        "/api/tc/get-work-orders",
        {
          page_index: 1,
          page_size: 10,
          statuses: null,
          ...id && { contract_id: +id },
          search: searchText ? searchText : null,
          customer_id: selectedCustomerFilter || null,
          job_site_id: selectedJobsiteFilter || null,
          status: selectedStatusFilter || null,
          contract_type: selectedTypeFilter || null,
          customer_id: customer_id,
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
            jobsite_name: elem.jobsite_name || (elem.tc_customer_job_site_id || '-'),
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

    setCo_regn_no('');
    setGl_number('');
    setProject_number('');
    setDescription('');
    setQuantity(null);
    setUnitPrice(null);
    setJobsData([]);
  };

  const handleContractOk = () => {
    console.log(quoteData);
    // if (!commencementDate || !expiryDate || !direct_to_pc || !co_regn_no || !contract_number || !wbs_element || !network_activity || !officer_in_charge) {
    //   message.error('Please fill all the fields');
    //   return;
    // }
    if (!commencementDate || !expiryDate || !contractType || !gl_number || !project_number || !co_regn_no) {
      message.error('Please fill all the fields');
      return;
    }


    axios
      .post(
        "/api/tc/new-service_entry_sheet",
        {
          tc_quotation_id: quoteData.quotation_id,
          date: moment(),
          tc_contract_id: quoteData.tc_contract_id,
          tc_customer_id: quoteData.tc_customer_id,
          tc_customer_job_site_id: quoteData.tc_customer_job_site_id || null,
          tc_quotation_id: quoteData.tc_quotation_id,
          tc_work_order_id: quoteData.id,
          target_completion_date: moment(commencementDate),
          actual_completion_date: moment(expiryDate),
          order_type: contractType,
          gl_number: gl_number,
          project_number: project_number,
          co_regn_no: co_regn_no,
          line_items: (jobsData),

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
        setGl_number('');
        setProject_number('');
        setCo_regn_no('');

        getData();
        window.location.reload();


        // updateStatus();
        message.success('Service TimeSheet created successfully');
        // updateQuotationStatus();
      })
      .catch((error) => {
        console.log(error);
        setOpenContractModal(false);
        message.error('Work Order creation failed');
      });
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
        title={'Create Service Entry Sheet'}
        footer={[
          <Button style={{ color: '#F5F5F5' }} type='primary' className='font-weight-bold' onClick={handleContractOk}>Save</Button>,
          <Button style={{ color: '#000B23' }} onClick={handleContractCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
      >
        <div className='w-100'>
          <h4 className="mb-2 mt-4">Target Completion Date</h4>
          <DatePicker value={commencementDate} onChange={commencementDateChange} />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Actual Completion Date</h4>
          <DatePicker value={expiryDate} onChange={expiryDateChange} />
        </div>
        <div className='w-100'>
          <h4 className="mb-2 mt-4">GL Number</h4>
          <Input value={gl_number} onChange={(e) => {
            setGl_number(e.target.value)
          }}
          />

        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">Project Number</h4>
          <Input value={project_number} onChange={(e) => {
            setProject_number(e.target.value)
          }}
          />
        </div>

        <div className='w-100'>
          <h4 className="mb-2 mt-4">CO Regn No</h4>
          <Input value={co_regn_no} onChange={(e) => {
            setCo_regn_no(e.target.value)
          }}
          />
        </div>




        <div className='w-100'>
          <h4 className="mb-2 mt-4">Contract Type</h4>
          <Select
            className='w-100'
            showSearch
            placeholder="Contract Type"
            value={contractType}
            onChange={(e) => {
              setContractType(e)
            }}
          >
            <Select.Option title={'None'} key={0} value={'None'}>{'None'}</Select.Option>
            <Select.Option title={'Ad Hoc'} key={1} value={'Ad Hoc'}>{'Ad Hoc'}</Select.Option>
            <Select.Option title={'Routine'} key={2} value={'Routine'}>{'Routine'}</Select.Option>
          </Select>
        </div>

        <div className="mb-3">
          <Table columns={columns2} dataSource={jobsData} />
          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={funOpenJobModal} className='mt-2'>Add Job</Button>
          </div>
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
          <Button style={{ color: '#000B23' }} onClick={() => {
            setDescription('');
            setQuantity(null);
            setUnitPrice(null);
            setOpenJobModal(false);
          }} className='font-weight-bold'>Cancel</Button>,
        ]}
      >
        <div>
          <h4 className="mb-2">Description</h4>
          <TextArea rows={4} onChange={onChangeDesc} value={description} />
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