import React from "react";
import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  InputNumber,
  Card,
  Tabs,
  Space,
  message,
} from "antd";
import Icon from "@ant-design/icons";

import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { InventoryManagementPageIcon } from "assets/svg/icon";
import { PartMaterialDetailsIcon } from "../../SvgIcons";
import AddNewForm from "./AddNewForm";

import Upload from "components/shared-components/UploadBox";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const { Text, Title } = Typography;

const AddNewProductCategory = () => {
    const [form] = Form.useForm()
    const history = useHistory();
    const param = useParams()

    const finishHandler = (e) => {
        console.log(e)
        if(param.id) {
            axios({
              method: 'post',
              url: "/api/tc/update-product-category",
              data: {
                  id: param.id,
                  percentage: e.gstPercentage,
                  title: e.gstDescription,
              },
              // headers: {
              //     Authorization: `Bearer ${tok}`
              // },
          }).then(function (response) {
              if(response.data.success) {
                //   setShowAddedSuccess(true)
                message.success("Product Category updated successfully!")
                  setTimeout(() => {
                    //   setShowAddedSuccess(false)
                      history.goBack()
                  }, 1500);
              }
          }).catch(function (error) {
              console.log(error);
          });
        } else {
          axios({
            method: 'post',
            url: "/api/tc/new-product-category",
            data: {
              title: e.gstDescription,
              percentage: e.gstPercentage,
            },
          }).then(function (response) {
              console.log(response.data);
              if(response.data.success) {
                //   setShowAddedSuccess(true)
                message.success("Product Category added successfully!")
                  setTimeout(() => {
                    //   setShowAddedSuccess(false)
                      history.goBack()
                  }, 1500);
              }
              
          }).catch(function (error) {
              console.log(error);
          });
        }
      }
    
    const getProductCategory = () => {

    }

    useEffect(() => {
      if(param.id) getProductCategory()
    }, [])
    

    return (
      <React.Fragment>
        <PageHeading
          title="Add New Category"
        //   svg={InventoryManagementPageIcon}
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
                <Card>
                    <AddNewForm />
                </Card>

                <Form.Item className={`d-flex align-items-end Button`}>
                  <Button className="mr-2" onClick={() => history.goBack()}>Cancel</Button>

                  <Button type="primary" htmlType="submit">
                      Save
                  </Button>
                </Form.Item>
            </Form>
      </React.Fragment>
    );
  };
  
  export default AddNewProductCategory;