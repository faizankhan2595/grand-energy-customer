import { Modal, Space, Table } from "antd";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import avatar from "assets/Avatar2.png";
import ActionForJobSiteOnly from "./ActionForJobSiteOnly";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function JobSiteTable(props) {
  const history = useHistory();
  const [customerAccountData, setCustomerAccountData] = useState([]);
  const [allJobSiteData, setAllJobSiteData] = useState([]);
  const [page, setPage] = useState(1);
  const [cpage, setCpage] = useState(0)
  const tok = localStorage.getItem('token')
  console.log(props)
  // const relDat = useMemo(() => {
  //   axios
  //     .post(
  //       "/api/tc/get-customer-job-sites",
  //       {
  //         page_index: page,
  //         page_size: 15,
  //         // statuses: ["ACTIVE", "INACTIVE"],
  //         customer_id: props.id ? props.id : null,
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${tok}`
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       let res = response.data.data.data;
  //       console.log(res);

  //       let fdata = res.map((elem, ind) => {
  //         return {
  //           // key: ind,
  //           id: elem.id,
  //           jobSite: elem.name,
  //           jobSiteAddress: elem.address ? elem.address : `${elem.street_number}, block no. ${elem.block_number} postal code ${elem.postal_code}, ${elem.country}`,
  //           company: elem.customer_name,
  //           phoneNumber: elem?.phone,
  //           emailId: elem?.email,
  //           noOfUsers: 2,
  //           img: { image: elem?.img, name: "John Smith" },
  //           staffAssign: elem.staffAssign,
  //           tasks: elem.tasks,
  //           revenue: elem.revenue,
  //           outstandingAmt: elem.outstandingAmt,
  //           status: elem.status,
  //           action: "",
  //           tc_customer_id: elem.tc_customer_id
  //         };
  //       });
  //       setCustomerAccountData(fdata);
  //       console.log(fdata);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [props.tog])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Job Site",
      dataIndex: "jobSite",
    },
    {
      title: "Job Site Address",
      dataIndex: "jobSiteAddress",
      width: 200,
    },
    // {
    //   title: "",
    //   dataIndex: "img",
    //   render: (item) => {
    //     const { image, name } = item;
    //     return (
    //       <Space size={40}>
    //         <img src={image} />
    //         {/* {name} */}
    //       </Space>
    //     );
    //   },
    // },
    {
      title: "Company",
      dataIndex: "company",
    },
    // {
    //   title: "No Of Users",
    //   dataIndex: "noOfUsers",
    //   width: 120,
    // },
    {
      title: "Staff Assign",
      dataIndex: "total_staffs",
      width: 120,
    },
    {
      title: "Tasks",
      dataIndex: "total_tasks",
    },
    // {
    //   title: "Revenue",
    //   dataIndex: "revenue",
    // },
    // {
    //   title: "Outstanding Amt",
    //   dataIndex: "outstandingAmt",
    //   width: 150,
    // },
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
            idFromProp={props.id}
            // editUser={editUser}
            setShowModal={props.setShowModal}
            viewDetails={props.setShowModal ? false : true}
          />
        );
      },
    },
  ];

  const editHandler = (id) => {
    // props.setEditjobfield(id);
    // history.push(`/app/customer-management/customer-accounts/customer-details/${customer_id}`)
    console.log("edithand");
  }

  const handlechange = (pagination) => {
    if (cpage <= pagination.current) {
      setPage(pagination.current)
      setCpage(pagination.current)
    }
  }

  const getJobSites = () => {
    axios({
        method: 'post',
        url: "/api/tc/get-customer-job-sites",
        data: {
            page_index: 1,
            page_size: 100000,
            search : '',
            customer_id: null
        }
    }).then((response) => {
        console.log(response.data.data.data)
        if (response.data.success) {
          setAllJobSiteData(response.data.data.data)
        }
    }).catch((err) => {
        console.log(err)
    });
  }

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customer-job-sites",
        {
          page_index: page,
          page_size: 15,
          statuses: ["ACTIVE", "INACTIVE"],
          customer_id: props.id ? props.id : null,
          search : props.searchText? props.searchText : null,
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

        let fdata = res.map((elem, ind) => {
          return {
            id: elem.id,
            jobSite: elem.name,
            jobSiteAddress: elem.address ? elem.address : `${elem.unit_number} ${elem.street_number}, ${elem.block_number} ${elem.postal_code}, ${elem.country}`,
            company: elem.customer_name,
            phoneNumber: elem?.phone,
            emailId: elem?.email,
            noOfUsers: elem?.total_customer_users || 0,
            img: { image: elem?.img, name: elem.name },
            staffAssign: elem.staffAssign,
            tasks: elem.tasks,
            revenue: elem.revenue,
            outstandingAmt: elem.outstandingAmt,
            total_tasks: elem.total_tasks,
            total_staffs: elem.total_staffs,
            status: elem.status,
            action: "",
            tc_customer_id: elem.tc_customer_id
          };
        });
        setCustomerAccountData(customerAccountData.concat(fdata));
        // props.setEditjobfield(fdata[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);


  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customer-job-sites",
        {
          page_index: 1,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE"],
          customer_id: props.id ? props.id : null,
          search : props.searchText? props.searchText : null,
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

        let fdata = res.map((elem, ind) => {
          return {
            id: elem.id,
            jobSite: elem.name,
            jobSiteAddress: elem.address ? elem.address : `${elem.street_number}, block no. ${elem.block_number} postal code ${elem.postal_code}, ${elem.country}`,
            company: elem.customer_name,
            phoneNumber: elem?.phone,
            emailId: elem?.email,
            noOfUsers: elem?.total_customer_users || 0,
            img: { image: elem?.img, name: "John Smith" },
            staffAssign: elem.staffAssign,
            tasks: elem.tasks,
            revenue: elem.revenue,
            outstandingAmt: elem.outstanding,
            total_tasks: elem.total_tasks,
            total_staffs: elem.total_staffs,
            status: elem.status,
            action: "",
            tc_customer_id: elem.tc_customer_id
          };
        });
        setCustomerAccountData(fdata);
        props.setEditjobfield(fdata[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customer-job-sites",
        {
          page_index: 1,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE"],
          customer_id: props.id ? props.id : null,
          search : props.searchText? props.searchText : null
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

        let fdata = res.map((elem, ind) => {
          return {
            id: elem.id,
            jobSite: elem.name,
            jobSiteAddress: elem.address ? elem.address : `${elem.street_number}, block no. ${elem.block_number} postal code ${elem.postal_code}, ${elem.country}`,
            company: elem.customer_name,
            phoneNumber: elem?.phone,
            emailId: elem?.email,
            noOfUsers: elem?.total_customer_users || 0,
            img: { image: elem?.img, name: "John Smith" },
            staffAssign: elem.staffAssign,
            tasks: elem.tasks,
            revenue: elem.revenue,
            outstandingAmt: elem.outstanding,
            total_tasks: elem.total_tasks,
            total_staffs: elem.total_staffs,
            status: elem.status,
            action: "",
            tc_customer_id: elem.tc_customer_id
          };
        });
        setCustomerAccountData(fdata);
        props.setEditjobfield(fdata[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.searchText]);

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customer-job-sites",
        {
          page_index: 1,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE"],
          customer_id: props.customer_id ? props.customer_id : null,
          search : props.searchText? props.searchText : null
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

        let fdata = res.map((elem, ind) => {
          return {
            id: elem.id,
            jobSite: elem.name,
            jobSiteAddress: elem.address ? elem.address : `${elem.street_number}, block no. ${elem.block_number} postal code ${elem.postal_code}, ${elem.country}`,
            company: elem.customer_name,
            phoneNumber: elem?.phone,
            emailId: elem?.email,
            noOfUsers: elem?.total_customer_users || 0,
            img: { image: elem?.img, name: "John Smith" },
            staffAssign: elem.staffAssign,
            tasks: elem.tasks,
            revenue: elem.revenue,
            outstandingAmt: elem.outstanding,
            total_tasks: elem.total_tasks,
            total_staffs: elem.total_staffs,
            status: elem.status,
            action: "",
            tc_customer_id: elem.tc_customer_id
          };
        });
        setCustomerAccountData(fdata);
        props.setEditjobfield(fdata[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.customer_id]);

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);

  const deleteHandler = async (id) => {
    try {
      // setIsLoading(true);
      // const res = await axios.delete(
      //   process.env.REACT_APP_BACKEND_URL + `/users/delete-user/${id}`
      // );
      // if (!res.data.success) {
      //   throw new Error(res.data.data);
      // }

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

      setCustomerAccountData((prev) => prev.filter((item) => item.id !== id));

      // setLoadedUsers((prev) => prev.filter((item) => item.userId !== id));
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
  }, [])
  

  // const selectChangeHandler = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: selectChangeHandler,
  // };

  return (
    <>
      <div>
        <Table
          // scroll={{
          //   x: 1300,
          // }}
          // rowKey='id'
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={customerAccountData}
          onChange={handlechange}
        />
      </div>
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
    </>
  );
}

export default JobSiteTable;
