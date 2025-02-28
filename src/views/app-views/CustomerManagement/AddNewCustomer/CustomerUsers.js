import React from "react";
// import avatar from "assets/Avatar2.png";
import { Avatar } from 'antd';
import Icon from "@ant-design/icons";
import { BoyIcon, GirlIcon } from "assets/svg/icon";
import { Successfully } from "configs/svgIcons";
import { Button, Modal, Space, Table } from "antd";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import { useState, useEffect } from "react";
import axios from "axios";
import { IN, SG, CN } from 'country-flag-icons/react/3x2'
import { useHistory } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import { Link } from "react-router-dom";

let data = [
];

// for (let i = 2; i < 9; i++) {
//   data.push({
//     key: i,
//     userId: "TC-123" + i,
//     userName: "Jane Copper",
//     gender: <Icon component={BoyIcon} />,
//     nationality: "icon",
//     img: { image: avatar, name: "John Smith" },
//     mobileNumber: "+91 936492648",
//     emailId: "jane@gmail.com",
//     jobSite: "5061 Ang Mo Kio Industrial Park 2 #01-1319 Singapore",
//     status: "Active",
//   });
// }

function CustomerUsers(props) {
  const [userData, setUserData] = useState(data);
  const tok = localStorage.getItem('token')
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleOk = (id) => {
    setOpenDeleteModal(false);
    axios
      .post(
        "/api/tc/delete-customer-users",
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
        let res = response.data
        console.log(res)
        if(res.success) {
          getUsers()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShowDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "key",
      render: (item) => {
        return (
          <div className='d-flex align-items-center'>
           {+item + 1}
          </div>
        );
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "",
      dataIndex: "img",
      render: (item) => {
        const { image, name } = item;
        return (
          <div className='d-flex align-items-center'>
           <Avatar src={image} />
           {/* <p className='m-0 p-0 ml-3 '>{name}</p> */}
          </div>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
    },

    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
    },
    {
      title: "Job Sites",
      dataIndex: "jobSite",
      render: (item) =>{
        console.log(item)
        let str = ''
        for(let data of item) {
          if(str.length > 1) str += ', '
          str += ""+data
        }
        return (
          <div>{str}</div>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "status",
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
                      to={`/app/customer-management/customer-accounts/edit-customer-user/${record.userId}`}
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
                    // onOk={handleOk}
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
                        onClick={()=>handleOk(record.id)}
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(1);
  const [cpage, setCpage] = useState(0)
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);
  const history = useHistory()
  const handleSave = async () => {
    setShowAddedSuccess(true);
    setTimeout(() => {
      setShowAddedSuccess(false);
      history.push('/app/customer-management/customer-accounts')
    }, 2000);
  };

  const selectChangeHandler = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectChangeHandler,
  };
  const handlechange = (pagination) => {
    if (cpage <= pagination.current) {
      setPage(pagination.current)
      setCpage(pagination.current)
    }
  }

  const getUsers = () => {
    axios
      .post(
        "/api/tc/get-customer-users",
        {
          page_index: page,
          page_size: 10,
          customer_id: props.id
          // statuses: ["Active", "Inactive"],
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

        let fdata = res.map((elem, ind) => {
          return {
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
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUsers()
  }, [page]);

  return (
    <>
      <div>
        <Table
          scroll={{
            x: 1300,
          }}
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={userData}
          onChange={handlechange}
        />
      </div>

      <div className={`d-flex w-full justify-content-end Button mt-4`}>
        <Button className="mx-3" onClick={props.onPre}>Back</Button>

        <Button type="primary" htmlType="submit" onClick={handleSave}>
          Save
        </Button>

      </div>
      <Modal
        centered
        visible={showAddedSuccess}
        footer={[null]}
        onCancel={() => {
          setShowAddedSuccess(false);
        }}
      >
        <SuccessSubmit
          icon={Successfully}
          title="Customer Added Successfully!"
          desc="Customer was added in the system"
        />
      </Modal>
    </>
  );
}

export default CustomerUsers;
