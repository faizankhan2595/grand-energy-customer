import React , {useState, useEffect} from "react";

import { Button, Drawer, Select } from "antd";
import Icon from "@ant-design/icons"

import SearchBox from "components/shared-components/SearchBox";
import Filter from "components/shared-components/Filter";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Export from "./Export-InquiryManagement";
import Modal from "components/UI/Modal";
import InquiryListTable from "./InquiryListTable";
import { Link , useRouteMatch  } from "react-router-dom";
import { PlusIcon } from "assets/svg/icon";
import { InquiryManagementPageIcon , FilterIcon , ExportIcon} from "assets/svg/icon";
import axios from "axios";
import exportIcon from "assets/svg/exportIcon.svg";
import { CSVLink } from "react-csv";
import moment from "moment";

const InquiryList = () => {

  const [showExportOption, setShowExportOption] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
  const [selectedInquiryModeFilter , setSelectedInquiryModeFilter] = useState(false);
  const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
  const [selectedFilter , setSelectedFilter] = useState(false);
  const [allJobsites , setAllJobsites] = useState(false);
  const [allCustomers , setAllCustomers] = useState(false);
  const customer_id = localStorage.getItem("customer_id");

  const [allInquiries , setAllInquiries] = useState([]);
  const headers = [
    { label: "Sr. No", key: "sr_no" },
    { label: "Inquiry ID", key: "id" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Email Id", key: "email" },
    { label: "Mobile Number", key: "mobile" },
    { label: "Inquiry Date", key: "inquiry_date" },
    { label: "Inquiry Channel", key: "inquiry_channel" },
    { label: "Status", key: "status" }
  ];
  

  const exportHandler = () => {
    setShowExportOption((prev) => !prev);
  };

  const exportModal = (
    <Modal onclose={exportHandler}>
      <Export onClose={exportHandler} />
    </Modal>
  );
  
  const drawerHandler = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  const handleDrawerOk = () => {
    setSelectedFilter((previousState) => !previousState)
    setDrawerIsOpen(false);
  };

  const handleDrawerReset = () => {
    setSelectedFilter((previousState) => !previousState)
    setSelectedInquiryModeFilter(false)
    setSelectedStatusFilter(false)

    setDrawerIsOpen(false);
  };

  const onDrawerClose = () => {
    console.log("Closed")
    setDrawerIsOpen(false);
  };

  const getAllInquiries = () => {
    axios
    .post(
      "/api/tc/get-inquiries",
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
        return {
          ...elem,
            sr_no: index+1,
            key: elem.id,
            id: elem.id,
            customer_name: elem.customer_name || elem.tc_customer_id,
            email: elem.email || '-',
            mobile: elem.mobile || '-',
            dateOfInquiry: moment(elem.created_at).format("DD-MM-YYYY"),
            status: elem.status,
        };
      });

      setAllInquiries(fdata);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getAllInquiries();
  }, [])
  


  return (
    <>
      {showExportOption && exportModal}
      <div className="d-flex justify-content-between align-items-center">
        <PageHeading
          // icon={InquiryManagementPageIcon}
          // svg={InquiryManagementPageIcon}
          title="Inquiry List"
        />
        <div className=" d-flex align-items-center justify-content-end">
          <SearchBox setSearchText={setSearchText} />

          <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
            <Icon className="mr-2" component={FilterIcon} />
              Filters
          </Button>
          
          <CSVLink data={allInquiries} 
              headers={headers} 
              filename={"All-Inquiries.csv"}
            >
              <Button className="d-flex align-items-center ml-2" >
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
          </CSVLink>

          {/* <Link to="/app/inquiry-management/add-new-inquiry">
              <Button
                className="ml-2 d-flex align-items-center"
                type="primary"
                size="medium"
              >
                <Icon component={PlusIcon}/>
                Add new
              </Button>
          </Link> */}
        </div>
      </div>

      <InquiryListTable allInquiries={allInquiries} setAllInquiries={setAllInquiries}
      selectedInquiryModeFilter={selectedInquiryModeFilter} 
      selectedStatusFilter={selectedStatusFilter} 
      selectedFilter={selectedFilter} />

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
          {/* <div>
            <h4>Inquiry Channel</h4>
            <Select
                showSearch
                placeholder="Status"
                value={selectedStatusFilter}
                onChange={(e) => {setSelectedStatusFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'Whatsapp'} key={'Whatsapp'} value={'Whatsapp'}>{'Whatsapp'}</Select.Option>
                <Select.Option title={'Email'} key={'Email'} value={'Email'}>{'Email'}</Select.Option>
                <Select.Option title={'Web App'} key={'Web App'} value={'Web App'}>{'Web App'}</Select.Option>
            </Select>
          </div> */}
          <div>
            <h4>Status</h4>
            <Select
                showSearch
                placeholder="Status"
                value={selectedStatusFilter}
                onChange={(e) => {setSelectedStatusFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'Open'} key={'Open'} value={'Open'}>{'Open'}</Select.Option>
                <Select.Option title={'Quote Sent'} key={'Quote Sent'} value={'Quote Sent'}>{'Quote Sent'}</Select.Option>
                <Select.Option title={'Quote Accepted'} key={'Quote Accepted'} value={'Quote Accepted'}>{'Quote Accepted'}</Select.Option>
                <Select.Option title={'Closed'} key={'Closed'} value={'Closed'}>{'Closed'}</Select.Option>
            </Select>
          </div>
      </Drawer>
    </>
  );
};

export default InquiryList;
