import {
  Avatar,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Empty,
  Input,
  Modal,
  Slider,
  Space,
  Table,
  Tabs,
  Tag,
  Dropdown,
  Menu,
  message
} from "antd";
import {
  AlarmIcon,
  CCTVIcon,
  KW,
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
import AnalysisReport from "../../../../assets/images/Mask group (1).png"
import ReportSerchIcon from "assets/svg/greenSearch.png";
import React, { useState, useEffect } from "react";
import ProgressBar from "./Progress";
import { Select } from "antd";
import { Popover, Steps } from "antd";
import SeriesImage from "assets/images/Mask group.png"
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";
import { axiosInstance } from "App";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import LineChart from "components/shared-components/ChartWidget/LineChart";
import BarChart from "components/shared-components/ChartWidget/BarChart";
import { API_BASE_URL } from "constants/ApiConstant";
import MachineSensorComponent from "./MachineSensorComponent";

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
  // Check if current user is a free user (role id 5)
  const userRole = parseInt(localStorage.getItem("role"));
  const isFreeUser = userRole === 5;
  
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
  const [machinePictures, setMachinePictures] = useState([]);
  // const [horizontalData, setHorizontalData] = useState([]);
  const [AnalysisXData, setAnalysisXData] = useState([]);
  const [modalStartDate, setModalStartDate] = useState(null);
  const [modalEndDate, setModalEndDate] = useState(null);
  const [AnalysisYData, setAnalysisYData] = useState([]);
  const [AnalysisZData, setAnalysisZData] = useState([]);
  // const [verticalData, setVerticalData] = useState([]);
  // const [axialData, setAxialData] = useState([]);

  const [mid_freq_acceleration_p2p_x, setMid_freq_acceleration_p2p_x] = useState([]);
  const [mid_freq_acceleration_p2p_y, setMid_freq_acceleration_p2p_y] = useState([]);
  const [mid_freq_acceleration_p2p_z, setMid_freq_acceleration_p2p_z] = useState([]);
  const [high_freq_acceleration_p2p_x, setHigh_freq_acceleration_p2p_x] = useState([]);

  const [mid_freq_displacement_x, setMid_freq_displacement_x] = useState([]);
  const [mid_freq_displacement_y, setMid_freq_displacement_y] = useState([]);
  const [mid_freq_displacement_z, setMid_freq_displacement_z] = useState([]);


  const [mid_freq_velocity_x, setMid_freq_velocity_x] = useState([]);
  const [mid_freq_velocity_y, setMid_freq_velocity_y] = useState([]);
  const [mid_freq_velocity_z, setMid_freq_velocity_z] = useState([]);


  const [mid_freq_env_x, setMid_freq_env_x] = useState([]);
  const [mid_freq_env_y, setMid_freq_env_y] = useState([]);
  const [mid_freq_env_z, setMid_freq_env_z] = useState([]);


  const [inclination_x, setInclination_x] = useState([]);
  const [inclination_y, setInclination_y] = useState([]);
  const [inclination_z, setInclination_z] = useState([]);




  const [tabKey, setTabKey] = useState("1");




  const history = useHistory();
  const [graphType, setGraphType] = useState("mid_freq_displacement");
  const [motorServiceTemperature, setMotorServiceTemperature] = useState([]);
  const [batteryPercentage, setBatteryPercentage] = useState([]);
  const [batteryVoltage, setBatteryVoltage] = useState([]);
  const [rssi, setRssi] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [selectorDate, setSelectorDate] = useState("1");
  const [eventsData, setEventsData] = useState([])
  const [currentEventsData, setCurrentEventsData] = useState([])
  const [isReportsLoading, setIsReportsLoading] = useState(false)
  const [alarmsPage, setAlarmsPage] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({});
  const [sensorsData, setSensorsData] = useState([]);
  const [selectedAlarm, setSelectedAlarm] = useState(null)
  const [serviceReportData, setServiceReportData] = useState({
    event_id: null,
    job_reference: false,
    receiving_and_delivery: false,
  })
  const [repairReportData, setRepairReportData] = useState({
    event_id: false,
    job_reference: false,
    receiving_and_delivery: false,
  })
  const [failurePredictionReportData, setFailurePredictionReportData] = useState({
    event_id: false,
    job_reference: false,
    receiving_and_delivery: false,
  })
  const [serviceReportList, setServiceReportList] = useState([])
  const [repairReportList, setRepairReportList] = useState([])
  const [failurePredictionReportList, setFailurePredictionReportList] = useState([])
  const [serviceReportListOriginal, setServiceReportListOriginal] = useState([])
  const [repairReportListOriginal, setRepairReportListOriginal] = useState([])
  const [failurePredictionReportListOriginal, setFailurePredictionReportListOriginal] = useState([])
  const [serviceReportSearch, setServiceReportSearch] = useState([])
  const [repairReportSearch, setRepaireReportSearch] = useState([])
  const [failurePredictionReportSearch, setFailurePredictionReportSearch] = useState([])
  const [start_date, setStartDate] = useState(moment().subtract(1, 'days').format("YYYY-MM-DD hh:mm:ss"))
  const [end_date, setEndDate] = useState(moment().format("YYYY-MM-DD hh:mm:ss"))
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const response = await axiosInstance.get(`api/admin/machines/${id}`);
    const res2 = await axiosInstance.get(`api/admin/machines/${id}/sensors`);
    setSensorsData([...res2.data.items]);
    // setSelectedAlarm(res2.data.items[0]?.sensor_id)
    let tempDeviceId = ''
    if(localStorage.getItem('deviceId')){
      const tempSensor = res2.data.items.find(item => item.sensor_id == localStorage.getItem('deviceId'))
      if(tempSensor){
        setSelectedAlarm(localStorage.getItem('deviceId'))
        tempDeviceId = localStorage.getItem('deviceId')
      }else{
        setSelectedAlarm(res2.data.items[0]?.sensor_id)
        tempDeviceId = res2.data.items[0]?.sensor_id
      }
      localStorage.removeItem('deviceId')

    }
    else{
      setSelectedAlarm(res2.data.items[0]?.sensor_id)
      tempDeviceId = res2.data.items[0]?.sensor_id
    }
    localStorage.setItem('deviceId2', tempDeviceId)
    let temp_start = ''
    let temp_end = ''
    if(localStorage.getItem('start_date')){
      temp_start = localStorage.getItem('start_date')
      localStorage.removeItem('start_date')
      
    }else{
      temp_start = moment().subtract(1, 'days').format("YYYY-MM-DD hh:mm:ss")

    }

    if(localStorage.getItem('end_date')){
      temp_end = localStorage.getItem('end_date')
      localStorage.removeItem('end_date')
    }
    else{
      temp_end = moment().format("YYYY-MM-DD hh:mm:ss")
    }

    if(localStorage.getItem('dateSelector')){
      setSelectorDate(localStorage.getItem('dateSelector'))
      localStorage.removeItem('dateSelector')
    }


    setStartDate(temp_start)
    setEndDate(temp_end)

    fetchSensorData(tempDeviceId, temp_start, temp_end);
    // fetchSensorData(res2.data.items[0]?.sensor_id, moment().subtract(1, 'days').format("YYYY-MM-DD hh:mm:ss"), moment().format("YYYY-MM-DD hh:mm:ss"));
    const data = response.data.item;
    console.log(data);
    setData(data);
    setMachineId(data.id);
    setMachineName(data.name);
    setSerialNumber(data.serial_no);
    setMachineModel(data.model);
    setManufacturer(data.manufacturer);
    setKwHp(data.kw_hp);
    setFrequency(data.frequency);
    setRpm(data.rpm);
    setMachinePictures(data.pictures);
  }

  const download = async (sensor_id, start_date, end_date) => {
    if (rawData.length == 0) {
      message.error("No data found")
      return
    }
    let url = `${API_BASE_URL}/api/downloadMultipleRawFilesAndZipAndServe?machine_id=${id}&deviceID=${sensor_id}&start_date=${start_date}&end_date=${end_date}`
    window.open(url, '_blank');
  }

  const fetchSensorData = async (sensor_id, start_date, end_date) => {
    const response = await axiosInstance.get(`api/machine-data?machine_id=${id}&deviceID=${sensor_id}&start_date=${start_date}&end_date=${end_date}`);
    // console.log(response.data);
    const rawData = response.data.data;
    setRawData(rawData);

    setMid_freq_acceleration_p2p_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_acceleration_p2p_x) || 0,
          extraValue: item.file_1?.replace("uploads/", ""),
        }
      })
      return data
    })


    setMid_freq_acceleration_p2p_y(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_acceleration_p2p_y) || 0,
          extraValue: item.file_2?.replace("uploads/", ""),
        }
      })
      return data
    })


    setMid_freq_acceleration_p2p_z(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_acceleration_p2p_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })

    setHigh_freq_acceleration_p2p_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.high_freq_acceleration_p2p_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })


    setMid_freq_displacement_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_displacement_x) || 0,
          extraValue: item.file_1?.replace("uploads/", ""),
        }
      })
      return data
    })


    setMid_freq_displacement_y(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_displacement_y) || 0,
          extraValue: item.file_2?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_displacement_z(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_displacement_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_velocity_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_velocity_x) || 0,
          extraValue: item.file_1?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_velocity_y(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_velocity_y) || 0,
          extraValue: item.file_2?.replace("uploads/", ""),
        }
      })
      return data
    })


    setMid_freq_velocity_z(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_velocity_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_env_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_env_x) || 0,
          extraValue: item.file_1?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_env_y(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_env_y) || 0,
          extraValue: item.file_2?.replace("uploads/", ""),
        }
      })
      return data
    })

    setMid_freq_env_z(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.mid_freq_env_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })

    setInclination_x(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.inclination_x) || 0,
          extraValue: item.file_1?.replace("uploads/", ""),
        }
      })
      return data
    })

    setInclination_y(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.inclination_y) || 0,
          extraValue: item.file_2?.replace("uploads/", ""),
        }
      })
      return data
    })

    setInclination_z(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.inclination_z) || 0,
          extraValue: item.file_0?.replace("uploads/", ""),
        }
      })
      return data
    })



    // setHorizontalData(() => {
    //   const data = rawData.map((item) => {
    //     return {
    //       x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //       y: item.mid_freq_displacement_x
    //     }
    //   })
    //   return data
    // })
    // setVerticalData(() => {
    //   const data = rawData.map((item) => {
    //     return {
    //       x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //       y: item.mid_freq_displacement_y
    //     }
    //   })
    //   return data
    // })
    // setAxialData(() => {
    //   const data = rawData.map((item) => {
    //     return {
    //       x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //       y: item.mid_freq_displacement_z
    //     }
    //   })
    //   return data
    // })


    setMotorServiceTemperature(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.temperature) || 0
        }
      })
      return data
    })
    setBatteryPercentage(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.battery_percentage) || 0
        }
      })
      return data
    })
    setBatteryVoltage(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.battery_voltage) || 0
        }
      })
      return data
    })
    setRssi(() => {
      const data = rawData.map((item) => {
        return {
          x: moment(item.datetime).toDate(),
          y: parseFloat(item.RSSI) || 0
        }
      })
      return data
    })
    setAnalysisXData(() => {
      const data = rawData.map((item) => {
        return {
          x: Number(item.mid_freq_env_x),
          y: item.mid_freq_displacement_x
        }
      })
      return data
    })
    setAnalysisYData(() => {
      const data = rawData.map((item) => {
        return {
          x: Number(item.mid_freq_env_y),
          y: item.mid_freq_displacement_y
        }
      })
      return data
    })
    setAnalysisZData(() => {
      const data = rawData.map((item) => {
        return {
          x: Number(item.mid_freq_env_z),
          y: item.mid_freq_displacement_z
        }
      })
      return data
    })
  }

  const fetchEventsData = async () => {
    const response = await axiosInstance.get(`api/admin/life-cycle-event/list?machine_id=${id}`);
    // console.log(response.data.items)
    let events_data = response.data.items?.reverse();
    if (events_data) {
      setEventsData(events_data)
    }
  }

  const fetchReportsData = async () => {
    setIsReportsLoading(true)
    const response = await axiosInstance.get(`api/admin/reports/list?machine_id=${id}`);
    let data = response.data.items;
    // console.log(data)
    let service_arr = [];
    let repair_arr = [];
    let failure_arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].report_type == 'Service') {
        data[i] = { ...data[i], srNo: service_arr.length + 1 }
        service_arr.push(data[i])
      }
      if (data[i].report_type == 'Repair') {
        data[i] = { ...data[i], srNo: repair_arr.length + 1 }
        repair_arr.push(data[i])
      }
      if (data[i].report_type == 'Failure Prediction') {
        data[i] = { ...data[i], srNo: failure_arr.length + 1 }
        failure_arr.push(data[i])
      }
    }

    setServiceReportList(service_arr)
    setServiceReportListOriginal(service_arr)
    setIsReportsLoading(false)
    setRepairReportList(repair_arr)
    setRepairReportListOriginal(repair_arr)
    setIsReportsLoading(false)
    setFailurePredictionReportList(failure_arr)
    setFailurePredictionReportListOriginal(failure_arr)
    setIsReportsLoading(false)
  }


  const fetchAlarmsData = async () => {
    const response = await axiosInstance.get(`api/admin/machines/${id}/sensors`);
    let data = response.data.items;
    console.log(data);
    setAlarmList(data);
  }
  const fetchMachineHealthData = async () => {
    const response = await axiosInstance.get(`api/admin/alarms/${id}/show`);
    console.log(response.data);
  }

  useEffect(() => {
    fetchData();
    fetchEventsData();
    fetchReportsData();

    // fetchAlarmsData();
    if (localStorage.getItem('tab') == 'analysis') {
      setTabKey("7")
      localStorage.removeItem('tab')
    }
    if(localStorage.getItem("tab")=="life-cycle"){
      setTabKey("3")
      localStorage.removeItem("tab")
    }
    if (localStorage.getItem("graphType")) {
      setGraphType(localStorage.getItem("graphType"))
      localStorage.removeItem("graphType")
    }
    // fetchMachineHealthData();
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
      title: "Sensor ID",
      dataIndex: "machineSensor",
      key: "sensor_id",
      render: (machineSensor) => <>{machineSensor.sensor_id}</>,
    },
    {
      title: "Sensor Name",
      dataIndex: "machineSensor",
      key: "sensor_name",
      render: (machineSensor) => <>{machineSensor.sensor_name}</>,
    },
    {
      title: "Location",
      dataIndex: "machineSensor",
      key: "sensor_location",
      render: (machineSensor) => <>{machineSensor.sensor_location}</>,
    },
    {
      title: "Machine Condition",
      dataIndex: "machine_health",
      key: "machine_health",
      // render: (machineCondition) => <>-</>,
      render: (machine_health) => {
        if (machine_health == "Normal") {
          return <Tag color="green">{machine_health}</Tag>;
        } else if (machine_health == "Warning") {
          return <Tag color="orange">{machine_health}</Tag>;
        } else {
          return <Tag color="red">{machine_health}</Tag>;
        }
      }
      // render: (machineCondition) => <Tag color="green">{machineCondition}</Tag>,
    },
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      render: (row) => {
        return <>{moment(row).format('DD-MM-YYYY, h:mm:ss A')}</>
      }
    },
  ];
  const handleFilterChange = (value) => {
    // Handle filter change here
    console.log("Selected filter:", value);
  };

  const handleAnalysisChange = (e) => {
    setGraphType(e);
    // if (e === 'mid_freq_displacement') {
    //   setHorizontalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_displacement_x
    //       }
    //     })
    //     return data
    //   })

    //   setVerticalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_displacement_y
    //       }
    //     })
    //     return data
    //   })

    //   setAxialData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_displacement_z
    //       }
    //     })
    //     return data
    //   })
    // } else if (e === 'mid_freq_velocity') {
    //   setHorizontalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_velocity_x
    //       }
    //     })
    //     return data
    //   })

    //   setVerticalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_velocity_y
    //       }
    //     })
    //     return data
    //   })

    //   setAxialData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_velocity_z
    //       }
    //     })
    //     return data
    //   })
    // } else if (e === 'mid_freq_env') {
    //   setHorizontalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_env_x
    //       }
    //     })
    //     return data
    //   })

    //   setVerticalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_env_y
    //       }
    //     })
    //     return data
    //   })

    //   setAxialData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_env_z
    //       }
    //     })
    //     return data
    //   })
    // }
    // else if (e === 'inclination') {
    //   setHorizontalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.inclination_x
    //       }
    //     })
    //     return data
    //   })

    //   setVerticalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.inclination_y
    //       }
    //     })
    //     return data
    //   })

    //   setAxialData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.inclination_z
    //       }
    //     })
    //     return data
    //   })
    // } else if (e === 'mid_freq_acceleration_p2p') {
    //   setHorizontalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_acceleration_p2p_x
    //       }
    //     })
    //     return data
    //   })

    //   setVerticalData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_acceleration_p2p_y
    //       }
    //     })
    //     return data
    //   })

    //   setAxialData(() => {
    //     const data = rawData.map((item) => {
    //       return {
    //         x: moment(item.datetime, "YYYY-MM-DD HH:mm:ss").toDate(),
    //         y: item.mid_freq_acceleration_p2p_z
    //       }
    //     })
    //     return data
    //   })
    // }
  }
  const columns_events = [
    {
      title: 'Event ID',
      dataIndex: 'id',
      key: 'id',
      render: (item) => <div>#{item}</div>
    },
    {
      title: 'Date Received',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => <div>{moment(item).format('DD-MM-YYYY')}</div>
    },
    {
      title: 'Date Requested',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => <div>{moment(item).format('DD-MM-YYYY')}</div>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'yellow' : 'green'}>{status || 'Submitted'}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={getEventsMenu(record)} trigger={['click']}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const columnsServiceReports = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Service Report',
      dataIndex: 'enabled_fields',
      key: 'enabled_fields',
      render: (text, record) => (
        <>
          {record.enabled_fields.map((e, i) => <span>{i > 0 ? ', ' : ''}{e}</span>)}
        </>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => (
        <>
          <div>{moment(record.created_at).format('DD-MM-YYYY')}</div>
        </>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text, record) => (
        <>
          <div>{record.created_by?.name}</div>
        </>
      ),
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${record.id}`}>
            <span><ReportIcon /></span>
          </Link>
        </>
      ),
    },
  ];
  const columnsRepairReports = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Repair Report',
      dataIndex: 'enabled_fields',
      key: 'enabled_fields',
      render: (text, record) => (
        <>
          {record.enabled_fields.map((e, i) => <span>{i > 0 ? ', ' : ''}{e}</span>)}
        </>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => (
        <>
          <div>{moment(record.created_at).format('DD-MM-YYYY')}</div>
        </>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text, record) => (
        <>
          <div>{record.created_by?.name}</div>
        </>
      ),
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${record.id}`}>
            <span><ReportIcon /></span>
          </Link>
        </>
      ),
    },
  ];
  const columnsFailurePredictionReports = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Failure Prediction Report',
      dataIndex: 'enabled_fields',
      key: 'enabled_fields',
      render: (text, record) => (
        <>
          {record.enabled_fields.map((e, i) => <span>{i > 0 ? ', ' : ''}{e}</span>)}
        </>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => (
        <>
          <div>{moment(record.created_at).format('DD-MM-YYYY')}</div>
        </>
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text, record) => (
        <>
          <div>{record.created_by?.name}</div>
        </>
      ),
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (text, record) => (
        <>
          <Link to={`view-reports/${record.id}`}>
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
          <span className="ml-2">Sensors</span>
        </div>
      ),
      key: 1,
      children: (
        <>
          <MachineSensorComponent data={
            sensorsData
          }
          id={id}
          machine_name={machineName}
          />
        </>
      ),
    },
    // {
    //   label: (
    //     <div className="d-flex align-items-center">
    //       <MachineIcon color={"#3CA6C1"} />
    //       <span className="ml-2">Machine Details</span>
    //     </div>
    //   ),
    //   key: 1,
    //   children: (
    //     <>
    //       <div className="d-flex">
    //         <div className="p-2" style={{ width: "60%" }}>
    //           <div
    //             className="bg-white rounded border p-2"
    //             style={{ minHeight: "500px" }}
    //           >
    //             <div className="d-flex justify-content-between align-items-center">
    //               <div>
    //                 <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
    //                   <MachineDetailIcon /> Machine Details
    //                 </h5>
    //               </div>
    //               <div
    //                 style={{ gap: "10px" }}
    //                 className="d-flex justify-content-end"
    //               >
    //                 <Button
    //                   className="px-4 font-weight-semibold"
    //                   onClick={() => {
    //                     history.push(`/app/machine-and-sensors/sensor-list/${id}`)
    //                   }}
    //                 >
    //                   View Sensors
    //                 </Button>
    //                 {/* <Button className="px-4 font-weight-semibold" htmlType="button">
    //                         Save Draft
    //                     </Button> */}
    //                 {/* <Button
    //                   className="px-4 font-weight-semibold text-white bg-primary"
    //                   onClick={() => {
    //                     setAlarmModal(true);
    //                   }}
    //                 >
    //                   Set Alarm Range
    //                 </Button> */}
    //               </div>
    //             </div>






    //             <div className="pb-3 mt-5">
    //               <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
    //                 <h5 className="m-0 py-1 px-2">Machine ID</h5>
    //                 <div>{machineId}</div>
    //               </div>
    //               <div className="d-flex mb-3 justify-content-between align-items-center">
    //                 <h5 className="m-0 py-1 px-2">Machine Name</h5>
    //                 <div>{machineName}</div>
    //               </div>
    //               <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
    //                 <h5 className="m-0 py-1 px-2">Serial No</h5>
    //                 <div>{serialNumber}</div>
    //               </div>
    //               {/* <div className="d-flex mb-3 justify-content-between align-items-center">
    //                 <h5 className="m-0 py-1 px-2">Machine Model</h5>
    //                 <div>{machineModel}</div>
    //               </div>
    //               <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
    //                 <h5 className="m-0 py-1 px-2">Manufacturer</h5>
    //                 <div>{manufacturer}</div>
    //               </div> */}
    //               <div className="d-flex mb-3 justify-content-between align-items-center">
    //                 <h5 className="m-0 py-1 px-2">Kw/Hp </h5>
    //                 <div>{kwHp}</div>
    //               </div>
    //               <div className="d-flex mb-3 justify-content-between align-items-center bg-grey">
    //                 <h5 className="m-0 py-1 px-2">Frequency (Hz)</h5>
    //                 <div>{frequency}</div>
    //               </div>
    //               <div className="d-flex mb-3 justify-content-between align-items-center">
    //                 <h5 className="m-0 py-1 px-2">RPM</h5>
    //                 <div>{rpm}</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div style={{ width: "40%" }}>
    //           <div style={{ height: "50%" }} className="p-2">
    //             <div className="bg-white rounded border p-2 ">
    //               <div>
    //                 <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
    //                   <ImagesIcon /> Machine Pictures
    //                 </h5>
    //               </div>
    //               {/* <div className="customDashedBorder">
    //                 <img
    //                   src={
    //                     "https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //                   }
    //                   alt="..."
    //                 />
    //               </div> */}
    //               {
    //                 machinePictures.map((item, index) => {
    //                   return (
    //                     <div className="customDashedBorder" key={index}>
    //                       <img
    //                         src={item.file_url}
    //                         alt="..."
    //                       />
    //                     </div>
    //                   )
    //                 })
    //               }
    //             </div>
    //           </div>
    //           {/* <div style={{ height: "50%" }} className="p-2">
    //             <div className="bg-white rounded border p-2 h-100">
    //               <div>
    //                 <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
    //                   <CCTVIcon /> IP Camera
    //                 </h5>
    //               </div>
    //               <div className="customDashedBorder"></div>
    //             </div>
    //           </div> */}
    //         </div>
    //       </div>
    //     </>
    //   ),
    // },
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
                <Button className="bg-primary text-white"
                  onClick={() => {
                    localStorage.setItem('tab', 'life-cycle')
                  }}
                >
                  <Link
                    to={`/app/machine-and-sensors/machine-details/life-cycle-management/add-new-life-cycle-event/${id}`}
                  >
                    + Add New Event
                  </Link>
                </Button>
                <Button>
                  <Link
                    to={`/app/machine-and-sensors/machine-details/sensor/view-past-event/${id}`}
                    onClick={() => {
                      localStorage.setItem('tab', 'life-cycle')
                    }}
                  >
                    View Past Event
                  </Link>
                </Button>
                {false && <Button>
                  <Link
                    to={`/app/machine-and-sensors/machine-details/sensor/misc-files/${2}`}
                  >
                    Misc File Upload
                  </Link>
                </Button>}
              </div>
              {/* <div className="d-flex justify-content-end">
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
              </div> */}
            </div>
            <div className="mt-3 bg-white rounded pt-4" >
              <div style={{ width: "100%", overflowX: "auto", paddingBottom: "10px" }}>
                <Steps
                  current={currentStep}
                  style={{ marginTop: "50px", width: "1000px" }}
                  progressDot={customDot}
                >
                  <Step
                    title="Start of Machine LifeCycle"
                    icon={<UserOutlined />}
                    description={<div className="d-flex flex-column">
                      <div>{moment(data.created_at).format('DD-MM-YYYY')}</div>
                      <div>{moment(data.created_at).format('hh:mm A')}</div>
                    </div>}
                    onClick={() => {
                      setCurrentStep(0);
                      setCurrentEventsData([])
                      setAlarmsPage(false)
                    }}
                  />
                  <Step
                    title="Alarms"
                    icon={<UserOutlined />}
                    description={<div className="d-flex flex-column">
                      <div>{moment(data.created_at).format('DD-MM-YYYY')}</div>
                      <div>{moment(data.created_at).format('hh:mm A')}</div>
                    </div>}
                    onClick={() => {
                      setCurrentStep(1);
                      // setCurrentEventsData([])
                      setAlarmsPage(true)
                    }}
                  />

                  {eventsData.map((event, index) => (
                    <Step
                      title={event.name || 'Event #' + event.id}
                      icon={<UserOutlined />}
                      description={<div className="d-flex flex-column">
                        <div>{moment(event.created_at).format('DD-MM-YYYY')}</div>
                        <div>{moment(event.created_at).format('hh:mm A')}</div>
                      </div>}
                      onClick={() => {
                        setCurrentStep(index + 2);
                        setCurrentEventsData([eventsData[index]])
                        setAlarmsPage(false)
                      }}
                    />
                  ))}
                  {/* <Step
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
                /> */}
                </Steps>
              </div>
              <div className="p-2 mt-2">
                {alarmsPage ? (
                  <>
                    <div className="">
                      <Table dataSource={alarmList} columns={columns} />
                    </div>
                  </>
                ) : (
                  <Table dataSource={currentEventsData} columns={columns_events} />
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
                    value={serviceReportSearch}
                    onChange={(e) => {
                      let search_value = e.target.value;
                      setServiceReportSearch(search_value);
                      if (search_value) {
                        let reports = serviceReportListOriginal;
                        reports = reports.filter(elem => {
                          for (let item of elem.enabled_fields) {
                            if (item.toUpperCase().includes(search_value.toUpperCase())) return true
                            else return false
                          }
                        })
                        setServiceReportList(reports)
                      } else {
                        setServiceReportList(serviceReportListOriginal);
                      }
                    }}
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
                  Generate Report
                </Button>
              </div>
            </div>
            <div className="mt-3 bg-white rounded p-2">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table loading={isReportsLoading} dataSource={serviceReportList} columns={columnsServiceReports} />
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
                    value={repairReportSearch}
                    onChange={(e) => {
                      let search_value = e.target.value;
                      setRepaireReportSearch(search_value);
                      if (search_value) {
                        let reports = repairReportListOriginal;
                        reports = reports.filter(elem => {
                          for (let item of elem.enabled_fields) {
                            if (item.toUpperCase().includes(search_value.toUpperCase())) return true
                            else return false
                          }
                        })
                        setRepairReportList(reports)
                      } else {
                        setRepairReportList(repairReportListOriginal);
                      }
                    }}
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
            <div className="mt-3 bg-white rounded p-2">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table loading={isReportsLoading} dataSource={repairReportList} columns={columnsRepairReports} />
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
                    value={failurePredictionReportSearch}
                    onChange={(e) => {
                      let search_value = e.target.value;
                      setFailurePredictionReportSearch(search_value);
                      if (search_value) {
                        let reports = failurePredictionReportListOriginal;
                        reports = reports.filter(elem => {
                          for (let item of elem.enabled_fields) {
                            if (item.toUpperCase().includes(search_value.toUpperCase())) return true
                            else return false
                          }
                        })
                        setFailurePredictionReportList(reports);
                      } else {
                        setFailurePredictionReportList(failurePredictionReportListOriginal);
                      }
                    }}
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
            <div className="mt-3 bg-white rounded p-2">
              <div className="mt-2">
                {false ? (
                  <>
                    <hr />
                    <Empty />
                  </>
                ) : (
                  <Table loading={isReportsLoading} dataSource={failurePredictionReportList} columns={columnsFailurePredictionReports} />
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    // Only show Analysis Report tab for non-free users
    ...(!isFreeUser ? [{
      label: (
        <div className="d-flex align-items-center">
          <img src={AnalysisReport} alt="Analysis Report" />
          <span className="ml-2">Analysis Report</span>
        </div>
      ),
      key: 7,
      children: (
        <>
          <Card>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '15px'
            }}>
              <div><img src={SeriesImage} /></div>
              <div style={{
                fontWeight: 'bold',
                fontSize: '16px'
              }}>Analysis</div>
              {/* <div>{moment().format("DD MMM YYYY HH:mm a")}</div> */}
              {/* <div >
                <Button type="primary" ghost onClick={() => { }}>Status Update</Button>
              </div> */}
              <div >
                <Button type="primary" disabled={rawData.length==0} loading={loading} onClick={() => {
                  download(selectedAlarm, start_date, end_date)
                }}>Accquire Raw Data</Button>
              </div>
              <div style={{
                width: '300px'
              }}><Select onChange={handleAnalysisChange} style={{
                width: '100%'
              }}
                value={graphType}

              >
                  <Option value="mid_freq_displacement">Displacement</Option>
                  <Option value="mid_freq_acceleration_p2p">Acceleration</Option>
                  <Option value="mid_freq_velocity">Velocity</Option>
                  <Option value="inclination">Inclination</Option>
                  <Option value="mid_freq_env">Frequency</Option>
                </Select></div>

              <div style={{
                width: '200px'
              }}>
                <Select value={selectorDate} onChange={(e) => {
                  if (e === "Date Range") {
                    if (selectorDate == "Date-Range") {
                      setDateRangeModal(true)
                    } else {
                      setDateRangeModal(true)
                      setModalStartDate(null);
                      setModalEndDate(null);
                    }
                    return;

                  }
                  setSelectorDate(e)
                  if (e === "1") {
                    fetchSensorData(selectedAlarm, moment().subtract(1, 'days').format('YYYY-MM-DD hh:mm:ss'), moment().format('YYYY-MM-DD hh:mm:ss'))
                    setEndDate(moment().format('YYYY-MM-DD hh:mm:ss'))
                    setStartDate(moment().subtract(1, 'days').format('YYYY-MM-DD hh:mm:ss'))

                  } else if (e === "7") {
                    fetchSensorData(selectedAlarm, moment().subtract(7, 'days').format('YYYY-MM-DD hh:mm:ss'), moment().format('YYYY-MM-DD hh:mm:ss'))
                    setEndDate(moment().format('YYYY-MM-DD hh:mm:ss'))
                    setStartDate(moment().subtract(7, 'days').format('YYYY-MM-DD hh:mm:ss'))
                  } else if (e === "30") {
                    fetchSensorData(selectedAlarm, moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'), moment().format('YYYY-MM-DD hh:mm:ss'))
                    setEndDate(moment().format('YYYY-MM-DD hh:mm:ss'))
                    setStartDate(moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'))
                  } else if (e === "60") {
                    fetchSensorData(selectedAlarm, moment().subtract(60, 'days').format('YYYY-MM-DD hh:mm:ss'), moment().format('YYYY-MM-DD hh:mm:ss'))
                    setEndDate(moment().format('YYYY-MM-DD hh:mm:ss'))
                    setStartDate(moment().subtract(60, 'days').format('YYYY-MM-DD hh:mm:ss'))
                  }

                }} style={{
                  width: '100%'
                }} >
                  <Select.Option value="1">1 Day</Select.Option>
                  <Select.Option value="7">7 Day</Select.Option>
                  <Select.Option value="30">30 Day</Select.Option>
                  <Select.Option value="60">60 Day</Select.Option>
                  <Select.Option value={"Date Range"}>Date Range</Select.Option>
                </Select>
              </div>
            </div>
            <div style={{
              width: "300px",
              marginBottom: "30px"
            }}>
              <Select value={selectedAlarm}
                placeholder="Select Sensor"
                onChange={(e) => {
                  setSelectedAlarm(e)
                  // getSensorData(e)
                  localStorage.setItem('deviceId2', e)
                  fetchSensorData(e, start_date, end_date)
                }}
                style={{
                  width: "100%"
                }}>
                {
                  sensorsData.map((item) => {
                    return (
                      <Option value={item.sensor_id}>{item.sensor_type + " #" + (item.sensor_id_label!==null?item.sensor_id_label:item.sensor_id)}</Option>
                    )
                  })
                }
              </Select>
            </div>
            {/* <LineChart title="Horizontal Data" series={horizontalData} label={"Amplitude VS Time"} />
            <LineChart title="Vertical Data" series={verticalData} label={"Amplitude VS Time"} />
            <LineChart title="Axial Data" series={axialData} label={"Amplitude VS Time"} /> */}
            {
              graphType === 'mid_freq_acceleration_p2p' && (
                <>
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Acceleration P2P X"} series={mid_freq_acceleration_p2p_x} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Acceleration P2P Y"} series={mid_freq_acceleration_p2p_y} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Acceleration P2P Z"} series={mid_freq_acceleration_p2p_z} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"High Frequency Acceleration P2P Z"} series={high_freq_acceleration_p2p_x} label={"Amplitude VS Time"} />
                </>

              )
            }
            {
              graphType === 'mid_freq_displacement' && (
                <>
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Displacement X"} series={mid_freq_displacement_x} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Displacement Y"} series={mid_freq_displacement_y} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Displacement Z"} series={mid_freq_displacement_z} label={"Amplitude VS Time"} />
                </>
              )
            }
            {
              graphType === 'mid_freq_velocity' && (
                <>
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Velocity X"} series={mid_freq_velocity_x} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Velocity Y"} series={mid_freq_velocity_y} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Velocity Z"} series={mid_freq_velocity_z} label={"Amplitude VS Time"} />
                </>
              )
            }
            {
              graphType === 'inclination' && (
                <>
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Inclination X"} series={inclination_x} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Inclination Y"} series={inclination_y} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Inclination Z"} series={inclination_z} label={"Amplitude VS Time"} />
                </>
              )
            }
            {
              graphType === 'mid_freq_env' && (
                <>
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Env X"} series={mid_freq_env_x} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Env Y"} series={mid_freq_env_y} label={"Amplitude VS Time"} />
                  <LineChart graphType={graphType} dateSelector={selectorDate} disabled={rawData.length==0} deviceId={selectedAlarm} start_date={start_date} end_date={end_date} title={"Mid Frequency Env Z"} series={mid_freq_env_z} label={"Amplitude VS Time"} />
                </>
              )
            }

          </Card>
          <LineChart dateSelector={selectorDate} title="Motor Service Temperature " series={motorServiceTemperature} label={"Celsius VS Time"} />
          <LineChart dateSelector={selectorDate} title="Voltage" series={batteryVoltage} label={"Voltage (v) VS Time"} />
          <LineChart dateSelector={selectorDate} title="Battery %" series={batteryPercentage} label={"Battery % VS Time"} />
          <LineChart dateSelector={selectorDate} title="RSSI (Received Signal Strength Indicator)" series={rssi} label={"RSSI (dBm) VS Time"} />
          {/* <BarChart title="Analysis (Frequency) - X Axis" series={AnalysisXData} label={"Amplitude VS Frequency (Hz)"} />
            <BarChart title="Analysis (Frequency) - Y Axis" series={AnalysisYData} label={"Amplitude VS Frequency (Hz)"} />
            <BarChart title="Analysis (Frequency) - Z Axis" series={AnalysisZData} label={"Amplitude VS Frequency (Hz)"} /> */}
        </>
      ),
    }] : []),
  ];
  const handleSliderChange = (value) => {
    setRange(value);
    console.log(value);
  };

  const getEventsMenu = (record) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => editLifecycleEvent(record.id)}>
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key="view" onClick={() => deleteLifecycleEventHandler(record.id)}>
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );

  const editLifecycleEvent = async (event_id) => {
    history.push(`/app/machine-and-sensors/machine-details/life-cycle-management/edit-life-cycle-event/${event_id}`);
  }

  const deleteLifecycleEventHandler = async (event_id) => {
    console.log("fetch called")
    const response = await axiosInstance.delete(`api/admin/life-cycle-event/${event_id}/delete`
      // , { search: 'none' }
    );
    console.log(response.data.items)
    let data = response.data;
    if (data.status) {
      message.success("Event deleted successfully")
      fetchData();
    } else {
      message.success("Event cannot be deleted")
    }
  }

  const generateServiceReport = async () => {
    let enabled_fields = [];
    if (serviceReportData.job_reference) enabled_fields.push('Job Reference');
    if (serviceReportData.receiving_and_delivery) enabled_fields.push('Receiving & Delivery');
    const response = await axiosInstance.post(`api/admin/reports/invoke`
      , {
        user_id: localStorage.getItem("user_id"),
        life_cycle_event_id: serviceReportData.event_id,
        machine_id: +id,
        report_type: 'Service',
        enabled_fields: enabled_fields,
        pdf_url: '',
      }
    );
    if (response.data.status) {
      message.success("Service Report generated successfully")
      fetchReportsData();
      setGenerateReportModal(false);
    } else {
      message.error("Service Report cannot be generated");
    }
  }

  const generateRepairReport = async () => {
    let enabled_fields = []
    if (repairReportData.job_reference) enabled_fields.push('Job Reference');
    if (repairReportData.receiving_and_delivery) enabled_fields.push('Receiving & Delivery');
    const response = await axiosInstance.post(`api/admin/reports/invoke`
      , {
        user_id: localStorage.getItem("user_id"),
        life_cycle_event_id: repairReportData.event_id,
        machine_id: +id,
        report_type: 'Repair',
        enabled_fields: enabled_fields,
        pdf_url: '',
      }
    );
    if (response.data.status) {
      message.success("Repair Report generated successfully")
      fetchReportsData();
      setRepairReportModal(false);
    } else {
      message.error("Repair Report cannot be generated")
    }
  }

  const generateFailurePredictionReport = async () => {
    let enabled_fields = []
    if (failurePredictionReportData.job_reference) enabled_fields.push('Job Reference');
    if (failurePredictionReportData.receiving_and_delivery) enabled_fields.push('Receiving & Delivery');
    const response = await axiosInstance.post(`api/admin/reports/invoke`
      , {
        user_id: localStorage.getItem("user_id"),
        life_cycle_event_id: failurePredictionReportData.event_id,
        machine_id: +id,
        report_type: 'Failure Prediction',
        enabled_fields: enabled_fields,
        pdf_url: '',
      }
    );
    console.log(response)
    console.log(response.data)
    if (response.data.status) {
      message.success("Failure Prediction Report generated successfully")
      fetchReportsData();
      setFailureReportModal(false);
    } else {
      message.error("Failure Prediction Report cannot be generated")
    }
  }

  return (
    <div>
      <div className="bg-white p-3" style={{
        height:"35vh"
      }}>
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
            className="d-flex align-items-start w-100 justify-content-between"
          >
            <div style={{ width: "30%" }}>
              <div style={{ gap: "10px" }} className="d-flex align-items-top">
                <div>
                  {/* <img
                    style={{ borderRadius: "50%" }}
                    height={40}
                    width={40}
                    src="https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="img"
                  /> */}
                </div>
                <div className="ml-1" style={{ width: "auto" }}>
                  <h5 className="m-0">{data.name}</h5>
                  <div className="d-flex align-items-center">
                    {/* Acme co | Pumping station 1 */}
                    {data.user?.company_name || "NA"} | {data.job_site?.jobsite_name}
                  </div>
                </div>
                {/* <div>
                  <span className={`text-success`}>&#x2022; Online </span>
                </div> */}
              </div>
              <div className="mt-3">
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <SensorIcon /> {sensorsData.length} Sensors
                </h5>
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <MachineIcon />
                  M/C Id:{" "}
                  <span className="font-weight-300">{data.id}</span> |
                  Serial no:
                  <span className="font-weight-300"> {data.serial_no} </span>{" "}
                </h5>
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <MachineModelIcon /> Model:{" "}
                  <span className="font-weight-300">{data.model}</span> |
                  Manufacturer:{" "}
                  <span className="font-weight-300">{data.manufacturer}</span>
                </h5>
                <h5
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <KW />
                  Kw/Hp:{" "}
                  <span className="font-weight-300">
                    {data.kw_hp ? data.kw_hp : "N/A"}
                  </span>{" "}
                  | Frequency: (Hz){" "}
                  <span className="font-weight-300">
                    {data.frequency ? data.frequency : "N/A"}
                  </span>{" "}
                  | RPM:{" "}
                  <span className="font-weight-300">
                    {data.rpm ? data.rpm : "N/A"}
                  </span>
                </h5>


                {/* <div className="d-flex mb-3 justify-content-between align-items-center">
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
                  </div> */}
              </div>
            </div>
            <Divider style={{ height: "150px" }} type="vertical" />
            <div className="ml-4" style={{ width: "30%" }}>
              <div className="mt-2">
                <h5 className="mb-1">Machine Status (ISO)</h5>
                <ProgressBar progress={data.health_iso} statusRanges={data.status_ranges_iso}/>
              </div>
              <div className="mt-2">
                <h5 className="mb-1">Machine Status (User Defined)</h5>
                <ProgressBar progress={data.health} statusRanges={data.status_ranges_user_defined} />
              </div>
              {/* <div className="mt-2">
                <h5 className="mb-1">Machine Status (AI)</h5>
                <ProgressBar progress={10} />
              </div> */}
              <div className="mt-4 d-flex flex-wrap pr-5" style={{ gap: "16px" }}>
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

                  </span>{" "}
                  Critical
                </div>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <div style={{ height: "50%" }} className="p-2">
                <div className="bg-white rounded border p-2 ">
                  <div>
                    <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
                      <ImagesIcon /> Machine Pictures
                    </h5>
                  </div>
                  {/* <div className="customDashedBorder">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt="..."
                    />
                  </div> */}
                  <div style={{
                    height: "200px",
                    overflowY: "auto",
                  }}>
                    {
                      machinePictures.map((item, index) => {
                        return (
                          <>
                            <div className="customDashedBorder" key={index}>
                              <img
                                src={item.file_url}
                                alt="..."
                              />
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              {/* <div style={{ height: "50%" }} className="p-2">
                <div className="bg-white rounded border p-2 h-100">
                  <div>
                    <h5 className="m-0 d-flex" style={{ gap: "4px" }}>
                      <CCTVIcon /> IP Camera
                    </h5>
                  </div>
                  <div className="customDashedBorder"></div>
                </div>
              </div> */}
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
            <span className="d-block ml-2">Service Report</span>
          </div>
        }
        visible={generateReportModal}
        onCancel={() => setGenerateReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="mr-2">Event Id</h5>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Event"
              value={serviceReportData.event_id}
              onChange={(value) => {
                setServiceReportData((prevData) => {
                  return {
                    ...prevData,
                    event_id: value
                  }
                })
              }}
            >
              {eventsData.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>{item.id}</Option>
                )
              })}
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={serviceReportData.job_reference} onChange={() => {
              setServiceReportData((prevData) => {
                return {
                  ...prevData,
                  job_reference: !prevData.job_reference
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={serviceReportData.receiving_and_delivery} onChange={() => {
              setServiceReportData((prevData) => {
                return {
                  ...prevData,
                  receiving_and_delivery: !prevData.receiving_and_delivery
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
          </div>
          {/* <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Machine Data
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Initial Conditions & Physical Inspection
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Stator winding electrical tests
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Auxiliaries Checks
              </h5>
            </Checkbox>
          </div> */}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setGenerateReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => generateServiceReport()}
          >
            Generate Report
          </Button>
        </div>
      </Modal>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <RepairReportIcon />{" "}
            <span className="d-block ml-2">Repair Report</span>
          </div>
        }
        visible={repairReportModal}
        onCancel={() => setRepairReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="mr-2">Event Id</h5>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Event"
              value={repairReportData.event_id}
              onChange={(value) => {
                setRepairReportData((prevData) => {
                  return {
                    ...prevData,
                    event_id: value
                  }
                })
              }}
            >
              {eventsData.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>{item.id}</Option>
                )
              })}
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={repairReportData.job_reference} onChange={() => {
              setRepairReportData((prevData) => {
                return {
                  ...prevData,
                  job_reference: !prevData.job_reference
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={repairReportData.receiving_and_delivery} onChange={() => {
              setRepairReportData((prevData) => {
                return {
                  ...prevData,
                  receiving_and_delivery: !prevData.receiving_and_delivery
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
          </div>
          {/* <div className="d-flex justify-content-between report-modal-boxes">
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
          </div> */}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setRepairReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => generateRepairReport()}
          >
            Generate Report
          </Button>
        </div>
      </Modal>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <RepairReportIcon />{" "}
            <span className="d-block ml-2">Failure Prediction Report</span>
          </div>
        }
        visible={failureReportModal}
        onCancel={() => setFailureReportModal(false)}
        footer={false}
        width={1000}
      >
        <div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="mr-2">Event Id</h5>
            <Select
              id="dates"
              style={{ width: 200 }}
              placeholder="Select Event"
              value={failurePredictionReportData.event_id}
              onChange={(value) => {
                setFailurePredictionReportData((prevData) => {
                  return {
                    ...prevData,
                    event_id: value
                  }
                })
              }}
            >
              {eventsData.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>{item.id}</Option>
                )
              })}
            </Select>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={failurePredictionReportData.job_reference} onChange={() => {
              setFailurePredictionReportData((prevData) => {
                return {
                  ...prevData,
                  job_reference: !prevData.job_reference
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Job Reference
              </h5>
            </Checkbox>
          </div>
          <div className="d-flex justify-content-between report-modal-boxes">
            <Checkbox value={failurePredictionReportData.receiving_and_delivery} onChange={() => {
              setFailurePredictionReportData((prevData) => {
                return {
                  ...prevData,
                  receiving_and_delivery: !prevData.receiving_and_delivery
                }
              })
            }}>
              <h5 className="pl-2 m-0">
                <img src={ReportSerchIcon} alt="..." /> Receiving & Delivery
              </h5>
            </Checkbox>
          </div>
          {/* <div className="d-flex justify-content-between report-modal-boxes">
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
          </div> */}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button key="cancel" onClick={() => setFailureReportModal(false)}>
            Back
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => generateFailurePredictionReport(false)}
          >
            Generate Report
          </Button>
        </div>
      </Modal>

      <div className="customTableBackground">
        <Tabs activeKey={tabKey} onChange={(key) => setTabKey(key)}>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>

      <Modal title="Date Range" onOk={() => {
        if (modalStartDate && modalEndDate) {
          setDateRangeModal(false);
          fetchSensorData(selectedAlarm, modalStartDate, modalEndDate);
          setSelectorDate('Date-Range');
          setStartDate(modalStartDate);
          setEndDate(modalEndDate);
        } else {
          message.error("Please select date range")
        }
      }} visible={dateRangeModal} onCancel={() => {
        setDateRangeModal(false)
        if (selectorDate === 'Date-Range') {

        } else {
          setModalStartDate(null);
          setModalEndDate(null);
        }
      }} >
        <div style={{
          display: "flex",
          // flexDirection: "column",
          gap: "10px"
        }}>

          <DatePicker
            format={"DD-MM-YYYY"}
            style={{ width: "100%" }}
            onChange={(date, dateString) => {
              setModalStartDate(date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null);
            }}
            value={modalStartDate ? moment(modalStartDate, "YYYY-MM-DD hh:mm:ss") : null}
          />

          <DatePicker
            style={{ width: "100%" }}
            format={"DD-MM-YYYY"}
            onChange={(date, dateString) => {
              setModalEndDate(date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : null);
            }}
            value={modalEndDate ? moment(modalEndDate, "YYYY-MM-DD HH:mm:ss") : null}
          />

        </div>
      </Modal>
    </div>
  );
};

export default MachineDetails;


