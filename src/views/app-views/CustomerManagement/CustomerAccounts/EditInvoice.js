import PageHeading from "components/shared-components/PageHeading/PageHeading";
import React,{useCallback} from "react";
import axios from "axios";
import UserManagementIcon from "assets/svg/usermManagementPage.svg";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import Icon from "@ant-design/icons";
import { PaymentsActiveIcon } from "views/app-views/UserManagement/SvgIcons";
import dayjs from "dayjs";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { Successfully } from "configs/svgIcons";
import SuccessSubmit from "views/app-views/UserManagement/AddNewStaffV2/AsiignShift/SuccessSubmit";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";
import history from "history";

const { Column } = Table;
function EditInvoice() {
  const param = useParams();

  const [form] = useForm()
  const [invoiceget, setInvoiceget] = useState(null)
  const [data, setData] = useState([]);
  const [sub_totalInp, setsub_totalInp] = useState(0);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "YYYY-MM-DD", "DD-MM-YY"];
  const tok = localStorage.getItem("token");
  console.log(param.id, "id");

  const calculatesubtotal = () => {
    const total = data.reduce(
      (accumulator, current) => accumulator + current.quantity * current.price,
      0
    );
    console.log(total);
    return total;
  };

  const handleSave = useCallback((row) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => row.key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        return newData;
      } else {
        newData.push(row);
        return newData;
      }
    });
  }, [data]);
  

//   const handleSave = (row) => {
//     const newData = [...data];
//     const index = newData.findIndex((item) => row.key === item.key);
//     if (index > -1) {
//       const item = newData[index];
//       newData.splice(index, 1, { ...item, ...row });
//       setData(newData);
//     } else {
//       newData.push(row);
//       setData(newData);
//     }
   
