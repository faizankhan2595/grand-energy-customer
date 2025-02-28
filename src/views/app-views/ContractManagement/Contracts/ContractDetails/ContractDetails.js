import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Menu, Table, Tabs, Dropdown, Card, Tag } from 'antd';
import { AddressDetailsActiveIcon, AddressDetailsIcon, InvoiceActiveIcon, InvoiceIcon, PaymentsActiveIcon, PaymentsIcon, UserManagementActiveIcon, BasicDetailsIcon, BasicDetailsActiveIcon, UserManagementIcon } from 'views/app-views/UserManagement/SvgIcons'
import filterIcon from "assets/svg/filterIcon.svg";
import exportIcon from "assets/svg/exportIcon.svg";
import plusIcon from "assets/svg/plus.svg";
import { Link, useParams } from 'react-router-dom';
import Filter from 'views/app-views/UserManagement/UserList/Filter';
import { Successfully } from 'configs/svgIcons';
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit';
import axios from 'axios';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import Payments from 'views/app-views/CustomerManagement/CustomerAccounts/Payments';
import InvoiceTable from 'views/app-views/CustomerManagement/CustomerAccounts/InvoiceTable';
import ContractBasicDetails from './ContractBasicDetails';
import TaskTable from 'views/app-views/TaskManagement/Tasks/TaskTable';
import Icon from "@ant-design/icons";

