import { Table, Typography, Card, Button } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ActionForJobSiteOnly from '../JobSites/ActionForJobSiteOnly'
import ActionJobsite from './ActionJobsite'
const { Title, Text } = Typography;

function CustomerBasicDetails() {
    const tok = localStorage.getItem('token')
    const param = useParams()
    const [page, setPage] = useState(1);
    const [cpage, setCpage] = useState(0);
    const [customerData, setCustomerData] = useState({})
    
    console.log(param.id)
    // const [jobSiteData, setjobSiteData] = useState([])
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const getCustomer = () => {
        axios({
            method: 'post',
            url: "/api/tc/get-customer",
            headers: {
                Authorization: `Bearer ${tok}`
            },
            data: {
                id:param.id
            },
        }).then((response) => {
            console.log(response.data)
            if (response.data.success) {
                if(response.data.data.other_details) {
                    let other_details = JSON.parse(response.data.data.other_details);
                    let res = {...response.data.data, ...other_details}
                    setCustomerData(res);
                    return;
                }
                setCustomerData(response.data.data);
            } else {
                console.log(response)
            }
        });
    }

    // const handlechange = (pagination) => {
    //     if (cpage <= pagination.current) {
    //         setPage(pagination.current)
    //         setCpage(pagination.current)
    //     }
    // }

    useEffect(() => {
        getCustomer()
    }, [])

    return (
        <div>
            <Card style={{ background: "#FAFAFB", textAlign: 'start' }} >
                <div className='d-flex justify-content-between'>
                    <div className='w-25'>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Customer Company: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Contact Person: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Email ID: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Phone Number: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Office Contact Number: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>UEN: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Created By: &emsp;</h5>
                        </div>
                    </div>
                    <div className='w-75'>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.name }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.contact_name }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.email }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.phone }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.office_contact_number }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.uen_number || '####' }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.created_by }</h5>
                        </div>
                    </div>
                </div>
            </Card>

            <Card style={{ background: "#FAFAFB", textAlign: 'start', marginTop: '20px' }} >
                <h4><strong>Customer Address</strong></h4>

                <div className='d-flex justify-content-between'>
                    <div className='w-25'>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Pincode: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Unit Number: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Street Number: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Block Number: &emsp;</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>Country: &emsp;</h5>
                        </div>
                    </div>
                    <div className='w-75'>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.postal_code }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.unit_number }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.street_number }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.block_number }</h5>
                        </div>
                        <div className='d-flex justify-content-start my-1'>
                            <h5>{ customerData.country }</h5>
                        </div>
                    </div>
                </div>
            </Card>

            <Card style={{ background: "#FAFAFB", textAlign: 'start', marginTop: '20px' }} >
                <h4><strong>Uploaded File</strong></h4>

                {customerData.uploaded_file ? <div className='d-flex justify-content-start'>
                    <Button onClick={() => {
                        console.log("Viewing Attachment...");
                        if(customerData.uploaded_file) window.open(customerData.uploaded_file.url);
                    }}>
                        View Uploaded File
                    </Button>
                </div> : <div>No Uploaded files</div>}
            </Card>
        </div>
    )
}

export default CustomerBasicDetails