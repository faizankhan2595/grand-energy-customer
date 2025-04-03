import React , {useState,useEffect} from "react";
import { Form, Button, Col, Row, Card, Input, Select, message, DatePicker } from "antd";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";
import axios from "axios";
import moment from "moment";
import { useLocation, useHistory, useParams } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AddNewInquiry = (props) => {
    const [form] = Form.useForm();
    const params = useParams();
    // const [value, setValue] = useState('');
    const [selectedAssociateType , setSelectedAssociateType] = useState([]);
    const [jobsData , setJobsData] = useState([]);
    const [jobFile , setJobFile] = useState({
        name: '',
        url: ''
    });
    const [gstData, setGstData] = useState([]);
    const [customerAccountData, setCustomerAccountData] = useState([]);
    const history = useHistory();
    const customer_id = localStorage.getItem("customer_id")
       
    const [showModal , setShowModal] = useState(false);
    
    const saveQuotationHandler = () => {
        setShowModal(prev => !prev);
    }
    
    const finishHandler = (e) => {
        console.log(e)
        // console.log(e.status)
        // if(!jobFile || !jobFile.url) {
        //   message.error("Please Upload attachment file first");
        //   return
        // }
    
        if (props.id) {
          axios
            .post(
              "/api/tc/update-inquiry",
              {
                id: props.id,
                tc_customer_id: customer_id,
                type: e.inquiry_type,
                // name: e.inquiry_name,
                description: e.description || '',
                date: e.date || moment().format('YYYY-MM-DD'),
                comments: e.comments || [],
                status: e.status || 'Open'
              },
              {
                headers: {
                  "content-type": "application/json"
                },
              }
            )
            .then((response) => {
              if(!response.data.success){
                message.warn(response.data.msg)
                return;
              }
              console.log(props.id)
              message.success("Inquiry created successfully")
              history.goBack()
            })
            .catch((error) => {
              console.log(error);
            });
          return
        } else {
          axios
            .post(
              "/api/tc/new-inquiry",
              {
                tc_customer_id: customer_id,
                type: e.inquiry_type,
                // name: e.inquiry_name,
                description: e.description || '',
                date: moment().format('YYYY-MM-DD'),
                comments: e.comments || [],
                status: 'Open'
              },
              {
                headers: {
                  "content-type": "application/json"
                },
              }
            )
            .then((response) => {
              if(!response.data.success){
                message.warn(response.data.msg)
                return;
              }
              message.success("Inquiry created successfully")
              history.goBack()
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      const getSubTotalAmount = () => {
        let amount = 0;
        if(jobsData.length > 0) {
          for(let i=0; i<jobsData.length; i++) {
            amount += jobsData[i].total;
          }
        }
        return amount
      }
    
      const getTotalAmount = (gst_percentage) => {
        let amount = 0;
        if(jobsData.length > 0) {
          for(let i=0; i<jobsData.length; i++) {
            amount += jobsData[i].total;
          }
        }
        if(amount) {
          amount = amount + ((+gst_percentage/100)*amount);
        }
        return amount
      }
    
      const getAllGst = ()=> {
        axios({
            method: 'post',
            url: "/api/tc/get-all-gsts",
            data: {},
        }).then(function (response) {
            if(response.data.success) {
                console.log(response.data.data)
                let res = response.data.data.data;
                let fdata = res.map((elem, ind) => {
                  return {
                      key: elem.id,
                      id: elem.id,
                      srNo: ind+1,
                      percentage: elem.percentage,
                      description: elem.description,
                      created_at: moment(elem.created_at).format("DD-MM-YYYY"),
                      updated_at: moment(elem.updated_at).format("DD-MM-YYYY"),
                  };
                });
                setGstData(fdata);
                // console.log(fdata);
    
                // form.setFieldsValue ({
                //   ...form.getFieldsValue(),
                //   gst: res[res.length - 1].percentage || 8
                // })
            }
        }).catch(function (error) {
            console.log(error);
        });
      };

      const getCustomersData = () => {
        axios
        .post(
          "/api/tc/get-customers",
          {
            page_index: 1,
            page_size: 100000,
            searchText : null,
          }
        )
        .then((response) => {
          let res = response.data.data.data;
  
          let fdata = res.map((elem, ind) => {
            return {
              key: ind,
              id: elem.id,
              company: elem.name,
              phoneNumber: elem.phone,
              emailId: elem.email
            };
          });
  
          setCustomerAccountData(customerAccountData.concat(fdata));
        })
        .catch((error) => {
          console.log(error);
        });
      }

      const getInquiry = () => {

      }

      useEffect(() => {
        getCustomersData();
        getAllGst();
        if(params.id) {
          getInquiry();
        } else {
          form.setFieldsValue({
            inquiry_date: moment()
          })
        }
      }, []);
    
      const clearForm = () => {
        form.resetFields();
        setJobsData([]);
        setJobFile(({
          name: '',
          url: ''
        }));
      }
    
  return (
    <React.Fragment>
      <PageHeading title="Create New Inquiry" />

      <Form
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="vertical"
        onFinish={finishHandler}
      >
        <Card className="mt-2">
          <div className="d-flex justify-content-end" style={{ color: "red" }}>
            <div>* Indicates Mandatory Fields</div>
          </div>

          <Row align="top">
            <Col span={12}>
              <Form.Item name="inquiry_date" label="Inquiry Date" rules={[{ required: true, message: "Required" }]}>
                <DatePicker disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="inquiry_type" label="Inquiry Type" rules={[{ required: true, message: "Required" }]}>
                <Select showSearch value={selectedAssociateType} onChange={setSelectedAssociateType}>
                  <Select.Option key="General Inquiry" value="General Inquiry"></Select.Option>
                  <Select.Option key="Service Inquiry" value="Service Inquiry"></Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* <Row align="top">
            <Col span={12}>
              <Form.Item name="inquiry_name" label="Name">
                <Input />
              </Form.Item>
            </Col>
          </Row> */}

          <Row align="top">
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <TextArea rows={3}/>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div className="w-100 d-flex justify-content-end actions">
          <Form.Item className="w-100">
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                clearForm();
              }}
            >
              Clear All
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default AddNewInquiry