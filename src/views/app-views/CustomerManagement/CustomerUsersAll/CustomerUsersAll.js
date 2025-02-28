import React, { useState, useEffect } from 'react'
import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import SearchBox from 'components/shared-components/SearchBox';
import { Button, Space, Menu, Dropdown, Table, Modal } from 'antd'
import filterIcon from "assets/svg/filterIcon.svg";
import exportIcon from "assets/svg/exportIcon.svg";
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Avatar } from 'antd';
import Icon from "@ant-design/icons";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import { BoyIcon, GirlIcon } from "assets/svg/icon";
import { IN, SG, CN } from 'country-flag-icons/react/3x2'


function CustomerUsersAll() {

  const [searchText, setSearchText] = useState('')
  const [companyList, setCompanyList] = useState([])
  const tok = localStorage.getItem('token')
  const [current, setCurrent] = useState(['All'])
  const [companyFilter, setCompanyFilter] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(1);
  const [cpage, setCpage] = useState(0)
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);
  const history = useHistory()

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
      render: (_,record) => {
        return (
          <div className='d-flex align-items-center'>
           #{record.userId}
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "img",
      render: (item) => {
        const { image, name } = item;
        return (
          <div className='d-flex align-items-center'>
           <Avatar src={image} />
          </div>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Customer Name",
      dataIndex: "cust_name",
    },
    {
      title: "Gender",
      // dataIndex: "gender",
      render: (_,record) => {
        return (
          <div className='d-flex align-items-center'>
           <Icon component={record.gender === 1 ? BoyIcon : GirlIcon} />
          </div>
        );
      },
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
      render: (_,record) => {
        if(record.status==='Active') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Active</span>
        else return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Inactive</span>
      }
    },
    {
      title: "Action",
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
        if(res.success) {
          getUsers()
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          search: searchText ? searchText : null,
          customer_id: companyFilter[0] || null
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
        console.log(res)
        let fdata = res.map((elem, ind) => {
          return {
            key: ind,
            userId: elem.id,
            userName: elem.name,
            gender: elem.gender === 'Male' ? 1 : 2,
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
            cust_name: elem.customer_name,
            cust_pic: elem.customer_pic,
          };
        });
        // setUserData(userData.concat(fdata));
        setUserData(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ShowDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const getPdf = async () => {
    try {
      const response = await axios.post(
        "/api/tc/get-customer-users",
        {
          page_index: 1,
          page_size: 100000,
          search: searchText ? searchText : null,
          export_type: "pdf"
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      );
      console.log(response.data.url); // add this line to log the PDF URL
      if (response.data.status) {
        return response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyList = ()=> {
    axios
      .post(
        "/api/tc/get-customers",
        {
          page_index: 1,
          page_size: 100000,
          statuses: ["ACTIVE", "INACTIVE"],
          search : null,
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
        setCompanyList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function downloadPDF() {
    try {
      const pdfUrl = await getPdf();
      if (pdfUrl) {
        window.open(pdfUrl);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }

  const handleFilterClick = (e) => {
    setCurrent([e.key])
    if(e.key != 'All' && e.key != 'AllCompany') {
      setCompanyFilter([+e.key])
    }else {
      setCompanyFilter([])
    }
  }

  useEffect(() => {
    getCompanyList()
  }, [])

  useEffect(() => {
    getUsers()
  }, [page]);

  useEffect(() => {
    getUsers()
  }, [companyFilter]);

  useEffect(() => {
    getUsers()
  }, [searchText]);
  

  const menuFilter = (
    <Menu onClick={handleFilterClick} selectedKeys={current}>
      <Menu.Item key={'All'}>All</Menu.Item>
      <Menu.SubMenu title="Company">
        <Menu.Item key={"AllCompany"}>All</Menu.Item>
        {companyList.map((item)=> {
          return <Menu.Item key={item.id}>{item.name}</Menu.Item>
        })}
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <>
      <div>
        <PageHeading
          icon={UserManagementIcon}
          title="Customer Management / Customer Users"
        />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className=" d-flex align-items-center justify-content-between">
          <SearchBox setSearchText={setSearchText}/>
          <Dropdown overlay={menuFilter} trigger={['click']}>
            <Button className="d-flex align-items-center ml-2">
              <img className="mr-2" src={filterIcon} alt="filterIcon"></img>
              Filters
            </Button>
          </Dropdown>

          <Button onClick={downloadPDF} className="d-flex align-items-center ml-2" >
            <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
          </Button>
        </div>
      </div>
      <div>
        <Table
          scroll={{
            x: 1500,
          }}
          columns={columns}
          dataSource={userData}
          onChange={handlechange}
        />
      </div>
    </>
  )
}

export default CustomerUsersAll