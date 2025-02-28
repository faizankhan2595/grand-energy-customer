import { AutoComplete, Button, Card, Col, Form, Input, InputNumber, Row, Switch, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { PlusIconBlue } from "assets/svg/icon";
import React, { useState, useEffect, useRef } from "react";
import "./BasicDetails.css";
import Icon from "@ant-design/icons";
import country from "./country";
import axios from "axios";
import JobSiteTable from "../JobSites/JobSiteTable";
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";

function JobSiteDetails(props) {
  const [editjobfield, setEditjobfield] = useState(null)
  const [tog, setTog] = useState(true)
  const [cus_tc_id, setCus_tc_id] = useState(null)
  // const streetRef = useRef(null);
  // const blockRef = useRef(null);
  // const postalRef = useRef(null);
  const [streetField, setStreetField] = useState(null)
  const [blockField, setBlockfield] = useState(null)
  const [postalField, setPostalField] = useState(null)
  const [statusActive, setStatusActive] = useState(false);
  const [JobSites, setJobSites] = useState([]);
  const [shiftLocations, setShiftLocations] = useState([]);
  // let shiftLocations= [];
  const [form] = Form.useForm();
  const history = useHistory()
  const search = useLocation().search;
  const jobsite = new URLSearchParams(search).get('jobsite');
  // console.log("debug", props.id, jobsite);
  const tok = localStorage.getItem('token')
  // console.log(props.cId);
  // console.log(props.id);
  const finishHandler = (e) => {
    props.onNext();
    // console.log(e);
    axios
      .post(
        "/api/tc/new-customer-job-site",
        // {
        //   tc_customer_id: props.cId,
        //   name: e.name,
        //   block_number: e.block_number,
        //   street_number: e.street_number,
        //   level_number: e.level_number,
        //   unit_number: e.unit_number,
        //   postal_code: e.postal_code,
        //   country: e.country,
        //   status: statusActive ? "ACTIVE":"INACTIVE",
        // },
        {
          tc_customer_id: cus_tc_id,
          name: e.name,
          block_number: '',
          street_number: '',
          level_number: '',
          unit_number: '',
          postal_code: '',
          country: '',
          address: e.address,
          status: statusActive ? "ACTIVE":"INACTIVE",
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        console.log(response);
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const addmore = () => {
    let e = form.getFieldsValue();
    console.log(editjobfield, props.id, jobsite)
    if (editjobfield || jobsite) {
      console.log("update");
      axios
        .post(
          "/api/tc/update-customer-job-site",
          // {
          //   id: editjobfield ? editjobfield : jobsite,
          //   tc_customer_id: props.id ? props.id : cus_tc_id,
          //   name: e.name,
          //   block_number: e.block_number,
          //   street_number: e.street_number,
          //   level_number: e.level_number,
          //   unit_number: e.unit_number,
          //   postal_code: e.postal_code,
          //   country: e.country,
          //   status: statusActive ? "ACTIVE":"INACTIVE",
          // },
          {
            id: editjobfield ? editjobfield : jobsite,
            tc_customer_id: cus_tc_id,
            name: e.name,
            block_number: '',
            street_number: '',
            level_number: '',
            unit_number: '',
            postal_code: '',
            country: '',
            address: e.address,
            status: statusActive ? "ACTIVE":"INACTIVE",
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          console.log(response);
          setTog(tog ? false : true)
          setEditjobfield(null)
          form.resetFields();
          if (jobsite) {
            // history.push('/app/customer-management/job-sites')
            history.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      return
    }
    if (props.id) {
      const passId = props.id;
      console.log(passId);
      axios
        .post(
          "/api/tc/new-customer-job-site",
          {
            tc_customer_id: passId,
            name: e.name,
            block_number: e.block_number,
            street_number: e.street_number,
            level_number: e.level_number,
            unit_number: e.unit_number,
            postal_code: e.postal_code,
            country: e.country,
            status: statusActive ? "ACTIVE":"INACTIVE",
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          console.log(response);
          setTog(tog ? false : true)
          form.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          "/api/tc/new-customer-job-site",
          {
            tc_customer_id: props.cId,
            name: e.name,
            block_number: e.block_number,
            street_number: e.street_number,
            level_number: e.level_number,
            unit_number: e.unit_number,
            postal_code: e.postal_code,
            country: e.country,
            status: statusActive ? "ACTIVE":"INACTIVE",
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          console.log(response);
          setTog(tog ? false : true)
          form.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    }


  };

  const back = ()=> {
    history.goBack()
  }

  useEffect(() => {
    // console.log("edit", editjobfield);
    // if (editjobfield) {

    //   axios
    //     .post(
    //       "/api/tc/get-customer-job-site",
    //       {
    //         id: jobsite
    //       },
    //       {
    //         headers: {
    //           "content-type": "application/json",
    //           Authorization: `Bearer ${tok}`
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       const e = response.data.data;
    //       console.log("e",e);
    //       form.setFieldsValue({
    //         name: e.name,
    //         block_number: e.block_number,
    //         street_number: e.street_number,
    //         level_number: e.level_number,
    //         unit_number: e.unit_number,
    //         postal_code: e.postal_code,
    //         country: e.country,
    //       })
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   return
    // }
    if (jobsite) {
      axios
        .post(
          "/api/tc/get-customer-job-site",
          {
            id: jobsite
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${tok}`
            },
          }
        )
        .then((response) => {
          const e = response.data.data;
          console.log("e", e);
          setCus_tc_id(e.tc_customer_id)
          // form.setFieldsValue({
          //   name: e.name,
          //   block_number: e.block_number,
          //   street_number: e.street_number,
          //   level_number: e.level_number,
          //   unit_number: e.unit_number,
          //   postal_code: e.postal_code,
          //   country: e.country,
          //   address: e.address,
          // })
          console.log(e.address)
          let shift = shiftLocations.find((elem) => elem.location_address === e.address)
          console.log(shiftLocations)
          form.setFieldsValue({
            name: e.name,
            address: e.address,
            shift_name: e.address,
          })
          setStatusActive(e.status === 'ACTIVE')

        })
        .catch((error) => {
          console.log(error);
        });
      return
    }
    axios
      .post(
        "/api/tc/get-customer-job-site",
        {
          id: editjobfield
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        const e = response.data.data;
        // form.setFieldsValue({
        //   name: e.name,
        //   block_number: e.block_number,
        //   street_number: e.street_number,
        //   level_number: e.level_number,
        //   unit_number: e.unit_number,
        //   postal_code: e.postal_code,
        //   country: e.country,
        //   address: e.address,
        //   status: e.status,
        // })
        let shift = shiftLocations.find((elem) => elem.location_address == e.address)
        form.setFieldsValue({
          name: e.name,
          address: e.address,
          shift_name: e.address,
        })
        setStatusActive(e.status === 'ACTIVE')
      })
      .catch((error) => {
        console.log(error);
      });

  }, [editjobfield])

  const [value, setValue] = useState('');
  const [pincodeUpdate, setPincodeUpdate] = useState('');
  const [options, setOptions] = useState([]);

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const getPostalCode = (text) => {
    axios
      .post(
        "/api/get-pincode",
        {
          pin_code: text
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        // console.log(response.data)
        if (response.data.success) {
          let result = response.data.results;
          result = result.filter(item => item.POSTAL && (item.POSTAL).toUpperCase() != 'NIL');
          setOptions(result)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const selectAddress = (postal) => {
    const address = options.filter((item) => item.POSTAL == postal)
    console.log('check -1')
    console.log(address)

    if (address.length > 0) {
      let street_no = ''
      if (address[0].ROAD_NAME) {
        street_no = address[0].ROAD_NAME
      }

      form.setFieldsValue({
        block_number: address[0].BLK_NO,
        street_number: street_no,
        postal_code: address[0].POSTAL,
      });
    }
    
  }

  const handleStatusChange = (checked) => {
    let status = form.getFieldValue().status;
    setStatusActive(checked)
    console.log(status)
  }


  useEffect(() => {
   getPostalCode(value)
   console.log(value)
  }, [value])

  const getShiftLocations = (text) => {
    axios
      .post(
        "/api/hrms/all-shift-locations",
        {
          search: ''
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        // console.log(response.data)
        if (response.data.success) {
          let result = response.data.shift_locations;
          // shiftLocations = result
          setShiftLocations(result)
          console.log(shiftLocations)
          // let address = form.getFieldValue("name")
          // let shift = result.find((elem) => elem.location_address == address)
          // form.setFieldsValue({
          //   shift_name: shift.location_address
          // })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getJobSites = (text) => {
    axios
      .post(
        "/api/all-user-groups",
        {
          search: ''
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let result = response.data.user_groups;
          result = result.filter(item => item.location_id != null);
          setJobSites(result)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleJobsiteClick = (event)=> {
    let jobsiteObj = JobSites.find((e) => e.name == event)
    if(jobsiteObj) {
      let location = shiftLocations.find(e => e.id == jobsiteObj.location_id)
    form.setFieldsValue({
      shift_name: location.location_name,
      address: location.location_address
    })
    }
  }

  useEffect(() => {
    console.log(props.cId)
    console.log(props.id)
    setCus_tc_id(+props.cId)
    if(props.id) setCus_tc_id(+props.id)
    getShiftLocations()
    getJobSites()
    // let address = form.getFieldValue("name")
    // let shift = shiftLocations.find((elem) => elem.location_address == address)
    //   form.setFieldsValue({
    //   shift_name: shift.location_address
    // })
  }, [])
  


  // console.log(props.cId)
  return (
    <div>
      {/* <Form
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="vertical"
        // onValuesChange={onFormLayoutChange}
        onFinish={finishHandler}
      >
        <Card className="mt-3">
          <p className="font-weight-bold font-size-md mb-4">Job Site Details</p>
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="name" label="Job Site Name" rules={[{ required: true, message: 'Please input job site name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="block_number" label="Block Number" rules={[{ required: true, message: 'Please input block number!' }]}>
                <Input value={blockField} />
              </Form.Item>

              <Form.Item name="level_number" label="Level Number" rules={[{ required: true, message: 'Please input level number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true, message: 'Please input your postal code!' }]}>
                <Select
                  // suffixIcon={<AddUserIcon/>}
                  // style={{
                  //       width: 200,
                  //   }}
                  //   mode='multiple'
                  //   placeholder="postal code"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.title ?? '').toString().toLowerCase()?.includes(input?.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toString().toLowerCase().localeCompare((optionB?.label ?? '').toString().toLowerCase())
                  }
                  value={value}
                  onSearch={setValue}
                  onChange={setValue}
                  onSelect={selectAddress(value)}
                > {options.map((val, id) => (
                    <Select.Option title={val.POSTAL} key={id} value={val?.POSTAL}>{val.ADDRESS}</Select.Option>
                  ))} 
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="street_number" label="Street Number" rules={[{ required: true, message: 'Please input street number!' }]}>
                <Input value={streetField}/>
              </Form.Item>

              <Form.Item name="unit_number" label="Unit Number" rules={[{ required: true, message: 'Please input unit number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="country" label="Country">
                <Select>
                  {country.map((elem, index) => {
                    return (
                      <Select.Option key={index} value={elem}>
                        {elem}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="status" label="Status" style={{alignContent: 'start'}}>
              {statusActive ? "ACTIVE":"INACTIVE"}<Switch checked={statusActive} onClick={handleStatusChange} className="ml-2"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        {!jobsite && <Card className="mt-2">
          <Button
            block
            type="dashed"
            className="d-flex align-items-center justify-content-center pt-4 pb-4"
            onClick={addmore}
          >
            <Icon component={PlusIconBlue} />
            <Title level={3} className="mb-0" bold style={{ color: "#0E7CEB" }}>
              Add New Job Site
            </Title>
          </Button>
        </Card>}
        <Form.Item className={`d-flex align-items-end Button`}>
          {!jobsite ? <Button onClick={props.onPre}>Back</Button>:
          <Button onClick={back}>Back</Button>}
          <Button
            onClick={() => form.resetFields()}
            className="mx-3"
          >
            Clear All
          </Button>

          {!jobsite ? <Button type="primary" htmlType="submit">
            Next
          </Button> :
            <Button onClick={addmore} type="primary" htmlType="button">
              Save
            </Button>
          }
        </Form.Item>
      </Form> */}
      <Form
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="vertical"
        // onValuesChange={onFormLayoutChange}
        onFinish={finishHandler}
      >
        <Card className="mt-3">
          <p className="font-weight-bold font-size-md mb-4">Job Site Details</p>
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="name" label="Job Site" rules={[{ required: true, message: 'Please input job site name!' }]}>
              <Select onSelect={handleJobsiteClick}>
                  {JobSites.map((elem, index) => {
                    return (
                      <Select.Option key={elem.name} value={elem.name}>
                        {elem.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="shift_name" label="Shift location Name">
              <Select disabled={true}>
                  {shiftLocations.map((elem, index) => {
                    return (
                      <Select.Option key={index} value={elem.location_address}>
                        {elem.location_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={12}>
            <Form.Item name="address" label="Job Site Address">
                <Input disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={12}>
              <Form.Item name="status" label="Status" style={{alignContent: 'start'}}>
              {statusActive ? "ACTIVE":"INACTIVE"}<Switch checked={statusActive} onClick={handleStatusChange} className="ml-2"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        {!jobsite && <Card className="mt-2">
          <Button
            block
            type="dashed"
            className="d-flex align-items-center justify-content-center pt-4 pb-4"
            onClick={addmore}
          >
            <Icon component={PlusIconBlue} />
            <Title level={3} className="mb-0" bold style={{ color: "#0E7CEB" }}>
              Add New Job Site
            </Title>
          </Button>
        </Card>}
        <Form.Item className={`d-flex align-items-end Button`}>
          {!jobsite ? <Button onClick={props.onPre}>Back</Button>:
          <Button onClick={back}>Back</Button>}
          <Button
            onClick={() => form.resetFields()}
            className="mx-3"
          >
            Clear All
          </Button>

          {!jobsite ? <Button type="primary" htmlType="submit">
            Next
          </Button> :
            <Button onClick={addmore} type="primary" htmlType="button">
              Save
            </Button>
          }
        </Form.Item>
      </Form>

      {!jobsite && <div>
        {props.id ? <JobSiteTable id={props.id} tog={tog} setEditjobfield={setEditjobfield} /> : 
          <JobSiteTable id={props.cId} tog={tog} setEditjobfield={setEditjobfield} />}
      </div>}
      {/* <div>{jobsite ? <JobSiteTable id={cus_tc_id} tog={tog} setEditjobfield={setEditjobfield}/> : ""}</div> */}
      {/* <div>{props.cId ? <JobSiteTable id={props.cId} tog={tog} setEditjobfield={setEditjobfield} /> : ""}</div> */}

    </div>
  );
}

export default JobSiteDetails;
