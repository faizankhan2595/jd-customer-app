import React from 'react';
import { useState } from 'react';
import { Button, Modal, Radio, Select, Input, Tooltip } from 'antd';
import { EditColorIcon } from 'assets/svg/icon';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditFlamePathDimension = ({ modalName, setEditStatus, editStatus, editData }) => {
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
            <Modal
                title={
                    <div className="d-flex align-items-center">
                        <EditColorIcon /> <span className="d-block ml-2"> Edit Details </span>
                    </div>
                }
                visible={editStatus}
                onCancel={() => setEditStatus(false)}
                footer={false}
                width={1000}
            >
                {editData.map((item, i) => (
                    <div key={i}>
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ gap: '6px' }}>
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
                                <label>{item}</label>
                                <div>
                                    <Tooltip title="Your tooltip message">
                                        <QuestionCircleOutlined style={{ marginLeft: '4px', color: '#1890ff' }} />
                                    </Tooltip>
                                </div>
                            </div>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={SrModalFormData?.v1_v2}
                                onChange={(e) => handleRadioChnge("v1_v2", e)}
                                addonAfter={(
                                    <Select
                                        value={SrModalFormData?.v1_v2_suffix}
                                        className="select-after"
                                        onChange={(e) => handleRadioChnge("v1_v2_suffix", { target: { value: e } })}
                                    >
                                        <Option value="mm">mm</Option>
                                    </Select>
                                )}
                            />
                        </div>

                    </div>
                ))}
                <div className="d-flex justify-content-end mt-5">
                    <Button key="cancel" onClick={() => setEditStatus(false)}>
                        Cancel
                    </Button>
                    <Button
                        key="save"
                        className="bg-primary text-white ml-2"
                        onClick={() => {
                            // console.log(SrModalFormData, SrModalFormData);
                            setEditStatus(false);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Modal>


        </>
    )
}

export default EditFlamePathDimension