import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Radio, Row, Col, Button, Switch, message } from 'antd';
import { MachineIcon } from 'assets/svg/icon';
import { CloseCircleOutlined, ToolOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'App';
import { useParams } from 'react-router-dom';
const { Option } = Select;

const AddNewMachine = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [machineStatus, setMachineStatus] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const handleBackClick = () => {
    history.goBack();
  };

  const onFinish = async (values) => {
    console.log('Form values:', values);

    const postData = {
      user_id: 1,
      name: values.machineName,
      model: values.machineModal,
      serial_no: values.serialNo,
      kw_hp: values.kwHp,
      manufacturer: values.manufacture,
      rpm: values.rpm,
      frequency: values.frequency,
      nde_bearing: values.ndeBearing,
      de_bearing: values.deBearing,
      tag_no: values.tagNo,
      vft: values.vft == 'yes' ? '1' : '0',
      year: values.year,
      equipment: values.equipment,
      ampere: values.amper,
      color: values.color,
      ins: values.ins,
      phase: values.phase,
      ex_type: values.exType,
      ip: values.ip,
      operator: values.operator,
      ex_cert: values.exCert,
      date: values.date,
      machine_detail: values.machineDetails,
      machine_status: machineStatus,
      is_deleted: false,
    };

    try {
      const response = await axiosInstance.put(`api/admin/machine/${id}`, postData);
    //   console.log('Machine added successfully:', response.data);
      if (response.status) {
          message.success(response.data.message);
          history.push(`/app/machine-and-sensors`);
      }
    } catch (error) {
      console.error('Error adding machine:', error);
      // Handle error, e.g., show notification
    }
  };

  const styles = {
    files: {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '13px',
      border: '1px solid lightblue',
      padding: '10px',
      borderRadius: '9px',
      background: '#0093ff0a',
    },
    uploadFile: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0,
    },
    '.uploadFile::-webkit-file-upload-button': {
      visibility: 'hidden',
    },
    '.uploadFile::before': {
      content: "'Drag & Drop'",
      display: 'inline-block',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    '.uploadFile:hover::before': {
      backgroundColor: '#ccc',
    },
  };
  const fetchData = async () => {
    const response = await axiosInstance.get(`api/admin/machine/${id}/show`);
    const data = response.data.item.results
    setMachineStatus(data.machine_status==1?true:false)
    form.setFieldsValue({
            "machineName":data.name,
            "machineModal":data.model,
            "serialNo":data.serial_no,
            "kwHp":data.kw_hp,
            "manufacture":data.manufacturer,
            "rpm":data.rpm,
            "frequency":data.frequency,
            "ndeBearing":data.nde_bearing,
            "deBearing":data.de_bearing,
            "tagNo":data.tag_no,
            "vft":data.vft==1?"yes":"no",
            "year":data.year,
            "equipment":data.equipment,
            "amper":data.ampere,
            "color":data.color,
            "ins":data.ins,
            "phase":data.phase,
            "exType":data.ex_type,
            "ip":data.ip,
            "operator":data.operator,
            "exCert":data.ex_cert,
            "date":data.date,
            "machineDetails":data.machine_detail,
            // "machineStatus":data.machine_status==1?true:false
    })
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      <h4>
        <ToolOutlined />
        <span style={{ color: '#6a6a6a', fontWeight: '300' }}> Machine</span> / Edit Machine
      </h4>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        form={form}
        name="control-hooks"
      >
        <div className="border rounded p-3 bg-white">
          <h4 className="d-flex align-items-center" style={{ color: '#3CA6C1', gap: '4px' }}>
            <MachineIcon /> Edit Machine
          </h4>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Customer"
                name="customer"
                // rules={[{ required: true, message: 'Please Select Customer' }]}
              >
                <Select>
                  <Option value="customer1">Customer 1</Option>
                  <Option value="customer2">Customer 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Machine Name"
                name="machineName"
                rules={[{ required: true, message: 'Please enter Machine Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select Job Site"
                name="jobSite"
                // rules={[{ required: true, message: 'Please Select Job Site' }]}
              >
                <Select>
                  <Option value="site1">Job Site 1</Option>
                  <Option value="site2">Job Site 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Machine Modal"
                name="machineModal"
                rules={[{ required: true, message: 'Please enter Machine Modal' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Serial No"
                name="serialNo"
                rules={[{ required: true, message: 'Please enter Serial No' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="kw/Hp"
                name="kwHp"
                rules={[{ required: true, message: 'Please enter kw/Hp' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Manufacture"
                name="manufacture"
                rules={[{ required: true, message: 'Please enter Manufacture' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="RPM"
                name="rpm"
                rules={[{ required: true, message: 'Please enter RPM' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Frequency (Hz)"
                name="frequency"
                rules={[{ required: true, message: 'Please enter Frequency (Hz)' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="NDE Bearing"
                name="ndeBearing"
                rules={[{ required: true, message: 'Please enter NDE Bearing' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="DE Bearing"
                name="deBearing"
                rules={[{ required: true, message: 'Please enter DE Bearing' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tag No"
                name="tagNo"
                rules={[{ required: true, message: 'Please enter Tag No' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="VFT"
                name="vft"
                rules={[{ required: true, message: 'Please Select VFT' }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
           {/* <Col span={12}>
              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: 'Please enter Year' }]}
              >
                <Input type="number" />
              </Form.Item>
             </Col>  */}
            <Col span={12}>
              <Form.Item
                label="Equipment"
                name="equipment"
                rules={[{ required: true, message: 'Please enter Equipment' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ampere"
                name="amper"
                rules={[{ required: true, message: 'Please enter Ampere' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true, message: 'Please enter Color' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="INS"
                name="ins"
                rules={[{ required: true, message: 'Please enter INS' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phase"
                name="phase"
                rules={[{ required: true, message: 'Please enter Phase' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="EX Type"
                name="exType"
                rules={[{ required: true, message: 'Please enter EX Type' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="IP"
                name="ip"
                rules={[{ required: true, message: 'Please enter IP' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Operator"
                name="operator"
                rules={[{ required: true, message: 'Please enter Operator' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="EX Cert"
                name="exCert"
                rules={[{ required: true, message: 'Please enter EX Cert' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please Select Date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Machine Details"
                name="machineDetails"
                rules={[{ required: true, message: 'Please enter Machine Details' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Upload File"
                name="uploadFile"
              >
                <input type="file" style={styles.uploadFile} onChange={handleFileSelect} />
                <ul style={styles.files}>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <CloseCircleOutlined onClick={() => delUplFile(index)} />
                    </li>
                  ))}
                </ul>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Machine Status"
                // name="machineStatus"
              >
                <Switch checked={machineStatus} onChange={(checked) => setMachineStatus(checked)} />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-3">
            <Button type="button" onClick={handleBackClick}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddNewMachine;
