import { Button, Menu, Modal, Select, Rate, Switch, Divider, message, Dropdown, Table, Checkbox, Popconfirm } from "antd";
import { Space, Tag } from 'antd';
import { BellOutlined, EditOutlined, EyeOutlined, MoreOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Filter from "components/shared-components/Filter";
import { useHistory } from 'react-router-dom';
import { CsvIcon, FilterIcon } from "assets/svg/icon";
import { axiosInstance } from "App";
import CalendarIcon from "assets/calendar.png"
import moment from "moment";
import SubMenu from "antd/lib/menu/SubMenu";


function TechnicianManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [data, setData] = useState([
    
    
  ])
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleView(record.id)}>
        <EditOutlined /> Edit
      </Menu.Item>
      {/* <Menu.Item key="delete" onClick={() => handleDelete(record.key)}>
        <DeleteOutlined /> Delete
      </Menu.Item> */}
        <Popconfirm
        title={"Are you sure you want to delete this item?"}
        description={"This action cannot be undone."}
        okText="Yes"
        cancelText="No"
        onConfirm={() => deleteRow(record.id)}
      >
        <Menu.Item key="delete">
          <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <DeleteOutlined /> Delete
          </span>
        </Menu.Item>
      </Popconfirm>
    </Menu>
  );

  
  const deleteRow = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `api/web/technician/${id}/delete`
      );
      if (response.status === 200) {
        message.success("Technicial deleted successfully");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleSwitchChange = (checked, key) => {
    // Add logic for handling the switch change
    console.log(`Notification with key ${key} is now ${checked ? 'Active' : 'Inactive'}`);
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
  const columns = [
    {
        title:"Id",
        dataIndex:"id",
    },
    {
        title:"Technician Name",
        dataIndex:"name",
    },
    {
        title:"Gender",
        dataIndex:"gender",
    },
    {
        title:"Nationality",
        dataIndex:"nationality",
    },
    {
        title:"Mobile Number",
        dataIndex:"mobile",
    },
    {
        title:"Email ID",
        dataIndex:"email",
    },
    {
      title:"Job Assigned",
      dataIndex:"jobAssigned"
    },
    {
      title:"Active Jobs",
      dataIndex:"activeJobs"
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Dropdown overlay={getMenu(record.id)} placement="bottomRight" trigger={['hover']}>
              <MoreOutlined />
            </Dropdown>
          </Space>
        ),
      },
]



  const handleView = (key) => {
    // Add logic for editing a notification
    history.push(`order-management/order-details/${key}`, { myCustomState: 'Hello from MyComponent' });
  };

  const handleDelete = (key) => {
    // Add logic for deleting a notification
    console.log('Delete notification with key:', key);
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
    <Menu mode="horizontal" onChange={(e) => {
      console.log(e)
    }}>
      <SubMenu key="item1" title="Status">
        <Menu.Item key="subitem1"

        >
          <Checkbox onChange={() => {
            getOrderList(searchText);
            setSelectedFilter('all')
          }} checked={
            selectedFilter === 'all'
          }>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem2"

        >
          <Checkbox
            onChange={() => {
              getOrderList(searchText, 1);
              setSelectedFilter(1)
            }}
            checked={selectedFilter == 1}

          >Active</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem3"

        >
          <Checkbox onChange={() => {
            getOrderList(searchText, 0);
            setSelectedFilter(0)
          }}

            checked={selectedFilter === 0}>Inactive</Checkbox>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  const getOrderList = async (search = "", filter = 'all') => {
    const res1 = await axiosInstance.get(`api/web/technician/list?search=${search}` + (filter != 'all' ? `&status=${filter}` : ""));
    console.log('res1', res1);
    setData(res1.data.items.map((elm) => {
      return {
        id: elm.id,
        name: elm.company_name,
        jobSite: elm.jobsite,
        machine: 'Excavator',
        faults: 'Engine Failure',
        orderDate: moment(elm.created_at).format('YYYY-MM-DD'),
        technicianAssigned: 'Technician 1',
        status: true,
      }
    }));
  }
  useEffect(() => {
    getOrderList();
  }, [])

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
      <h4> <SettingOutlined /> Technician Management</h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="" style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={onSearch}
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
          <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
          <Button className="d-flex align-items-center ml-2">
            <img src={CalendarIcon} className="mr-2" alt="Calendar Icon" /> Schedule
          </Button>
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={'/app/technician-management/addNew'}>
              + Add New</Link>
          </Button>
        </div>
      </div>
      <div>
      <Table
        // rowKey='id'
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (selectedRowKeys, selectedRows) => {
        //     setSelectedRowKeys(selectedRowKeys);
        //   }
        // }} 
        columns={columns} dataSource={data} />
    </div>

    </div>
  );
}


export default TechnicianManagement
