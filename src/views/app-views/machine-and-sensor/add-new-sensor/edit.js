import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Switch, message } from 'antd';
import { MachineSensorIcon, UploadFileIcon } from 'assets/svg/icon';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from 'App';

const { Option } = Select;

const AddNewSensor = () => {
  const history = useHistory();
  const { id } = useParams();
  const { editId } = useParams();
  const [form] = Form.useForm();
  const [machineStatus, setMachineStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const onFinish = async (values) => {
    const payload = {
      machine_id: id, // Assuming id is the machine ID from the URL
      sensor_type: values.sensor_type,
      sensor_id: values.sensor_id,
      sensor_name: values.sensor_name,
      sensor_location: values.sensor_location,
      sensor_details: values.sensor_details,
      sensor_status: machineStatus,
      is_deleted: false,
    };

    try {
      const response = await axiosInstance.put(`/api/admin/machine-senser/${editId}`, payload);
      message.success('Sensor updated successfully!');
      history.goBack(); // Navigate to the sensors list page
    } catch (error) {
      message.error('Failed to add sensor. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleFileSelect = (event) => {
    const fileList = event.target.files;
    const newSelectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newSelectedFiles.push(fileList[i]);
    }
    setSelectedFiles([...selectedFiles, newSelectedFiles[0]]);
  };

  const delUplFile = (i) => {
    const AfterDeleteFile = selectedFiles.filter((elem, index) => index !== i);
    setSelectedFiles(AfterDeleteFile);
  };

  const handleBackClick = () => {
    history.goBack();
  };
  const getSensor = async () => {
    try {
        const response = await axiosInstance.get(`api/admin/machine-senser/${editId}`);
        // message.success('Sensor added successfully!');
        console.log(response.data.item.results);
        const data = response.data.item.results;
        // history.goBack(); 
        form.setFieldsValue({
            machineName:data.machine_id,
            sensor_type:data.sensor_type,
            sensor_id:data.sensor_id,
            sensor_name:data.sensor_name,
            sensor_location:data.sensor_location,
            sensor_details:data.sensor_details,
        })
        setMachineStatus(data.sensor_status)
      } catch (error) {
        message.error('Failed to edit sensor. Please try again.');
        console.error('Error:', error);
      }
  }
  useEffect(() => {
    getSensor()
  }, [])
  
  return (
    <div>
      <h4>
        <MachineSensorIcon />
        <span style={{ color: '#6a6a6a', fontWeight: '300' }}>
          Machine / sensors
        </span> / Edit Sensor
      </h4>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        form={form}
        name="control-hooks"
      >
        <div className="border rounded p-3 bg-white">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Machine Name" name="machineName">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sensor Type"
                name="sensor_type"
                rules={[{ required: true, message: 'Please Select Sensor Type' }]}
              >
                <Select>
                  <Option value="Temperature">Sensor Type 1</Option>
                  <Option value="Pressure">Sensor Type 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sensor ID"
                name="sensor_id"
                rules={[{ required: true, message: 'Please enter Sensor ID' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sensor Name"
                name="sensor_name"
                rules={[{ required: true, message: 'Please enter Sensor Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sensor Location"
                name="sensor_location"
                rules={[{ required: true, message: 'Please enter Sensor Location' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sensor Details"
                name="sensor_details"
                rules={[{ required: true, message: 'Please enter Sensor Details' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Sensor Status" name="SensorStatus" valuePropName="checked">
                <Switch
                  checked={machineStatus}
                  onChange={(value) => setMachineStatus(value)}
                  style={{ backgroundColor: machineStatus ? '#3CA6C1' : '#d0d4d7' }}
                />{' '}
                {machineStatus ? 'Active' : 'Inactive'}
              </Form.Item>
            </Col>
            <Col span={12}>
              <h5 className="m-0 mt-2">Upload Pictures</h5>
              <div className="p-3">
                <div className="d-flex flex-column justify-content-center align-items-center position-relative uploaddoc">
                  <UploadFileIcon />
                  <h5 className="mb-0 mt-2">Drag & Drop Files Here</h5>
                  <h5 className="mb-0">Or</h5>
                  <h5 className="mb-0" style={{ color: '#3CA6C1' }}>
                    Click here to upload
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
                    <ul className="p-0" style={{ width: '100%' }}>
                      {selectedFiles.map((file, i) => (
                        <li key={file.name} className="my-3" style={styles.files}>
                          <div className="d-flex align-items-center">
                            <UploadFileIcon /> <span className="ml-2">{file.name}</span>
                          </div>
                          <span style={{ cursor: 'pointer' }} onClick={() => delUplFile(i)}>
                            <CloseCircleOutlined />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Form.Item>
          <div style={{ gap: '10px' }} className="mt-5 d-flex justify-content-end">
            <Button className="px-4 font-weight-semibold" htmlType="button" onClick={handleBackClick}>
              Back
            </Button>
            <Button className="px-4 font-weight-semibold text-white bg-primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewSensor;
