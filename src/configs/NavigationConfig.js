import { 
  BellOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Masters, StaffManage } from 'assets/svg/icon';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree =[
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
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'free-user',
      path: `${APP_PREFIX_PATH}/user-management/free-user`,
      title: 'Free Users',
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    }
  ],
},
// {
//   key: 'customer-management',
//   path: `${APP_PREFIX_PATH}/customer-management`,
//   title: 'Customer Management',
//   icon: TeamOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'customer-accounts',
//       path: `${APP_PREFIX_PATH}/customer-management/customer-accounts`,
//       title: 'Customers Accounts',
//       // icon: Masters,
//       breadcrumb: false,
//       submenu: []
//     },
//     {
//       key: 'free-user-accounts',
//       path: `${APP_PREFIX_PATH}/customer-management/free-user-accounts`,
//       title: 'Free User Accounts',
//       // icon: Masters,
//       breadcrumb: false,
//       submenu: []
//     },
//     {
//       key: 'workshop-users',
//       path: `${APP_PREFIX_PATH}/customer-management/workshop-users`,
//       title: 'Workshop Users',
//       // icon: Masters,
//       breadcrumb: false,
//       submenu: []
//     },
//   ],
// },
{
  key: 'order-management',
  path: `${APP_PREFIX_PATH}/order-management`,
  title: 'Order Management',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'inquiry-management',
  path: `${APP_PREFIX_PATH}/inquiry-management`,
  title: 'Inquiry Management',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'machine-and-sensors',
  path: `${APP_PREFIX_PATH}/machine-and-sensors`,
  title: 'Machine & Sensors',
  icon: ToolOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'technician-management',
  path: `${APP_PREFIX_PATH}/technician-management`,
  title: 'Technician Management',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'operator-master',
  path: `${APP_PREFIX_PATH}/operator-master`,
  title: 'Operator Master',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reports',
  path: `${APP_PREFIX_PATH}/reports`,
  title: 'Reports',
  icon: SettingOutlined,
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

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
