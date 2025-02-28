import { Button, Dropdown, Menu, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import SearchBox from 'components/shared-components/SearchBox';
import { Link } from 'react-router-dom';
import exportIcon from "assets/svg/exportIcon.svg";
import plusIcon from "assets/svg/plus.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import CustomerTable from './CustomerTable';
import axios from 'axios';
import { CSVLink } from "react-csv";
// import UserManagementIcon from "assets/svg/usermManagementPage.svg";
// import filterIcon from "assets/svg/filterIcon.svg";
// import Filter from 'views/app-views/UserManagement/UserList/Filter';


function CustomerAccounts() {
  const [allCustomerAccountData, setAllCustomerAccountData] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState([])
  const [current, setCurrent] = useState(['All'])
  // const tok = localStorage.getItem('token')
  const headers = [
    { label: "Sr. No", key: "sr_no" },
    { label: "Customer ID", key: "id" },
    { label: "Customer Company", key: "company" },
    { label: "Contact Number", key: "phoneNumber" },
    { label: "Email ID", key: "emailId" },
    { label: "Created By", key: "created_by" },
    { label: "Status", key: "status" }
  ];

  useEffect(() => {
    axios
    .post(
      "/api/tc/get-customers",
      {
        page_index: 1,
        page_size: 100000,
        search : null,
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
          company: elem.name || '',
          phoneNumber: elem.phone || '',
          emailId: elem.email || '',
          status: elem.status || 'Pending Approval',
          created_by: other_details.created_by || '',
        };
      });

      setAllCustomerAccountData(fdata);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  

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

  return (
    <>
      <div className='d-flex justify-content-between'>
        <PageHeading
          // icon={UserManagementIcon}
          title="Customer Accounts"
        />
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between mr-2">
            <SearchBox setSearchText={setSearchText} />

            <CSVLink data={allCustomerAccountData} 
              headers={headers} 
              filename={"All-Customers.csv"}
            >
              <Button className="d-flex align-items-center ml-2 mr-2" >
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>

            <Link to="/app/customer-management/customer-accounts/add-new">
              <Button
                className="d-flex align-items-center"
                type="primary"
                size="medium"
              >
                <img className="mr-2" src={plusIcon} alt="plusIcon"></img>
                Add New
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <CustomerTable setPage={setPage} searchText={searchText} 
        statuses={statusFilter} />
      </div>
    </>
  )
}

export default CustomerAccounts