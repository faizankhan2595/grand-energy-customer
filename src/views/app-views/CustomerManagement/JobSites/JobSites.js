import React, { useState, useEffect } from 'react'
import { Button, Space, Menu, Dropdown, Select } from 'antd'
import axios from 'axios';
import { CSVLink } from "react-csv";

import SearchBox from 'components/shared-components/SearchBox';
import exportIcon from "assets/svg/exportIcon.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import JobSiteTable from './JobSiteTable';

// import UserManagementIcon from "assets/svg/usermManagementPage.svg";
// import { Link } from 'react-router-dom';
// import filterIcon from "assets/svg/filterIcon.svg";
// import plusIcon from "assets/svg/plus.svg";
// import Filter from 'views/app-views/UserManagement/UserList/Filter';
// import CustomerTable from './JobSiteTable';

function JobSites() {

  const [searchText, setSearchText] = useState('')
  const [companyList, setCompanyList] = useState([])
  const tok = localStorage.getItem('token')
  const [current, setCurrent] = useState(['All'])
  // const [customers, setCustomers] = useState(['All'])
  const [companyFilter, setCompanyFilter] = useState([])
  const [allJobsitesData, setAllJobsitesData] = useState([]);
  const headers = [
    { label: "Sr. No", key: "sr_no" },
    { label: "ID", key: "id" },
    { label: "Jobsite", key: "jobsite" },
    { label: "Jobsite Address", key: "jobSiteAddress" },
    { label: "Company", key: "company" },
    { label: "Staff Assigned", key: "total_staffs" },
    { label: "Tasks", key: "total_tasks" },
    { label: "Status", key: "status" }
  ];

  const getCompanyList = ()=> {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: 1,
          page_size: 100000,
          statuses: ["ACTIVE", "INACTIVE", "PENDING APPROVAL"],
          search : null,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        let res = response.data.data.data;
        console.log(res);
        setCompanyList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFilterClick = (e) => {
    console.log(e)
    setCurrent([e.key])
    if(e.key != 'All' && e.key != 'AllCompany') {
      setCompanyFilter([+e.key])
    }else {
      setCompanyFilter([])
    }
  }

  const getAllJobsites = () => {
    axios
    .post(
      "/api/tc/get-customer-job-sites",
      {
        page_index: 1,
        page_size: 100000,
        search : null,
        customer_id : null,
      },
    )
    .then((response) => {
      let res = response.data.data.data;

      let fdata = res.map((elem, index) => {
        let other_details = {};
        if(elem.other_details) {
          other_details = JSON.parse(elem.other_details);
        }
        return {
          sr_no: index+1,
          key: index+1,
          id: elem.id,
          jobsite: elem.name,
          jobSiteAddress: elem.address ? elem.address : `${elem.unit_number} ${elem.street_number}, ${elem.block_number} ${elem.postal_code}, ${elem.country}`,
          company: elem.customer_name,
          phoneNumber: elem?.phone,
          emailId: elem?.email,
          noOfUsers: elem?.total_customer_users || 0,
          img: { image: elem?.img, name: elem.name },
          staffAssign: elem.staffAssign,
          tasks: elem.tasks,
          revenue: elem.revenue || 0,
          outstandingAmt: elem.outstandingAmt || 0,
          total_tasks: elem.total_tasks || 0,
          total_staffs: elem.total_staffs || 0,
          status: elem.status,
          action: "",
        };
      });

      setAllJobsitesData(fdata);
      console.log(fdata)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getCompanyList();    
    getAllJobsites();    
  }, []);
  

  // const menuFilter = (
  //   <Menu onClick={handleFilterClick} selectedKeys={current}>
  //     <Menu.Item key={'All'}>All</Menu.Item>
  //     <Menu.SubMenu title="Company">
  //       <Menu.Item key={"AllCompany"}>All</Menu.Item>
  //       {companyList.map((item)=> {
  //         return <Menu.Item key={item.id}>{item.name}</Menu.Item>
  //       })}
  //     </Menu.SubMenu>
  //   </Menu>
  // );

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageHeading
          // icon={UserManagementIcon}
          title="Job Sites"
        />
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between">
            <SearchBox setSearchText={setSearchText}/>

            {/* <Dropdown overlay={menuFilter} trigger={['click']}>
              <Button className="d-flex align-items-center ml-2">
                <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
                Filters
              </Button>
            </Dropdown> */}


            <CSVLink data={allJobsitesData} 
              headers={headers} 
              filename={"All-Jobsites.csv"}
            >
              <Button className="d-flex align-items-center mx-2" >
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>

            <Select onChange={setCompanyFilter} style={{width: '150px'}} placeholder={"Customer"}>
              {companyList.map((elem, index) => {
                return (
                  <Select.Option key={index} value={elem.id}>
                    {elem.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div>
        <JobSiteTable searchText={searchText} id={companyFilter[0]} customer_id={companyFilter}/>
      </div>
    </>
  )
}

export default JobSites