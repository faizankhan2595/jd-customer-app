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
import CardMachine from "./Card/CardMachine";

const MachineAndSensor = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("api/web/machines?customer_id="+localStorage.getItem("user_id"));
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
        <div className="mb-2 d-flex align-items-center">
          <Button className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4">
            <Link to={"machine-and-sensors/add-new"}>+ Add New Machines</Link>
          </Button>
        </div>
      </div>
      {
        data.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {data.map((item) => (
              <CardMachine key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <Card>
            <Empty />
          </Card>
        )
      }

    </div>
  );
};

export default MachineAndSensor;
