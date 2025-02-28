import { Button, Space, Select, Drawer } from 'antd'
import React, { useState, useEffect } from 'react'
import SearchBox from 'components/shared-components/SearchBox';
import exportIcon from "assets/svg/exportIcon.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import TaskTable from './TaskTable';
import axios from 'axios';
import { CSVLink } from "react-csv";
import moment from "moment";
import { FilterIcon } from "assets/svg/icon";
import Icon from "@ant-design/icons"

// import TaskManagement from "assets/svg/TaskManagement.svg";
// import { Link } from 'react-router-dom';
// import filterIcon from "assets/svg/filterIcon.svg";
// import Filter from 'views/app-views/UserManagement/UserList/Filter';


function Tasks() {
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('')
  const [allContractsData, setAllContractsData] = useState([]);

  const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
  const [selectedJobsiteFilter , setSelectedJobsiteFilter] = useState(false);
  const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
  const [selectedFilter , setSelectedFilter] = useState(false);
  const [allJobsites , setAllJobsites] = useState(false);
  const [allCustomers , setAllCustomers] = useState(false);
  
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const headers = [
    { label: "Contract ID", key: "id" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Jobsite", key: "jobsite_name" },
    { label: "No of Tasks", key: "total_tasks" },
    { label: "Staff Assigned", key: "total_Staffs" },
    { label: "Status", key: "status" }
  ];

  const drawerHandler = () => {
    setDrawerIsOpen((prevState) => {
      console.log("Drawer " + (!prevState ? 'Open':'Closed'));

      return !prevState
    });
    // setDrawerIsOpen(true);
  };

  const handleDrawerOk = () => {
    setSelectedFilter((previousState) => !previousState)
    // if(selectedCustomerFilter || selectedJobsiteFilter || selectedStatusFilter) {
    // } else setSelectedFilter(false);
    setDrawerIsOpen(false);
  };

  const onDrawerClose = () => {
    console.log("Closed")
    setDrawerIsOpen(false);
  };

  const handleDrawerReset = () => {
    setSelectedFilter((previousState) => !previousState)
    setSelectedCustomerFilter(false)
    setSelectedJobsiteFilter(false)
    setSelectedStatusFilter(false)

    setDrawerIsOpen(false);
  };

  const getAllJobsites = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-customer-job-sites",
      data: {
        page_index: 1,
        page_size: 100000,
        customer_id: null,
        search : null
      }
    }).then((response) => {
        if (response.data.success) {
          setAllJobsites(response.data.data.data)
        }
        console.log("Job sites data fetched")
        console.log(response.data.data.data)
    }).catch((err) => {
        console.log(err)
    });
  };
  
  const getAllCustomers = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-customers",
      data: {
        page_index: 1,
        page_size: 100000,
        customer_id: null,
        search : null
      }
    }).then((response) => {
        if (response.data.success) {
          setAllCustomers(response.data.data.data)
        }
        console.log("Customers data fetched")
        console.log(response.data.data.data)
    }).catch((err) => {
        console.log(err)
    });
  };

  useEffect(() => {
    axios
    .post(
      "/api/tc/get-contracts",
      {
        page_index: 1,
        page_size: 100000,
        search : null,
      },
    )
    .then((response) => {
      let res = response.data.data.data;

      let fdata = res.map((elem, index) => {
        return {
          key: elem.id,
          id: elem.id,
          customer_name: elem.customer_name || elem.tc_customer_id,
          jobsite_name: elem.job_site_name,
          contract_type: elem.type,
          commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
          expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
          contract_type: elem.type,
          total_tasks: elem.total_tasks  || 0,
          total_staffs: elem.total_staffs  || 0,
          status: elem.status || 'Expired',
        };
      });

      setAllContractsData(fdata);
    })
    .catch((error) => {
      console.log(error);
    });

    getAllCustomers();
    getAllJobsites();
  }, []);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <PageHeading
          // icon={TaskManagement}
          title="Customer Tasks"
        />
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between">
            <SearchBox setSearchText={setSearchText}/>

            <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
              <Icon className="mr-2" component={FilterIcon} />
              Filters
            </Button>

            <CSVLink data={allContractsData} 
              headers={headers} 
              filename={"All-Quotations.csv"}
            >
              <Button className="d-flex align-items-center ml-2" >
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>
          </div>
        </div>
      </div>
      <div>
        <TaskTable searchText={searchText} selectedCustomerFilter={selectedCustomerFilter} 
        selectedJobsiteFilter={selectedJobsiteFilter} selectedStatusFilter={selectedStatusFilter} 
        selectedFilter={selectedFilter} />
      </div>

      <div>
      <Drawer title="Filter"
          placement="right"
          onClose={onDrawerClose} 
          open={drawerIsOpen}
          closable={true}
          // getContainer={false}
          visible={drawerIsOpen}
          footer={[
            <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold mr-2' onClick={handleDrawerOk}>Apply</Button>,
            <Button key={'cancel'} style={{ color: '#000B23' }} onClick={() => {handleDrawerReset()}} className='font-weight-bold'>Reset</Button>,
          ]}
        >
          <div className="mb-2">
            <h4>Customer</h4>
            <Select
                showSearch
                placeholder="Jobsite"
                // optionFilterProp="children"
                // filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                // filterSort={(optionA, optionB) =>
                //     (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                // }
                value={selectedCustomerFilter}
                onChange={(e) => {setSelectedCustomerFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                {allCustomers && allCustomers.map((val, id) => (
                    <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                ))}
            </Select>
          </div>
          <div className="mb-2">
            <h4>Jobsite</h4>
            <Select
                showSearch
                placeholder="Jobsite"
                value={selectedJobsiteFilter}
                onChange={(e) => {setSelectedJobsiteFilter(e)}}
                className="w-100"
            >    
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                {allJobsites && allJobsites.map((val, id) => (
                    <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                ))}
            </Select>
          </div>
          <div>
            <h4>Status</h4>
            <Select
                showSearch
                placeholder="Status"
                value={selectedStatusFilter}
                onChange={(e) => {setSelectedStatusFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                <Select.Option title={'Active'} key={'Active'} value={'Active'}>{'Active'}</Select.Option>
                <Select.Option title={'Expired'} key={'Expired'} value={'Expired'}>{'Expired'}</Select.Option>
            </Select>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default Tasks