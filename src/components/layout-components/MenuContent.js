import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid, Dropdown } from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import { connect } from "react-redux";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "constants/ThemeConstant";
import utils from "utils";
import { onMobileNavToggle } from "redux/actions/Theme";
import { axiosInstance } from "App";
import { role } from "utils/role";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
    localization,
    onMobileNavToggle,
  } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };
  // const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const data = await axiosInstance.get("/api/admin/getUserByToken");
      console.log(data.data.item);
      // setData(data.data.item);
      const getLocalStorageItem = (key) => {
        const value = localStorage.getItem(key);
        return value === "null" || value === null ? null : value;
      };
      const name = getLocalStorageItem("name");
      const parent_id = getLocalStorageItem("parent_id");
      const company_name = getLocalStorageItem("company_name");
      const user_id = getLocalStorageItem("user_id");
      const role = getLocalStorageItem("role");



      localStorage.setItem("name", data.data.item.name);
      localStorage.setItem("parent_id", data.data.item.parent_id);
      localStorage.setItem("company_name", data.data.item.company_name);
      localStorage.setItem('user_id', data.data.item.id);
      localStorage.setItem("role", data.data.item.role_id);
      if (name != data.data.item.name || parent_id != data.data.item.parent_id || company_name != data.data.item.company_name || company_name != data.data.item.company_name || user_id != data.data.item.id || role != data.data.item.role_id) {
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const history = useHistory();
  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{ height: "100%", borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={
        hideGroupTitle ? "hide-group-title customSideNav" : "customSideNav"
      }
    >


      <div className="profileCard" style={{ width: "100%" }}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                onClick={() => {
                  history.push(`/app/user-management/user-accounts/edit/${localStorage.getItem('user_id')}`);
                }}
              >
                <EditOutlined />
                <span>Edit Profile</span>
              </Menu.Item>
              <Menu.Item
                key="profile"
                onClick={() => {
                  localStorage.clear(); // Clear localStorage
                  window.location.href = "/"; // Redirect to home
                }}
              >
                <LogoutOutlined />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >

          <img
            className="sideNavUserImage"
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${localStorage.getItem("name")}`}
            alt="..."
          />
        </Dropdown>
        <h4 className="text-center mt-3 mb-1 text-white">{
          localStorage.getItem("name")
        }</h4>
        <p
          style={{ fontSize: "12px", color: "#65b0f8" }}
          className="text-center mt-0"
        >
          {role(localStorage.getItem("role"))}
        </p>
      </div>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <Menu.ItemGroup
            key={menu.key}
            title={setLocale(localization, menu.title)}
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  key={subMenuFirst.key}
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      {subMenuSecond.icon ? (
                        <Icon type={subMenuSecond?.icon} />
                      ) : null}
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link
                        onClick={() => closeMobileNav()}
                        to={subMenuSecond.path}
                      />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link
                    onClick={() => closeMobileNav()}
                    to={subMenuFirst.path}
                  />
                </Menu.Item>
              )
            )}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? (
              <Link onClick={() => closeMobileNav()} to={menu.path} />
            ) : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const TopNavContent = (props) => {
  const { topNavColor, localization } = props;
  return (
    <Menu mode="horizontal" style={{ backgroundColor: topNavColor }}>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName="top-nav-menu"
            title={
              <span>
                {menu.icon ? <Icon type={menu?.icon} /> : null}
                <span>{setLocale(localization, menu.title)}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon type={subMenuFirst?.icon} />
                  ) : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme }) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
