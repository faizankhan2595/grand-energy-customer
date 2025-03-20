import React, {useState} from "react";
import { useHistory , useRouteMatch, useParams} from "react-router-dom";
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Icon from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown/index";
import { Menu, Button, Modal, Radio, Input } from "antd";
import { ViewDetailsIcon , DeleteIcon , SendQuotationIcon , RecordPaymentsIcon, CreateContractIcon } from "./ActionIcons";
import axios from 'axios'

const {TextArea} = Input

const Actions = ({setOpenContractModal, id, quotationData, quoteData, setQuoteData, getQuotations, setOpenStatusModal}) => {
	const history = useHistory();
	const match = useRouteMatch();
  // const [openStatusModal, setOpenStatusModal] = useState(false);
  // const [status, setStatus] = useState("Accepted");
  // const [remark, setRemark] = useState(false);

	const createContractHandler = () => {
    setOpenContractModal(true)
    setQuoteData({
      // ...quoteData,
      quotation_id: quotationData.id,
      customer_id: quotationData.customer_id,
      customer_job_site_id: quotationData.jobsite_id,
    });
    // setQuoteData(quotationData.id);
	}

  const generateInvoiceHandler = () => {
    history.push(`${match.path}/generate-invoice/${id}`)
  }

  const viewQuotationHandler = () => {
    history.push(`${match.path}/view-quotation/${quotationData.id}`)
  }

  // const editQuotationHandler = () => {
  //   history.push(`${match.path}/edit-quotation`)
  // }

  const editQuotationStatusHandler = () => {

    setQuoteData({
      ...quotationData,
      quotation_id: quotationData.id,
      customer_id: quotationData.customer_id,
      customer_job_site_id: quotationData.jobsite_id,
    });
    setOpenStatusModal(true);
  }

  // const handleStatusOk = () => {
  //     axios
  //     .post(
  //       "/api/tc/update-quotation",
  //       {
  //         ...quotationData,
  //         id: id,
  //         tc_customer_id: quotationData.customer_id,
  //         status: status
  //       },
  //     )
  //     .then((response) => {
  //       let res = response.data;
  //       console.log(res);
  //       setOpenStatusModal(false);
  //       getQuotations()
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
      
  // };
  // const handleStatusCancel = () => {
  //     setStatus("")
  //     setRemark('')
  //     setOpenStatusModal(false);
  // };
  // const handleCancel = () => {
  //   setOpenStatusModal(false);
  // };

  return (
    <>
      <EllipsisDropdown
        menu={
          <Menu>
            <Menu.Item onClick={viewQuotationHandler}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={ViewDetailsIcon} /> View Quotation
              </span>
            </Menu.Item>
            {/* <Menu.Item onClick={editQuotationHandler}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={ViewDetailsIcon} /> Edit Quotation
              </span>
            </Menu.Item> */}
            {/* <Menu.Item onClick={generateInvoiceHandler} disabled={quotationData.status==='Rejected'}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={RecordPaymentsIcon} /> Generate Invoice
              </span>
            </Menu.Item> */}
            <Menu.Item onClick={editQuotationStatusHandler} disabled={quotationData.status==='Contract Generated'}>
              <span className="d-flex align-items-center">
                <Icon className="mr-2" component={SendQuotationIcon} /> Quotation Status
              </span>
            </Menu.Item>
          </Menu>
        }
      />

      {/* <Modal
        visible={openStatusModal}
        centered
        maskClosable
        onCancel={handleCancel}
        title={'Account Status'}
        footer={[
            <Button key={'submit'} style={{ color: '#F5F5F5' }} type="primary" className='font-weight-bold' onClick={handleStatusOk}>Save</Button>,
            <Button key={'cancel'} style={{ color: '#000B23' }} onClick={handleStatusCancel} className='font-weight-bold'>Cancel</Button>,
        ]}
        >   
        <div>
            <Radio.Group
                size="small" 
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={"Accepted"}
            >
                <Radio value="Accepted" defaultChecked> Accepted </Radio>
                <Radio value="Rejected"> Rejected</Radio>
            </Radio.Group>
        </div>

        <div>
            <h4 className="mb-2 mt-4">Remarks</h4>
            <TextArea rows={4} onChange={(e) => setRemark(e.target.value)} value={remark} />
        </div>
      </Modal> */}
    </>
  );
};

export default Actions;
