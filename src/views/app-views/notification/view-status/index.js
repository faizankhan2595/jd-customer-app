import { Button, Divider, Table } from "antd";
import React, { useEffect } from "react";
import Search from "antd/lib/transfer/search";
import { ExportIcon } from "assets/svg/icon";
import Icon from "@ant-design/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";
import { useState } from "react";
import moment from "moment";
const dummyData = [
    {
      id: 1,
      name: "John Doe",
      Role: "Administrator",
      address: "123 Main Street",
      Mobile: "555-1234",
      email: "john.doe@example.com",
      Status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      Role: "User",
      address: "456 Elm Avenue",
      Mobile: "555-5678",
      email: "jane.smith@example.com",
      Status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      Role: "Manager",
      address: "789 Oak Road",
      Mobile: "555-9012",
      email: "bob.johnson@example.com",
      Status: "Active",
    },
    // Add more objects as needed
  ];
  

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "User Name",
    dataIndex: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    render:(role)=>{
      return <>
      {role===0&&"Admin"}
      {role===1&&"Teacher"}
      {role===2&&"Student"}
      </>
    }
  },
  {
    title: "Mobile Number",
    dataIndex: "phone_number",
  },
  {
    title: "Email ID",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "viewed",
    render:(status)=>{
      return <>
      <div className={`text-success`}>
        {status===0 && "Sent"}
        {status===1 && "Viewed"}
      </div>
      </>
    }
  },
];
const ViewStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [dataObj, setDataObj] = useState({})
  const [usersList, setUsersList] = useState([])
  const getBroadcastStatus = async (id) => {
    const res1 = await axios.get(`${API_BASE_URL}/notifications/broadcast/${id}`)
    setUsersList(res1.data.data);
    setDataObj(res1.data.data[0])
  }
  useEffect(() => {
    if (id) {
      getBroadcastStatus(id)
    }
  }, [])
  
  return (
    <>
      <div className="tabbarWhite">
        <div className="p-3 bg-white">
          <div
            style={{ background: "#fafafb" }}
            className="mb-4 rounded d-flex justify-content-between align-items-start w-100 p-3"
          >
            <div
              style={{ width: "60%" }}
              className="d-flex align-items-start p-3 justify-content-between"
            >
              <div
                style={{ gap: "10px" }}
                className="d-flex align-items-center"
              >
                <div>
                  <h5 className="m-0">Title</h5>
                  <div className="d-flex align-items-center">{dataObj && dataObj.notification_title}</div>
                </div>
              </div>
              <Divider style={{ height: "60px" }} type="vertical" />
              <div>
                <div>
                  <h5 className="m-0">Date of Broadcast</h5>
                  <p className="m-0">{dataObj && moment(dataObj.createdAt).format("DD MMMM YYYY, hh:mm:ss A")}</p>
                </div>
              </div>
              <Divider style={{ height: "60px" }} type="vertical" />
              <div>
                <div>
                  <h5 className="m-0">Sent To (Users) </h5>
                  <p className="m-0">{dataObj && dataObj.total_user}</p>
                </div>
              </div>
              <Divider style={{ height: "60px" }} type="vertical" />
              <div>
                <div>
                  <h5 className="m-0">Status</h5>
                  <h5 className="px-3 py-1 rounded text-white bg-success mb-0 mt-2">
                    Sent
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="mr-3">
          <Search
            placeholder="Search"
            onSearch={(value) => console.log(value)}
            style={{ width: "220px" }}
          />
        </div>
        <div>
          <Button
            icon={<Icon component={ExportIcon} />}
            className="d-flex align-items-center ml-2"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Table dataSource={usersList} columns={columns} />
      </div>
    </>
  );
};

export default ViewStatus;
