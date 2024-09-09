import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Empty,
  Input,
  Modal,
  Slider,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import {
  AlarmIcon,
  CCTVIcon,
  CsvIcon,
  ErrorOutlineIcon,
  ImagesIcon,
  LifeCycleIcon,
  MachineDetailIcon,
  MachineIcon,
  MachineModelIcon,
  RepairReportIcon,
  ReportIcon,
  SensorIcon,
  ServiceReportIcon,
  SetAlarmIcon,
  StepsGreyIcon,
  StepsIcon,
} from "assets/svg/icon";
import ReportSerchIcon from "assets/svg/greenSearch.png";
import React, { useState, useEffect } from "react";
import ProgressBar from "./Progress";
import { Select } from "antd";
import { Popover, Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";
import { axiosInstance } from "App";
import { useParams } from "react-router-dom";
import moment from "moment";


const { Option } = Select;
const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];
const { Step } = Steps;
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {status == "process" ? <StepsIcon /> : <StepsGreyIcon />}
    {/* {(status=='process'||status=='finish')?<StepsIcon/>:<StepsGreyIcon/>} */}
  </Popover>
);
const dataSource1 = [
  {
    key: '1',
    srNo: '1',
    serviceReport: 'Repair',
    dateTime: '2024-03-14 10:00',
    createdBy: 'John Doe',
    report: 'The device was repaired successfully.',
  },
  {
    key: '2',
    srNo: '2',
    serviceReport: 'Maintenance',
    dateTime: '2024-03-14 11:30',
    createdBy: 'Jane Smith',
    report: 'Routine maintenance performed on equipment.',
  },
  {
    key: '3',
    srNo: '3',
    serviceReport: 'Inspection',
    dateTime: '2024-03-14 14:45',
    createdBy: 'Alex Brown',
    report: 'Inspected and identified issues with system.',
  },
];
const MachineDetails = () => {
  const [alarmModal, setAlarmModal] = useState(false);
  const [range, setRange] = useState([25, 56]);
  const [generateReportModal, setGenerateReportModal] = useState(false);
  const [repairReportModal, setRepairReportModal] = useState(false)
  const [failureReportModal, setFailureReportModal] = useState(false)
  const [alarmList, setAlarmList] = useState([])
  const { id } = useParams();
  const [machineId, setMachineId] = useState(null);
  const [machineName, setMachineName] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [machineModel, setMachineModel] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [kwHp, setKwHp] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [rpm, setRpm] = useState(null);


  const fetchData = async () => {
    const response = await axiosInstance.get(`api/admin/machine/${id}/show`);
    const res2 = await axiosInstance.get(`api/admin/machine-senser/${id}/show`);
    setAlarmList(res2.data.item.results);
    const data = response.data.item.results;

    setMachineId(data.id);
    setMachineName(data.name);
    setSerialNumber(data.serial_no);
    setMachineModel(data.model);
    setManufacturer(data.manufacturer);
    setKwHp(data.kw_hp);
    setFrequency(data.frequency);
    setRpm(data.rpm);
  }
  useEffect(() => {
    fetchData();
  }, [])


  const dataSource = [
    {
      key: "1",
      srNo: "1",
      sensorId: "S1001",
      sensorName: "Temperature Sensor",
      location: "Room A",
      machineCondition: "Normal",
      dateTime: "2024-03-13 10:00:00",
    },
    {
      key: "2",
      srNo: "2",
      sensorId: "S1002",
      sensorName: "Pressure Sensor",
      location: "Room B",
      machineCondition: "Warning",
      dateTime: "2024-03-13 10:05:00",
    },
    {
      key: "3",
      srNo: "3",
      sensorId: "S1003",
      sensorName: "Vibration Sensor",
      location: "Room C",
      machineCondition: "Critical",
      dateTime: "2024-03-13 10:10:00",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      // title: 'Image',
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Avatar
          src={
            "https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={`Avatar for ${record.organization}`}
        />
      ),
    },
    {
      title: "Sensor ID",
      dataIndex: "sensor_id",
      key: "sensor_id",
    },
    {
      title: "Sensor Name",
      dataIndex: "sensor_name",
      key: "sensor_name",
    },
    {
      title: "Location",
      dataIndex: "sensor_location",
      key: "sensor_location",
    },
    {
      title: "Machine Condition",
      dataIndex: "machineCondition",
      key: "machineCondition",
      render: (machineCondition) => <>-</>,
      // render: (machineCondition) => <Tag color="green">{machineCondition}</Tag>,
    },
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      render:(row)=>{
        return<>{moment(row.created_at).format('MMMM Do YYYY, h:mm:ss A')}</>
      }
    },
  ];
  const handleFilterChange = (value) => {
    // Handle filter change here
    console.log("Selected filter:", value);
  };
  const columns1 = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Service Report',
      dataIndex: 'serviceReport',
      key: 'serviceReport',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${5}`}>
            <span><ReportIcon /></span>
          </Link>
        </>
      ),
    },
  ];
  const columns2 = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Repair Report',
      dataIndex: 'serviceReport',
      key: 'serviceReport',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${5}`}>
            <span><ReportIcon /></span>
          </Link>
        </>
      ),
    },
  ];
  const columns3 = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Failure Prediction Report',
      dataIndex: 'serviceReport',
      key: 'serviceReport',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${5}`}>
            <span><ReportIcon /></span>
          </Link>
        </>
      ),
    },
  ];
  const items = [
    {
      label: (
        <div className="d-flex align-items-center">
          <MachineIcon color={"#3CA6C1"} />
          <span className="ml-2">Machine Details</span>
        </div>
      ),
      key: 1,
      children: (
        <>
          <div className="d-flex">
            <div className="p-2" style={{ width: "60%" }}>
              <div
                className="bg-white rounded border p-2"
                style={{ minHeight: "500px" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
                      <MachineDetailIcon /> Machine Details
                    </h5>
                  </div>
                  <div
                    style={{ gap: "10px" }}
                    className="d-flex justify-content-end"
                  >
                    <Button
                      className="px-4 font-weight-semibold"
                      onClick={() => { }}
                    >
                      View Sensors
                    </Button>
                    {/* <Button className="px-4 font-weight-semibold" htmlType="button">
                            Save Draft
                        </Button> */}
                    <Button
                      className="px-4 font-weight-semibold text-white bg-primary"
                      onClick={() => {
                        setAlarmModal(true);
                      }}
                    >
                      Set Alarm Range
                    </Button>
                  </div>
                </div>






                <div className="pb-3 mt-5">
                  <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
                    <h5 className="m-0 py-1 px-2">Machine ID</h5>
                    <div>{machineId}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h5 className="m-0 py-1 px-2">Machine Name</h5>
                    <div>{machineName}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
                    <h5 className="m-0 py-1 px-2">Serial No</h5>
                    <div>{serialNumber}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h5 className="m-0 py-1 px-2">Machine Model</h5>
                    <div>{machineModel}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
                    <h5 className="m-0 py-1 px-2">Manufacturer</h5>
                    <div>{manufacturer}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h5 className="m-0 py-1 px-2">Kw/Hp </h5>
                    <div>{kwHp}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
                    <h5 className="m-0 py-1 px-2">Frequency (Hz)</h5>
                    <div>{frequency}</div>
                  </div>
                  <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h5 className="m-0 py-1 px-2">RPM</h5>
                    <div>{rpm}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <div style={{ height: "50%" }} className="p-2">
                <div className="bg-white rounded border p-2 h-100">
                  <div>
                    <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
                      <ImagesIcon /> Machine Pictures
                    </h5>
                  </div>
                  <div className="customDashedBorder">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div style={{ height: "50%" }} className="p-2">
                <div className="bg-white rounded border p-2 h-100">
                  <div>
                    <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
                      <CCTVIcon /> IP Camera
                    </h5>
                  </div>
                  <div className="customDashedBorder"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <AlarmIcon color={"#3CA6C1"} />
          <span className="ml-2">Alarms</span>
        </div>
      ),
      key: 2,
      children: (
        <>
          <div className="">
            <Table dataSource={alarmList} columns={columns} />
          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <LifeCycleIcon color={"#3CA6C1"} />
          <span className="ml-2">Life Cycle Management</span>
        </div>
      ),
      key: 3,
      children: (
        <>
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="d-flex" style={{ gap: "10px" }}>
                <Button className="bg-primary text-white">
                  <Link
                    to={`/app/machine-and-sensors/machine-details/life-cycle-management/add-new-life-cycle-event`}
                  >
                    + Add New Event
                  </Link>
                </Button>
                <Button>
                  <Link
                    to={`/app/machine-and-sensors/machine-details/sensor/view-past-event/${2}`}
                  >
                    View Past Event
                  </Link>
                </Button>
                <Button>
                  <Link
                    to={`/app/machine-and-sensors/machine-details/sensor/misc-files/${2}`}
                  >
                    Misc File Upload
                  </Link>
                </Button>
              </div>
              <div className="d-flex justify-content-end">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Activity"
                  onChange={handleFilterChange}
                >
                  {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="mt-3 bg-white rounded pt-4">
              <Steps
                current={1}
                style={{ marginTop: "50px" }}
                progressDot={customDot}
              >
                <Step
                  title="Start of Machine"
                  icon={<UserOutlined />}
                  description="Today 4:00 pm"
                />
                <Step
                  title="Lifecycle"
                  icon={<SolutionOutlined />}
                  description="2nd Jan 2023,  4:00 pm"
                />
                <Step
                  title="Alarms"
                  icon={<LoadingOutlined />}
                  description="3 Jan 2023,  4:00 pm"
                />
                <Step
                  title="Servicing"
                  icon={<SmileOutlined />}
                  description="21 Jan 2023,  4:00 pm"
                />
                <Step
                  title="Alarm"
                  icon={<UserOutlined />}
                  description="12th Feb 2023 4:00 pm"
                />
                <Step
                  title="Repair Works Done"
                  icon={<SolutionOutlined />}
                  description="12th Feb 2023 4:00 pm"
                />
                <Step
                  title="Decommission"
                  icon={<LoadingOutlined />}
                  description="12th Feb 2023 4:00 pm"
                />
              </Steps>
              <div className="p-2 mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table dataSource={dataSource} columns={columns} />
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <ServiceReportIcon />
          <span className="ml-2">Service Report</span>
        </div>
      ),
      key: 4,
      children: (
        <>
          <div className="">
            <div className="d-flex justify-content-between mb-3">
              <div className="" style={{ display: "flex" }}>
                <Space direction="vertical">
                  <Input
                    placeholder="Search"
                    allowClear
                    onChange={() => { }}
                    style={{
                      width: 200,
                    }}
                    prefix={<SearchOutlined style={{ marginRight: 8 }} />}
                  />
                </Space>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Button
                  onClick={() => setGenerateReportModal(true)}
                  className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
                >
                  {/* <Link to={'/app/notifications/add_notification'}> */}
                  Generate Report
                  {/* </Link> */}
                </Button>
              </div>
            </div>
            <div className="mt-3 bg-white rounded ">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table dataSource={dataSource1} columns={columns1} />
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <RepairReportIcon />
          <span className="ml-2">Repair Report</span>
        </div>
      ),
      key: 5,
      children: (
        <>
          <div className="">
            <div className="d-flex justify-content-between mb-3">
              <div className="" style={{ display: "flex" }}>
                <Space direction="vertical">
                  <Input
                    placeholder="Search"
                    allowClear
                    onChange={() => { }}
                    style={{
                      width: 200,
                    }}
                    prefix={<SearchOutlined style={{ marginRight: 8 }} />}
                  />
                </Space>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Button
                  onClick={() => setRepairReportModal(true)}
                  className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
                >
                  {/* <Link to={'/app/notifications/add_notification'}> */}
                  Generate Report
                  {/* </Link> */}
                </Button>
              </div>
            </div>
            <div className="mt-3 bg-white rounded ">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table dataSource={dataSource1} columns={columns2} />
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <ErrorOutlineIcon />
          <span className="ml-2">Failure Prediction Reports</span>
        </div>
      ),
      key: 6,
      children: (
        <>
          <div className="">
            <div className="d-flex justify-content-between mb-3">
              <div className="" style={{ display: "flex" }}>
                <Space direction="vertical">
                  <Input
                    placeholder="Search"
                    allowClear
                    onChange={() => { }}
                    style={{
                      width: 200,
                    }}
                    prefix={<SearchOutlined style={{ marginRight: 8 }} />}
                  />
                </Space>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Button
                  onClick={() => setFailureReportModal(true)}
                  className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
                >
                  {/* <Link to={'/app/notifications/add_notification'}> */}
                  Generate Report
                  {/* </Link> */}
                </Button>
              </div>
            </div>
            <div className="mt-3 bg-white rounded ">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table dataSource={dataSource1} columns={columns3} />
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  const handleSliderChange = (value) => {
    setRange(value);
    console.log(value);
  };
  return (
    <div>
      <div className="bg-white p-3">
        <h4 className="d-flex align-items-center m-0">
          {" "}
          <MachineIcon color={"#72849A"} />
          <span
            style={{
              color: "#6a6a6a",
              fontWeight: "300",
            }}
          >
            {" "}
            Machines & Sensor{" "}
          </span>
          / Machines Details{" "}
        </h4>
        <div
          style={{ background: "#FAFAFB" }}
          className="mb-4 rounded d-flex justify-content-between align-items-start w-100 p-3"
        >
          <div
            style={{ gap: "5px", width: "100%" }}
            className="d-flex align-items-start p-3 w-100 justify-content-between"
          >
            <div style={{ width: "45%" }}>
              <div style={{ gap: "10px" }} className="d-flex align-items-top">
                <div>
                  <img
                    style={{ borderRadius: "50%" }}
                    height={40}
                    width={40}
                    src="https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="img"
                  />
                </div>
                <div className="ml-1" style={{ width: "auto" }}>
                  <h5 className="m-0">Centrifugal pump</h5>
                  <div className="d-flex align-items-center">
                    Acme co | Pumping station 1
                  </div>
                </div>
                <div>
                  <span className={`text-success`}>&#x2022; Online </span>
                </div>
              </div>
              <div className="mt-3">
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <SensorIcon /> 02 Sensors
                </h5>
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <MachineIcon /> M/C ID:
                  <span className="font-weight-300"> #12345</span> | Serial no:
                  <span className="font-weight-300"> 1234567 </span>{" "}
                </h5>
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <MachineModelIcon /> Model:{" "}
                  <span className="font-weight-300">CFG23 Classic</span> |
                  Manufacturer:{" "}
                  <span className="font-weight-300">abc tech </span>
                </h5>
              </div>
            </div>
            <Divider style={{ height: "150px" }} type="vertical" />
            <div className="ml-4" style={{ width: "50%" }}>
              <div className="mt-2">
                <h5 className="mb-1">Machine Status (ISO)</h5>
                <ProgressBar progress={5} />
              </div>
              <div className="mt-2">
                <h5 className="mb-1">Machine Status (User Defined)</h5>
                <ProgressBar progress={25} />
              </div>
              <div className="mt-2">
                <h5 className="mb-1">Machine Status (AI)</h5>
                <ProgressBar progress={38} />
              </div>
              <div className="mt-4 d-flex justify-content-between px-5">
                <div className="d-flex align-items-center">
                  <span
                    className="d-flex align-items-center justify-content-center mr-2"
                    style={{
                      backgroundColor: "#00A843",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    10
                  </span>{" "}
                  Good
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className="d-flex align-items-center justify-content-center mr-2"
                    style={{
                      backgroundColor: "#FFCB21",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    3
                  </span>{" "}
                  Satisfactory
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className="d-flex align-items-center justify-content-center mr-2"
                    style={{
                      backgroundColor: "#FB8920",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    2
                  </span>{" "}
                  Warning
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className="d-flex align-items-center justify-content-center mr-2"
                    style={{
                      backgroundColor: "#F93737",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    6
                  </span>{" "}
                  Critical
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <SetAlarmIcon />{" "}
            <span className="d-block ml-2"> Set Alarm Range </span>
          </div>
        }
        visible={alarmModal}
        onCancel={() => setAlarmModal(false)}
        footer={false}
      >
        <div>
          <label>Min & Max Hertz </label>
          <Slider
            range
            value={range}
            onChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            tooltip={{
              open: true,
            }}
            trackStyle={[{ backgroundColor: "#3CA6C1" }]}
            railStyle={{ backgroundColor: "#d6f1f7" }}
          />
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setAlarmModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setAlarmModal(false)}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <ServiceReportIcon />{" "}
            <span className="d-block ml-2"> Service Report </span>
          </div>
        }
        visible={generateReportModal}
        onCancel={() => setGenerateReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Machine Data
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Initial Conditions & Physical Inspection
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Stator winding electrical tests
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Auxiliaries Checks
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setGenerateReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setGenerateReportModal(false)}
          >
            Generate Report
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <RepairReportIcon />{" "}
            <span className="d-block ml-2"> Repair Report </span>
          </div>
        }
        visible={repairReportModal}
        onCancel={() => setRepairReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Machine Data
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Initial Conditions & Physical Inspection
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Stator winding electrical tests
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Auxiliaries Checks
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setRepairReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setRepairReportModal(false)}
          >
            Generate Report
          </Button>
        </div>
      </Modal>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <RepairReportIcon />{" "}
            <span className="d-block ml-2"> Repair Report </span>
          </div>
        }
        visible={failureReportModal}
        onCancel={() => setFailureReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Machine Data
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Initial Conditions & Physical Inspection
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Stator winding electrical tests
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Auxiliaries Checks
              </h5>
            </Checkbox>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Report Date"
              onChange={(value) => {
                console.log(`Selected date and time: ${value}`);
                // You can perform any action you want with the selected date and time here
              }}
            >
              <Option value="2023-06-02T10:00:24">
                02 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-04T10:00:24">
                04 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-05T10:00:24">
                05 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-06T10:00:24">
                06 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-08T10:00:24">
                08 Jun 2023, 10:00:24 AM
              </Option>
              <Option value="2023-06-10T10:00:24">
                10 Jun 2023, 10:00:24 AM
              </Option>
            </Select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setFailureReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => setFailureReportModal(false)}
          >
            Generate Report
          </Button>
        </div>
      </Modal>
      <div className="customTableBackground">
        <Tabs>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MachineDetails;
