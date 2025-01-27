import { CloseCircleOutlined, EyeOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, InputNumber, message, Select, Switch, Tabs } from 'antd'
import { Option } from 'antd/lib/mentions';
import { axiosInstance } from 'App';
import { UploadFileIcon } from 'assets/svg/icon';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { UploadImage } from 'utils/Upload';


function AddNew() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState(true);
    const [data, setData] = useState([]);
    const [countryCode, setCountryCode] = useState("+91");
    const history = useHistory();
    const { id } = useParams();
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
        if (id) {
            try {
                axiosInstance.put(`api/web/jobsites/${id}`, {
                    ...form.getFieldsValue(),
                    status: status,
                    pictures: file,
                    phone_code: countryCode
                }).then(response => {
                    if (response.status === 200) {
                        message.success("Updated Successfully");
                        history.push(`/app/operator-master/jobsites`)
                    }
                })
            } catch (error) {
                message.error("Something went wrong");
            }
        } else {
            try {
                axiosInstance.post('api/web/jobsites', {
                    ...form.getFieldsValue(),
                    status: status,
                    pictures: file,
                    phone_code: countryCode
                }).then(response => {
                    if (response.status === 200) {
                        message.success("Added Successfully");
                        // history.push('/app/operator-master/operational-areas')
                        history.push(`/app/operator-master/jobsites`)
                    }
                })
            } catch (error) {
                message.error("Something went wrong");
            }
        }

    }

    const getData = async (id) => {
        try {
            const response = await axiosInstance.get(`api/web/jobsites/${id}`);
            if (response.status === 200) {
                const data = response.data.item;
                form.setFieldsValue({
                    ...data,
                })
                setStatus(data.status);
                setSelectedFiles(data?.pictures.map((item,index) => {
                    return {
                        url: item?.file_url,
                        name: `Picture ${index+1}`
                    }
                }))
                setCountryCode(data.phone_code);

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
   
        getOperationArea();
    }, [])

    const getOperationArea = async () => {
        try {
            const response = await axiosInstance.get(`api/web/operational-area?customer_id=${localStorage.getItem("parent_id")||localStorage.getItem("user_id")}&status=1`);
            if (response.status === 200) {
                setData(response.data.items);
                if (id) {
                    getData(id);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="customTableBackground">
            <h4> <UserSwitchOutlined /><span style={{
                color: '#6a6a6a',
                fontWeight: '300'
            }}> Operational Mastrer / Area</span> / Add New </h4>
            <Card>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Job Site Details" key="1">
                        <Form form={form} layout="vertical" onFinish={onFinish} >

                            <div className="row">
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    name="jobsite_name"
                                    label="Jobsite Name"
                                    rules={[{ required: true, message: 'Please input Jobsite Name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>

                            <div className="row">
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    name="phone_no"
                                    label="Phone Number"
                                    rules={[
                                        { required: true, message: "Please enter Phone Number" },
                                    ]}
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
                                                    setCountryCode(e)
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
                            </div>
                            <div style={{
                                // fontSize: "px",
                                fontWeight: "bold",
                                color: "#000",
                                marginBottom: "10px"
                            }}>
                                JobSite Address
                            </div>

                            <div style={{
                                width: "45%"
                            }}>
                                <Form.Item name={"operational_area_id"} label="Operational Area" rules={[{ required: true, message: 'Please select Operational Area!' }]}>
                                    <Select placeholder="Select Operational Area" style={{ width: '100%' }}>
                                        {data.map((item) => {
                                            return <Select.Option key={item.id} value={item.id}>{item.area_name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>

                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px"
                            }}>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Postal Code'}
                                    name="postal_code"
                                    rules={[{ required: true, message: 'Please input postal Code!' }]}
                                >
                                    <Input placeholder="Postal Code" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Block Number'}
                                    name="block_number"
                                    rules={[{ required: true, message: 'Please enter the block number!' }]}
                                >
                                    <InputNumber placeholder="Block Number" style={{ width: '100%' }} />
                                </Form.Item>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px"
                            }}>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Street Number'}
                                    name="street_number"
                                    rules={[{ required: true, message: 'Please enter the street number!' }]}
                                >
                                    <Input placeholder="Street Number" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Unit Number'}
                                    name="unit_number"
                                    rules={[{ required: true, message: 'Please enter the unit number!' }]}
                                >
                                    <Input placeholder='Unit Number' style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px"
                            }}>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Level Number'}
                                    name="level_number"
                                    rules={[{ required: true, message: 'Please enter the level number!' }]}
                                >
                                    <Input placeholder="Level Number" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item style={{
                                    width: "45%"
                                }}
                                    label={'Country'}
                                    name="country"
                                    rules={[{ required: true, message: 'Please select a country!' }]}
                                >
                                    <Select placeholder='Country' style={{ width: '100%' }}>
                                    <Option value="155">Singapore</Option>
                                    <Option value="75">India</Option>
                                        {/* Add more countries as needed */}
                                    </Select>
                                </Form.Item>
                            </div >

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px"
                            }}>
                                <div style={{
                                    width: "45%"
                                }}>
                                    <Form.Item
                                        label="Description"
                                        name="jobsite_description"
                                        rules={[{ required: true, message: 'Please input Description!' }]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </div>
                                <div style={{
                                    width: "45%"
                                }}>
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
                                                                        {file.url ? (<EyeOutlined style={{ cursor: "pointer" }} onClick={() => window.open(file.url)} />) : null}
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
                                </div>
                            </div>

                            <Form.Item
                                label="Status"
                            >
                                <Switch checked={status}
                                    onChange={() => setStatus(!status)}
                                />
                            </Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <Form.Item >
                                    <Button
                                        style={{ marginRight: 8 }}
                                        onClick={() => form.resetFields()}
                                    >
                                        Clear
                                    </Button>

                                    <Button

                                        type="primary" htmlType="submit">
                                        {/* Submit */}
                                        Save
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Tabs.TabPane>
                </Tabs>

            </Card>
        </div>
    )
}

export default AddNew


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
