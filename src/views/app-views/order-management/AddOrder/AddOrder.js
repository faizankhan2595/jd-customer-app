import {
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  InboxOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import { axiosInstance } from "App";
import { UploadFileIcon } from "assets/svg/icon";
// import UploadImage from "assets/uploadDocument.svg";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CountrySelector from "utils/CountrySelector";
import { UploadImage } from "utils/Upload";

function AddOrder() {
  const [form] = Form.useForm();
  const [data, setData] = React.useState([]);
  const [machineData, setMachineData] = React.useState([]);
  const [technician, setTechnician] = React.useState([]);
  const [workshop, setWorkshop] = React.useState([]);
  const [serviceType, setServiceType] = React.useState("");
  const [machineFaultInput, setMachineFaultInput] = React.useState("");
  const [faultDetails, setFaultDetails] = React.useState("");
  const [machineFault, setMachineFault] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const history = useHistory();

  const onFinish = async (values) => {
    // console.log("values", values);
    if (machineFault.length === 0) {
      message.error("Please add machine fault");
      return;
    }
    let file = [];

    const temp = selectedFiles.filter((item) => {
      return item.url === undefined;
    });

    const temp2 = selectedFiles.filter((item) => {
      return item.url !== undefined;
    });
    setLoading(true);
    if (temp.length !== 0) {
      const uploadPromise = temp.map(async (item) => {
        if (item.url === undefined) {
          const url = await UploadImage(item);
          return url;
        } else {
          return item.url;
        }
      });

      file = await Promise.all(uploadPromise);
      console.log(file);
    }

    file = [
      ...file,
      ...temp2.map((item) => {
        return item.url;
      }),
    ];
    // return;
    try {
      const response = await axiosInstance.post("api/web/orders", {
        ...values,
        machine_faults: machineFault,
        files: file,
        model: machineData.find((item) => item.id === values.machine_id).model,
        status: 1,
        //    0 -> Order Created
      });
      if (response.status === 200) {
        console.log("response", response);
        message.success("Order created successfully");
        history.push("/app/order-management");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  function handleFileSelect(event) {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    //   console.log(selectedFiles)
    setSelectedFiles([...selectedFiles, newSelectedFiles[0]]);
  }
  const delUplFile = (i) => {
    let AfterDeleteFile = selectedFiles.filter((elem, index) => {
      return index !== i;
    });
    setSelectedFiles(AfterDeleteFile);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `api/web/machines?customer_id=${
          localStorage.getItem("parent_id") != "null"
            ? localStorage.getItem("parent_id")
            : localStorage.getItem("user_id")
        }&status=1`
      );
      if (response.status === 200) {
        const responseData = response.data.items;
        if (Array.isArray(responseData)) {
          setMachineData(responseData);
        } else {
          console.error("Unexpected response format:", responseData);
        }
        // console.log(JSON.stringify(responseData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async () => {
    try {
      const resp = await axiosInstance.get(
        `/api/web/jobsites?customer_id=${
          localStorage.getItem("parent_id") != "null"
            ? localStorage.getItem("parent_id")
            : localStorage.getItem("user_id")
        }&status=1`
      );
      setData(resp.data.items);
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };

  const getTechnicianList = async () => {
    const res1 = await axiosInstance.get(
      `api/web/technician/list?customer_id=${
        localStorage.getItem("parent_id") != "null"
          ? localStorage.getItem("parent_id")
          : localStorage.getItem("user_id")
      }&status=1`
    );
    console.log("res1", res1);
    setTechnician(res1.data.items);
  };

  const getWorkshop = async () => {
    const res1 = await axiosInstance.get(
      `api/admin/workshop-user/list?status=1`
    );
    // console.log('res1', res1);
    setWorkshop(res1.data.items);
  };

  useEffect(() => {
    getData();
    fetchData();
    getTechnicianList();
    getWorkshop();
  }, []);
  return (
    <div>
      <h4>
        {" "}
        <SettingOutlined />
        <span
          style={{
            color: "#6a6a6a",
            fontWeight: "300",
          }}
        >
          {" "}
          Order Management
        </span>{" "}
        / Create New Order{" "}
      </h4>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input Company Name!" }]}
            style={{
              width: "45%",
            }}
            label="Company Name"
            name={"company_name"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Job Site Name"
            name={"job_site_id"}
            rules={[{ required: true, message: "Please input Job Site Name!" }]}
          >
            {/* <Input /> */}
            <Select>
              {data.map((item) => {
                return <Option value={item.id}>{item.jobsite_name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please input Postal Code!" },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter valid postal code",
              },
            ]}
            style={{
              width: "45%",
            }}
            label="Postal Code"
            name={"postal_code"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Block Number!" }]}
            style={{
              width: "45%",
            }}
            label="Block Number"
            name={"block_number"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Street Number"
            name={"street_number"}
            rules={[{ required: true, message: "Please input Street Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Level Number"
            name={"level_number"}
            rules={[{ required: true, message: "Please input Level Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Unit Number"
            name={"unit_number"}
            rules={[
              { required: true, message: "Please input Unit Number!" },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter valid unit number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Country"
            name={"country"}
            rules={[{ required: true, message: "Please input Country!" }]}
          >
            <CountrySelector />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Maintenance Service Type"
            name={"maintenance_service_type"}
            rules={[
              {
                required: true,
                message: "Please input Maintenance Service Type!",
              },
            ]}
          >
            <Select
              onChange={(e) => {
                setServiceType(e);
              }}
            >
              <Option value="Onsite">Onsite</Option>
              <Option value="Workshop">Workshop</Option>
            </Select>
          </Form.Item>
          {serviceType === "Onsite" ? (
            <Form.Item
              style={{
                width: "45%",
              }}
              label="Technician"
              name={"technician_id"}
              rules={[{ required: true, message: "Please select Technician!" }]}
            >
              <Select>
                {technician.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : serviceType === "Workshop" ? (
            <Form.Item
              style={{
                width: "45%",
              }}
              label="Workshop"
              name={"workshop_id"}
              rules={[{ required: true, message: "Please Select Workshop!" }]}
            >
              <Select>
                {workshop.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Machine"
            name={"machine_id"}
            rules={[{ required: true, message: "Please input Machine!" }]}
          >
            {/* <Input /> */}
            <Select>
              {machineData.map((item) => {
                return (
                  <Option value={item.id}>
                    {item.name} | {item.model}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  // display:"flex"
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      // color:"black"
                    }}
                  >
                    Fault Title
                  </div>
                  <Input
                    value={machineFaultInput}
                    onChange={(e) => {
                      setMachineFaultInput(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      // color:"black"
                    }}
                  >
                     Fault Detail
                  </div>
                  <Input.TextArea
                    value={faultDetails}
                    onChange={(e) => {
                      setFaultDetails(e.target.value);
                    }}
                  />
                </div>
              </div>
              <Button
                type="primary"
                onClick={() => {
                  if (machineFaultInput === "" || machineFaultInput === null) {
                    message.error("Please add machine fault");
                    return;
                  }
                  if (faultDetails === "" || faultDetails === null) {
                    message.error("Please add fault details");
                    return;
                  }

                  setMachineFault([
                    ...machineFault,
                    {
                      sNo: machineFault.length + 1,
                      fault: machineFaultInput,
                      faultDetails: faultDetails,
                    },
                  ]);
                  setMachineFaultInput("");
                  setFaultDetails("");
                }}
              >
                <PlusOutlined />
              </Button>
            </div>
            {machineFault.length > 0 ? (
              machineFault.map((item) => {
                return (
                  <Card
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div>
                          <div
                            style={{
                              fontWeight: "bold",

                              // color:"black"
                            }}
                          >
                            Fault{" "}
                          </div>
                          {item.fault}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: "bold",
                              marginTop: "10px",
                              // color:"black"
                            }}
                          >
                            Fault Detail
                          </div>
                          {item.faultDetails}
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setMachineFault(
                            machineFault.filter(
                              (item2) => item2.sNo !== item.sNo
                            )
                          );
                          // setMachineFault(
                          //   machineFault.filter((item2,i) => i !== item.sNo)
                          // );
                        }}
                        style={{
                          color: "red",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <></>
            )}
          </Form.Item>
          {/* <Form.Item
            style={{
              width: "45%",
            }}
            label="Fault Details"
            name={"fault_details"}
            rules={[{ required: true, message: "Please input Fault Details!" }]}
          >
            <Input.TextArea />
          </Form.Item> */}
          <div style={{ width: "100%" }}>
            <h2>Attachment</h2>
            <div className="border bg-white rounded p-3 mt-4">
              <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  fill="none"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill={"#3CA6C1"}
                    d="M18.57 15.51l7.86 7a2 2 0 001.33.51H56v34.9A2.93 2.93 0 0153.26 61H5.74A2.93 2.93 0 013 57.92V18a2.85 2.85 0 012.68-3h11.56a2 2 0 011.33.51z"
                  ></path>
                  <path fill="#D7E6EF" d="M49 57H7V3h42v54z"></path>
                  <path
                    fill={"#3CA6C1"}
                    d="M45 23h16v-6a2 2 0 00-2-2h-6l-8 8z"
                  ></path>
                  <path fill="#F7FCFF" d="M14 9h42v14H14V9z"></path>
                  <path
                    fill={"#3CA6C1"}
                    d="M25.69 15.51l7.42 7a1.8 1.8 0 001.25.51H61v34.9A2.87 2.87 0 0158.41 61H13.59A2.87 2.87 0 0111 57.92V18a2.79 2.79 0 012.53-3h10.9c.47 0 .922.184 1.26.51z"
                  ></path>
                  <path
                    fill="#F7FCFF"
                    d="M36 55c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13z"
                  ></path>
                  <path
                    fill="#D7E6EF"
                    d="M52 13H32a1 1 0 000 2h20a1 1 0 000-2zm0 4H37a1 1 0 000 2h15a1 1 0 000-2z"
                  ></path>
                  <path
                    fill="#44394A"
                    d="M36.5 49.28l6.72-6.72a5.501 5.501 0 00-7.78-7.78l-8.84 8.84a1.002 1.002 0 000 1.42A1 1 0 0028 45l8.84-8.84a3.5 3.5 0 114.95 4.95l-6.71 6.71a1.998 1.998 0 01-3.38-.571A2 2 0 0132.26 45L39 38.32a.5.5 0 01.71 0 .48.48 0 010 .71l-6 6a1 1 0 101.42 1.41l6-6a2.503 2.503 0 00-3.54-3.54l-6.72 6.72a4 4 0 000 5.66 4.003 4.003 0 005.66 0h-.03z"
                  ></path>
                </svg>
                <h5 className="mb-0 mt-2">Drag & Drop Files Here</h5>
                <h5 className="mb-0">Or</h5>
                <h5 className="mb-0" style={{ color: "#3CA6C1" }}>
                  Choosen File
                </h5>
                <input
                  style={styles.uploadFile}
                  className="uploadFile"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>
              <div className="mt-4">
                {selectedFiles.length > 0 && (
                  <ul className="p-0" style={{ width: "40%" }}>
                    {selectedFiles.map((file, i) => (
                      <li key={file.name} className="my-3" style={styles.files}>
                        {" "}
                        <div className="d-flex align-items-center">
                          <UploadFileIcon />{" "}
                          <span className="ml-2">{file.name} </span>{" "}
                          {/* <span className="ml-5">
                            {file.url ? (
                              <EyeOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => window.open(file.url)}
                              />
                            ) : null}
                          </span> */}
                        </div>
                        <div>
                        {
                          file.url && <span className="ml-3 " style={{
                            cursor: "pointer"
                          }} onClick={() => {
                            window.open(file.url, '_blank')
                          }}>
                            <EyeOutlined />
                          </span>
                        }
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => delUplFile(i)}
                        >
                          {" "}
                          <CloseCircleOutlined />{" "}
                        </span>
                      </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AddOrder;

let styles = {
  files: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "13px",
    border: "1px solid lightblue",
    padding: "10px",
    borderRadius: "9px",
    background: "#0093ff0a",
  },
  uploadFile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },

  // Add the new styles here:

  ".uploadFile::-webkit-file-upload-button": {
    visibility: "hidden",
  },

  ".uploadFile::before": {
    content: "'Drag & Drop'",
    display: "inline-block",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },

  ".uploadFile:hover::before": {
    backgroundColor: "#ccc",
  },
};

// company_name:Acme co pte ltd
// job_site_id:1
// postal_code:411001
// block_number:23
// street_number:34
// level_number:22222
// unit_number:54
// country:75
// maintenance_service_type:Onsite
// machine_id:16
// make:Johnson Electric
// model:CF1245g6
// sensor_id:5
// sensor_location:Rotor
// machine_fault:Pump Vibrations
// fault_details:loreum ipsum is dummy text. loreum ipsum is dummy text.loreum ipsum is dummy text.↵loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.↵loreum ipsum is dummy text.loreum ipsum is dummy text. loreum ipsum is dummy text.loreum↵ ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is ↵dummy text.l oreum ipsum is dummy text.
// status:1
// files[]:https://jd-stag-jd.s3.ap-southeast-1.amazonaws.com/images.jpeg
// files[]:https://jd-stag-jd.s3.ap-southeast-1.amazonaws.com/cm551k0uw00010jnz9rx0domz.jpeg
