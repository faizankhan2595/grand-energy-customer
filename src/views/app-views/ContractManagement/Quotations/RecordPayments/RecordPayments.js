import React , {useState} from 'react'

import { Form , Col , Row , Button, message  } from 'antd'
import { ItemsAndServicesPageIcon } from 'assets/svg/icon'
import ImageUpload from '../ImageUpload'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import PaymentRecordForm from './RecordPaymentsForm'
import Modal from 'components/UI/Modal'
import SaveRecordPaymentsModal from './SaveRecordPaymentsModal'

import classes from './RecordPayments.module.css'
import axios from 'axios'
import moment from 'moment'
import { useLocation, useHistory, useParams } from 'react-router-dom';

const RecordPayments = () => {
  const history = useHistory();
  const param = useParams();
  const [showModal , setShowModal] = useState(false);

  const finishHandler = (e) => {
    console.log(e)
    
    axios
    .post(
        "/api/tc/new-payment",
        {
            invoice_id: param.invoice_id,
            amount: e.amount || 0,
            payment_method: e.payment_method,
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
        message.success("Payment Recorded successfully")
        // savePaymentHandler()
        history.goBack()
    })
    .catch((error) => {
        console.log(error);
    });
  };

  const savePaymentHandler = () => {
    setShowModal(prev => !prev);
  }

  const savePaymentModal = (
    <Modal onClose={savePaymentHandler}>
      <SaveRecordPaymentsModal/>
    </Modal>
  )


  return (
    <React.Fragment>
      {showModal && savePaymentModal}
      <div>
        <PageHeading
        // svg={ItemsAndServicesPageIcon}
        title="Record Payments"
        />
      </div>
      <Form
        layout="horizontal"
        onFinish={finishHandler}
      >
        

        <Row gutter={20}>
          <Col span={16}>
            <PaymentRecordForm invoice_id={param.invoice_id || 0}/>
          </Col>
          {/* <Col span={8}>
            <ImageUpload />
          </Col> */}
        </Row>
      </Form>

      <div className={`d-flex justify-content-end ${classes.actions}`}>
        <Button onClick={()=>history.goBack()}>Back</Button>
        <Button type="primary" className={classes.save_btn}>Save</Button>
      </div>
    </React.Fragment>
  )
}

export default RecordPayments