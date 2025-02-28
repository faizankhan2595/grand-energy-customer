import React , {useState, useEffect} from 'react'

import {Table , Button , Tag, Input, Modal, DatePicker, TimePicker, message} from 'antd';
import Avatar from 'assets/Avatar2.png'
import Actions from './Actions';
import axios from "axios";
import moment from "moment";



const ContractTable = ({ setsetPage, searchText, workOrderId, statuses, selectedFilter, selectedCustomerFilter, id,selectedJobsiteFilter, selectedTypeFilter, selectedStatusFilter }) => {
  const [selectedRowKeys , setSelectedRowKeys] = useState([]);
  const [contractsData , setContractsData] = useState([]);
  const [openContractModal, setOpenContractModal] = useState(false);
  const [commencementDate, setCommencementDate] = useState(null);
  const [quoteData, setQuoteData] = useState({});
  const [expiryDate, setExpiryDate] = useState(null);
  const [direct_to_pc, setDirect_to_pc] = useState('');
  const [co_regn_no, setCo_regn_no] = useState('');
  const [contract_number, setContract_number] = useState('');
  const [wbs_element, setWbs_element] = useState('');
  const [network_activity, setNetwork_activity] = useState('');
  const [officer_in_charge, setOfficer_in_charge] = useState('');
  
  const [remindersData, setRemindersData] = useState([]);
  const removeReminder =(record) => {
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
    title: 'Target Completion Date',
    dataIndex: 'target_completion_date',
    render: (_,record) => {
      return (
        <span>
          {record.target_completion_date ? moment(record.target_completion_date).format("DD-MM-YYYY") : '-'}
        </span>
      );
    } 
    
  },
  {
    title: 'Actual Completion Date',
    dataIndex: 'actual_completion_date',
    render: (_,record) => {
      return (
        <span>
          {record.actual_completion_date ? moment(record.actual_completion_date).format("DD-MM-YYYY") : '-'}
        </span>
      );
    } 
    
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_,record) => {
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
    }
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_,record) => <Actions setQuoteData={setQuoteData} contract_id={record.id} record={record} setOpenContractModal={setOpenContractModal} getData={getData}/>,
  },
];
  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler
  }

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-service_entry_sheets",
        {
          page_index: 1,
          page_size: 10,
          ...id && {contract_id: +id},
          ...workOrderId && {work_order_id: +workOrderId},
          // statuses: ["ACTIVE", "INACTIVE"],
          statuses: null,
          search : searchText ? searchText : null,
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
        "/api/tc/get-service_entry_sheets",
        {
          page_index: 1,
          page_size: 10,
          ...id && {contract_id: +id},
          ...workOrderId && {work_order_id: +workOrderId},
          statuses: null,
          search : searchText ? searchText : null,
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

  const getData = ()=>{
    axios
    .post(
      "/api/tc/get-service_entry_sheets",
      {
        page_index: 1,
        page_size: 10,
        statuses: null,
        ...id && {contract_id: +id},
        ...workOrderId && {work_order_id: +workOrderId},
        search : searchText ? searchText : null,
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

  



  
  return (
    <div>
      <Table columns={columns} dataSource={contractsData} />
     
    </div>
  )
}

export default ContractTable