import {
  CloseCircleOutlined,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  InboxOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { axiosInstance } from "App";
import { UploadFileIcon } from "assets/svg/icon";
import { UploadImage } from "utils/Upload";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

function AddInquiry() {
  const [form] = Form.useForm();

  const history = useHistory();
  const { Option } = Select;
  const [countryCode, setCountryCode] = useState("+91");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [data, setData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const { id } = useParams();
  const handleFileSelect = (event) => {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
  };
  const delUplFile = (i) => {
    let AfterDeleteFile = selectedFiles.filter((_, index) => index !== i);
    setSelectedFiles(AfterDeleteFile);
  };
  const getJobsites = async () => {
    try {
      const resp = await axiosInstance.get(
        `/api/web/jobsites?customer_id=${
          localStorage.getItem("parent_id") || localStorage.getItem("user_id")
        }`
      );
      setData(resp.data.items);
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };

  const getMachineData = async () => {
    try {
      const response = await axiosInstance.get("api/web/machines");
      if (response.status === 200) {
        setMachineData(response.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    let file = [];
    const temp = selectedFiles.filter((item) => {
      return item.url === undefined;
    });
    const temp2 = selectedFiles.filter((item) => {
      return item.url !== undefined;
    });
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
    if (id) {
      try {
        const response = await axiosInstance.put(`api/web/inquiry/${id}`, {
          ...values,
          phone_no: values.phone_no,
          phone_code: countryCode,
          files: file,
        });
        if (response.status === 200) {
          message.success("Inquiry updated successfully");
          form.resetFields();
          setSelectedFiles([]);
          history.push("/app/inquiry-management");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axiosInstance.post(`api/web/inquiries`, {
          ...values,
          phone_no: values.phone_no,
          phone_code: countryCode,
          files: file,
        });
        if (response.status === 200) {
          message.success("Inquiry created successfully");
          form.resetFields();
          history.push("/app/inquiry-management");
          setSelectedFiles([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getJobsites();
    getMachineData();
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
        / Create New Inquiry{" "}
      </h4>

      <Card>
        <Form
          form={form}
          layout="vertical"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            style={{
              width: "45%",
            }}
            name="phone_no"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter Full Name" }]}
          >
            <Input
              addonBefore={
                <Select
                  // defaultValue={"In"}
                  style={{
                    width: 80,
                  }}
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e);
                  }}
                >
                  <Option value="+91">+91</Option>
                  <Option value="+65">+65</Option>
                </Select>
              }
              style={{ width: "100%" }}
              placeholder="Phone number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Id"
            style={{
              width: "45%",
            }}
            rules={[{ required: true, message: "Please enter Email Id" }]}
          >
            <Input style={{ width: "100%" }} placeholder="Email Id" />
          </Form.Item>
          <Form.Item
            name="jobsite_id"
            label="Jobsite"
            style={{
              width: "45%",
            }}
            rules={[{ required: true, message: "Please Select Jobsite" }]}
          >
            <Select>
              {data.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.jobsite_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="company_name"
            label="Company Name"
            style={{
              width: "45%",
            }}
            rules={[{ required: true, message: "Please Enter Company Name" }]}
          >
            <Input style={{ width: "100%" }} placeholder="Company Name" />
          </Form.Item>
          <div
            style={{
              width: "100%",
            }}
          >
            <h3>Address</h3>
          </div>

          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Postal Code"}
            name="postal_code"
            rules={[
              { required: true, message: "Please input postal Code!" },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter valid postal code",
              },
            ]}
          >
            <Input placeholder="Postal Code" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Block Number"}
            name="block_number"
            rules={[
              { required: true, message: "Please enter the block number!" },
            ]}
          >
            <InputNumber placeholder="Block Number" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Street Number"}
            name="street_number"
            rules={[
              { required: true, message: "Please enter the street number!" },
            ]}
          >
            <Input placeholder="Street Number" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Unit Number"}
            name="unit_number"
            rules={[
              { required: true, message: "Please enter the unit number!" },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter valid unit number",
              }
            ]}
          >
            <Input placeholder="Unit Number" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Level Number"}
            name="level_number"
            rules={[
              { required: true, message: "Please enter the level number!" },
            ]}
          >
            <Input placeholder="Level Number" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label={"Country"}
            name="country"
            rules={[{ required: true, message: "Please select a country!" }]}
          >
            <Select placeholder="Country" style={{ width: "100%" }}>
              <Option value="155">Singapore</Option>
              <Option value="75">India</Option>
              {/* Add more countries as needed */}
            </Select>
          </Form.Item>

          <Divider />
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Inquiry Type"
            name={"inquiry_type"}
            rules={[
              { required: true, message: "Please select an inquiry type!" },
            ]}
          >
            <Select>
              <Select.Option value={"General Inquiry"}>
                General Inquiry
              </Select.Option>
              <Select.Option value={"Machine Inquiry"}>
                Machine Inquiry
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              width: "45%",
            }}
            label="Machine"
            name={"machine_id"}
            rules={[{ required: true, message: "Please select a machine!" }]}
          >
            <Select>
              {machineData.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              width: "100%",
            }}
            label="Inquiry Details"
            name="inquiry_details"
            rules={[
              { required: true, message: "Please enter inquiry details!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <div
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              label="Upload Picture"
              // name="description"
            >
              {/* <h5 className="m-0 mt-2">Upload Pictures</h5> */}
              <div className="p-3">
                <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
                  <UploadFileIcon />
                  <h5 className="mb-0 mt-2">Drag & Drop Files Here</h5>
                  <h5 className="mb-0">Or</h5>
                  <h5 className="mb-0" style={{ color: "#3CA6C1" }}>
                    Click here to upload
                  </h5>
                  <input
                    style={styles.uploadFile}
                    className="uploadFile"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                  />
                </div>
                <div className="mt-4">
                  {selectedFiles.length > 0 && (
                    <ul className="p-0" style={{ width: "100%" }}>
                      {selectedFiles.map((file, i) => (
                        <li
                          key={file.name}
                          className="my-3"
                          style={styles.files}
                        >
                          {" "}
                          <div className="d-flex align-items-center">
                            <UploadFileIcon />{" "}
                            <span className="ml-2">{file.name} </span>{" "}
                            <span className="ml-5">
                              {file.url ? (
                                <EyeOutlined
                                  style={{ cursor: "pointer" }}
                                  onClick={() => window.open(file.url)}
                                />
                              ) : null}
                            </span>
                          </div>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => delUplFile(i)}
                          >
                            {" "}
                            <CloseCircleOutlined />{" "}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Form.Item>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => form.resetFields()}
                >
                  Clear
                </Button>

                <Button type="primary" htmlType="submit">
                  Submit
                  {/* Save */}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AddInquiry;

const styles = {
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
