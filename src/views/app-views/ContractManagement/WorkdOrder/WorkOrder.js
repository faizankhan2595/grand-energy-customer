import { Button, Dropdown, Menu, Space, Select, Drawer } from 'antd'
import React, { useState, useEffect } from 'react'
import SearchBox from 'components/shared-components/SearchBox';
import axios from 'axios';
import exportIcon from "assets/svg/exportIcon.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import Icon from "@ant-design/icons"
import { FilterIcon, ItemsAndServicesIcon } from "assets/svg/icon";
import ContractTable from './ContractTable';
import { CSVLink } from "react-csv";
import moment from "moment";

// import { Link } from 'react-router-dom';
// import plusIcon from "assets/svg/plus.svg";
// import UserManagementIcon from "assets/svg/usermManagementPage.svg";
// import filterIcon from "assets/svg/filterIcon.svg";
// import Filter from 'views/app-views/UserManagement/UserList/Filter';


function WorkOrder({id}) {

  const [searchText, setSearchText] = useState('')
  const [setPage, setsetPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState([])
  const [allContractsData, setAllContractsData] = useState([])
  const [current, setCurrent] = useState(['All'])
  const customer_id = localStorage.getItem("customer_id");

  const [allJobsites , setAllJobsites] = useState(false);
  const [allCustomers , setAllCustomers] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
  const [selectedJobsiteFilter , setSelectedJobsiteFilter] = useState(false);
  const [selectedTypeFilter , setSelectedTypeFilter] = useState(false);
  const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
  const [selectedFilter , setSelectedFilter] = useState(false);
  const tok = localStorage.getItem('token')

  const headers = [
    { label: "Sr. No", key: "sr_no" },
    { label: "ID", key: "id" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Jobsite", key: "jobsite_name" },
    { label: "Commence On", key: "commence_on" },
    { label: "Expired On", key: "expire_on" },
    { label: "Status", key: "status" }
  ];

  // const getPdf = async () => {
  //   try {
  //     const response = await axios.post(
  //       "/api/tc/get-customers",
  //       {
  //         page_index: setPage,
  //         search: searchText ? searchText : null,
  //         statuses: statusFilter || ["ACTIVE", "INACTIVE"],
  //         export_type: "pdf"
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${tok}`
  //         },
  //       }
  //     );
  //     console.log(response.data.url); // add this line to log the PDF URL
  //     if (response.data.status) {
  //       return response.data.url;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  

  // async function downloadPDF() {
  //   try {
  //     const pdfUrl = await getPdf();
  //     if (pdfUrl) {
  //       window.open(pdfUrl);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading PDF:", error);
  //   }
  // }
  // const handleClick = () => {}

  const handleFilterClick = (e) => {
    setCurrent([e.key])
    if(e.key === 'ACTIVE') {
      setStatusFilter(['ACTIVE'])
    }else if(e.key === 'INACTIVE') {
      setStatusFilter(['INACTIVE'])
    } else {
      setStatusFilter([])
    }
  }

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
      "/api/tc/get-work-orders",
      {
        page_index: 1,
        page_size: 100000,
        search : null,
        customer_id: customer_id,
        ...id && {contract_id: +id}
      },
    )
    .then((response) => {
      let res = response.data.data.data;

      let fdata = res.map((elem, index) => {
        return {
          sr_no: index+1,
          key: elem.id,
          id: elem.id,
          customer_name: elem.customer_name || elem.tc_customer_id,
          jobsite_name: elem.job_site_name || (elem.tc_customer_job_site_id || '-'),
          contract_type: elem.type,
          commence_on: moment(elem.start_date).format("DD-MM-YYYY"),
          expire_on: moment(elem.end_date).format("DD-MM-YYYY"),
          contract_type: elem.type,
          status: elem.status,
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

  const menuFilter = (
    <Menu onClick={handleFilterClick} selectedKeys={current}>
      <Menu.Item key={'All'}>All</Menu.Item>
      <Menu.SubMenu title="Status">
        <Menu.Item key={'AllStatus'}>All</Menu.Item>
        <Menu.Item key={'ACTIVE'}>ACTIVE</Menu.Item>
        <Menu.Item key={'INACTIVE'}>INACTIVE</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const drawerHandler = () => {
    setDrawerIsOpen((prevState) => {
      console.log("Drawer " + (!prevState ? 'Open':'Closed'));

      return !prevState
    });
  };

  const handleDrawerOk = () => {
    setSelectedFilter((previousState) => !previousState)
    setDrawerIsOpen(false);
  };

  const handleDrawerReset = () => {
    setSelectedFilter((previousState) => !previousState)
    setSelectedCustomerFilter(false)
    setSelectedJobsiteFilter(false)
    setSelectedTypeFilter(false)
    setSelectedStatusFilter(false)

    setDrawerIsOpen(false);
  };

  const onDrawerClose = () => {
    console.log("Closed")
    setDrawerIsOpen(false);
  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        <PageHeading
          // icon={UserManagementIcon}
          title="Work Order"
        />
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between mr-2">
            <SearchBox setSearchText={setSearchText} />

            {
              !id &&  <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
              <Icon className="mr-2" component={FilterIcon} />
              Filters
            </Button>
            }

            <CSVLink data={allContractsData} 
              headers={headers} 
              filename={"All-Work-Orders.csv"}
            >
              <Button className="d-flex align-items-center ml-2" >
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>
            
          </div>
        </div>
      </div>
      <div>
        <ContractTable setsetPage={setsetPage} searchText={searchText} statuses={statusFilter} 
        selectedCustomerFilter={selectedCustomerFilter} selectedJobsiteFilter={selectedJobsiteFilter} 
        selectedStatusFilter={selectedStatusFilter} 
        selectedFilter={selectedFilter} selectedTypeFilter={selectedTypeFilter} id={id}/>
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
          {/* <div className='mb-2'>
            <h4>Contract Type</h4>
            <Select
                showSearch
                placeholder="Status"
                value={selectedTypeFilter}
                onChange={(e) => {setSelectedTypeFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                <Select.Option title={'Ad Hoc'} key={'Ad Hoc'} value={'Ad Hoc'}>{'Ad Hoc'}</Select.Option>
                <Select.Option title={'Routine'} key={'Routine'} value={'Routine'}>{'Routine'}</Select.Option>
            </Select>
          </div> */}
          {/* <div>
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
          </div> */}
        </Drawer>
      </div>
    </>
  )
}

export default WorkOrder