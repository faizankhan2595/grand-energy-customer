import { Button, Tabs } from 'antd';
import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { AddressDetailsActiveIcon, AddressDetailsIcon, InvoiceActiveIcon, InvoiceIcon, PaymentsActiveIcon, PaymentsIcon, UserManagementActiveIcon, BasicDetailsIcon, BasicDetailsActiveIcon, UserManagementIcon } from 'views/app-views/UserManagement/SvgIcons'
import Payments from './Payments';
import InvoiceTable from './InvoiceTable'
import CustomerUsers from './CustomerUsersTable';
import Icon from "@ant-design/icons";
import { useState } from 'react';
import CustomerBasicDetails from './CustomerBasicDetails';
import JobSites from './JobSites';
import axios from "axios";

// import { UserManagementIcon } from 'configs/svgIcons';
// import JobSiteTable from './JobSiteTable';
// import SearchBox from 'components/shared-components/SearchBox';

const tabs = [
    {
        title: "Basic Details",
        icon: BasicDetailsIcon,
        activeIcon: BasicDetailsActiveIcon,
    },
    {
        title: "Job Site Details",
        icon: AddressDetailsIcon,
        activeIcon: AddressDetailsActiveIcon,
    },
    {
        title: "Associate Customers",
        icon: UserManagementIcon,
        activeIcon: UserManagementActiveIcon,
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
]


function CustomerDetailRight({customerData, searchText, setSearchText, setHeaders, currActiveKey, setCurrActiveKey, isExporting, setIsExporting, setExportData}) {
    const param = useParams()
    // console.log(customerData.id,"custdata")
    
    // const [currActiveKey, setCurrActiveKey] = useState("1");
    // const [searchText, setSearchText] = useState('')
    const tabChangeHandler = (key) => {
        setCurrActiveKey(key);

        setSearchText('');
        if(+key == 2) {
            setHeaders([
                // { label: "Sr. No", key: "sr_no" },
                { label: "ID", key: "id" },
                { label: "Jobsite Name", key: "name" },
                { label: "Jobsite Address", key: "address" },
                { label: "Company", key: "customer_name" },
                { label: "Staff Assigned", key: "total_staffs" },
                { label: "Tasks", key: "total_tasks" },
                { label: "Status", key: "status" }
            ])
            setJobsitesData()
        }
        if(+key == 3) {
            setHeaders([
                { label: "Sr. No", key: "sr_no" },
                { label: "ID", key: "userId" },
                { label: "Associate Name", key: "userName" },
                { label: "Address", key: "address" },
                { label: "Contact Number", key: "mobileNumber" },
                { label: "Associate Type", key: "associate_type" },
                { label: "Status", key: "status" }
            ])
            setAssociatesData()
        }
        if(+key == 4) {
            setHeaders([
                // { label: "Sr. No", key: "index" },
                { label: "ID", key: "id" },
                { label: "Contract ID", key: "tc_contract_id" },
                { label: "Jobsite Name", key: "jobsite_name" },
                { label: "Total Tasks", key: "total_tasks" },
                { label: "Net Amount (S$)", key: "total" },
                { label: "Paid amount (S$)", key: "amount_paid" },
                { label: "Invoice Date", key: "created_at" },
                { label: "Status", key: "status" }
            ])
            setInvoicesData()
        }
        if(+key == 5) {
            setHeaders([
                // { label: "Sr. No", key: "index" },
                { label: "ID", key: "id" },
                { label: "Contract ID", key: "tc_contract_id" },
                { label: "Jobsite Name", key: "jobsite_name" },
                { label: "Total Tasks", key: "total_tasks" },
                { label: "Net Amount (S$)", key: "total" },
                { label: "Paid amount (S$)", key: "amount_paid" },
                { label: "Payment Date", key: "created_at" },
                { label: "Status", key: "status" }
            ])
            setPaymentsData()
        }
    };

    const setJobsitesData = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-customer-job-sites",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                customer_id: +param.id,
                page_index: 1,
                page_size: 100000,
                search : null
            }
        }).then((response) => {
            if (response.data.success) {
                setExportData(response.data.data.data)
            }
            console.log("Job site export data fetched")
            console.log(response.data.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }

    const setAssociatesData = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-customer-users",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                customer_id: +param.id,
                page_index: 1,
                page_size: 100000,
                search : null
            }
        }).then((response) => {
            if (response.data.success) {
                let res = response.data.data.data;

                let fdata = res.map((elem, ind) => {
                    return {
                        sr_no: ind+1,
                        key: ind,
                        userId: elem.id,
                        userName: elem.name,
                        // gender: <Icon component={elem.gender === 'Male' ? BoyIcon : GirlIcon} />,
                        // nationality: 
                        // elem.nationality === 'India' ? <IN title="SG" className="countrtFlag" />
                        // : elem.nationality === 'Singapore' ? <SG title="SG" className="countrtFlag" />
                        // : <CN title="SG" className="countrtFlag" />
                        // ,
                        img: { image: elem.profile_pic, name: elem.name },
                        mobileNumber: elem.phone,
                        emailId: elem.email,
                        jobSite: elem.job_sites,
                        status: elem.status,
                    };
                });
                setExportData(fdata)
            }
        }).catch((err) => {
            console.log(err)
        });

    }

    const setInvoicesData = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-customer-job-sites",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                customer_id: +param.id,
                page_index: 1,
                page_size: 100000,
                search : null
            }
        }).then((response) => {
            if (response.data.success) {
                setExportData(response.data.data.data)
            }
        }).catch((err) => {
            console.log(err)
        });

    }

    const setPaymentsData = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-customer-job-sites",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                customer_id: +param.id,
                page_index: 1,
                page_size: 100000,
                search : null
            }
        }).then((response) => {
            if (response.data.success) {
                setExportData(response.data.data.data)
            }
        }).catch((err) => {
            console.log(err)
        });

    }

    // useEffect(() => {
    //   if(isExporting) {
    //     if(+currActiveKey == 2) {
    //         setJobsitesData()
    //     }
    //     if(+currActiveKey == 3) {
    //         setAssociatesData()
    //     }
    //     if(+currActiveKey == 4) {
    //         setInvoicesData()
    //     }
    //     if(+currActiveKey == 5) {
    //         setPaymentsData()
    //     }
    //   }
    // }, [isExporting])
    

    const content = [
        <CustomerBasicDetails />,
        <JobSites searchText={searchText} customer_id={+param.id}/>,
        <CustomerUsers searchText={searchText} custId={+param.id}/>,
        <InvoiceTable searchText={searchText} custId={+param.id}/>,
        <Payments searchText={searchText} custId={+param.id}/>,
    ];

    const extraBottons = <div className='d-flex'>
        {/* {currActiveKey==2 && <Link className='mr-3' to="/app/customer-management/customer-accounts/add-new-payments"> <Button className="d-flex align-items-center"type="danger"size="middle">Create New Payment</Button> </Link>}
        {currActiveKey==3 && <Link className='mr-3' to={`/app/customer-management/customer-accounts/add-new-invoice/${customerData.id}`}> <Button className="d-flex align-items-center"type="danger"size="middle">Create New Invoice</Button> </Link>}
        <SearchBox setSearchText={setSearchText}/> */}
        </div>
    return (
        <Tabs
            activeKey={currActiveKey}
            size="large"
            onChange={tabChangeHandler}
            tabBarExtraContent={ extraBottons}
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
            <Tabs.TabPane
                tab={
                    <span className="d-flex align-items-center hover-color">
                        <Icon
                            component={currActiveKey === "5" ? tabs[4].activeIcon : tabs[4].icon}
                        />
                        {tabs[4].title}
                    </span>
                }
                key="5"
            >
                {content[4]}
            </Tabs.TabPane>

        </Tabs>
    )
}

export default CustomerDetailRight