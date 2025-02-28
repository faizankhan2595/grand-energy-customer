import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Icon from "@ant-design/icons";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import { Link } from "react-router-dom";
import axios from "axios";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { Button, Modal, Card } from "antd";
import { IN, SG, CN } from 'country-flag-icons/react/3x2'
import { BoyIcon, GirlIcon } from "assets/svg/icon";
import { Avatar } from 'antd';
import { PlusIconBlue } from "assets/svg/icon";
import Title from "antd/lib/typography/Title";
import { useHistory , useRouteMatch} from "react-router-dom";
// import { InvoiceIcon } from "views/app-views/UserManagement/SvgIcons";
// import { useHistory } from "react-router-dom";


function CustomerUsers({ custId, searchText }) {
  const [paymentsData, setPaymentsData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  // const [cpage, setCpage] = useState(0);
  // const [showAddedSuccess, setShowAddedSuccess] = useState(false);
  // const history = useHistory()
  const [userData, setUserData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const tok = localStorage.getItem("token");

  const columns = [
    {
      title: "Sr No",
      dataIndex: "sr_no",
    },
    {
      title: "ID",
      dataIndex: "userId",
    },
    // {
    //   title: "",
    //   dataIndex: "img",
    //   render: (item) => {
    //     const { image, name } = item;
    //     return (
    //       <div className='d-flex align-items-center'>
    //        <Avatar src={image} />
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Associate Name",
      dataIndex: "userName",
    },
    {
      title: "Address",
      dataIndex: "",
      render: (item) =>{
        return <div>{"-"}</div>
      }
    },

    {
      title: "Contact Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Associate Type",
      dataIndex: "associate_type",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_,record) => {
        if(record.status==='Inactive' || record.status==='INACTIVE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
        else return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
      }
    },
    {
      title: "Action",
      // dataIndex: "action",
      render: (_,record) => {
        return (
          <>
            <EllipsisDropdown
              menu={
                <Menu>
                  <Menu.Item>
                    <Link
                      to={`/app/customer-management/customer-accounts/edit-associate-customer/${record.userId}`}
                      className="d-flex align-items-center"
                    >
                      <Icon className="mr-2" component={EditIcon} />
                      Edit
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      ShowDeleteModal();
                    }}
                  >
                    <span className="d-flex align-items-center">
                      <Icon className="mr-2" component={DeleteIcon} />
                      Delete
                    </span>
                  </Menu.Item>

                  <Modal
                    visible={openDeleteModal}
                    onCancel={handleCancel}
                    centered
                    footer={[
                      <Button
                        style={{ color: "#000B23" }}
                        onClick={handleCancel}
                        className="font-weight-bold"
                      >
                        No, Cancel
                      </Button>,
                      <Button
                        type="primary"
                        className="font-weight-bold"
                        onClick={()=>handleOk(record.userId)}
                      >
                        Yes, Confirm
                      </Button>,
                    ]}
                  >
                    <div
                      style={{ color: "#000B23" }}
                      className="font-weight-bolder font-size-md"
                    >
                      Are you sure you want to delete this customer user?
                    </div>
                  </Modal>
                </Menu>
              }
            />
          </>
        );
      },
    },
  ];

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleOk = (associate_id) => {
    console.log(associate_id)
    setOpenDeleteModal(false);
    axios
      .post(
        "/api/tc/delete-customer-users",
        {
          id: associate_id
        },
      )
      .then((response) => {
        let res = response.data
        console.log(res)
        if(res.success) {
          getAllAssociateCustomers()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShowDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const addNewAssociateCustomer = () => {
    history.push(`/app/customer-management/customer-accounts/add-new-associate-customer/${custId}`);
  }

  const getAllAssociateCustomers = () => {
    const data = { 
      customer_id: custId,
      page_index: page,
      page_size: 10,
      search: searchText
   };
  axios({
    method: "post",
    url: "/api/tc/get-customer-users",
    data: data,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      let res = response.data.data.data;

      let fdata = res.map((elem, ind) => {
        return {
          sr_no: ind+1,
          key: ind,
          userId: elem.id,
          userName: elem.name,
          gender: <Icon component={elem.gender === 'Male' ? BoyIcon : GirlIcon} />,
          nationality: 
            elem.nationality === 'India' ? <IN title="SG" className="countrtFlag" />
            : elem.nationality === 'Singapore' ? <SG title="SG" className="countrtFlag" />
            : <CN title="SG" className="countrtFlag" />
          ,
          img: { image: elem.profile_pic, name: elem.name },
          mobileNumber: elem.phone,
          emailId: elem.email,
          jobSite: elem.job_sites,
          status: elem.status,
          associate_type: elem.associate_type || elem.residnecy_status,
          uen_neumber: elem.uen_neumber || elem.nationality,
          office_contact_number: elem.office_contact_number || elem.gender,
        };
      });
      console.log(res)
      setUserData(userData.concat(fdata));
    })
    .then((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const data = { 
        customer_id: custId,
        page_index: page,
        page_size: 10,
     };
    axios({
      method: "post",
      url: "/api/tc/get-customer-users",
      data: data,
      headers: {
        Authorization: `Bearer ${tok}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        let res = response.data.data.data;

        let fdata = res.map((elem, ind) => {
          return {
            sr_no: ind+1,
            key: ind,
            userId: elem.id,
            userName: elem.name,
            gender: <Icon component={elem.gender === 'Male' ? BoyIcon : GirlIcon} />,
            nationality: 
              elem.nationality === 'India' ? <IN title="SG" className="countrtFlag" />
              : elem.nationality === 'Singapore' ? <SG title="SG" className="countrtFlag" />
              : <CN title="SG" className="countrtFlag" />
            ,
            img: { image: elem.profile_pic, name: elem.name },
            mobileNumber: elem.phone,
            emailId: elem.email,
            jobSite: elem.job_sites,
            status: elem.status,
          };
        });
        console.log(res)
        setUserData(userData.concat(fdata));
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllAssociateCustomers();
  }, [searchText]);

  return (
    <div>
      <Table
        // scroll={{ x: 1100 }}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={userData}
      />

      <Card className="mt-2">
          <Button
            block
            type="dashed"
            className="d-flex align-items-center justify-content-center pt-4 pb-4"
            onClick={addNewAssociateCustomer}
          >
            <Icon component={PlusIconBlue} />
            <Title level={3} className="mb-0" style={{ color: "#0E7CEB" }}>
              <b>Add New Associate Customer</b>
            </Title>
          </Button>
      </Card>
    </div>
  );
}

export default CustomerUsers;