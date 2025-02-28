import PageHeading from "components/shared-components/PageHeading/PageHeading";
import React from "react";
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
import { toInteger } from "lodash";

const { Column } = Table;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
function AddNewInvoice() {
  const param = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [jobs,setJobs] = useState([])
  const [sub_totalInp, setsub_totalInp] = useState(0);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [FileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const tok = localStorage.getItem("token");
  console.log(param.id, "id");

  const calculatesubtotal = () => {
    const total = data.reduce(
      (accumulator, current) => accumulator + current.quantity * current.price,
      0
    );
    return total;
  };

  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setData(newData);
    } else {
      newData.push(row);
      setData(newData);
    }
  };


  useEffect(() => {
    axios
      .post(
        "/api/tc/get-customer-job-sites",
        {
          page_index: 1,
          page_size: 100000,
          statuses: ["ACTIVE", "INACTIVE"],
          // customer_id: props.id ? props.id : null,
          // search : props.searchText? props.searchText : null,
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
            img: { image: elem?.img, name: elem.name },
            staffAssign: elem.staffAssign,
            tasks: elem.tasks,
            revenue: elem.revenue,
            outstandingAmt: elem.outstandingAmt,
            total_tasks: elem.total_tasks,
            total_staffs: elem.total_staffs,
            status: elem.status,
            action: "",
          };
        });
        setJobs(fdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const imageConverterToUrl = async(file) => {
    const formData = new FormData();
    try{
      formData.append("file",file[0].originFileObj);
      const res = await axios({
        method: "post",
        url: "/api/tc/upload-document",
        data: formData,
        headers: {
          "content-type": `multipart/form-data`,
          Authorization: `Bearer ${tok}`,
        },
      })
      
      if (res.data.success) {
        console.log(res.data.url);
        return res.data.url;
      }

       
    }catch(error) {
      console.log(error);
      return null;
    };
   
  }

  const finishHandler = async(e) => {
    let image = await imageConverterToUrl(FileList)
    const tax = sub_totalInp * 0.08;
    const total = sub_totalInp + sub_totalInp * 0.08;
    const startDate = moment(e.taskPeriod[0]).format("YYYY-MM-DD");
    const endDate = moment(e.taskPeriod[1]).format("YYYY-MM-DD");
    console.log("event",e)
    // const date = new Date("01/01/2023");

    // const dueDate = new Date("01/02/2023");

    const isoDate = moment(e.date).format("YYYY-MM-DD")
    const isoDueDate = moment(e.dueDate).format("YYYY-MM-DD")
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
      tc_customer_id: param.id,
      task_period_from_date: startDate,
      task_period_to_date: endDate,
      date: isoDate,
      due_date: isoDueDate,
      sub_total: sub_totalInp,
      status:"pending",
      tax: tax.toString(),
      discount: e.discount,
      total: total.toString(),
      tc_invoice_file: image,
      invoice_remarks: e.remarks.toString(),
      line_items: [],
      // status:"pending",
      // sub_total: sub_totalInp,
      // tax: tax.toString(),
      // discount: 0,
      // total: total.toString(),
      // line_items: listNew,

    };
    // const fdata = {
    //   tc_customer_id:2,
    //   date:"2022-12-31",
    //   due_date:"2023-01-01",
    //   sub_total:50,
    //   tax:"3.5000000000000004",
    //   discount: 0,
    //   status:"pending",
    //   total:53.5,
    //   line_items: [
    //     {key: 1, 
    //     name: "h", 
    //     quantity: 5, 
    //     price: 5, 
    //     total: 25},
    //     {key: 2, 
    //     name: "hg", 
    //     quantity: 5, 
    //     price: 5, 
    //     total: 25}
    //     ]
    // };
    

    axios({
      method: "post",
      url: "/api/tc/new-invoice",
      data: fdata,
      headers: {
        // "Content-Type": "multipart/form-data; boundary=-- --WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${tok}`,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data.data);
        setShowDeletedSuccess(true);
      } else {
        console.log(response);
      }
    }).catch((err)=>{
      message.warn(err.response.data.message)
      console.log(err.response);
    })
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    console.log(FileList)
  };
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    // setPreviewImage(file.url || file.preview);
    // setPreviewOpen(true);
    // setPreviewTitle(
    //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    // );
    console.log(file.preview)
    if(file.preview) {
      const newTab = window.open();
      newTab.document.write('<embed width="100%" height="100%" src="' + file.preview + '" type="application/pdf">');
    }
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

  const getAllCustomers = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-customers",
      headers: {
          Authorization: `Bearer ${tok}`
      },
      data: {
          page_index: 1,
          page_size: 100000,
          search : null
      },
    }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          setCustomers(response.data.data.data);
        } else {
            console.log(response)
        }
    });
  };

  useEffect(() => {
    setsub_totalInp(calculatesubtotal());
    console.log(sub_totalInp);
  }, [handleSave]);

  useEffect(() => {
    getAllCustomers();
    form.setFieldsValue({
      customer: toInteger(param.id)
    });
  }, []);

  return (
    <div>
      <PageHeading
        icon={UserManagementIcon}
        title="Customer Management / Customer Accounts / Customer Details / Create New Invoice"
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
              {/* <p
                style={{ color: "#000B23" }}
                className="d-flex align-items-center font-size-md font-weight-bold mb-4"
              >
                {" "}
                <Icon className="mr-2" component={PaymentsActiveIcon} /> Create New Invoice
              </p> */}
              <p
                style={{ color: "#000B23" }}
                className="d-flex align-items-center font-size-md font-weight-bold mb-4"
              >
                {" "}
                Create New Invoice
              </p>
              <Row align="bottom">
              <Col span={12}>
                  <Form.Item name="customer" label="Customer">
                    <Select disabled>
                      {customers.map((elem, index) => {
                        return (
                          <Select.Option key={index} value={elem.id}>
                            {elem.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={12}>
                  <Form.Item name="jobsite" label="Select Job Site">
                    <Select>
                      {jobs.map((elem, index) => {
                        return (
                          <Select.Option key={index} value={elem.id}>
                            {elem.jobSite}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="taskPeriod" label="Task period">
                    <RangePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={12}>
                  <Form.Item name="amount" label="Amount">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="discount" label="Discount">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={12}>
                  <Form.Item name="tax" label="Tax/GST">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="total" label="Net Total">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={12}>
                  <Form.Item name="due_date" label="Due Date">
                    <DatePicker
                      defaultValue={moment(new Date()).add(1,"month")}
                      format={"DD-MM-YYYY"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={12}>
                  <Form.Item name="remarks" label="Remarks">
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="bottom">
                <Col span={24}>
                  <Form.Item name="invoice" label="Upload Invoice"  style={{alignContent: 'start'}}>
                    <Dragger
                        beforeUpload={() => {
                        return false;
                    }}
                    listType="text"
                    style={{ minHeight: '50px', minWidth: '150%', maxHeight: "150px",  marginBottom: '10px' }}
                    maxCount={1}
                    accept=".pdf"
                    onPreview={handlePreview}
                    onChange={handleUploadChange}
                    fileList={FileList}
                    className='dragUpload'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="font-weight-bold text-size-md">Drag & drop files here or <span className='text-danger'>Choose Files</span></p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row>
                <Col span={24}>
                  <Table dataSource={data}>
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
                    Add Item
                  </Button>
                </Col>
              </Row> */}
              {/* <Row align="bottom">
                <Col span={24}>
                  <div className="d-flex justify-content-between px-5">
                    <h5>Sub Total</h5>
                    <h5>{sub_totalInp}</h5>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="d-flex justify-content-between pl-5">
                    <h5>Discount</h5>
                    <Form.Item name="discount" label=" ">
                      <InputNumber />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="d-flex justify-content-between px-5">
                    <h5>Tax 8%</h5>
                    <h5>{sub_totalInp * 0.08}</h5>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="d-flex justify-content-between px-5">
                    <h5>Total</h5>
                    <h5>{sub_totalInp + sub_totalInp * 0.08}</h5>
                  </div>
                </Col>
              </Row> */}
            </Card>
          </Col>
        </Row>

        <Form.Item className={`d-flex align-items-end Button`}>
          <Button>Back</Button>
          <Button
            onClick={() => form.resetFields()}
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
            title="Invoice Added Successfully!"
            desc="Invoice has been added in the system"
          />
        </Modal>
      </Form>
    </div>
  );
}

export default AddNewInvoice;
