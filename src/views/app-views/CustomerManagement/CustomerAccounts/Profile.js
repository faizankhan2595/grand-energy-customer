import { Button, Card, Typography, List, Avatar } from "antd";
import Icon from "@ant-design/icons";

import React from "react";

import profilePic from "assets/Ellipse-21.png";
import {
  AccoutnNumerIcon,
  BirthdayIcon,
  MobileIcon,
  ExploreIcon,
  MailIcon,
} from "assets/svg/icon";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = ({customerData}) => {
  let customerAddress = customerData.job_sites;
  console.log(customerData)

  // const dataAccountDetails = [
  //   { icon: AccoutnNumerIcon, text: customerData?.id },
  //   { icon: BirthdayIcon, text: "DOB" },
  // ];
  
  const dataContactDetails = [
    { icon: MobileIcon, text: customerData?.phone },
    { icon: ExploreIcon, text: customerData?.status == 'ACTIVE' ? customerAddress[0].country : '' },
    { icon: MailIcon, text: customerData?.email },
  ];

  return (
    <Card>
      <div className="d-flex flex-column align-items-center p-0">
        <Avatar style={{width:"120px",height:"120px"}} src={customerData?.profile_pic} />
        <p style={{color:'#000B23'}} className='font-size-lg font-weight-bolder mt-2 mb-2'>{customerData?.name}</p>
        <p className="p-0 mt-2">#{customerData?.id}</p>
        <p className="p-0 mb-2">
          {customerData?.status == 'ACTIVE' && <span style={{color: "#00AB6F", fontWeight:'600', fontSize: '14px'}}>{customerData?.status}</span>}
          {customerData?.status == 'INACTIVE' && <span style={{color: '#F53434', fontWeight:'600', fontSize: '14px'}}>{customerData?.status}</span>}
          </p>
        {/* <p className="p-0 mt-2">Day Shift</p> */}
        <Link to={`/app/customer-management/customer-accounts/edit/${customerData?.id}`} ><Button className="px-5 font-weight-semibold">Edit Details</Button></Link> 
      </div>

      {/* <List
        header={<Title level={4} style={{color:'#000B23'}} className='font-weight-semibold'>Account Details</Title>}
        dataSource={dataAccountDetails}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex justify-content-around">
              <Icon component={item.icon} className="mr-3" />
              {item.text}
            </div>
          </List.Item>
        )}
      /> */}

      <List
        header={<Title level={4} style={{color:'#000B23'}} className='font-weight-semibold'>Contact</Title>}
        dataSource={dataContactDetails}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex justify-content-start w-75">
              <Icon component={item.icon} className="mr-3" />
              <span style={{width: '110%', overflowWrap: 'break-word'}}>{item.text}</span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Profile;
