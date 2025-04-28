import { UserSwitchOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message, Switch } from 'antd'
import { axiosInstance } from 'App';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';


function AddNew() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState(true);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const onFinish = (values) => {
        setLoading(true);
        if (id) {
            try {
                axiosInstance.put(`api/web/operational-area/${id}`, {
                    area_name: values.name,
                    status: status
                }).then(response => {
                    if (response.status === 200) {
                        message.success("Area Updated Successfully");
                        history.push('/app/operator-master/operational-areas')
                    }
                })
            } catch (error) {
                message.error("Something went wrong");
                setLoading(false);
            }
        } else {
            try {
                axiosInstance.post('api/web/operational-area', {
                    area_name: values.name,
                    status: status
                }).then(response => {
                    if (response.status === 200) {
                        message.success("Area Added Successfully");
                        history.push('/app/operator-master/operational-areas')
                    }
                })
            } catch (error) {
                message.error("Something went wrong");
                setLoading(false);
            }
        }

    }

    const getData = async (id) => {
        try {
            const response = await axiosInstance.get(`api/web/operational-area/${id}`);
            if (response.status === 200) {
                const data = response.data.item;
                form.setFieldsValue({
                    name: data.area_name,

                })
                setStatus(data.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [])

    return (
        <div className="customTableBackground">
            <h4> <UserSwitchOutlined /><span style={{
                color: '#6a6a6a',
                fontWeight: '300'
            }}> Operational Master / Area</span> / {
                id ? "Edit" : "Add New"
            } </h4>
            <Card>
                <Form form={form} layout="vertical" name="userForm" onFinish={onFinish} >

                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input />
                    </Form.Item>
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
                                loading={loading}
                                type="primary" htmlType="submit">
                                {/* Submit */}
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </Card>
        </div>
    )
}

export default AddNew