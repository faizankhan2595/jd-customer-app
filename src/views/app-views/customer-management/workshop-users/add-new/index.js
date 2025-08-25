import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  DatePicker,
  Upload,
  message,
  Radio,
  InputNumber,
} from "antd";
import {
  BasicDetail,
  LocationIcon,
  UploadDocument,
  UploadFileIcon,
} from "assets/svg/icon";

import React from "react";
import { useState } from "react";
import { Tabs } from "antd";
import {
  CloseCircleOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
// import axios from "../../../../axios";
import moment from "moment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";
// import uploadImage from "middleware/uploadImage";
import { API_BASE_URL } from "constants/ApiConstant";
import { axiosInstance } from "App";
import CountrySelector from "utils/CountrySelector";
export default function AddNewWorkshopUser() {
  const { TabPane } = Tabs;
  const history = useHistory();
  const [statu, setStatu] = useState("");
  const [mainStatus, setMainStatus] = useState("");
  const [mainId, setMainId] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isChangeStudModalOpen, setIsChangeStudModalOpen] = useState(false);
  const [deactiveModalOpen, setIsDeactiveModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const id = queryParams.get("id");
  const [selectedFiles, setSelectedFiles] = useState([]);
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
  const [succesmodaltext, setSuccesmodaltext] = useState({
    title: "Staff Status Change Successfully!",
    text: "Staff status changed to terminated.",
  });

  function handleTabClick(key) {
    setActiveTab(key);
  }
  const successOk = () => {
    setSuccessModal(false);
  };
  const successCancel = () => {
    setSuccessModal(false);
  };

  const changeStudHandleOk = () => {
    setIsChangeStudModalOpen(false);
  };
  const DeactiveHandleOk = () => {
    setIsDeactiveModalOpen(false);
  };

  function handleBackClick() {
    // if (activeTab > 1 && activeTab <= 7) {
    //   let actnum = Number(activeTab) - 1;
    //   setActiveTab(actnum.toString());
    // }
    history.goBack();
  }

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // const image = await uploadImage(fileList);
    try {
      const body = {
        name: values.workshop_user_name,
        phone_no: values.phone_number,
        email: values.email,
        nric_fin_number: values.nric,
        password: "test@123",
        confirm_password: "test@123",
        workshop_name: values.workshop_name,
        workshop_logo: "https://www.google.com",
        postal_code: values.postalCode,
        block_number:values.blockNumber,
        steet_number: values.streetNumber,
        unit_number:values.unitNumber,
        country: 1,
      };
      const res1 = await axiosInstance.post(
        `/api/admin/workshop-user/store`,
        body
      );
      console.log("Success:", res1);
    } catch (error) {
      message.warn("Email is already in use");
    }
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  const handleChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
      setFileList(file);
    }
    if (info?.fileList[0]) {
      getBase64(info.fileList[0].originFileObj, (url) => {
        setImageUrl(url);
      });
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
  const uploadButton = (
    <div style={{ width: "200px" }}>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Profile Picture
      </div>
    </div>
  );
  const sendStatus = async (status) => {};

  return (
    <div className="customTableBackground">
      <h4>
        {" "}
        <TeamOutlined />
        <span
          style={{
            color: "#6a6a6a",
            fontWeight: "300",
          }}
        >
          {" "}
          Customer Management / Workshop Users
        </span>{" "}
        / Add New{" "}
      </h4>
      <Form
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        form={form}
        name="control-hooks"
      >
        <Tabs activeKey={activeTab} onTabClick={handleTabClick}>
          <TabPane
            tab={
              <div className="d-flex justify-content-center">
                <BasicDetail /> <span className="ml-2">Basic Details</span>
              </div>
            }
            key="1"
          >
            <div className="border rounded p-3 bg-white">
              {" "}
              <Form.Item name="profile_pic">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item name="user_id" label="User Id">
                    <Input disabled={true} />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email Id"
                    rules={[
                      { required: true, message: "Please enter Email Id" },
                    ]}
                  >
                    <Input style={{ width: "100%" }} placeholder="Email Id" />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    name="workshop_user_name"
                    label="Workshop User name"
                    rules={[
                      { required: true, message: "Please enter full name" },
                    ]}
                  >
                    <Input placeholder="Workshop User name" />
                  </Form.Item>
                  <Form.Item
                    name="phone_number"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Please enter Full Name" },
                    ]}
                  >
                    <Input
                      addonBefore={
                        <Select
                          defaultValue={"In"}
                          style={{
                            width: 80,
                          }}
                        >
                          <Option value="In">+91</Option>
                          <Option value="SG">+65</Option>
                        </Select>
                      }
                      style={{ width: "100%" }}
                      placeholder="Phone number"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item
                    name="nric"
                    label="NRIC/FIN"
                    rules={[
                      { required: false, message: "Please enter NRIC/FIN" },
                    ]}
                  >
                    <Input style={{ width: "100%" }} placeholder="NRIC/FIN" />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    rules={[{ required: true, message: "Please enter DOB" }]}
                  >
                    <DatePicker
                      placeholder="Date of birth"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      { required: true, message: "Please select gender." },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={"male"}>Male</Radio>
                      <Radio value={"female"}>Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="d-flex justify-content-center">
                <LocationIcon /> <span className="ml-2">Workshop Details</span>
              </div>
            }
            key="2"
          >
            <div className="border rounded p-3 bg-white">
              {" "}
              <Form.Item name="workshop_logo">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <div style={{ width: "200px" }}>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Workshop Logo
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item name="workshop_id" label="Workshop Id">
                    <Input disabled={true} />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    name="workshop_name"
                    label="Workshop name"
                    rules={[
                      { required: true, message: "Please enter full name" },
                    ]}
                  >
                    <Input placeholder="Workshop User name" />
                  </Form.Item>
                </div>
              </div>
              <h5>Workshop Address</h5>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Postal Code"}
                    name="postalCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the postal code!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Postal Code"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Block Number"}
                    name="blockNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the block number!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Block Number"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Street Number"}
                    name="streetNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the street number!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Street Number"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Unit Number"}
                    name="unitNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the unit number!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Unit Number"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ gap: "60px" }} className="d-flex ">
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Level Number"}
                    name="levelNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the level number!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Level Number"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "45%" }}>
                  <Form.Item
                    label={"Country"}
                    name="country"
                    rules={[
                      { required: true, message: "Please select a country!" },
                    ]}
                  >
                    <CountrySelector/>
                  </Form.Item>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane
            // disabled={true}
            tab={
              <div className="d-flex justify-content-center">
                <UploadDocument />{" "}
                <span className="ml-2">Upload Documents</span>
              </div>
            }
            key="3"
          >
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
          </TabPane>
        </Tabs>
        <Form.Item>
          <div
            style={{ gap: "10px" }}
            className="mt-5 d-flex justify-content-end"
          >
            <Button
              className="px-4 font-weight-semibold"
              htmlType="button"
              onClick={handleBackClick}
            >
              Back
            </Button>
            {/* <Button className="px-4 font-weight-semibold" htmlType="button">
                            Save Draft
                        </Button> */}
            <Button
              className="px-4 font-weight-semibold text-white bg-primary"
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Modal
        width={600}
        footer={null}
        visible={deactiveModalOpen}
        onOk={DeactiveHandleOk}
        onCancel={() => setIsDeactiveModalOpen(false)}
      >
        <div className="d-flex my-3 flex-column w-75">
          <h4 className="mb-4">Sure you want to deactivate staff?</h4>
          <h5>Staff ID #TC-1234 will be deleted from system</h5>
        </div>
        <div
          style={{ gap: "10px" }}
          className="mt-5 d-flex justify-content-end"
        >
          <Button
            className="px-4 font-weight-semibold"
            onClick={() => setIsDeactiveModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 font-weight-semibold text-white bg-info"
            onClick={() => {
              if (mainStatus === "Inactive") {
                sendStatus("Active");
              } else {
                sendStatus("Inactive");
              }
              setIsDeactiveModalOpen(false);
              setSuccesmodaltext({
                title: "Staff Deactivated",
                text: "Staff ID #TC-1234 deleted.",
              });
              setSuccessModal(true);
            }}
          >
            Yes, confirm
          </Button>
        </div>
      </Modal>
      <Modal
        width={600}
        footer={null}
        visible={isChangeStudModalOpen}
        onOk={changeStudHandleOk}
        onCancel={() => setIsChangeStudModalOpen(false)}
      >
        <div className="d-flex my-3 flex-column w-75">
          <h4 className="mb-4">Change Employee Status</h4>
          <h5>Working Status</h5>
          <Select
            placeholder="Select"
            optionFilterProp="children"
            value={statu}
            onChange={(val) => setStatu(val)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "Inactive",
                label: "Inactive",
              },
              // {
              //   value: "terminated",
              //   label: "Terminated",
              // },
              // {
              //   value: "Contract_end",
              //   label: "Contract end",
              // },
            ]}
          />
        </div>
        <div
          style={{ gap: "10px" }}
          className="mt-5 d-flex justify-content-end"
        >
          <Button
            className="px-4 font-weight-semibold"
            onClick={() => setIsChangeStudModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 font-weight-semibold text-white bg-info"
            onClick={() => {
              if (statu === "") {
                message.error(`Please select status first !`);
                return;
              }
              sendStatus(statu);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        width={500}
        footer={null}
        visible={successModal}
        onOk={successOk}
        onCancel={successCancel}
      >
        <div className="d-flex my-3 align-items-center flex-column justify-content-center">
          {/* <CustomIcon svg={Verified} /> */}
          <svg
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 0C37.4636 0 42.1609 1.13082 46.358 3.14781C44.64 4.50697 43.0471 5.81176 41.5629 7.06762C38.7358 6.04009 35.6859 5.48012 32.5054 5.48012C25.1823 5.48012 18.5496 8.44852 13.7545 13.2491C8.95396 18.0496 5.98556 24.6769 5.98556 32C5.98556 39.3231 8.95396 45.9504 13.7545 50.7509C18.555 55.5515 25.1823 58.5199 32.5054 58.5199C39.8286 58.5199 46.4613 55.5515 51.2564 50.7509C56.0569 45.9504 59.0253 39.3231 59.0253 32C59.0253 30.2603 58.8568 28.5532 58.536 26.9059C59.9115 25.1118 61.3196 23.3231 62.7603 21.5508C63.8911 24.8236 64.5054 28.3411 64.5054 32C64.5054 40.8345 60.9227 48.8372 55.1327 54.6273C49.3427 60.4173 41.34 64 32.5054 64C23.6709 64 15.6682 60.4173 9.87819 54.6273C4.08274 48.8372 0.5 40.8345 0.5 32C0.5 23.1655 4.08274 15.1628 9.87275 9.37275C15.6628 3.58274 23.6655 0 32.5 0ZM17.5928 26.7428L25.3998 26.6395L25.9815 26.7917C27.5581 27.6996 29.0423 28.738 30.4286 29.9123C31.429 30.7604 32.3858 31.6847 33.2938 32.685C36.0936 28.178 39.0783 24.0408 42.2316 20.2351C45.6838 16.0652 49.3481 12.2813 53.1973 8.82909L53.9584 8.53551H62.4776L60.7596 10.4438C55.4806 16.3099 50.691 22.3717 46.3634 28.6239C42.0359 34.8814 38.165 41.3401 34.7236 47.9891L33.6526 50.055L32.6685 47.9511C30.8527 44.053 28.6781 40.4757 26.0848 37.279C23.4915 34.0822 20.4742 31.2443 16.9567 28.8304L17.5928 26.7428Z"
              fill="#00AB6F"
            />
          </svg>
          <h3 className="font-weight-bold mt-4">{succesmodaltext.title}</h3>
          <span className="text-center font-size-sm w-75 font-weight-semibold">
            {succesmodaltext.text}
          </span>
        </div>
      </Modal>
    </div>
  );
}
