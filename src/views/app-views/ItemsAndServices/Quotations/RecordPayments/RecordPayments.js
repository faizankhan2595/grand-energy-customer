import React , {useState} from 'react'

import { Form , Col , Row , Button  } from 'antd'

import { ItemsAndServicesPageIcon } from 'assets/svg/icon'

import ImageUpload from '../ImageUpload'
import PageHeading from 'components/shared-components/PageHeading/PageHeading'
import PaymentRecordForm from './RecordPaymentsForm'
import Modal from 'components/UI/Modal'
import SaveRecordPaymentsModal from './SaveRecordPaymentsModal'

import classes from './RecordPayments.module.css'

const RecordPayments = () => {

  const [showModal , setShowModal] = useState(false);

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
        title="Items $ Services / Quotations / Record Payments"
        svg={ItemsAndServicesPageIcon}
        />
      </div>
      <Form
        layout="horizontal"

        // onValuesChange={onFormLayoutChange}
      >
        

        <Row gutter={20}>
          <Col span={16}>
            <PaymentRecordForm/>
          </Col>
          <Col span={8}>
            <ImageUpload />
          </Col>
        </Row>
      </Form>

      <div className={`d-flex justify-content-end ${classes.actions}`}>
        <Button>Back</Button>
        <Button>Clear All</Button>
        
          <Button type="primary" className={classes.save_btn} onClick={savePaymentHandler}>Save</Button>
        
      </div>
    </React.Fragment>
  )
}

export default RecordPayments