//     console.log(invoiceget);
//   };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const history = useHistory()

  const finishHandler = (e) => {
    const tax = sub_totalInp * 0.8;
    const total = sub_totalInp + sub_totalInp * 0.08;
    console.log("event",e)
    // const date = new Date("01/01/2023");

    // const dueDate = new Date("01/02/2023");

    const isoDate = moment(e.date).format("YYYY-MM-DD")
    const isoDueDate = moment(e.dueDate).format("YYYY-MM-DD")
    setShowDeletedSuccess(true);
    const listNew = data.map((elem) => {
      return {
        key: elem.key,
        name: elem.name,
        quantity: elem.quantity,
        price: elem.price,
        total: elem.quantity * elem.price,
      };
    });
    const fdata = {
        id:invoiceget.id,
      tc_customer_id: param.id,
      date: isoDate,
      due_date: isoDueDate,
      status:"pending",
      sub_total: sub_totalInp,
      tax: tax.toString(),
      discount: 0,
      total: total.toString(),
      line_items: listNew,
    };
    

    axios({
      method: "post",
      url: "/api/tc/update-invoice",
      data: fdata,
      headers: {
        // "Content-Type": "multipart/form-data; boundary=-- --WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${tok}`,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data.data);
      } else {
        console.log(response);
      }
    }).then((err)=>{
      console.log(err);
    })
  };

  const AddRow = () => {
    const newData = {
      key: data.length + 1,
      name: "",
      quantity: 0,
      price: 0,
    };
    setData([...data, newData]);
  };

  useEffect(() => {
    if (invoiceget==null) {
        axios({
            method: "post",
            url: "/api/tc/get-invoice",
            data: { id: param.id },
            headers: {
              // "Content-Type": "multipart/form-data; boundary=-- --WebKitFormBoundary7MA4YWxkTrZu0gW",
              Authorization: `Bearer ${tok}`,
            },
          })
            .then((response) => {
              setInvoiceget(response.data.data);
              setData(response.data.data.line_items.map((elem,ind) => {
                return {
                  key: ind,
                  name: elem.name,
                  quantity: elem.quantity,
                  price: elem.price,
                  total: elem.quantity * elem.price,
                };
              }))
              setsub_totalInp(response.data.data.sub_total)
              console.log(response.data.data);
            })
            .then((err) => {
              console.log(err);
            });
        
    }
    setsub_totalInp(calculatesubtotal());
    console.log(data);
  }, [handleSave]);

  return (
    <div>
      <PageHeading
        icon={UserManagementIcon}
        title="Customer Management / Customer Accounts / Customer Details / Edit Invoice"
      />
      <Form
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="vertical"
        // onValuesChange={onFormLayoutChange}
        onFinish={finishHandler}
      >
        <Row>
          <Col className="mr-4" span={24}>
            <Card className="mt-3">
              <p
                style={{ color: "#000B23" }}
                className="d-flex align-items-center font-size-md font-weight-bold mb-4"
              >
                {" "}
                <Icon className="mr-2" component={PaymentsActiveIcon} /> Edit Invoice
              </p>
              <Row align="bottom">
                <Col span={8}>
                  <Form.Item name="customer" label="Customer">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="date" label="Date">
                    <DatePicker
                      // defaultValue={dayjs("01/01/2023", dateFormatList[0])}
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="due_date" label="Due Date">
                    <DatePicker
                      // defaultValue={dayjs("01/01/2023", dateFormatList[2])}
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table dataSource={invoiceget!=null && data}>
                    <Column
                      title="Name"
                      dataIndex="name"
                      key="name"
                      render={(text, record) => (
                        <Input
                          value={text}
                          onChange={(e) =>
                            handleSave({ ...record, name: e.target.value })
                          }
                        />
                      )}
                    />
                    <Column
                      title="Quantity"
                      dataIndex="quantity"
                      key="quantity"
                      render={(text, record) => (
                        <InputNumber
                          value={text}
                          onChange={(value) =>
                            handleSave({ ...record, quantity: value })
                          }
                        />
                      )}
                    />
                    <Column
                      title="Price"
                      dataIndex="price"
                      key="price"
                      render={(text, record) => (
                        <InputNumber
                          value={text}
                          onChange={(value) =>
                            handleSave({ ...record, price: value })
                          }
                        />
                      )}
                    />
                    <Column
                      title="Total"
                      dataIndex="total"
                      key="total"
                      render={(text, record) => (
                        <span>{record.quantity * record.price}</span>
                      )}
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <span>
                          <a href="#" onClick={() => handleDelete(record.key)}>
                            Delete
                          </a>
                        </span>
                      )}
                    />
                  </Table>
                  <Button className="mt-3 mb-4" type="default" onClick={AddRow}>
                    Add Row
                  </Button>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={24}>
                  {/* <Form.Item name="sub_total" label="Sub Total"> */}
                  {/* <InputNumber defaultValue={sub_totalInp} /> */}
                  {/* </Form.Item> */}
                  <div className="d-flex justify-content-between px-5">
                    <h5>Sub Total</h5>
                    <h5>{invoiceget!=null && sub_totalInp}</h5>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="d-flex justify-content-between pl-5">
                    <h5>Discount</h5>
                    <Form.Item name="discount" label=" ">
                      <Input defaultValue={invoiceget!=null && invoiceget.discount.toString()} />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={24}>
                  {/* <Form.Item name="tax" label="Tax">
                    <Input defaultValue={"7%"} />
                  </Form.Item> */}
                  <div className="d-flex justify-content-between px-5">
                    <h5>Tax 8%</h5>
                    <h5>{invoiceget!=null && sub_totalInp * 0.08}</h5>
                  </div>
                </Col>
                <Col span={24}>
                  {/* <Form.Item name="total" label="Total">
                    <InputNumber />
                  </Form.Item> */}
                  <div className="d-flex justify-content-between px-5">
                    <h5>Total</h5>
                    <h5>{invoiceget!=null && sub_totalInp + sub_totalInp * 0.08}</h5>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Form.Item className={`d-flex align-items-end Button`}>
          <Button onClick={history.goBack}>Back</Button>
          <Button
            onClick={() => {form.resetFields(); setData([{
              key: 0,
              name: "",
              quantity: "",
              price: "",
              total: "elem.quantity * elem.price",
            }])}}
            className="mx-3"
          >
            Clear All
          </Button>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
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
            title="Invoice Edited Successfully!"
            desc="Invoice has been edited and saved in the system"
          />
        </Modal>
      </Form>
    </div>
  );
}

export default EditInvoice;
