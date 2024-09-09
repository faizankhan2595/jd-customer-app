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
  key: "staff-management",
  path: `${APP_PREFIX_PATH}/staff-management`,
  title: "Staff Management",
  icon: UserSwitchOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'admin-accounts',
      path: `${APP_PREFIX_PATH}/staff-management/admin-accounts`,
      title: 'Admin Accounts',
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    }
  ],
},
{
  key: 'customer-management',
  path: `${APP_PREFIX_PATH}/customer-management`,
  title: 'Customer Management',
  icon: TeamOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'customer-accounts',
      path: `${APP_PREFIX_PATH}/customer-management/customer-accounts`,
      title: 'Customers Accounts',
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'free-user-accounts',
      path: `${APP_PREFIX_PATH}/customer-management/free-user-accounts`,
      title: 'Free User Accounts',
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'workshop-users',
      path: `${APP_PREFIX_PATH}/customer-management/workshop-users`,
      title: 'Workshop Users',
      // icon: Masters,
      breadcrumb: false,
      submenu: []
    },
  ],
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
  key: 'order-management',
  path: `${APP_PREFIX_PATH}/order-management`,
  title: 'Order Management',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'notifications',
  path: `${APP_PREFIX_PATH}/notifications`,
  title: 'Notifications',
  icon: BellOutlined,
  breadcrumb: false,
  submenu: []
}
],}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
