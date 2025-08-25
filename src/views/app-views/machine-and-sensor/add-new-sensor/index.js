import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Switch, message, Modal } from 'antd';
import { MachineSensorIcon, UploadFileIcon } from 'assets/svg/icon';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from 'App';
import { UploadImage } from 'utils/Upload';
import { set } from 'lodash';

const { Option } = Select;

const AddNewSensor = () => {
  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [sensorId, setSensorId] = useState('');
  const query = new URLSearchParams(history.location.search);
  const machineName = query.get('machine_name');
  const [form] = Form.useForm();
  const [machineStatus, setMachineStatus] = useState(false);
  const [generateSensorId, setGenerateSensorId] = useState('');
  const [generatedSensorId, setGeneratedSensorId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
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
    let file = [];
    const temp = selectedFiles.filter((item) => {
      return item.url === undefined;
    })
    const temp2 = selectedFiles.filter((item) => {
      return item.url !== undefined;
    })
    if (temp.length !== 0) {
      const uploadPromise = temp.map(async (item) => {
        if (item.url === undefined) {
          const url = await UploadImage(item);
          return url;
        } else {
          return item.url;
        }
      })
      setLoading(true);
      file = await Promise.all(uploadPromise);
      // setLoading(false);
      console.log(file);
    }
    file = [...file, ...temp2.map((item) => {
      return item.url
    })];

    const payload = {
      sensor_type: values.sensor_type,
      sensor_id: generatedSensorId,
      sensor_id_label: form.getFieldValue('sensor_id_label'),
      sensor_name: values.sensor_name,
      sensor_location: values.sensor_location,
      sensor_details: values.sensor_details,
      sensor_status: machineStatus,
      pictures: file
    };

    try {
      const response = await axiosInstance.post(`/api/admin/machines/${id}/sensors`, payload);
      message.success('Sensor added successfully!');
      history.goBack(); // Navigate to the sensors list page
    } catch (error) {
      message.error('Failed to add sensor. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({ machineName: machineName })
  }, [])

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

  const generateHexString = (id) => {
    try {
      // Parse the input to an integer
      const sensorIdInt = parseInt(id, 10);

      if (isNaN(sensorIdInt) || sensorIdInt < 0) {
        return '';
      }

      // Convert to hex format as specified:
      // LSB of sensor ID (3 bytes) + sensor type (1 byte)
      // The sensor type is always 24 (0x24)

      // Create a Buffer-like array for the sensor ID (3 bytes, LSB first)
      const bytes = new Uint8Array(4);

      // Set the sensor ID bytes (3 bytes, LSB first)
      bytes[0] = sensorIdInt & 0xFF;         // First byte (LSB)
      bytes[1] = (sensorIdInt >> 8) & 0xFF;  // Second byte
      bytes[2] = (sensorIdInt >> 16) & 0xFF; // Third byte (MSB)

      // Set the sensor type (always 0x24)
      bytes[3] = 0x24;

      // Convert to hex string
      const hexString = Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

      return hexString.toUpperCase();
    } catch (err) {
      return '';
    }
  };


  return (
    <div>
      <h4>
        <MachineSensorIcon />
        <span style={{ color: '#6a6a6a', fontWeight: '300' }}>
          Machine / sensors
        </span> / Add New Sensor
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
                rules={[{ required: true, message: 'Please Enter Sensor Type' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    Sensor ID&nbsp;
                    <Button
                      onClick={() => {
                        setVisible(true);
                        setSensorId(form.getFieldValue('sensor_id_label'));
                        setGenerateSensorId(generatedSensorId);
                      }}
                      type="link" style={{ padding: '0' }}>
                      Generate ID
                    </Button>
                  </span>
                }
                name="sensor_id_label"
                rules={[{ required: true, message: 'Please enter Sensor ID' }]}
              >
                <Input disabled />
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
                {/* {machineStatus ? 'Active' : 'Inactive'} */}
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
                    accept="image/*"
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
            <Button className="px-4 font-weight-semibold text-white bg-primary"
              loading={loading}
              htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Modal title="Generate Sensor ID" visible={visible} onOk={() => {
        if(sensorId === ''){
          message.error('Please enter a Sensor ID');
          return;
        }
        if(isNaN(sensorId)){
          message.error('Please enter a valid Sensor ID');
          return;
        }

        setVisible(false);
        form.setFieldsValue({ sensor_id_label: sensorId });
        setGeneratedSensorId(generateSensorId);
      }} onCancel={() => {
        setVisible(false);
      }}>
        <Form
          layout='vertical'>
          <Form.Item label="Sensor ID"

          >
            <Input
              value={sensorId}
              onChange={(e) => {
                if(isNaN(e.target.value)){
                  message.error('Please enter a valid Sensor ID');
                  return;
                }
                setSensorId(e.target.value);
                const temp = generateHexString(e.target.value);
                
                setGenerateSensorId(temp);
              }
              }
            />
          </Form.Item>
          <Form.Item
            label="Generate Sensor ID"

          >
            <Input disabled
              value={generateSensorId}

            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default AddNewSensor;