const ContractDetails = ({customerData, searchText, setSearchText, setHeaders, currActiveKey, setCurrActiveKey, isExporting, setIsExporting, setExportData}) => {
  const [contractData, setContractData] = useState({})
  const param = useParams();

  const tabs = [
      {
          title: "Basic Details",
          icon: BasicDetailsIcon,
          activeIcon: BasicDetailsActiveIcon,
      },
      {
          title: "Invoices",
          icon: InvoiceIcon,
          activeIcon: InvoiceActiveIcon,
      },
      {
          title: "Payments",
          icon: PaymentsIcon,
          activeIcon: PaymentsActiveIcon,
      },
      {
          title: "Payments",
          icon: PaymentsIcon,
          activeIcon: PaymentsActiveIcon,
      },
  ]

  const tabChangeHandler = (key) => {
    setCurrActiveKey(key);

    setSearchText('');
    // if(+key == 2) {
    //     setHeaders([
    //         // { label: "Sr. No", key: "sr_no" },
    //         { label: "ID", key: "id" },
    //         { label: "Jobsite Name", key: "name" },
    //         { label: "Jobsite Address", key: "address" },
    //         { label: "Company", key: "customer_name" },
    //         { label: "Staff Assigned", key: "total_staffs" },
    //         { label: "Tasks", key: "total_tasks" },
    //         { label: "Status", key: "status" }
    //     ])
    //     setJobsitesData()
    // }
    // if(+key == 3) {
    //     setHeaders([
    //         { label: "Sr. No", key: "sr_no" },
    //         { label: "ID", key: "userId" },
    //         { label: "Associate Name", key: "userName" },
    //         { label: "Address", key: "address" },
    //         { label: "Contact Number", key: "mobileNumber" },
    //         { label: "Associate Type", key: "associate_type" },
    //         { label: "Status", key: "status" }
    //     ])
    //     setAssociatesData()
    // }
    // if(+key == 4) {
    //     setHeaders([
    //         // { label: "Sr. No", key: "index" },
    //         { label: "ID", key: "id" },
    //         { label: "Contract ID", key: "tc_contract_id" },
    //         { label: "Jobsite Name", key: "jobsite_name" },
    //         { label: "Total Tasks", key: "total_tasks" },
    //         { label: "Net Amount (S$)", key: "total" },
    //         { label: "Paid amount (S$)", key: "amount_paid" },
    //         { label: "Invoice Date", key: "created_at" },
    //         { label: "Status", key: "status" }
    //     ])
    //     setInvoicesData()
    // }
    // if(+key == 5) {
    //     setHeaders([
    //         // { label: "Sr. No", key: "index" },
    //         { label: "ID", key: "id" },
    //         { label: "Contract ID", key: "tc_contract_id" },
    //         { label: "Jobsite Name", key: "jobsite_name" },
    //         { label: "Total Tasks", key: "total_tasks" },
    //         { label: "Net Amount (S$)", key: "total" },
    //         { label: "Paid amount (S$)", key: "amount_paid" },
    //         { label: "Payment Date", key: "created_at" },
    //         { label: "Status", key: "status" }
    //     ])
    //     setPaymentsData()
    // }
};

  const getContract = () => {
    axios({
        method: 'post',
        url: "/api/tc/get-contract",
        data: { id: param.id }
    }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
            setContractData(response.data.data)
        }
    }).catch((err) => {
        console.log(err)
    });
  }

  useEffect(() => {
    getContract();
  }, [])

  const content = [
    <ContractBasicDetails />,
    <InvoiceTable searchText={searchText} custId={+param.id}/>,
    <Payments searchText={searchText} custId={+param.id}/>,
    <TaskTable />
  ];

  return (
    <>
      <Card>
          <div style={{
                    display: "flex",
                    gap: "10px"
          }}>
               <div style={{
                        width: "50px", height: "50px", borderRadius: "100%",
                    }}>
                   <img src={contractData.customer_image} style={{
                            borderRadius: "100%",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover"
                        }} />
               </div>
               <div style={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column"
                    }}>
                   <div>
                       <div style={{
                                color: "#5772FF",
                                fontSize: "14px"
                            }}>{
                                    contractData.customer_name
                                } 
                                {/* <Tag color='success' >Active</Tag> */}
                                {contractData.status && 
                                (contractData.status.toUpperCase()==='ACTIVE' ? 
                                    <span className='ml-2' style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span> :
                                    (contractData.status.toUpperCase()==='EXPIRED' ? <span className='ml-2' style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>{contractData.status}</span> : 
                                    <span className='ml-2' style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>{'Inactive'}</span> )
                                )}
                        </div>
                   </div>
                   <div>
                       <div ><span style={{
                                fontWeight: "bold"
                            }}>Jobsite:  </span>{
                                    contractData.job_site_name
                                } </div>
                   </div>
                   <div>
                            {contractData.type} | {moment(contractData.created_at).format("DD-MM-YYYY")}
                   </div>
                   <div style={{
                            display: "flex",
                            gap: "30px"
                        }}>
                       <div>Date of Commencement <span style={{
                                fontWeight: "bold"
                            }}>{moment(contractData.start_date).format("DD-MM-YYYY")}</span></div>
                       <div>Date of Expire <span style={{
                                fontWeight: "bold"
                            }}>
                                {moment(contractData.end_date).format("DD-MM-YYYY")}
                       </span></div>
                   </div>
               </div>
          </div>
      </Card>

      <Tabs
            activeKey={currActiveKey}
            size="large"
            onChange={tabChangeHandler}
            // tabBarExtraContent={ extraBottons}
        >
            <Tabs.TabPane
                tab={
                    <span className="d-flex align-items-center hover-color">
                        <Icon
                            component={currActiveKey === "1" ? tabs[0].activeIcon : tabs[0].icon}
                        />
                        {tabs[0].title}
                    </span>
                }
                key="1"
            >
                {content[0]}
            </Tabs.TabPane>
            <Tabs.TabPane
                tab={
                    <span className="d-flex align-items-center hover-color">
                        <Icon
                            component={currActiveKey === "2" ? tabs[1].activeIcon : tabs[1].icon}
                        />
                        {tabs[1].title}
                    </span>
                }
                key="2"
            >
                {content[1]}
            </Tabs.TabPane>
            <Tabs.TabPane
                tab={
                    <span className="d-flex align-items-center hover-color">
                        <Icon
                            component={currActiveKey === "3" ? tabs[2].activeIcon : tabs[2].icon}
                        />
                        {tabs[2].title}
                    </span>
                }
                key="3"
            >
                {content[2]}
            </Tabs.TabPane>
            <Tabs.TabPane
                tab={
                    <span className="d-flex align-items-center hover-color">
                        <Icon
                            component={currActiveKey === "4" ? tabs[3].activeIcon : tabs[3].icon}
                        />
                        {tabs[3].title}
                    </span>
                }
                key="4"
            >
                {content[3]}
            </Tabs.TabPane>
        </Tabs>
    </>
  )
}

export default ContractDetails