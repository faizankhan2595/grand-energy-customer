import { AutoComplete, Button, Card, Col, Form, Input, InputNumber, Row, Switch, Select, Modal, message } from "antd";
import Title from "antd/lib/typography/Title";
import { PlusIconBlue } from "assets/svg/icon";
import React, { useState, useEffect, useRef } from "react";
import "./CustomerAccounts.css";
import Icon from "@ant-design/icons";
import country from "./country";
import axios from "axios";
import JobSiteTable from "./JobSiteTable";
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Autocomplete, { usePlacesWidget }  from "react-google-autocomplete";
import LocationSearch from "./LocationSearch";

function JobSites(props) {
  const [editjobfield, setEditjobfield] = useState(null)
  console.log("customer id: ", props.customer_id)
  // const [tog, setTog] = useState(true)
  // const [cus_tc_id, setCus_tc_id] = useState(null)
  // const streetRef = useRef(null);
  // const blockRef = useRef(null);
  // const postalRef = useRef(null);
  // const [streetField, setStreetField] = useState(null)
  // const [blockField, setBlockfield] = useState(null)
  // const [postalField, setPostalField] = useState(null)
  // const [pincodeUpdate, setPincodeUpdate] = useState('');
  // const [value, setValue] = useState('');
  // let shiftLocations= [];

  const [statusActive, setStatusActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [JobSites, setJobSites] = useState([]);
  const [jobSiteData, setjobSiteData] = useState([])
  const [shiftLocations, setShiftLocations] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [form] = Form.useForm();
  const history = useHistory()
  const search = useLocation().search;
  const jobsite = new URLSearchParams(search).get('jobsite');
  const tok = localStorage.getItem('token')
  // const [options, setOptions] = useState([]);
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: 'AIzaSyAk3d6-e4XyC7CoRgCbL_pwRWnKlKqqQuA',
    onPlaceSelected: (place) => {
      console.log(place);
    },
    googleMapsScriptBaseUrl: 'https://maps.googleapis.com/maps/api/js'
  });

  const finishHandler = (e) => {
    console.log(e);
    const address = e.address || `${e.street_number}, block no. ${e.block_number} postal code ${e.postal_code}, ${e.country}`
    
    if(editjobfield) {
      let hrms_location_id = updateShiftLocation();
      if(!hrms_location_id) {
        message.error('Location cannot be updated')
        return
      }
      axios
        .post(
          "/api/tc/update-customer-job-site",
          {
            id: +editjobfield,
            tc_customer_id: props.customer_id,
            name: e.name,
            contact_number: e.contact_number,
            block_number: e.block_number || '',
            street_number: e.street_number || '',
            level_number: e.level_number || '',
            unit_number: e.unit_number || '',
            postal_code: e.postal_code || '',
            country: e.country || '',
            address: address,
            status: statusActive ? "ACTIVE":"INACTIVE",
            hrms_location_id: hrms_location_id,
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
          if(response.data.success) {
            message.success("Job site added successfully");
          }
          form.resetFields();
          setShowModal(false);
          setEditjobfield(null);
          getAllJobSites();
        })
        .catch((error) => {
          console.log(error);
          setEditjobfield(null);
        });

    } else {
      saveShiftLocation(e, address);
      // if(!locationData.hrms_location_id) {
      //   message.error('Location cannot be added');
      //   return
      // }

        // axios
        //   .post(
        //     "/api/tc/new-customer-job-site",
        //     {
        //       tc_customer_id: props.customer_id,
        //       name: e.name,
        //       contact_number: e.contact_number,
        //       block_number: e.block_number || '',
        //       street_number: e.street_number || '',
        //       level_number: e.level_number || '',
        //       unit_number: e.unit_number || '',
        //       postal_code: e.postal_code || '',
        //       country: e.country || '',
        //       address: address,
        //       status: statusActive ? "ACTIVE":"INACTIVE",
        //       hrms_location_id: form.getFieldValue().hrms_location_id,
        //     },
        //     {
        //       headers: {
        //         "content-type": "application/json",
        //         Authorization: `Bearer ${tok}`
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     console.log(response);
        //     if(response.data.success) {
        //       message.success("Job site added successfully");
        //     }
        //     form.resetFields();
        //     setShowModal(false);
        //     getAllJobSites();
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    }
  };

  

  const newJobSite = (e, address, loc_id) => {
    axios
    .post(
      "/api/tc/new-customer-job-site",
      {
        tc_customer_id: props.customer_id,
        name: e.name,
        contact_number: e.contact_number,
        block_number: e.block_number || '',
        street_number: e.street_number || '',
        level_number: e.level_number || '',
        unit_number: e.unit_number || '',
        postal_code: e.postal_code || '',
        country: e.country || '',
        address: address,
        status: statusActive ? "ACTIVE":"INACTIVE",
        hrms_location_id: loc_id,
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
      if(response.data.success) {
        message.success("Job site added successfully");
      }
      form.resetFields();
      setShowModal(false);
      getAllJobSites();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const updateJobSite = (e, address) => {
    axios
    .post(
      "/api/tc/new-customer-job-site",
      {
        tc_customer_id: props.customer_id,
        name: e.name,
        contact_number: e.contact_number,
        block_number: e.block_number || '',
        street_number: e.street_number || '',
        level_number: e.level_number || '',
        unit_number: e.unit_number || '',
        postal_code: e.postal_code || '',
        country: e.country || '',
        address: address,
        status: statusActive ? "ACTIVE":"INACTIVE",
        hrms_location_id: e.hrms_location_id,
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
      if(response.data.success) {
        message.success("Job site added successfully");
      }
      form.resetFields();
      setShowModal(false);
      getAllJobSites();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const saveShiftLocation = (e,address) => {
    var url = '/api/hrms/save-shift-location';

    var data = { 
      location_name: form.getFieldValue().name,
      location_address: form.getFieldValue().address,
      latitude: form.getFieldValue().latitude,
      longitude: form.getFieldValue().longitude,
      radius: 500
     };

    let loc_id = 0;
    axios.post(url, data, {}).then((response) => {
      console.log(response.data)
      if (response.data.success == true) {
        loc_id = response.data.id;
        message.success('Location added to HRMS successfully!');
        setLocationData({...locationData, hrms_location_id: loc_id})
        newJobSite(e, address, loc_id)
        return true
      } else if (response.data.message) {
        message.error(response.data.message);
        return false
      } else {
        message.error('Something Went Wrong!');
        return false
      }
    });
  }

  const updateShiftLocation = (e, address) => {
    var url = '/api/hrms/save-shift-location';

    var data = {
      id: form.getFieldValue().hrms_location_id || 0,
      location_name: form.getFieldValue().name,
      location_address: form.getFieldValue().address,
      latitude: form.getFieldValue().latitude,
      longitude: form.getFieldValue().longitude,
      radius: 500
     };

    axios.post(url, data, {}).then((response) => {
      if (response.data.success == true) {
        message.success('Location updated to HRMS successfully!');
        updateJobSite(e, address)
        return true
      } else if (response.data.message) {
        message.error(response.data.message);
        return false
      } else {
        message.error('Something Went Wrong!');
        return false
      }
    });
  }

  const addNewJobsite = () => {
    setShowModal(true);
  }

  const handleCancel = () => {
    form.resetFields();
    setShowModal(false);
  };

  useEffect(() => {
    if (jobsite) {
      console.log("Job site details")
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
          console.log(shift)
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
    else if(editjobfield) {
      console.log("Job site details fetched")
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
    }

  }, [editjobfield])

  
  // const getPostalCode = (text) => {
  //   axios
  //     .post(
  //       "/api/get-pincode",
  //       {
  //         pin_code: text
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${tok}`
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.success) {
  //         let result = response.data.results;
  //         result = result.filter(item => item.POSTAL && (item.POSTAL).toUpperCase() != 'NIL');
  //         setOptions(result)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // const selectAddress = (postal) => {
  //   const address = options.filter((item) => item.POSTAL === postal)
  //   console.log('check -1')
  //   console.log(address)

  //   if (address.length > 0) {
  //     let street_no = ''
  //     if (address[0].ROAD_NAME) {
  //       street_no = address[0].ROAD_NAME
  //     }

  //     form.setFieldsValue({
  //       block_number: address[0].BLK_NO,
  //       street_number: street_no,
  //       postal_code: address[0].POSTAL,
  //     });
  //   }
    
  // }

  const getAllJobSites = (currPage) => {
    console.log(props.customer_id)
    axios({
        method: 'post',
        url: "/api/tc/get-customer-job-sites",
        data: {
            customer_id: props.customer_id,
            page_index: currPage,
            page_size: 15,
            search : null
        }
    }).then((response) => {
        console.log("Jobsite data: ",response.data.data.data)
        if (response.data.success) {
          setjobSiteData(response.data.data.data)
            // if (currPage===1) {
            // }else{
            //     setjobSiteData([...jobSiteData,...response.data.data.data])
            // }
        }
    }).catch((err) => {
        console.log(err)
    });
  }

  const handleStatusChange = (checked) => {
    let status = form.getFieldValue().status;
    setStatusActive(checked)
    console.log(status)
  }

  // const handleJobsiteClick = (event)=> {
  //   let jobsiteObj = JobSites.find((e) => e.name === event)
  //   if(jobsiteObj) {
  //     let location = shiftLocations.find(e => e.id === jobsiteObj.location_id)
  //     console.log(location)
  //     form.setFieldsValue({
  //       shift_name: location.location_name,
  //       address: location.location_address
  //     })
  //     // selectAddress()
  //   }
  // }
  

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
          setShiftLocations(result)
          console.log(shiftLocations)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getJobSites = () => {
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

  // useEffect(() => {
  //   getPostalCode(value)
  //   console.log(value)
  //  }, [value])

  useEffect(() => {
    console.log(props.id)

    getShiftLocations()
    getJobSites()
  }, [])

  useEffect(() => {
    console.log(locationData)
    form.setFieldsValue({
      address: locationData.address,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    })
  }, [locationData])

  // useEffect(() => {
  //   if(showModal) {
  //   }
  // }, [showModal])
  
  return (
    <div>
      {!jobsite && <div>
        <JobSiteTable id={props.id} searchText={props.searchText} customer_id={props.customer_id} setEditjobfield={setEditjobfield} setShowModal={setShowModal} form={form} shiftLocations={shiftLocations} jobSiteData={jobSiteData} setjobSiteData={setjobSiteData}/>
      </div>}

      {!jobsite && <Card className="mt-2">
          <Button
            block
            type="dashed"
            className="d-flex align-items-center justify-content-center pt-4 pb-4"
            onClick={addNewJobsite}
          >
            <Icon component={PlusIconBlue} />
            <Title level={3} className="mb-0" style={{ color: "#0E7CEB" }}>
              <b>Add New Job Site</b>
            </Title>
          </Button>
      </Card>}

      <Modal visible={showModal} 
        centered
        maskClosable
        onCancel={handleCancel}
        footer={null}
        width={750}
        title={editjobfield ? 'Edit Jobsite' : 'Add New Jobsite'}>
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
            <Card className="mt-3">
              <p className="font-weight-bold font-size-md mb-4">Job Site Details</p>
              {/* <Row align="bottom">
                <Col span={24}>
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
                <Col span={24}>
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
              </Row> */}
              {/* <Row align="bottom">
                <Col span={24}>
                <Form.Item name="address" label="Job Site Address">
                    <Input disabled/>
                  </Form.Item>
                </Col>
              </Row> */}

              <Row>
                  <Col span={12}>
                      <Form.Item name="name" label="Jobsite Name" rules={[{ required: true, message: 'Please input Jobsite Name!' }]} >
                          <Input />
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item name="contact_number" label="Contact No" rules={[{ required: true, message: 'Please input Contact Number!' }]} >
                          <Input type="number"/>
                      </Form.Item>
                  </Col>
              </Row>

              <h4>Address</h4>

              <Row align="top">
                  <Col span={24}>
                      <Form.Item name="address" label="Location Address" rules={[{ required: true, message: 'Please input Location address!' }]} >
                        {/* <Input ref={ref} /> */}
                        {/* <AutoComplete ref={autocompleteRef} /> */}
                        <LocationSearch setLocationData={setLocationData} />
                      </Form.Item>
                  </Col>
                  <Col span={24}>
                      {/* <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input Country!' }]} >
                          <Select showSearch>
                            {country.map((elem, index) => {
                                return (
                                  <Select.Option key={index} value={elem}>
                                    {elem}
                                  </Select.Option>
                                );
                            })}
                          </Select>
                      </Form.Item> */}
                      {/* <Form.Item name="street_number" label="Street Name" rules={[{ required: true, message: 'Please input Street Number!' }]} >
                          <Input />
                      </Form.Item> */}
                      {/* <Form.Item name="level_number" label="Level No" rules={[{ required: true, message: 'Please input Level Number!' }]} >
                          <Input />
                      </Form.Item> */}
                      <Form.Item name="latitude" label="Latitude" >
                          <Input disabled />
                      </Form.Item>
                      <Form.Item name="longitude" label="Longitude" >
                          <Input disabled />
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      {/* <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true, message: 'Please input Postal code!' }]}>
                          <Input />
                      </Form.Item> */}
                      {/* <Form.Item name="block_number" label="Block No" rules={[{ required: true, message: 'Please input Block Number!' }]} >
                          <Input />
                      </Form.Item> */}
                      {/* <Form.Item name="unit_number" label="Unit No" rules={[{ required: true, message: 'Please input Unit Number!' }]} >
                          <Input />
                      </Form.Item> */}
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

            <Form.Item className={`d-flex align-items-end Button`}>
              <Button
                onClick={() => setShowModal(false)}
                className="mx-3"
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default JobSites;
