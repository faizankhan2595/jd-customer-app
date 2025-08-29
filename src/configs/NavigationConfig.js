import { 
  BellOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FileOutlined,
  LaptopOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Masters, StaffManage } from 'assets/svg/icon';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { hasSectionAccess, hasPermission } from 'utils/permissionUtils';

if(localStorage.getItem("dashboardType")=="workshop"){
  var dashBoardNavTree =[
    {
      key: "d",
      // path: `${APP_PREFIX_PATH}/dashboard`,
      path: "",
      title: " ",
      icon: "",
      breadcrumb: false,
      submenu: [{
   
  
    key: 'machine-and-sensors',
    path: `${APP_PREFIX_PATH}/machine-and-sensors`,
    title: 'Machine & Sensors',
    icon: ToolOutlined,
    breadcrumb: false,
    submenu: []
  },
 
  {
    key: 'reports',
    path: `${APP_PREFIX_PATH}/reports`,
    title: 'Reports',
    icon: FileOutlined,
    breadcrumb: false,
    submenu: []
  },
  // {
  //   key: 'notifications',
  //   path: `${APP_PREFIX_PATH}/notifications`,
  //   title: 'Notifications',
  //   icon: BellOutlined,
  //   breadcrumb: false,
  //   submenu: []
  // }
  ],}]
}
else{
  var dashBoardNavTree =[
    {
      key: "d",
      // path: `${APP_PREFIX_PATH}/dashboard`,
      path: "",
      title: " ",
      icon: "",
      breadcrumb: false,
      submenu: [{
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  ...(localStorage.getItem("parent_id") === "null" ? [] : 
      hasSectionAccess('user_management') ? [
    {
      key: "user-management",
      path: `${APP_PREFIX_PATH}/user-management`,
      title: "User Management",
      icon: UserSwitchOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'user-accounts',
          path: `${APP_PREFIX_PATH}/user-management/user-accounts`,
          title: 'User Accounts',
          breadcrumb: false,
          submenu: []
        },
      ],
    },
  ] : []),

  ...(hasSectionAccess('order_management') ? [{
    key: 'order-management',
    path: `${APP_PREFIX_PATH}/order-management`,
    title: 'Order Management',
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: []
  }] : []),
  ...(hasSectionAccess('inquiry_management') ? [{
    key: 'inquiry-management',
    path: `${APP_PREFIX_PATH}/inquiry-management`,
    title: 'Inquiry Management',
    icon: QuestionCircleOutlined,
    breadcrumb: false,
    submenu: []
  }] : []),
  ...(hasSectionAccess('machines_and_sensors') ? [{
    key: 'machine-and-sensors',
    path: `${APP_PREFIX_PATH}/machine-and-sensors`,
    title: 'Machine & Sensors',
    icon: ToolOutlined,
    breadcrumb: false,
    submenu: []
  }] : []),
  ...(hasSectionAccess('technician_management') ? [{
    key: 'technician-management',
    path: `${APP_PREFIX_PATH}/technician-management`,
    title: 'Technician Management',
    icon: LaptopOutlined,
    breadcrumb: false,
    submenu: []
  }] : []),
  ...((hasSectionAccess('job_sites') || hasSectionAccess('operational_areas')) ? [{
    key: 'operator-master',
    path: `${APP_PREFIX_PATH}/operator-master`,
    title: 'Operation Master',
    icon: EnvironmentOutlined,
    breadcrumb: false,
    submenu: [
      ...(hasSectionAccess('job_sites') ? [{
        key: 'jobsites',
        path: `${APP_PREFIX_PATH}/operator-master/jobsites`,
        title: 'Jobsites',
        breadcrumb: false,
        submenu: []
      }] : []),
      ...(hasSectionAccess('operational_areas') ? [{
        key: 'operational-areas',
        path: `${APP_PREFIX_PATH}/operator-master/operational-areas`,
        title: 'Areas',
        breadcrumb: false,
        submenu: []
      }] : [])
    ],
  }] : []),
  // {
  //   key: 'reports',
  //   path: `${APP_PREFIX_PATH}/reports`,
  //   title: 'Reports',
  //   icon: FileOutlined,
  //   breadcrumb: false,
  //   submenu: []
  // },
  // {
  //   key: 'notifications',
  //   path: `${APP_PREFIX_PATH}/notifications`,
  //   title: 'Notifications',
  //   icon: BellOutlined,
  //   breadcrumb: false,
  //   submenu: []
  // }
  ],}]
}

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
