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
  Card,
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
import SubMenu from "antd/lib/menu/SubMenu";

function OrderManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState('all');
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
      getOrderList(value.target.value, selectedStatus=='active'?1:selectedStatus=='inactive'?0:'all'

        , 
        selectedWorkshop=='Onsite'?'Onsite':selectedWorkshop=='Workshop'?'Workshop':'all'
      )
    }, 500)
  }

  const handleStatusChange = (filter) => {
    setSelectedStatus(filter);
    getOrderList(searchText,filter=='active'?1:filter=='inactive'?0:'all',
    selectedWorkshop=='Onsite'?'Onsite':selectedWorkshop=='Workshop'?'Workshop':'all'

    );
    // Trigger the data fetch or update logic here for status
    console.log(`Applied status filter: ${filter}`);
  };

  const handleService = (filter) => {
    setSelectedWorkshop(filter);
    getOrderList(searchText,selectedStatus=='active'?1:selectedStatus=='inactive'?0:'all', 
    filter=='Onsite'?'Onsite':filter=='Workshop'?'Workshop':'all'

    );
    // Trigger the data fetch or update logic here for workshop
    console.log(`Applied workshop filter: ${filter}`);
  };


  const FilterMenu = (
    <Menu mode="horizontal">
      {/* Status Filter */}
      <SubMenu key="status" title="Status">
        <Menu.Item key="status-all">
          <Checkbox
            checked={selectedStatus === 'all'}
            onChange={() => handleStatusChange('all')}
          >
            All
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-active">
          <Checkbox
            checked={selectedStatus === 'active'}
            onChange={() => handleStatusChange('active')}
          >
            Completed
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-inactive">
          <Checkbox
            checked={selectedStatus === 'inactive'}
            onChange={() => handleStatusChange('inactive')}
          >
            Order Created
          </Checkbox>
        </Menu.Item>
      </SubMenu>

      {/* Workshop Filter */}
      {/* <SubMenu key="serviceType" title="Service Type">
        <Menu.Item key="service-all">
          <Checkbox
            checked={selectedWorkshop === 'all'}
            onChange={() => handleService('all')}
          >
            All
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="service-onsite">
          <Checkbox
            checked={selectedWorkshop === 'Onsite'}
            onChange={() => handleService('Onsite')}
          >
            Onsite
          </Checkbox>
         

        </Menu.Item>
        <Menu.Item key="service-workshop">
         <Checkbox
            checked={selectedWorkshop === 'Workshop'}
            onChange={() => handleService('Workshop')}
          >
            Workshop
          </Checkbox>
        </Menu.Item>

      </SubMenu> */}
    </Menu>
  );
  
  
  const getOrderList = async (search="",filter="",service="") => {
    let url = `?search=${search}`
    //for 0 it is not handling
    if((filter !== '' && filter != 'all')) {
      url += `&status=${filter}`
    }
    if((service !== '' && service != 'all')) {
      url += `&maintenance_service_type=${service}`
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
      
        {data.length > 0 ? (
          <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // justifyContent:"space-between",
            gap: "20px",
          }}
        >
            {data.map((item) => (
              <CardOrder key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <Card>
          <Empty />
        </Card>
        )}
      
    </div>
  );
}

export default OrderManagement;
