import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';

const menuItem = [
	{
		title: "Edit Profile",
		icon: EditOutlined ,
		path: "/"
    },

    {
		title: "Account Setting",
		icon: SettingOutlined,
		path: "/"
    },
    {
		title: "Billing",
		icon: ShopOutlined ,
		path: "/"
	},
    {
		title: "Help Center",
		icon: QuestionCircleOutlined,
		path: "/"
	}
]

export const NavProfile = ({signOut}) => {
  const [profileImg, setProfileImg] = useState(localStorage.getItem("profile_pic") || "/img/avatars/thumb-1.jpg");
  const [userName, setUserName] = useState(localStorage.getItem("name") || "User");
  const [userRole, setUserRole] = useState("");

  // Get user role display name
  useEffect(() => {
    const roleId = localStorage.getItem("role");
    const roleMap = {
      "3": "Customer",
      "5": "Free User",
      "7": "Admin",
      "8": "Manager",
      "9": "User"
    };
    setUserRole(roleMap[roleId] || "User");
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImg(localStorage.getItem("profile_pic") || "/img/avatars/thumb-1.jpg");
      setUserName(localStorage.getItem("name") || "User");
    };

    // Listen to custom event for profile updates
    window.addEventListener('profileUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('profileUpdated', handleStorageChange);
    };
  }, []);

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">{userName}</h4>
            <span className="text-muted">{userRole}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
