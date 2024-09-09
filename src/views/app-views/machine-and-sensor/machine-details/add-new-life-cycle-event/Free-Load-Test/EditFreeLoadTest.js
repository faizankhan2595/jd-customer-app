import { Button, DatePicker, Input, Modal, Radio, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditFreeLoadTest = ({ SREditModal, setSREditModal }) => {
    console.log("editsssss")
    const [SrModalFormData, setSrModalFormData] = useState({
        v_w_suffix: 'mΩ',
        u1_u2_suffix: 'mΩ',
        u_v_suffix: 'mΩ',
        v1_v2_suffix: 'mΩ',
        u_w_suffix: 'mΩ',
        w1_w2_suffix: 'mΩ',
    });
    const [SrRadioData, setSrRadioData] = useState({});
    const handleRadioChnge = (name, e) => {
        console.log(name, e.target.value);
        setSrModalFormData({
            ...SrModalFormData,
            [name]: e.target.value,
        });
    };

    const onRadioChange = (e) => {
        console.log("radio checked", e.target.value);
        setSrRadioData({
            ...SrRadioData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            {console.log("Free")}
            <Modal
                title={
                    <div className="d-flex align-items-center">
                        <EditColorIcon /> <span className="d-block ml-2"> Edit Details </span>
                    </div>
                }
                visible={SREditModal}
                onCancel={() => setSREditModal(false)}
                footer={false}
                width={1000}
            >
                <div className="">

                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex " style={{ gap: '8px' }}>
                            <Radio.Group
                                name="v1_v2"
                                onChange={onRadioChange}
                                value={SrRadioData?.v1_v2}
                            >
                                <Radio className="green-radio" value={1}>
                                    {" "}
                                </Radio>
                                <Radio className="red-radio" value={2}>
                                    {" "}
                                </Radio>
                                <Radio className="grey-radio" value={3}>
                                    {" "}
                                </Radio>
                            </Radio.Group>
                            <labek>Resistance</labek>
                            <div>
                                <Tooltip title="Your tooltip message">
                                    <QuestionCircleOutlined style={{ marginLeft: '4px', color: '#1890ff' }} />
                                </Tooltip>
                            </div>
                        </div>
                        <Input
                            style={{ width: "30%" }}
                            placeholder="Type here..."
                            value={SrModalFormData?.v1_v2}
                            onChange={(e) => handleRadioChnge("v1_v2", e)}
                            addonAfter={(<>
                                <Select value={SrModalFormData?.v1_v2_suffix} className="select-after" onChange={(e) => handleRadioChnge("v1_v2_suffix", {
                                    target: { value: e },
                                })} >
                                    <Option value="mΩ">KΩ</Option>
                                    <Option value="Ω">Ω</Option>
                                </Select>
                            </>)}
                        />
                        <div>-</div>
                        <Input
                            style={{ width: "30%" }}
                            placeholder="Type here..."
                            value={SrModalFormData?.v1_v2}
                            onChange={(e) => handleRadioChnge("v1_v2", e)}
                            addonAfter={(<>
                                <Select value={SrModalFormData?.v1_v2_suffix} className="select-after" onChange={(e) => handleRadioChnge("v1_v2_suffix", {
                                    target: { value: e },
                                })} >
                                    <Option value="mΩ">KΩ</Option>
                                    <Option value="Ω">Ω</Option>
                                </Select>
                            </>)}
                        />
                    </div>
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex " style={{ gap: '8px' }}>
                            <Radio.Group
                                name="u_w"
                                onChange={onRadioChange}
                                value={SrRadioData?.u_w}
                            >
                                <Radio className="green-radio" value={1}>
                                    {" "}
                                </Radio>
                                <Radio className="red-radio" value={2}>
                                    {" "}
                                </Radio>
                                <Radio className="grey-radio" value={3}>
                                    {" "}
                                </Radio>
                            </Radio.Group>
                            <labek>Result</labek>
                            <div>
                                <Tooltip title="Your tooltip message">
                                    <QuestionCircleOutlined style={{ marginLeft: '4px', color: '#1890ff' }} />
                                </Tooltip>
                            </div>
                        </div>

                        <Input
                            style={{ width: "70%" }}
                            placeholder="Type here..."
                            value={SrModalFormData?.u_w}
                            onChange={(e) => handleRadioChnge("u_w", e)}
                            addonAfter={(<>
                                <Select value={SrModalFormData?.u_w_suffix} className="select-after" onChange={(e) => handleRadioChnge("u_w_suffix", {
                                    target: { value: e },
                                })} >
                                    <Option value="mΩ">KΩ</Option>
                                    <Option value="Ω">Ω</Option>
                                </Select>
                            </>)}
                        />
                    </div>

                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex " style={{ gap: '8px' }}>
                            <Radio.Group
                                name="v_w"
                                onChange={onRadioChange}
                                value={SrRadioData?.v_w}
                            >
                                <Radio className="green-radio" value={1}>
                                    {" "}
                                </Radio>
                                <Radio className="red-radio" value={2}>
                                    {" "}
                                </Radio>
                                <Radio className="grey-radio" value={3}>
                                    {" "}
                                </Radio>
                            </Radio.Group>
                            <labek>Remarks</labek>
                            <div>
                                <Tooltip title="Your tooltip message">
                                    <QuestionCircleOutlined style={{ marginLeft: '4px', color: '#1890ff' }} />
                                </Tooltip>
                            </div>
                        </div>

                        <Input
                            style={{ width: "70%" }}
                            placeholder="Type here..."
                            value={SrModalFormData?.v_w}
                            onChange={(e) => handleRadioChnge("v_w", e)}
                            addonAfter={(<>
                                <Select value={SrModalFormData?.v_w_suffix} className="select-after" onChange={(e) => handleRadioChnge("v_w_suffix", {
                                    target: { value: e },
                                })} >
                                    <Option value="mΩ">KΩ</Option>
                                    <Option value="Ω">Ω</Option>
                                </Select>
                            </>)}
                        />
                    </div>

                </div>
                <div className="d-flex justify-content-end mt-5">
                    <Button key="cancel" onClick={() => setSREditModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        key="save"
                        className="bg-primary text-white ml-2"
                        onClick={() => {
                            console.log(SrModalFormData, SrModalFormData);
                            setSREditModal(false);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default EditFreeLoadTest;