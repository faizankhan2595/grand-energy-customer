import React from 'react'
import React , {useState,useEffect} from "react";
import { Form, Button, Col, Row, message } from "antd";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Form1 from "./Form1";
import Modal from "components/UI/Modal";
import axios from "axios";
import moment from "moment";
import { useLocation, useHistory, useParams } from 'react-router-dom';

const AddNewInquiry = () => {
    const [form] = Form.useForm();
    // const [value, setValue] = useState('');
    const [jobsData , setJobsData] = useState([]);
    const [jobFile , setJobFile] = useState({
        name: '',
        url: ''
    });
    const [gstData, setGstData] = useState([]);
    const [customerAccountData, setCustomerAccountData] = useState([]);
    const history = useHistory();
       
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
                // id: props.id,
                // tc_customer_id: e.customer_id,
                // tc_customer_job_site_id: e.jobsite_id,
                // task_period_from_date: moment(e.quotationDate),
                // task_period_to_date: moment(e.quotationDate).add(+e.validity, 'days'),
                // due_date: moment(e.quotationDate).add(+e.validity, 'days'),
                // sub_total: getSubTotalAmount(),
                // status: e.status || 'Pending',
                // tax: gstData[gstData.length - 1].percentage || 8,
                // discount: e.discount || 0,
                // total: getTotalAmount(gstData[gstData.length - 1].percentage || 8),
                // payment_term: e.paymentTerm,
                // validity: +e.validity,
                // tc_quotation_file: jobFile.url,
                // quotation_remarks: e.remarks || '',
                // line_items: jobsData,
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
                // tc_customer_id: e.customer_id,
                // tc_customer_job_site_id: e.jobsite_id,
                // task_period_from_date: moment(e.quotationDate),
                // task_period_to_date: moment(e.quotationDate).add(+e.validity, 'days'),
                // due_date: moment(e.quotationDate).add(+e.validity, 'days'),
                // sub_total: getSubTotalAmount(),
                // status: e.status || 'Pending',
                // tax: gstData[gstData.length - 1].percentage || 8,
                // discount: e.discount || 0,
                // total: getTotalAmount(gstData[gstData.length - 1].percentage || 8),
                // payment_term: e.paymentTerm,
                // validity: +e.validity,
                // tc_quotation_file: jobFile.url,
                // quotation_remarks: e.remarks || '',
                // line_items: jobsData,
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

      useEffect(() => {
        axios
          .post(
            "/api/tc/get-customers",
            {
              page_index: 1,
              page_size: 100000,
              // statuses: ["ACTIVE", "INACTIVE", "PENDING APPROVAL"],
              searchText : null,
            }
          )
          .then((response) => {
            let res = response.data.data.data;
            console.log(res);
    
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
            console.log(customerAccountData)
          })
          .catch((error) => {
            console.log(error);
          });
    
          getAllGst();
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
      {/* {showModal && saveQuotaionModal} */}
      <PageHeading
        title="Create New Inquiry"
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
        onFinish={finishHandler}
      >
        <Form1 form={form} customers={customerAccountData} jobsData={jobsData} setJobsData={setJobsData} jobFile={jobFile} setJobFile={setJobFile}/>

          <div className="w-100 d-flex justify-content-end actions">
            <Form.Item className="w-100">
                <Button onClick={() => { history.goBack() }}>Back</Button>
                <Button onClick={() => { clearForm() }}>Clear All</Button>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </div>
      </Form>

    </React.Fragment>
  )
}

export default AddNewInquiry