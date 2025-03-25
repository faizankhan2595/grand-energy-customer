import React, { useState, useEffect } from "react";
import { Button, Drawer, InputNumber, DatePicker, Modal, Input, Select, Table, Menu } from "antd";
import Icon from "@ant-design/icons"
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import SearchBox from "components/shared-components/SearchBox";
import { FilterIcon, ItemsAndServicesIcon, ExportIcon } from "assets/svg/icon";
import exportIcon from "assets/svg/exportIcon.svg";
import { InvoiceIcon } from "views/app-views/UserManagement/SvgIcons";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";

import { Link , useRouteMatch  } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import moment from "moment";
// import { Item } from "rc-menu";

const InvoiceManagement = () => {
    const [selectedCustomerFilter , setSelectedCustomerFilter] = useState(false);
    const [selectedContractFilter , setSelectedContractFilter] = useState(false);
    const [selectedStatusFilter , setSelectedStatusFilter] = useState(false);
    const [selectedFilter , setSelectedFilter] = useState(false);
    const [searchText , setSearchText] = useState('');
    const [invoiceData, setInvoiceData] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [allContracts, setAllContracts] = useState([]);
    const customer_id = localStorage.getItem("customer_id");

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const headers = [
        { label: "ID", key: "id" },
        { label: "Contract ID", key: "tc_contract_id" },
        { label: "Jobsite Name", key: "jobsite_name" },
        { label: "Total Tasks", key: "total_tasks" },
        { label: "Net Amount (S$)", key: "total" },
        { label: "Paid amount (S$)", key: "amount_paid" },
        { label: "Invoice Date", key: "created_at" },
        { label: "Status", key: "status" }
    ]

    const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Contract ID",
          dataIndex: "tc_contract_id",
        },
        {
          title: "Jobsite Name",
          dataIndex: "jobsite_name",
        },
        {
          title: "Total Tasks",
          dataIndex: "total_tasks",
        },
        {
          title: "Net Amount (S$)",
          dataIndex: "total",
        },
        {
          title: "Paid amount (S$)",
          dataIndex: "paid_amount",
          render: (_, record) =>{
            return <div>{record.paid_amount || 0}</div>
          }
        },
        {
          title: "Invoice Date",
          dataIndex: "created_at",
          // render: (_, record) =>{
          //   return <div>{moment(record.created_at).format("DD-MM-YYYY")}</div>
          // }
        },
        {
          title: "Status",
          dataIndex: "status",
          render: (_,record) => {
            if(record.status==='Paid' || record.status==='PAID') return <span style={{color: "#00AB6F", backgroundColor: "#EDFFF9", padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Paid</span>
            else if(record.status==='Overdue' || record.status==='OVERDUE') return <span style={{color: '#F53434', backgroundColor: '#FFF2F2', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Overdue</span>
            else return <span style={{color: '#FFC700', backgroundColor: '#FFC7001A', padding: '4px 8px', borderRadius:'6px', fontWeight:'600', fontSize: '14px'}}>Pending</span>
          }
        },
        {
          title: "Action",
          render: (_, record) => {
            return (
              <>
                <EllipsisDropdown
                  menu={
                    <Menu>
                      <Menu.Item>
                        <Link
                          to={`/app/contract-management/quotations/view-invoice/${record.id}`}
                          className="d-flex align-items-center"
                        >
                          <Icon component={InvoiceIcon} />
                          View Invoice
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          to={`/app/contract-management/quotations/edit-invoice/${record.id}`}
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
                          Are Sure you want to delete this invoice?
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
        deleteInvoice(id);
        setOpenDeleteModal(false);
    };
    
    const ShowDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const drawerHandler = () => {
      setDrawerIsOpen((prevState) => {
        console.log("Drawer " + (!prevState ? 'Open':'Closed'));
  
        return !prevState
      });
      // setDrawerIsOpen(true);
    };
  
    const handleDrawerOk = () => {
      setSelectedFilter((previousState) => !previousState)
      setDrawerIsOpen(false);
    };
  
    const onDrawerClose = () => {
      console.log("Closed")
      setDrawerIsOpen(false);
    };
  
    const handleDrawerReset = () => {
      setSelectedFilter((previousState) => !previousState)
      setSelectedCustomerFilter(false)
      setSelectedContractFilter(false)
      setSelectedStatusFilter(false)
  
      setDrawerIsOpen(false);
    };
    
    const deleteInvoice = (id) => {
        console.log("Invoice deleted", id);
        axios({
          method: "post",
          url: "/api/tc/delete-invoice",
          data: { id: id },
        })
          .then((response) => {
            console.log(response.data);
            setInvoiceData(
              invoiceData.filter((elem) => {
                return elem.id !== id;
              })
            );
          })
          .then((err) => {
            console.log(err);
          });
    };

    const getAllInvoices = () => {
      axios({
        method: "post",
        url: "/api/tc/get-invoices",
        data: {
          search: '',
          customer_id: selectedCustomerFilter,
          // contract_id: selectedContractFilter,
          statuses: [selectedStatusFilter],
          customer_id: customer_id
        }
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setInvoiceData(
              response.data.data.data.map((elem, ind) => {
                return {
                  ...elem,
                  index: ind + 1,
                  created_at: moment(elem.created_at).format('DD-MM-YYYY')
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
    }
    
    useEffect(() => {
      getAllInvoices()
    }, [])


  return (
    <React.Fragment>
      <div className='d-flex justify-content-between'>
        <PageHeading
          title="Invoices"
        />
        
        <div className="d-flex justify-content-between mb-3">
          <div className=" d-flex align-items-center justify-content-between mr-2">
            <SearchBox setSearchText={setSearchText} />
            
            {/* <Button className="d-flex align-items-center ml-2" onClick={drawerHandler}>
              <Icon className="mr-2" component={FilterIcon} />
              Filters
            </Button> */}

            <CSVLink data={invoiceData} 
              headers={headers} 
              filename={"All-Invoices.csv"}
            >
              <Button className="d-flex align-items-center ml-2">
                <img className="mr-2" src={exportIcon} alt="exportIcon"></img>Export
              </Button>
            </CSVLink>
          </div>
        </div>
      </div>

      <div>
        <Table
            columns={columns}
            dataSource={invoiceData}
        />
      </div>

      <div>
        <Drawer title="Filter"
          placement="right"
          onClose={onDrawerClose} 
          open={drawerIsOpen}
          closable={true}
          visible={drawerIsOpen}
          footer={[
            <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold mr-2' onClick={handleDrawerOk}>Apply</Button>,
            <Button key={'cancel'} style={{ color: '#000B23' }} onClick={() => {handleDrawerReset()}} className='font-weight-bold'>Reset</Button>,
          ]}
        >
          <div className="mb-2">
            <h4>Customer</h4>
            <Select
                showSearch
                placeholder="Jobsite"
                value={selectedCustomerFilter}
                onChange={(e) => {setSelectedCustomerFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                {allCustomers && allCustomers.map((val, id) => (
                    <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                ))}
            </Select>
          </div>
          {/* <div className="mb-2">
            <h4>Contract ID</h4>
            <Select
                showSearch
                placeholder="Jobsite"
                value={selectedContractFilter}
                onChange={(e) => {setSelectedContractFilter(e)}}
                className="w-100"
            >    
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                {allContracts && allContracts.map((val, id) => (
                    <Select.Option title={val.name} key={id} value={val?.id}>{val.name}</Select.Option>
                ))}
            </Select>
          </div> */}
          <div>
            <h4>Status</h4>
            <Select
                showSearch
                placeholder="Status"
                value={selectedStatusFilter}
                onChange={(e) => {setSelectedStatusFilter(e)}}
                className="w-100"
            >
                <Select.Option title={'None'} key={'None'} value={null}>{'None'}</Select.Option>
                <Select.Option title={'Pending'} key={'Pending'} value={'Pending'}>{'Pending'}</Select.Option>
                <Select.Option title={'Paid'} key={'Paid'} value={'Paid'}>{'Paid'}</Select.Option>
                <Select.Option title={'Overdue'} key={'Overdue'} value={'Overdue'}>{'Overdue'}</Select.Option>
            </Select>
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  )
}

export default InvoiceManagement