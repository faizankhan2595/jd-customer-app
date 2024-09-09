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

const MachineAndSensor = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("api/admin/machine");
        if (response.status === 200) {
          const responseData = response.data.items;
          if (Array.isArray(responseData)) {
            setData(responseData);
          } else {
            console.error("Unexpected response format:", responseData);
          }
          // console.log(JSON.stringify(responseData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const datas = Array.isArray(data)
    ? data.map((value) => ({
        key: value.id,
        ID: value.id,
        image:
          value.image ||
          "https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Customer: value.name,
        Jobsite: value.Jobsite,
        Machines: value.machine_detail,
        ActiveSince: value.ActiveSince,
        MachineStatus: value.machine_status,
        OverallStatus: value.OverallStatus,
        created_at: value.created_at,
      }))
    : [];

  const deleteRow = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `api/admin/machine/${id}/delete`
      );
      if (response.status === 200) {
        message.success("Machine deleted successfully");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting row:", error);
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
      <Menu.Item
        key="edit-machine"
        onClick={() =>
          history.push(`/app/machine-and-sensors/edit/${record.id}`)
        }
      >
        <EditOutlined /> Edit Details
      </Menu.Item>
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Avatar src={text} alt={`Avatar for ${record.Customer}`} />
      ),
    },
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Jobsite",
      dataIndex: "Jobsite",
      key: "Jobsite",
    },
    {
      title: "Machines",
      dataIndex: "machine_detail",
      key: "machine_detail",
    },
    {
      title: "Active Since",
      dataIndex: "ActiveSince",
      key: "ActiveSince",
      render: (row) => {
        return <>{moment(row?.created_at).format("MMMM Do YYYY, h:mm:ss a")}</>;
      },
    },
    {
      title: "Machine Status",
      dataIndex: "machine_status",
      key: "machine_status",
    },
    {
      title: "Overall Status",
      dataIndex: "OverallStatus",
      key: "OverallStatus",
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
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4">
            <Link to={"machine-and-sensors/add-new"}>+ Add New</Link>
          </Button>
        </div>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default MachineAndSensor;
