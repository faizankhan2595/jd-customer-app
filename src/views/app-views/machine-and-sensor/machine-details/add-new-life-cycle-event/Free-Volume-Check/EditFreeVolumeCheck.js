import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Modal, Radio, Select, Input, Tooltip } from 'antd';
import { EditColorIcon } from 'assets/svg/icon';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditFreeVolumeCheck = ({ modalName, setEditStatus, editStatus, editData, editKey, suffixData, setSuffixData, setFreeVolumeData }) => {
    const [tempEditData, setTempEditData] = useState(editData);
    
    useEffect(() => {
        let crr_Data = tempEditData.map((internalData) => {
            let val = suffixData[internalData.name] 
            ? 
            [ 
                internalData.value && internalData.value?.split('-')[0], 
                (internalData.value && internalData.value?.split('-')[0]) ? internalData.value?.split('-')[1] : suffixData[internalData.name]
            ]
            : 
            [internalData.value];

            return {
                ...internalData,
                value: val
            }
        })
        setTempEditData(crr_Data)
    }, [])
    
    // old data
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
                        <EditColorIcon /> <span className="d-block ml-2"> Edit Details - {modalName}</span>
                    </div>
                }
                visible={editStatus}
                onCancel={() => setEditStatus(false)}
                footer={false}
                width={1140}
            >
                {tempEditData.map((item, i) => (
                    <div key={i}>
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ gap: '6px', width: '50%' }}>
                                <Radio.Group
                                    name="v1_v2"
                                    onChange={(e) => {
                                        setTempEditData((data) => {
                                            let dt = data.map((el) => {
                                                if(el.name == item.name) {
                                                    return {
                                                        ...el,
                                                        check: e.target.value
                                                    }
                                                } else {
                                                    return {
                                                        ...el
                                                    }
                                                }
                                            })
                                            return dt
                                        });
                                    }}
                                    value={item?.check}
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
                                <label>{item.name}</label>
                                <div>
                                    <Tooltip title={item.name}>
                                        <QuestionCircleOutlined style={{ marginLeft: '4px', color: '#1890ff' }} />
                                    </Tooltip>
                                </div>
                            </div>
                            <Input
                                style={{ width: "50%" }}
                                placeholder="Type here..."
                                // value={item?.value}
                                value={item?.value[0]}
                                onChange={(e) => {
                                    setTempEditData((data) => {
                                        let dt = data.map((el) => {
                                            if(el.name == item.name) {
                                                let val = suffixData[item.name] ? [e.target.value, el.value[1]] : [e.target.value]
                                                return {
                                                    ...el,
                                                    // value: e.target.value
                                                    value: val
                                                }
                                            } else {
                                                return {
                                                    ...el
                                                }
                                            }
                                        })
                                        return dt
                                    });
                                }}
                                addonAfter={suffixData[item.name] && (
                                    <Select
                                        // value={suffixData[item.name]}
                                        value={item?.value[1]}
                                        defaultValue={'mm'}
                                        className="select-after"
                                        onChange={(e) => {
                                            // setSuffixData((data) => {
                                            //     let dt = data
                                            //     dt[item.name] = e
                                            //     return {...dt}
                                            // })
                                            setTempEditData((data) => {
                                                let dt = data.map((el) => {
                                                    if(el.name == item.name) {
                                                        let val = [el.value[0], e]
                                                        return {
                                                            ...el,
                                                            value: val
                                                        }
                                                    } else {
                                                        return {
                                                            ...el
                                                        }
                                                    }
                                                })
                                                return dt
                                            });
                                        }}
                                    >
                                        <Option value="mm">mm</Option>
                                        <Option value="cm">cm</Option>
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
                            setEditStatus(false);
                            let fpData = tempEditData.map((e) => {
                                let val_suffix = '';
                                let val = '';
                                if(suffixData[e.name]) {
                                    if(e.value[0]) val_suffix = '-'+e.value[1];
                                    val = e.value[0] + val_suffix;
                                } else {
                                    val = e.value[0]
                                }
                                // val_suffix = ((e.value && suffixData[e.name]) ? '-'+suffixData[e.name] : '')
                                return {
                                    ...e,
                                    value: val
                                }
                            })
                            setFreeVolumeData((data) => {
                                let flameData = data.map((e) => {
                                    if(e.key === editKey) {
                                        return {
                                            ...e,
                                            data: fpData
                                        }
                                    } else {
                                        return {...e}
                                    }
                                })
                                return flameData
                            });
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Modal>

            {false &&
                <div>
                    {/* {modalName === "Frame1" && */}
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
                                    <labek>Motor Frame inner dia 'a'</labek>
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

                                />
                            </div>
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
                                    <labek>Motor Core length 'b'</labek>
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
                                    addonAfter={(<>
                                        <Select value={SrModalFormData?.v1_v2_suffix} className="select-after" onChange={(e) => handleRadioChnge("v1_v2_suffix", {
                                            target: { value: e },
                                        })} >
                                            <Option value="mm">mm</Option>

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
                                    <labek>Motor Core length 'f'</labek>
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
                                    <labek>Remark</labek>
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

                    {/* Module Name Frame 2 */}
                    {modalName === "Frame2" &&
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
                                        <labek>Width</labek>
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
        
                                    />
                                </div>
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
                                        <labek>Breadth</labek>
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
                                        addonAfter={(<>
                                            <Select value={SrModalFormData?.v1_v2_suffix} className="select-after" onChange={(e) => handleRadioChnge("v1_v2_suffix", {
                                                target: { value: e },
                                            })} >
                                                <Option value="mm">mm</Option>
        
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
                                        <labek>Height</labek>
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
                                        <labek>Remark</labek>
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
                    }

                    {modalName === 'TerminalBox-V3' &&
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
                                        <labek>T-box internal width 'w'</labek>
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
        
                                    />
                                </div>
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
                                        <labek>T-box internal breadth 'b'</labek>
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
                                        addonAfter={(<>
                                            <Select value={SrModalFormData?.v1_v2_suffix} className="select-after" onChange={(e) => handleRadioChnge("v1_v2_suffix", {
                                                target: { value: e },
                                            })} >
                                                <Option value="mm">mm</Option>
        
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
                                        <labek>T-box internal height 'h'</labek>
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
                            </div>
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
                    }
        
                    {modalName === "TerminalBox-V4" &&
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
                                        <labek>T-box internal width 'w'</labek>
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
                                        <labek>T-box internal height 'h'</labek>
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
                            </div>
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
                    }

                    {modalName === "AuxiliaryBox-V5" &&
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
                                        <labek>T-box internal width 'w'</labek>
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
                                        <labek>Diameter</labek>
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
                                        <labek>T-box internal breadth 'b'
                                        </labek>
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
        
        
                            </div>
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
                    }

                    {modalName == "Auxilarybox-V6" &&
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
                                        <labek>T-box internal width 'w'</labek>
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
                                        <labek>T-box internal breadth 'b'
                                        </labek>
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
        
        
                            </div>
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
                    }
                </div>
            }
        </>
    )
}

export default EditFreeVolumeCheck