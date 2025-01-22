import {
  Button,
  Menu,
  Modal,
  Select,
  Rate,
  Switch,
  Divider,
  message,
  Dropdown,
  Table,
  Checkbox,
  Empty,
} from "antd";
import { Space, Tag } from "antd";
import {
  BellOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Filter from "components/shared-components/Filter";
import { useHistory } from "react-router-dom";
import { CsvIcon, FilterIcon } from "assets/svg/icon";
import { axiosInstance } from "App";
import CalendarIcon from "assets/calendar.png";
import moment from "moment";
import CardOrder from "./Card/CardOrder";

function OrderManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleView(record.id)}>
        <EyeOutlined /> Order Detail
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.key)}>
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );

  const handleSwitchChange = (checked, key) => {
    // Add logic for handling the switch change
    console.log(
      `Notification with key ${key} is now ${checked ? "Active" : "Inactive"}`
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
    // handleOk()
  };

  const handleOk = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 10000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const operations = (
    <div className="mb-2 d-flex align-items-center">
      <Button
        // onClick={showModal}
        className="ml-3 bg-info d-flex align-items-center rounded text-white font-weight-semibold px-4"
      >
        <Link to={"/app/notification/add_notification"}>
          + Add New Notification
        </Link>
      </Button>
    </div>
  );

  const onDeleteData = (Id) => {
    // console.log(Id)
    // console.log(record)
    Modal.confirm({
      title: "Are you sure, you want to delete this Broadcast notification ?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        handleDelete(Id);
      },
    });
  };

  const handleView = (key) => {
    // Add logic for editing a notification
    history.push(`order-management/order-details/${key}`, {
      myCustomState: "Hello from MyComponent",
    });
  };

  const handleDelete = (key) => {
    // Add logic for deleting a notification
    console.log("Delete notification with key:", key);
  };
  var timeout = ""
  const onSearch = (value) => {
    setSearchText(value.target.value)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getOrderList(value.target.value, selectedFilter)
    }, 500)
  }
  const FilterMenu = (
    <Menu mode="horizontal">
      <Menu.SubMenu key="item1" title="Service Type">
        <Menu.Item key="subitem1">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem3">
          <Checkbox>workshop</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem2">
          <Checkbox>Onsite</Checkbox>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="item2" title="Status">
        <Menu.Item key="subitem5">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
      </Menu.SubMenu>
    </Menu>
  );
  const getOrderList = async (search="",filter="") => {
    let url = `?search=${search}`
    //for 0 it is not handling
    if((filter !== '' && filter != 'all')) {
      url += `&status=${filter}`
    }
    const res1 = await axiosInstance.get("api/web/orders"+url);
    console.log("res1", res1);
    setData(res1.data.items);
  };
  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
      {/* <div>
        <Tabs activeKey={key} onChange={setKey} tabBarExtraContent={key==="1"?operations:operationsTwo}>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div> */}
      <h4>
        {" "}
        <SettingOutlined /> Order Management
      </h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="" style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={onSearch}
              value={searchText}
              style={{
                width: 200,
              }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
          </Space>
          <Filter filters={FilterMenu}>
            <Button
              icon={<Icon component={FilterIcon} />}
              className="d-flex align-items-center ml-2"
            >
              Filters
            </Button>
          </Filter>
          <Button
            icon={<Icon component={CsvIcon} />}
            className="d-flex align-items-center ml-2"
          >
            Export
          </Button>
          <Button className="d-flex align-items-center ml-2">
            <img src={CalendarIcon} alt="Calendar Icon" />
          </Button>
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={"/app/order-management/add-order"}>+ New Order</Link>
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // justifyContent:"space-between",
          gap: "20px",
        }}
      >
        {data.length > 0 ? (
          <>
            {data.map((item) => (
              <CardOrder key={item.id} data={item} />
            ))}
          </>
        ) : (
          <div>
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
