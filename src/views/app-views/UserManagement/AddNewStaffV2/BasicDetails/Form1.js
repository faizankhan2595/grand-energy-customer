import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Row,
  Col,
} from "antd";
import UploadProfilePic from "components/shared-components/UploadProfilePic";
import { useContext } from "react";
import { UserManagementFormContext } from "context/UserManagementFormContext";
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const Form1 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);
  
  
  console.log(ctx.editFormData);
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Profile Photo"
            name="profilePhoto"
            
            // rules={[
            //   {
            //     required: true,
            //     message: "Please provide your profile pic!",
            //   },
            // ]}
          >
            {/* <Upload
              action="/upload.do"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload> */}
            <UploadProfilePic/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Staff Id"
            name="staffId"
            // rules={[{ required: true }]}
          >
            <Input defaultValue={ctx.editFormData?.id || "HC 123456789"}  />
          </Form.Item>
          <Form.Item
            label="Email Id"
            name="emailId"
            rules={[
              {
                type: "email",
                required: false,
                message: "Please input your email-id!",
              },
            ]}
          >
            <Input defaultValue={ctx.editFormData?.email || null} />
          </Form.Item>
          <Form.Item label="Nationality" name="nationality">
            <Select defaultValue={ctx.editFormData.nationality || null}>
              <Select.Option value="singapore">Singapore</Select.Option>
              <Select.Option value="malaysia">Malaysia</Select.Option>
              <Select.Option value="india">India</Select.Option>
              <Select.Option value="myanmar">Myanmar</Select.Option>
              <Select.Option value="china">China</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Residency Status" name="residencyStatus">
            <Select defaultValue={ctx.editFormData.residencyStatus || null}>
              <Select.Option value="permeantResident">Permeant Resident</Select.Option>
              <Select.Option value="citizen">Citizen</Select.Option>
              <Select.Option value="onNative">Non-native</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group defaultValue={ctx.editFormData?.gender}>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
              <Radio value="other"> Other </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Race" name="race">
            <Select defaultValue={_.toLower(ctx.editFormData?.race) || null}>
              <Select.Option value="Chinese">Chinese</Select.Option>
              <Select.Option value="Malay">Malay</Select.Option>
              <Select.Option value="Indian">Indian</Select.Option>
              <Select.Option value="Myanmarese">Myanmarese </Select.Option>
              <Select.Option value="Burmese">Burmese</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: false,
                message: "Please input your name!",
              },
              { whitespace: false, message: "Your Name Cannot be blank" },
              { min: 3, message: "Your name should be atleast 3 characters" },
            ]}
          >
            <Input defaultValue={ctx.editFormData?.fullname || null} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: false,
                message: "Please input your phone number",
              },
            ]}
          >
            <Input maxLength={10} defaultValue={ctx.editFormData?.phone || null} />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: false,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" defaultValue={moment(ctx.editFormData?.dob) || null}  />
          </Form.Item>
          <Form.Item
            label="NRIC/FIN"
            name="NRIC/FIN "
            rules={[
              {
                required: false,
                message: "Please input NRIC/FIN !",
              },
              { whitespace: false, message: "NRIC/FIN Cannot be blank" },
              // { min: 3, message: "NRIC/FIN should be atleast 3 characters" },
            ]}
          >
            <Input defaultValue={ctx.editFormData?.nricfin || null} />
          </Form.Item>
          <Form.Item label="Martial Status" name="martialStatus">
            <Select defaultValue={ctx.editFormData?.marital_status ||null}>
              <Select.Option value="married">Married</Select.Option>
              <Select.Option value="unMarried">Unmarried</Select.Option>
              <Select.Option value="widowed">Widowed</Select.Option>
              <Select.Option value="separated">Separated</Select.Option>
              <Select.Option value="divorced">Divorced</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Religion" name="religion">
            <Select defaultValue={ctx.editFormData?.religion || null}>
              <Select.Option value="islamic">Islamic</Select.Option>
              <Select.Option value="hinduism">Hinduism</Select.Option>
              <Select.Option value="christianity">Christianity</Select.Option>
              <Select.Option value="buddhism">Buddhism</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form1 />;
