import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Radio, Row, Col, Button, Switch, message, DatePicker } from 'antd';
import { MachineIcon, UploadFileIcon } from 'assets/svg/icon';
import { CloseCircleOutlined, EyeOutlined, ToolOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'App';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { UploadImage } from 'utils/Upload';
import { get } from 'lodash';

const { Option } = Select;

const AddNewMachine = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [machineStatus, setMachineStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [jobSiteData, setJobSiteData] = useState([]);
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

  const handleBackClick = () => {
    history.goBack();
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
      file = await Promise.all(uploadPromise);
      console.log(file);
    }
    file = [...file, ...temp2.map((item) => {
      return item.url
    })];


    const postData = {
        ...form.getFieldsValue(),
        pictures:file,
        machine_status:machineStatus
    };

    if(!id){
      try {
        const response = await axiosInstance.post('/api/web/machines', postData);
        // console.log('Machine added successfully:', response.data);
        message.success("Machine Added Successfuly");
        if (response.status === 200 || response.status === 201) {
          history.push(`/app/machine-and-sensors`);
        }
      } catch (error) {
        console.error('Error adding machine:', error);
        // Handle error, e.g., show notification
      }
    }else{
      const response = await axiosInstance.put("/api/web/machines/"+id,postData);
      message.success("Machine Updated Successfully");
      if (response.status === 200 || response.status === 201) {
        history.push(`/app/machine-and-sensors`);
      }
    }
  };

    const getData = async () => {
      // ?search=${search}&status=${status!='all'?status:''}&area=${workshop!='all'?workshop:''}
      // let url = `?search=${search}`
      // //for 0 it is not handling
      // if((status !== '' && status != 'all')) {
      //   url += `&status=${status}`
      // }
      let url = `?customer_id=${localStorage.getItem("parent_id")||localStorage.getItem("user_id")}&status=1`
      try {
        const resp = await axiosInstance.get(`/api/web/jobsites${url}`);
        setJobSiteData(resp.data.items);
        if (id) {
          fetchData();
        }
      } catch (err) {
        console.log(err)
        message.error('Something went wrong')
      }
    }
  

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
    const response = await axiosInstance.get(`api/web/machines/${id}`);
    const data = response.data.item
    setMachineStatus(data.machine_status == 1 ? true : false)
    form.setFieldsValue({
      ...data,
      date: data.date ? moment(data.date) : null
    })
    setSelectedFiles(data?.pictures.map((item,index) => {
      return {
          url: item?.file_url,
          name: `Picture ${index+1}`
      }
  }))
    // setMachineStatus(data.machine_status == 1 ? true : false)

  }

  // const getCustomerData = async () => {
  //   const response = await axiosInstance.get('api/web/all-customers/list');
  //   const data = response.data;
  //   setCustomerData(data);
   
  //   // console.log(data);
  // }
  useEffect(() => {
    // getCustomerData();
    getData();
  }, [])

  return (
    <div>
      <h4>
        <ToolOutlined />
        <span style={{ color: '#6a6a6a', fontWeight: '300' }}> Machine</span> / Add New Machine
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
            <MachineIcon /> Add New Machine
          </h4>
         
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Machine Name"
                name="name"
                rules={[{ required: true, message: 'Please enter Machine Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select Job Site"
                name="job_site_id"
                rules={[{ required: true, message: 'Please Select Job Site' }]}
              >
                <Select>
                {
                  jobSiteData.map((item)=>{
                    return <Option value={item.id}>{item.jobsite_name}</Option>
                  })
                }
                </Select>
                {/* <Select>
                  <Option value="site1">Job Site 1</Option>
                  <Option value="site2">Job Site 2</Option>
                </Select> */}
                {/* <Input /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Machine Modal"
                name="model"
                rules={[{ required: true, message: 'Please enter Machine Modal' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Serial No"
                name="serial_no"
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
                name="kw_hp"
                rules={[{ required: true, message: 'Please enter kw/Hp' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Manufacture"
                name="manufacturer"
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
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="NDE Bearing"
                name="nde_bearing"
                rules={[{ required: true, message: 'Please enter NDE Bearing' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="DE Bearing"
                name="de_bearing"
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
                name="tag_no"
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
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: 'Please enter Year' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
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
                name="ampere"
                rules={[{ required: true, message: 'Please enter Ampere' }]}
              >
                <Input type="number" />
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
                <Input  />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="EX Type"
                name="ex_type"
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
                name="ex_cert"
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
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Machine Details"
                name="machine_detail"
                rules={[{ required: true, message: 'Please enter Machine Details' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
                    accept='image/*'
                    multiple
                    onChange={handleFileSelect}
                  />
                </div>
                <div className="mt-4">
                            {selectedFiles.length > 0 && (
                                <ul className="p-0" style={{ width: "100%" }}>
                                    {selectedFiles.map((file, i) => (
                                        <li key={file.name} className="my-3" style={styles.files}>
                                            {" "}
                                            <div className="d-flex align-items-center">
                                                <UploadFileIcon />{" "}
                                                <span className="ml-2">{file.name} </span>{" "}
                                                <span className="ml-5">
                                                    {file.url ? (  <EyeOutlined style={{ cursor: "pointer" }} onClick={() => window.open(file.url)} />) : null}
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
            </Col>
            <Col span={12}>
              <Form.Item
                label="Machine Status"

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