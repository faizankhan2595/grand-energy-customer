import React, { useState, useEffect, useRef } from "react";
import { AutoComplete, Button, Card, Col, Form, Input, InputNumber, Row, Switch, Select, Modal } from "antd";
import Title from "antd/lib/typography/Title";
import { PlusIconBlue } from "assets/svg/icon";
import "./CustomerAccounts.css";
import Icon from "@ant-design/icons";
import country from "./country";
import axios from "axios";
import JobSiteTable from "../JobSites/JobSiteTable";
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const AddNewJobsite = () => {
  return (
    <div>AddNewJobsite</div>
  )
}

export default AddNewJobsite