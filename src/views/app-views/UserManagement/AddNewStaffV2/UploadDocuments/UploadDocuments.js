import React from 'react'
import { Button, Card, Form } from 'antd'
import Form1 from './Form1'

const UploadDocuments = (props) => {

  // const { onNext } = props
  const finishHandler = (e) => {
    // console.log(e);
    // ctx.setData(e);
    // console.log(ctx.formData);
    props.onNext();
  }
  return (
    <div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="vertical"
        // onValuesChange={onFormLayoutChange}

        onFinish={finishHandler}
      >
        <Card className="mt-3">
          <Form1/>
        </Card>

        <div className="d-flex justify-content-end actions">
        <Button>Back</Button>
        <Button>Clear All</Button>

        <Button type="primary" htmlType="submit">Next</Button>
      </div>
        
      </Form>
      
    </div>
  )
}

export default UploadDocuments