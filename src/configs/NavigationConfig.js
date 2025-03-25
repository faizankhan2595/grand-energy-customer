import dashboardIcon from "../assets/speed_black_24dp.svg";
import Icon from "@ant-design/icons"

import { APP_PREFIX_PATH } from "configs/AppConfig";

import {
  DashboardIcon,
  AccountManagementIcon,
  TaskManagementIcon,
  CMSIcon,
  InventoryManagementIcon,
  InquiryManagementIcon,
  ContractManagementIcon,
  MasterIcon,
  MessageIcon,
  AttendanceManagementIcon,
  FinanceManagementIcon,
  InvoiceManagementIcon,
  // UserManagementIcon,
  // ItemAndServicesIcon,
  // DeliveryManagementIcon,
  // ReportIcon,
} from "./svgIcons";

const dashBoardNavTree = [
  {
    key: "d",
    path: "",
    title: " ",
    icon: "",
    breadcrumb: false,
    submenu: [
      {
        key: "dashboard",
        path: `${APP_PREFIX_PATH}/dashboard/finance`,
        title: "Dashboard",
        icon: DashboardIcon,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "attendance-management",
        path: `${APP_PREFIX_PATH}/attendance-management`,
        title: "Attendance Management",
        icon: AttendanceManagementIcon,
        breadcrumb: false,
        submenu: [
          {
            key: "staff-attendance",
            path: `${APP_PREFIX_PATH}/attendance-management/daily-attendance`,
            title: "Daily Attendance",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "invoice-management",
        path: `${APP_PREFIX_PATH}/invoice-management`,
        title: "Invoice Management",
        icon: InvoiceManagementIcon,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "payment-management",
        path: `${APP_PREFIX_PATH}/payment-management`,
        title: "Payment Management",
        icon: FinanceManagementIcon,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "inquiry-management",
        path: `${APP_PREFIX_PATH}/inquiry-management`,
        title: "Inquiry Management",
        icon: InquiryManagementIcon,
        breadcrumb: false,
        submenu: [
          {
            key: "inquiry-list",
            path: `${APP_PREFIX_PATH}/inquiry-management/inquiry-list`,
            title: "Inquiry List",
            
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "chats",
            path: `${APP_PREFIX_PATH}/inquiry-management/chats`,
            title: "Chats",
           
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "contract-management",
        path: `${APP_PREFIX_PATH}/contract-management`,
        title: "Contract Management",
        icon: ContractManagementIcon,
        breadcrumb: false,
        submenu: [
          {
            key: "job-quotations",
            path: `${APP_PREFIX_PATH}/contract-management/quotations`,
            title: "Job Quotations",
            
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "contract-list",
            path: `${APP_PREFIX_PATH}/contract-management/contracts`,
            title: "Contract List",
            
            breadcrumb: false,
            submenu: [],
          },
          {
            key:"work-orders",
            path: `${APP_PREFIX_PATH}/contract-management/work-orders`,
            title: "Work Orders", 
            breadcrumb: false,
            submenu: [],
          }
          // {
          //   key: "finance-reports",
          //   path: `${APP_PREFIX_PATH}/contract-management/finance-reports`,
          //   title: "Finance Reports",
            
          //   breadcrumb: false,
          //   submenu: [],
          // },
        ],
      },
      {
        key: "task-management",
        path: `${APP_PREFIX_PATH}/task-management`,
        title: "Task Management",
        icon: TaskManagementIcon,
        breadcrumb: false,
        submenu: [
          {
            key: "task",
            path: `${APP_PREFIX_PATH}/task-management/task`,
            title: "Customer Tasks",
            
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "schedule",
            path: `${APP_PREFIX_PATH}/task-management/schedule`,
            title: "Schedule",
           
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;