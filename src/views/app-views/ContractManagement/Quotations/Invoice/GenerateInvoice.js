import React , {useState,useEffect} from "react";
import { Form, Button, Col, Row, message } from "antd";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import Modal from "components/UI/Modal";
import QuotationModal from "./QuotationModal";
import axios from "axios";
import moment from "moment";
import { useLocation, useHistory, useParams } from 'react-router-dom';
import FormInvoice from "./FormInvoice";

const GenerateInvoice = () => {
    const [form] = Form.useForm();
    const param = useParams();
    const [jobsData , setJobsData] = useState([]);
    const [jobFile , setJobFile] = useState({
      name: '',
      url: ''
    });
    const [customerAccountData, setCustomerAccountData] = useState([]);
    const [invoiceData, setInvoiceData] = useState({});
    const [quotationData, setQuotationData] = useState({});
    const [contractData, setContractData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const history = useHistory();
     
    const [showModal , setShowModal] = useState(false);
  
    const saveQuotationHandler = () => {
      setShowModal(prev => !prev);
    }
  
    const saveQuotaionModal = (
      <Modal onClose = {saveQuotationHandler}>
        <QuotationModal/>
      </Modal>
    )
  
    const finishHandler = (e) => {
        console.log(e)
        if(param.id) {
          axios
        .post(
            "/api/tc/update-invoice",
            {
                id: param.id,
                tc_customer_id: e.customer_id,
                tc_contract_id: e.contract_id,
                tc_quotation_id: e.quotation_id,
                tc_customer_job_site_id: e.jobsite_id,
                task_period_from_date: moment(e.quotationDate),
                task_period_to_date: moment(e.quotationDate).add(+e.expiryDate, 'days'),
                due_date: moment(e.quotationDate).add(+e.expiryDate, 'days'),
                sub_total: 0,
                status: e.status || 'Pending',
                tax: e.gst || 8,
                total: quotationData.total,
                tc_quotation_file: quotationData.tc_quotation_file,
                quotation_remarks: e.remarks || '',
                line_items: quotationData.line_items,

                tc_invoice_file: quotationData.tc_quotation_file,
                invoice_remarks: "None",
                discount: e.discount || 0,
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
            message.success("Invoice generated successfully")
            history.goBack()
        })
        .catch((error) => {
            console.log(error);
        });
        } else {
          axios
        .post(
            "/api/tc/new-invoice",
            {
                tc_customer_id: e.customer_id,
                tc_contract_id: e.contract_id,
                tc_quotation_id: e.quotation_id,
                tc_customer_job_site_id: e.jobsite_id,
                task_period_from_date: moment(e.quotationDate),
                task_period_to_date: moment(e.quotationDate).add(+e.expiryDate, 'days'),
                due_date: moment(e.quotationDate).add(+e.expiryDate, 'days'),
                sub_total: 0,
                status: e.status || 'Pending',
                tax: e.gst || 8,
                total: quotationData.total,
                tc_quotation_file: quotationData.tc_quotation_file,
                quotation_remarks: e.remarks || '',
                line_items: quotationData.line_items,

                tc_invoice_file: quotationData.tc_quotation_file,
                invoice_remarks: "None",
                discount: e.discount || 0,
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
            message.success("Invoice generated successfully")
            history.goBack()
        })
        .catch((error) => {
            console.log(error);
        });
        }
        
    };

    const getInvoiceDetails = () => {
      axios
        .post(
          "/api/tc/get-invoice",
          {
            id: +param.id,
          }
        )
        .then((response) => {
          let res = response.data.data;
          console.log(res);
  
          setInvoiceData(
            {
              ...res,
            }
          );
          form.setFieldsValue(
            {
              // ...res,
              quotation_id: res.id,
              customer_id: res?.tc_customer_id,
              jobsite_id: res?.tc_customer_job_site_id,
              quotation_file: res?.tc_quotation_file,
              discount: res.discount,
              // invoice_due_date: res.due_date,
            }
          )
          console.log(form.getFieldsValue())
          if(res.tc_contract_id) getContractDetails(res.tc_contract_id);
          console.log(invoiceData)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const getContractDetails = (contract_id) => {
      axios
        .post(
          "/api/tc/get-contracts",
          {
            id: +contract_id,
          }
        )
        .then((response) => {
          let res = response.data.data.data[0];
          console.log(res);
          
          if(res.length) {
            setContractData(
              {
                ...res,
              }
            );
            form.setFieldsValue(
              {
                ...form.getFieldsValue(),
                contract_id: res.id,
                discount: 0,
                invoice_due_date: null,
              }
            )
          }
          console.log(contractData);
          if(res.tc_quotation_id) getQuotationDetails(res.tc_quotation_id)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const getQuotationDetails = (quotation_id) => {
      axios
        .post(
          "/api/tc/get-quotation",
          {
            id: +quotation_id,
          }
        )
        .then((response) => {
          let res = response.data.data;
          console.log(res);
  
          setQuotationData(
            {
              ...res,
            }
          );
          form.setFieldsValue(
            {
              // ...res,
              quotation_id: res.id,
              customer_id: res?.tc_customer_id,
              jobsite_id: res?.tc_customer_job_site_id,
              quotation_file: res?.tc_quotation_file,
            }
          )
          // console.log(form.getFieldsValue())
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const getAllCustomers = () => {
      axios
        .post(
          "/api/tc/get-customers",
          {
            page_index: 1,
            page_size: 100000,
            statuses: ["ACTIVE", "INACTIVE", "PENDING APPROVAL"],
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
    }
  
    useEffect(() => {
      if(param.id) {
        setIsEdit(true)
        getInvoiceDetails();
      } else {
        getQuotationDetails();
      }
      getAllCustomers();
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
        {showModal && saveQuotaionModal}
        <PageHeading
          title={isEdit ? "Edit Invoice" : "Create New Invoice"}
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
          {invoiceData ? <FormInvoice form={form} customer_id={invoiceData.tc_customer_id} 
          customers={customerAccountData} jobsData={jobsData} setJobsData={setJobsData} 
          jobFile={jobFile} setJobFile={setJobFile} jobFileUrl={invoiceData.tc_quotation_file}/> 
          : <FormInvoice form={form} customer_id={quotationData.tc_customer_id} 
          customers={customerAccountData} jobsData={jobsData} setJobsData={setJobsData} 
          jobFile={jobFile} setJobFile={setJobFile} jobFileUrl={quotationData.tc_quotation_file}/>}
  
          <Form.Item>
            <div className="w-100 d-flex justify-content-start actions">
              <Button onClick={() => { history.goBack() }}>Cancel</Button>
              <Button onClick={() => { clearForm() }}>Clear All</Button>
              <Button type="primary" htmlType="submit" style={{width: 'fit-content'}}>Generate Invoice</Button>
            </div>
          </Form.Item>
        </Form>
  
      </React.Fragment>
    );
  };

export default GenerateInvoice