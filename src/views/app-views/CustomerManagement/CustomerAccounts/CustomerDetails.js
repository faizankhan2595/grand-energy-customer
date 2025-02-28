import React from 'react'
import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import { Card, Col, Row, Button } from 'antd';

import Profile from 'views/app-views/CustomerManagement/CustomerAccounts/Profile';
import CustomerDetailRight from './CustomerDetailRight';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import SearchBox from 'components/shared-components/SearchBox';
import { Link } from 'react-router-dom';
import exportIcon from "assets/svg/exportIcon.svg";
import { CSVLink } from "react-csv";

function CustomerDetails() {
    const param = useParams();
    const history = useHistory();
    const [currActiveKey, setCurrActiveKey] = useState("1");
    const [customerData, setCustomerData] = useState({})
    const [searchText, setSearchText] = useState("")
    const [exportData, setExportData] = useState([]);
    const [headers, setHeaders] = useState([])
    const [isExporting, setIsExporting] = useState(false)



    const getCustomer = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-customer",
            data: {
                id:param.id
            },
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                setCustomerData(response.data.data);
            } else {
                console.log(response)
            }
        });
    }

    const getFileName = () => {
        if(currActiveKey == '2') return 'All-Jobsites'
        if(currActiveKey == '3') return 'All-Associate-Customers'
        if(currActiveKey == '4') return 'All-Invoices'
        if(currActiveKey == '5') return 'All-Payments'
    }

    useEffect(() => {
      getCustomer()
    }, [])
    

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <PageHeading
                    // icon={UserManagementIcon}
                    title="Customer Details"
                />
                {+currActiveKey === 1 && <div className="d-flex justify-content-between mb-3">
                    <div className=" d-flex align-items-center justify-content-between mr-2"
                    onClick={() => {
                        history.push(`/app/customer-management/customer-accounts/edit/${param.id}`)
                    }}>
                            <Button type="primary" className="d-flex align-items-center ml-2 mr-2" >
                                Edit Customer
                            </Button>
                    </div>
                </div>}
                {+currActiveKey !== 1 && <div className="d-flex justify-content-between mb-3">
                    <div className=" d-flex align-items-center justify-content-between mr-2">
                        <SearchBox setSearchText={setSearchText} />

                        <CSVLink data={exportData} 
                        headers={headers} 
                        filename={`${getFileName()}.csv`}
                        >
                            <Button className="d-flex align-items-center ml-2 mr-2" >
                                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
                            </Button>
                        </CSVLink>
                    </div>
                </div>}
            </div>
            <div className='mw-100'>
                <Row gutter={20}>
                    <Col span={24}>
                        <CustomerDetailRight customerData={customerData} searchText={searchText} setSearchText={setSearchText} setHeaders={setHeaders} currActiveKey={currActiveKey} setCurrActiveKey={setCurrActiveKey}
                        setIsExporting={setIsExporting}
                        isExporting={isExporting}
                        setExportData={setExportData} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CustomerDetails