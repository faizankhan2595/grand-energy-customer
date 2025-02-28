import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import Icon from "@ant-design/icons";
import { InvoiceIcon } from 'views/app-views/UserManagement/SvgIcons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'



let data = []

function Payments({searchText, custId}) {

    const [paymentsData, setPaymentsData] = useState(data)

    const columns=[
        {
            title:'ID',
            dataIndex:'id',
        },
        {
            title:'Contract ID',
            dataIndex:'id',
        },
        {
            title:'Jobsite Name',
            dataIndex:'jobSite',
        },
        {
            title:'Total Tasks',
            dataIndex:'tasks',
        },
        {
            title:'Net Amount(S$)',
            dataIndex:'netAmount',
        },
        {
            title:'Paid Amount(S$)',
            dataIndex:'paid',
            render: (_, record) =>{
                return <div>{record.amount_paid || 0}</div>
              }
        },
        {
            title:'Payment Date',
            dataIndex:'created_at',
            render: (_, record) =>{
                return <div>{moment(record.created_at).format("DD-MM-YYYY")}</div>
            }
        },
        {
            title:'Status',
            dataIndex:'status',
            render: (_,record) => {
                if(record.status==='Paid' || record.status==='PAID') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Paid</span>
                else if(record.status==='Overdue' || record.status==='OVERDUE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Overdue</span>
                else return <span style={{color: '#FFC700', backgroundColor: '#FFC7001A', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Pending</span>
              }
        },
        // {
        //     title:'Action',
        //     render : (_,record) =>{
        //         return <Link to='/app/customer-management/customer-accounts/customer-details/123/invoice'>
        //                     <Icon component={InvoiceIcon}/>
        //                 </Link>
        //     } 
        // },
    ]

    useEffect(() => {
        const data = { customer_id: custId };
        axios({
          method: "post",
          url: "/api/tc/get-payment",
          data: data
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              setPaymentsData(
                response.data.data.data.map((elem, ind) => {
                  return {
                    ...elem,
                    index: ind + 1,
                  };
                })
              );
            } else {
              console.log(response);
            }
          })
          .then((err) => {
            console.log(err);
          });
      }, []);

    useEffect(() => {
        const data = { 
            customer_id: custId,
            search: searchText
         };
        axios({
          method: "post",
          url: "/api/tc/get-payment",
          data: data
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              setPaymentsData(
                response.data.data.data.map((elem, ind) => {
                  return {
                    ...elem,
                    index: ind + 1,
                  };
                })
              );
            } else {
              console.log(response);
            }
          })
          .then((err) => {
            console.log(err);
          });
      }, [searchText]);

    return (
    <div>
        <Table
        // scroll={
        //     {x:1300}
        // }
        columns={columns} dataSource={paymentsData} />
    </div>
  )
}

export default Payments