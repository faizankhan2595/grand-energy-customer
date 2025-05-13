import React, { useState, useEffect } from "react";
import { Button, Drawer, InputNumber, DatePicker, Modal, Input, Select } from "antd";
import Icon from "@ant-design/icons"
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import { FilterIcon, ItemsAndServicesIcon, ExportIcon } from "assets/svg/icon";
import exportIcon from "assets/svg/exportIcon.svg";

import Export from "./Export-ItemsAndServices";
import QuotationTable from "./QuotationTable";
import { Link , useRouteMatch  } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import moment from "moment";
// import { Item } from "rc-menu";
import classes from './Quotations.css';
const Quotations = () => {

  const match = useRouteMatch();
  const [showExportOption , setShowExportOption] = useState(false);
  const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
  const [selectedJobsiteFilter , setSelectedJobsiteFilter] = useState(false);
  const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
  const [selectedFilter , setSelectedFilter] = useState(false);
  const [searchText , setSearchText] = useState('');
  const customer_id = localStorage.getItem("customer_id");

  const [allJobsites , setAllJobsites] = useState(false);
  const [allCustomers , setAllCustomers] = useState(false);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [allQuotationsData, setAllQuotationsData] = useState([]);
  const headers = [
    { label: "Sr. No", key: "sr_no" },
    { label: "Quotation ID", key: "id" },
    { label: "Customer Name", key: "customerName" },
    { label: "Jobsite", key: "jobsite" },
    { label: "Inquiry Date", key: "inquiryDate" },
    { label: "Quotation Date", key: "quotationDate" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" }
  ];

  const exportHandler = () => {
    setShowExportOption(prev => !prev);
  }

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

  
  const exportModal = (
    <Modal onclose={exportHandler}>
      <Export onClose={exportHandler}/>
    </Modal>
  )
  
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
      "/api/tc/get-quotations",
      {
        page_index: 1,
        page_size: 100000,
        search : null,
        customer_id: customer_id
      },
    )
    .then((response) => {
      let res = response.data.data.data;

      let fdata = res.map((elem, index) => {
        // let other_details = {};
        // if(elem.other_details) {
        //   other_details = JSON.parse(elem.other_details);
        // }
        return {
          sr_no: index+1,
          key: elem.id,
          id: elem.id,
          jobsite_id: elem.tc_customer_job_site_id,
          customer_id: elem.tc_customer_id,
          customerName: elem.customer_name,
          jobsite: elem.jobsite_name || '',
          inquiryDate: elem.inquiry_date ? moment(elem.inquiry_date).format('DD-MM-YYYY HH:mm A'):'-',
          quotationDate: moment(elem.task_period_from_date).format('DD-MM-YYYY'),
          amount: elem.total,
          status: elem.status || 'Quote Sent',
        };
      });

      setAllQuotationsData(fdata.reverse());
    })
    .catch((error) => {
      console.log(error);
    });

    getAllCustomers();
    getAllJobsites();
  }, []);

  return (
    <React.Fragment>
      <div className='d-flex justify-content-between'>
        <PageHeading
          title="Quotations"
        />
        
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between mr-2">
            <SearchBox setSearchText={setSearchText} />
            
            <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
              <Icon className="mr-2" component={FilterIcon} />
              Filters
            </Button>

            <CSVLink data={allQuotationsData} 
              headers={headers} 
              filename={"All-Quotations.csv"}
            >
              <Button className="d-flex align-items-center ml-2">
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>

            {
              localStorage.getItem("name") === 'System Admin' &&
               <Link to="/app/contract-management/quotations/add-new-quotation" className="ml-2">
              <Button
                className="d-flex align-items-center"
                type="primary"
                size="small"
              >
                Create New Quotation
              </Button>
            </Link>
            }
          </div>
        </div>
      </div>

      <div>
        <QuotationTable searchText={searchText} selectedCustomerFilter={selectedCustomerFilter} selectedJobsiteFilter={selectedJobsiteFilter} selectedStatusFilter={selectedStatusFilter} selectedFilter={selectedFilter} />
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
                <Select.Option title={'Quote Accepted'} key={'Quote Accepted'} value={'Quote Accepted'}>{'Quote Accepted'}</Select.Option>
                <Select.Option title={'Quote Rejected'} key={'Quote Rejected'} value={'Quote Rejected'}>{'Quote Rejected'}</Select.Option>
                <Select.Option title={'Quote Sent'} key={'Quote Sent'} value={'Quote Sent'}>{'Quote Sent'}</Select.Option>
                <Select.Option title={'Contract Generated'} key={'Contract Generated'} value={'Contract Generated'}>{'Contract Generated'}</Select.Option>
            </Select>
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  );
};

export default Quotations;
