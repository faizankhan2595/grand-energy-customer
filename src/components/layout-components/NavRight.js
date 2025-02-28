import React from "react";
import Ninedots from "../../assets/apps-svgrepo-com.svg";
import "./NavRight.css";
import { Dropdown, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Operation,Hrms } from "assets/Icons/Logouticon";
import { GE_HRMS_STAGING_URL, GE_HRMS_PROD_URL, GE_PROD_URL, GE_STAGING_URL } from "configs/AppConfig";

// import searchIcon from "../../assets/search_black_24dp.svg";
// import notificationIcon from "../../assets/notifications_black_24dp.svg";
// import settingsIcon from "../../assets/settings_black_24dp.svg";
// import profilePic from "../../assets/Avatar.png";

const NavRight = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profile_pic = localStorage.getItem("profile_pic");

  let hrms_base_url = GE_HRMS_STAGING_URL
  if((window.location.href).includes(GE_STAGING_URL)) {
    hrms_base_url = GE_HRMS_STAGING_URL
  } else if((window.location.href).includes(GE_PROD_URL)) {
    hrms_base_url = GE_HRMS_PROD_URL
  }

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <ul className="nav-right">
        <li>
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu onClick={onClick} className="options_container reduceDotBorder">
                {/* <Menu.Item key={1}>
                  <Link
                    style={{ color: "#1a3353" }}
                    className="font-size-normal font-weight-bold"
                    to="/app/dashboard/finance"
                  >
                    <Operation className='headiconsvg' /><span className="ml-2">OPERATIONS</span>
                  </Link>
                </Menu.Item> */}
                <Menu.Item key={2}>
                  <div
                    style={{ color: "#1a3353" }}
                    className="font-size-normal font-weight-bold"
                    onClick={() => {
                      window.location.href =
                      `${hrms_base_url}/`;
                    }}
                  >
                   <Hrms className='headiconsvg'/> <span className="ml-1">HRMS</span>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <span className="ml-3">
              <img className="ninedot" src={Ninedots} />
            </span>
          </Dropdown>
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu onClick={onClick} className="options_container reduceAdmincardBorder">
                <div className="topadmindetail">
                  <span className="m-2">
                    <Avatar src={profile_pic} />
                  </span>
                  <div>
                    <h2>{name}</h2>
                    <p>{email}</p>
                  </div>
                </div>
              </Menu>
            }
          >
            <span className="ml-3">
              <Avatar src={profile_pic}/>
            </span>
          </Dropdown>
        </li>
      </ul>
    </>
  );
};

export default NavRight;
