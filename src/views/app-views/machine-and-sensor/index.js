import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Avatar,
  Dropdown,
  Menu,
  Input,
  Button,
  Popconfirm,
  message,
  Select,
  Card,
  Empty,
  Checkbox,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { CsvIcon } from "assets/svg/icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosInstance } from "App";
import moment from "moment";
import SubMenu from "antd/lib/menu/SubMenu";
import { hasPermission } from 'utils/permissionUtils';

const MachineAndSensor = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    fetchData();
  }, []);
  const fetchData = async (health = "", overall = "") => {
    let params = [];

    if (health !== "" && health !== "all") {
      params.push(`health=${health}`);
    }

    if (overall !== "" && overall !== "all") {
      params.push(`machine_status=${overall}`);
    }


    let url = params.length ? `&${params.join("&")}` : "";
    try {
      setLoading(true);
      const response = await axiosInstance.get(`api/web/machines?customer_id=${localStorage.getItem("parent_id")!="null"? localStorage.getItem("parent_id"):localStorage.getItem("user_id")}${url}`);
      if (response.status === 200) {
        const responseData = response.data.items;
        if (Array.isArray(responseData)) {
          setData(responseData);
          setLoading(false);
        } else {
          console.error("Unexpected response format:", responseData);
        }
        // console.log(JSON.stringify(responseData));
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const deleteRow = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `api/web/machines/${id}`
      );
      if (response.status === 200) {
        message.success("Machine deleted successfully");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      message.error(error.response?.data?.message || "Error deleting machine. Please try again.");
    }
  };

  const getMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() =>
          history.push(`/app/machine-and-sensors/machine-details/${record.id}`)
        }
      >
        <EyeOutlined /> View Details
      </Menu.Item>
      <Menu.Item
        key="viewSensors"
        onClick={() =>
          history.push(`/app/machine-and-sensors/sensor-list/${record.id}`)
        }
      >
        <EyeOutlined /> View Sensors
      </Menu.Item>
      {hasPermission('machines_and_sensors', 'Edit Machines and Sensors') && (
        <Menu.Item
          key="edit-machine"
          onClick={() =>
            history.push(`/app/machine-and-sensors/edit/${record.id}`)
          }
        >
          <EditOutlined /> Edit Details
        </Menu.Item>
      )}
      {hasPermission('machines_and_sensors', 'Delete Machines and Sensors') && (
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
      )}
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "name",
      render: (text, record) => (
        text?.name || "N/A"
      )
    },
    {
      title: "Jobsite",
      dataIndex: "job_site",
      key: "Jobsite",
      render: (text, record) => (
        text?.jobsite_name || "N/A"
      )
    },
    {
      title: "Machines",
      dataIndex: "name",
      key: "machine_detail",
    },
    {
      title: "Active Since",
      dataIndex: "created_at",
      key: "created_at",
      render: (row) => {
        return <>{moment(row).format("DD-MM-YYYY, h:mm a")}</>;
      },
    },
    {
      title: "Machine Status",
      dataIndex: "machine_status",
      key: "machine_status",
      render: (text) => (
        text ?
          <Tag color="green">Active</Tag> :
          <Tag color="red">Inactive</Tag>
      )
    },
    {
      title: "Overall Status",
      dataIndex: "health",
      key: "health",
      render: (text) => {
        if (text <= 10 && text >= 8) {
          return <Tag color="green">Good</Tag>
        } else if (text <= 7 && text >= 6) {
          return <Tag color="yellow">Satisfactory</Tag>
        } else if (text <= 5 && text >= 3) {
          return <Tag color="orange">Warning</Tag>
        } else {
          return <Tag color="red">Critical</Tag>

        }
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Dropdown
            overlay={getMenu(record)}
            placement="bottomRight"
            trigger={["hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [overallStatus, setOverallStatus] = useState("all");

  const FilterMenu = (
    <Menu mode="horizontal">
      {/* Status Filter */}
      <SubMenu key="status" title="Health Status">
        <Menu.Item key="status-all">
          <Checkbox
            checked={selectedStatus === 'all'}
            onChange={() => {
              setSelectedStatus('all');
              fetchData("all", overallStatus);
            }}
          >
            All
          </Checkbox>
        </Menu.Item>
        {/* Satisfactory, Warning ya Critical */}
        <Menu.Item key="status-good">
          <Checkbox
            checked={selectedStatus === 'Good'}
            onChange={() => {
              setSelectedStatus('Good');
              fetchData('Good', overallStatus);
            }}
          >
            Good
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-satisfactory">
          <Checkbox
            checked={selectedStatus === 'Satisfactory'}
            onChange={() => {
              setSelectedStatus('Satisfactory');
              fetchData('Satisfactory', overallStatus);
            }}
          >
            Satisfactory
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-warning">
          <Checkbox
            checked={selectedStatus === 'Warning'}
            onChange={() => {
              setSelectedStatus('Warning');
              fetchData('Warning', overallStatus);
            }}
          >
            Warning
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-critical">
          <Checkbox
            checked={selectedStatus === 'Critical'}
            onChange={() => {
              setSelectedStatus('Critical');
              fetchData('Critical', overallStatus);
            }}
          >
            Critical
          </Checkbox>
        </Menu.Item>
      </SubMenu>

      {/* Overall Status Filter */}
      <SubMenu key="overall" title="Overall Status">
        <Menu.Item key="overall-all">
          <Checkbox
            checked={overallStatus === 'all'}
            onChange={() => {
              setOverallStatus('all');
              fetchData(selectedStatus, 'all');
            }}
          >
            All
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="overall-active">
          <Checkbox
            checked={overallStatus === '1'}
            onChange={() => {
              setOverallStatus('1');
              fetchData(selectedStatus, '1');
            }}
          >
            Active
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="overall-inactive">
          <Checkbox
            checked={overallStatus === '0'}
            onChange={() => {
              setOverallStatus('0');
              fetchData(selectedStatus, '0');
            }}
          >
            Inactive
          </Checkbox>
        </Menu.Item>

      </SubMenu>
            
    </Menu>
  );
  return (
    <div>
      <h4>
        <ToolOutlined /> Machine & Sensors
      </h4>
      <div className="d-flex justify-content-between mb-3">
        <div style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={(onSearch) => {}}
              style={{ width: 200 }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
          </Space>
          <Button
            icon={<Icon component={CsvIcon} />}
            className="d-flex align-items-center ml-2"
          >
            Export
          </Button>
          {/* <Select placeholder="Select Area" style={{ width: 200,margin:"0 10px" }} />
          <Select placeholder="Select Jobsite" style={{ width: 200 }} /> */}
        </div>
        {hasPermission('machines_and_sensors', 'Create New Machines and Sensors') && (
          <div className="mb-2 d-flex align-items-center">
            <Button className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4">
              <Link to={"machine-and-sensors/add-new"}>+ Add New Machines</Link>
            </Button>
          </div>
        )}
      </div>
      <Table loading={loading} dataSource={data} columns={columns} />
    </div>
  );
};

export default MachineAndSensor;
