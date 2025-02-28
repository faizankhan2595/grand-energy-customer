import { Avatar, Modal, Space, Table } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Action from "./Action";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { Successfully } from "configs/svgIcons";
import axios from "axios";
import avatar from "assets/Avatar2.png";

function CustomerTable({ searchText, statuses }) {
  const [customerAccountData, setCustomerAccountData] = useState([]);
  const [customerDeletedData, setCustomeDeletedData] = useState([]);
  const [page, setPage] = useState(1);
  const [cpage, setCpage] = useState(0);
  const tok = localStorage.getItem('token');
  
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
    },
    {
      title: "Customer ID",
      dataIndex: "id"
    },
    {
      title: "Customer Company",
      dataIndex: "company",
      sorter: (a, b) => a.company.localeCompare(b.company)
    },
    {
      title: "Contact Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email Id",
      dataIndex: "emailId",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_,record) => {
        if(record.status==='Approved' || record.status==='APPROVED') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
        else if(record.status==='Rejected' || record.status==='REJECTED') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Rejected</span>
        else if(record.status==='Inactive' || record.status==='INACTIVE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
        else return <span style={{color: '#FFC700', backgroundColor: '#FFC7001A', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Pending Approval</span>
      }
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => {
        return (
          <Action
            id={record.id}
            customerData={record}
            onDelete={deleteHandler}
            getCustomers={getCustomers}
          />
        );
      },
    },
  ];

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

      setCustomerAccountData((prev) => prev.filter((item) => item.id !== id));
      let deletedData = customerAccountData.find(item => item.id === id);
      setCustomeDeletedData(deletedData);
      setShowDeletedSuccess(true);
      setTimeout(() => {
        setShowDeletedSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const selectChangeHandler = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: selectChangeHandler,
  // };

  const handlechange = (pagination) => {
    if (cpage <= pagination.current) {
      setPage(pagination.current);
      // setsetPage(pagination.current);
      setCpage(pagination.current);
    }
  };

  const getCustomers = () => {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: 1,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE"],
          search : searchText ? searchText : null,
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

        let fdata = res.map((elem, index) => {
          let other_details = {};
          if(elem.other_details) {
            other_details = JSON.parse(elem.other_details);
          }
          return {
            srNo: index+1,
            key: index+1,
            id: elem.id,
            company: elem.name || '',
            phoneNumber: elem.phone || '',
            emailId: elem.email || '',
            status: elem.status || 'Pending Approval',
            created_by: other_details.created_by || '',
            other_details: elem.other_details
          };
        });

        setCustomerAccountData(fdata);
        console.log(fdata)
      })
      .catch((error) => {
        console.log(error);
      });
}

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: 1,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE"],
          search : searchText ? searchText : null,
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

        let fdata = res.map((elem, index) => {
          let other_details = {};
          if(elem.other_details) {
            other_details = JSON.parse(elem.other_details);
          }
          return {
            srNo: index+1,
            key: index+1,
            id: elem.id,
            company: elem.name || '',
            phoneNumber: elem.phone || '',
            emailId: elem.email || '',
            status: elem.status || 'Pending Approval',
            created_by: other_details.created_by || '',
            other_details: elem.other_details
          };
        });

        setCustomerAccountData(fdata);
        console.log(fdata)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText]);

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: 1,
          page_size: 15,
          statuses: statuses || ["ACTIVE", "INACTIVE"],
          search : searchText ? searchText : null,
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

        let fdata = res.map((elem, index) => {
          let other_details = {};
          if(elem.other_details) {
            other_details = JSON.parse(elem.other_details);
          }
          return {
            srNo: index+1,
            key: index+1,
            id: elem.id,
            company: elem.name || '',
            phoneNumber: elem.phone || '',
            emailId: elem.email || '',
            status: elem.status || 'Pending Approval',
            created_by: other_details.created_by || '',
            other_details: elem.other_details
          };
        });
        setCustomerAccountData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [statuses]);

  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: page,
          page_size: 15,
          // statuses: ["ACTIVE", "INACTIVE", "PENDING APPROVAL"],
          searchText : searchText ? searchText : null,
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

        let fdata = res.map((elem, index) => {
          let other_details = {};
          if(elem.other_details) {
            other_details = JSON.parse(elem.other_details);
          }
          return {
            srNo: index+1,
            key: index+1,
            id: elem.id,
            company: elem.name || '',
            phoneNumber: elem.phone || '',
            emailId: elem.email || '',
            status: elem.status || 'Pending Approval',
            created_by: other_details.created_by || '',
            other_details: elem.other_details
          };
        });
        // setCustomerAccountData(customerAccountData.concat(fdata));
        setCustomerAccountData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      <div>
        <Table
          scroll={{
            x:1200
          }}
          pageSize={'15'}
          // rowSelection={rowSelection}
          // loading={isLoading}
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
          title="Customer Deleted Successfully!"
          desc={`Customer name ${customerDeletedData.company} has been deleted.`}
        />
      </Modal>
    </>
  );
}

export default CustomerTable;
