import { Table, Modal } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ActionForJobSiteOnly from '../JobSites/ActionForJobSiteOnly'
import SuccessSubmit from 'views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit'
import { Successfully } from "configs/svgIcons";
// import ActionJobsite from './ActionJobsite'

function JobSiteTable({searchText, customer_id, setShowModal, setEditjobfield, form, shiftLocations, jobSiteData, setjobSiteData}) {

    // const [jobSiteData, setjobSiteData] = useState([])
    const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
    const tok = localStorage.getItem('token')
    const param = useParams()
    console.log(param.id)
    const [page, setPage] = useState(1);
    const [cpage, setCpage] = useState(0)

    const columns = [
        {
          title: "Jobsite ID",
          dataIndex: "id",
        },
        {
          title: "Jobsite Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
          width: 150,
        },
        {
          title: "Company",
          dataIndex: "customer_name",
        },
        {
          title: "Staff Assign",
          dataIndex: "total_staffs",
          width: 120,
        },
        {
          title: "Tasks",
          dataIndex: "total_tasks",
        },
        {
          title: "Status",
          dataIndex: "status",
          render: (_,record) => {
            if(record.status==='ACTIVE') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
            else return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
          }
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (_, record) => {
            return (
              <ActionForJobSiteOnly
                record ={record}
                id={record.id}
                customer_id={record.tc_customer_id}
                onEdit={editHandler}
                onDelete={deleteHandler}
                idFromProp={jobSiteData.id}
                setShowModal={setShowModal}
                viewDetails={setShowModal ? false : true}
                form={form}
                JobSites={jobSiteData}
                shiftLocations={shiftLocations}
                getJobSites={getJobSites}
              />
            );
          },
        },
      ];

    const getJobSites = (currPage) => {
        console.log(customer_id)
        axios({
            method: 'post',
            url: "/api/tc/get-customer-job-sites",
            // headers: {
            //     Authorization: `Bearer ${tok}`
            // },
            data: {
                customer_id: customer_id,
                page_index: currPage,
                page_size: 15,
                search : searchText?searchText:null
            }
        }).then((response) => {
            console.log("Jobsite data: ",response.data.data.data)
            if (response.data.success) {
                if (currPage===1) {
                    setjobSiteData(response.data.data.data)
                }else{
                    setjobSiteData([...jobSiteData,...response.data.data.data])
                }
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    const handlechange = (pagination) => {
        if (cpage <= pagination.current) {
            setPage(pagination.current)
            setCpage(pagination.current)
        }
    }

    const editHandler = (id) => {
        setEditjobfield(id);
        console.log("edithand");
    }

    const deleteHandler = async (id) => {
        try {
          axios
            .post(
              "/api/tc/delete-customer-job-site",
              {
                id: id
              },
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${tok}`
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
    
        //   setCustomerAccountData((prev) => prev.filter((item) => item.id !== id));
          setShowDeletedSuccess(true);
          setTimeout(() => {
            setShowDeletedSuccess(false);
          }, 3000);
        } catch (err) {
          console.log(err.message);
        }
    };

    useEffect(() => {
        getJobSites()
    }, [page])
    useEffect(() => {
        getJobSites(1)
    }, [searchText])

    return (
        <div>
            <Table scroll={
                {x:1300}
            } 
            rowKey={(row) => row.id}
            columns={columns} dataSource={jobSiteData} onChange={handlechange} style={{overflow:'auto'}}/>

            <Modal
                centered
                visible={showDeletedSuccess}
                footer={[null]}
                onCancel={() => {
                setShowDeletedSuccess(false);
                }}
            >
                <SuccessSubmit
                icon={Successfully}
                title="Job site deleted successfully!"
                desc="Job site ID deleted."
                />
            </Modal>
        </div>
    )
}

export default JobSiteTable