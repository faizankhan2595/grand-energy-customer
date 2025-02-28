import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserManagementFormContext } from "context/UserManagementFormContext";
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Form2 = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const ctx = useContext(UserManagementFormContext);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Operation Manager"
    },
    {
      id: 2,
      name: "Crew"
    },
  ]);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Operations"
    },
    {
      id: 2,
      name: "Services"
    },
  ]);

  // useEffect(() => {
  //   const getAllRoles = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-roles`
  //       );
  //       setRoles(res.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const getAllDepartments = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-departments`
  //       );
  //       setDepartments(res.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getAllRoles();
  //   getAllDepartments();
  // }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="Role" name="role">
            <Select defaultValue={ctx.editFormData?.role_id}>
              {roles.map((role) => {
                return (
                  <Select.Option value={role.id}>{role.name}</Select.Option>
                );
              })}
              {/* <Select.Option value="demo">Demo</Select.Option> */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Joining Date"
            name="joiningDate"
            rules={[
              {
                required: false,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD"
              defaultValue={moment(ctx.editFormData?.joining_date)}
            />
          </Form.Item>
          <Form.Item label="Working Status" name="workingStatus">
            <Select defaultValue={ctx.editFormData?.workingStatus || null}>
              <Select.Option value="islamic">Islamic</Select.Option>
              <Select.Option value="hinduism">Hinduism</Select.Option>
              <Select.Option value="christianity">Christianity</Select.Option>
              <Select.Option value="buddhism">Buddhism</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Notice Period" name="noticePeriod">
            <Input defaultValue={ctx.editFormData?.noticePeriod}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              {
                required: false,
                message: "Field Required",
              },
            ]}
          >
            <Select defaultValue={ctx.editFormData?.department_id}>
              {departments.map((dept) => (
                <Select.Option value={dept.id}>{dept.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Confirmation Date"
            name="confirmationDate"
            rules={[
              {
                required: false,
                message: "Please input your date of birth",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" defaultValue={moment(ctx.editFormData?.confirmation_dat)} />
          </Form.Item>
          <Form.Item label="Manager (Report To)" name="manager">
            <Select defaultValue={ctx.editFormData?.workingStatus || null}>
              {/* <Select.Option value="islamic">Islamic</Select.Option>
              <Select.Option value="hinduism">Hinduism</Select.Option>
              <Select.Option value="christianity">Christianity</Select.Option>
              <Select.Option value="buddhism">Buddhism</Select.Option> */}
            </Select>
          </Form.Item>
          <Form.Item label="Probation Period" name="probationPeriod">
            <Input defaultValue={ctx.editFormData?.probationPeriod}/>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default () => <Form2 />;
