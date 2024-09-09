import { SettingOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table } from 'antd'
import { AssignTechIcon, CompanyIcon, DollarCircleIcon, JobSiteIcon, MachineFaultIcon, ScheduleIdIcon, ScheduleQuestionIcon, SurveyDetIcon, SurveyIcon } from 'assets/svg/icon'
import React from 'react'
import { Form, DatePicker, TimePicker, Input, InputNumber, Select, Space } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const { Option } = Select;
const ScheduleOrder = () => {
    const history = useHistory()
    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission here
    };
    const dataSource = [
        {
            id: 1,
            machines: 'Machine 1',
            faults: 'Fault 1',
            services: 'Service 1',
            price: 100,
            total: 150,
        },
        {
            id: 2,
            machines: 'Machine 2',
            faults: 'Fault 2',
            services: 'Service 2',
            price: 120,
            total: 180,
        },
        // Add more data as needed
    ];
    const renderLabel = (label, required) => (
        <div>
            <span>{label}</span>
            {required && <span style={{ color: 'red', marginLeft: 4 }}>*</span>}
        </div>
    );
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Machines',
            dataIndex: 'machines',
            key: 'machines',
        },
        {
            title: 'Faults',
            dataIndex: 'faults',
            key: 'faults',
        },
        {
            title: 'Services',
            dataIndex: 'services',
            key: 'services',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
    ];
    return (
        <div>
            <div className='d-flex justify-content-between'>

                <h4> <SettingOutlined /><span style={{
                    color: '#6a6a6a',
                    fontWeight: '300'
                }}> Order Management </span>/ Schedule Order </h4>
            </div>
            <div className='p-3 bg-white border rounded d-flex justify-content-between'>
                <div>
                    <h4 className='d-flex align-items-center'><span className='mr-1'> <ScheduleIdIcon /> </span> #1234-ORD</h4>
                    <p>Order ID</p>
                </div>
                <div>
                    <h4 className='d-flex align-items-center'><span className='mr-1'>  <ScheduleQuestionIcon /> </span>24/08/2022</h4>
                    <p>Inquiry Date</p>
                </div>
                <div>
                    <h4 className='d-flex align-items-center'> <span className='mr-1'> <CompanyIcon /> </span>Acme co pte ltd</h4>
                    <p>Customer</p>
                </div>
                <div>
                    <h4 className='d-flex align-items-center'> <span className='mr-1'> <JobSiteIcon /> </span>Pumping Station Est</h4>
                    <p>Job Site</p>
                </div>
                <div>
                    <h4 className='d-flex align-items-center'> <span className='mr-1'> <DollarCircleIcon /> </span>S$100</h4>
                    <p>Order Amount</p>
                </div>
            </div>
            <div className='p-3 bg-white border rounded mt-3'>
                <div className='d-flex justify-content-between'>

                    <h4 className='d-flex align-items-center'> <span className='mr-1'>  <MachineFaultIcon /> </span>Machines & Faults </h4>
                    <Button onClick={()=>{history.push(`view-quotation/${2}`,{ myCustomState: 'checl' })}} className='d-flex align-items-center'> <span className='mr-1'> <ScheduleIdIcon /> </span> View Quotation</Button>
                </div>
                <div className='greyHeaderTable mt-3'>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>

            <Form
                name="surveyForm"
                onFinish={onFinish}
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"  // Set layout to vertical
            >
                {/* <div className='p-3 bg-white border rounded mt-3'> */}
                <div className="d-flex mt-2 customForm">
                    <div
                        style={{ width: "68%" }}
                        className="p-3 bg-white border rounded mr-1"
                    >
                        <h4 className="d-flex m-0 mb-3">
                            <SurveyIcon />
                            <span className="ml-2">Scheduled Survey</span>
                        </h4>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Date of Survey', true)} name="dateOfSurvey" rules={[{ required: true, message: 'Please select a date!' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Survey Time Slot', true)} name="surveyTimeSlot" rules={[{ required: true, message: 'Please select a time slot!' }]}>
                                    <TimePicker.RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Postal Code', true)} name="postalCode" rules={[{ required: true, message: 'Please enter the postal code!' }]}>
                                    <Input style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Block Number', true)} name="blockNumber" rules={[{ required: true, message: 'Please enter the block number!' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Street Number', true)} name="streetNumber" rules={[{ required: true, message: 'Please enter the street number!' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Unit Number', true)} name="unitNumber" rules={[{ required: true, message: 'Please enter the unit number!' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Level Number', true)} name="levelNumber" rules={[{ required: true, message: 'Please enter the level number!' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={renderLabel('Country', true)} name="country" rules={[{ required: true, message: 'Please select a country!' }]}>
                                    <Select style={{ width: '100%' }}>
                                        <Option value="singapore">Singapore</Option>
                                        <Option value="india">india</Option>
                                        {/* Add more countries as needed */}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="d-flex mb-4">
                            <div className="w-75">
                                <p style={{ color: "black" }} className="m-0 mb-1">
                                    Customer Remarks
                                </p>
                                <h5>Lorem Ipsum is simply dummy text of
                                    the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's
                                    standard dummy text ever since the
                                    1500s, when an
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{ width: "32%", minHeight: '100%' }}

                    >
                        <div style={{ height: '100%' }} >
                            <div style={{ height: '100%' }} className="p-3 bg-white border rounded ml-1" >
                                <h4 className="d-flex m-0 mb-3">
                                    <AssignTechIcon />
                                    <span className="ml-2">Assign Technician</span>
                                </h4>
                                <Form.Item label={renderLabel('Technician', true)} name="technician" rules={[{ required: true, message: 'Please select a Technician!' }]}>
                                    <Select style={{ width: '100%' }}>
                                        <Option value="Technician1">Technician1</Option>
                                        <Option value="Technician2">Technician2</Option>
                                        {/* Add more countries as needed */}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={renderLabel('Add Instructions', true)}
                                    name="add_instruction"
                                    rules={[{ required: true, message: 'Please enter the instruction !' }]}
                                >
                                    <Input.TextArea rows={4} style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{gap:'8px'}} className="d-flex justify-content-end mt-3">
                <Form.Item>
                    <Space>
                        <Button htmlType="reset">
                            Cancel
                        </Button>
                        <Button className='bg-primary text-white' htmlType="submit">
                            Save
                        </Button>
                    </Space>
                </Form.Item>
</div>
            </Form>
            {/* </div> */}
        </div>
    )
}

export default ScheduleOrder
