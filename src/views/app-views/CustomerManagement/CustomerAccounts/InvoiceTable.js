import { Table } from "antd";
import React, { useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import { InvoiceIcon } from "views/app-views/UserManagement/SvgIcons";
import { VisibilityIcon, DeleteIcon, EditIcon } from "assets/svg/ActionsSvg";
import { Link } from "react-router-dom";
import axios from "axios";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu } from "antd";
import { Button, Modal } from "antd";
import moment from "moment";

function InvoiceTable({ searchText, custId }) {
  const [invoiceData, setInvoiceData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const tok = localStorage.getItem("token");

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
      dataIndex: "amount_paid",
      render: (_, record) =>{
        return <div>{record.amount_paid || 0}</div>
      }
    },
    {
      title: "Invoice Date",
      dataIndex: "created_at",
      render: (_, record) =>{
        return <div>{moment(record.created_at).format("DD-MM-YYYY")}</div>
      }
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
      // dataIndex:'Action',
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
                    // onOk={handleOk}
                    // onCancel={handleCancel}
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

  const deleteInvoice = (id) => {
    console.log("Invoice deleted", id);
    axios({
      method: "post",
      url: "/api/tc/delete-invoice",
      data: { id: id },
      headers: {
        // "Content-Type": "multipart/form-data; boundary=-- --WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${tok}`,
      },
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

  useEffect(() => {
    const data = { customer_id: custId };
    axios({
      method: "post",
      url: "/api/tc/get-invoices",
      data: data
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setInvoiceData(
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
      url: "/api/tc/get-invoices",
      data: data
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setInvoiceData(
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
        // scroll={{ x: 1300 }}
        columns={columns}
        dataSource={invoiceData}
      />
    </div>
  );
}

export default InvoiceTable;
