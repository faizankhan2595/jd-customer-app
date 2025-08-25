import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Modal, Radio, Select, Input, Tooltip } from 'antd';
import { EditColorIcon } from 'assets/svg/icon';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditFlamePathDimension = ({ modalName, setEditStatus, editStatus, editData, editKey, suffixData, setSuffixData, setFlamePathData }) => {
    const [tempEditData, setTempEditData] = useState(editData);

    useEffect(() => {
        let crr_Data = tempEditData.map((internalData) => {
            // let val = suffixData[internalData.name] ? internalData.value?.split('-')[0] : internalData.value

            let val = suffixData[internalData.name] 
            ? 
            [ 
                internalData.value && internalData.value?.split('-')[0], 
                (internalData.value && internalData.value?.split('-')[0]) ? internalData.value?.split('-')[1] : suffixData[internalData.name]
            ]
            : 
            internalData.value;
            return {
                ...internalData,
                value: val
            }
        })
        setTempEditData(crr_Data)
    }, [])
    

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
                                        // console.log(tempEditData[item.key-1]);
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
                                    // console.log(tempEditData[item.key-1]);
                                }}
                                addonAfter={suffixData[item.name] && (
                                    <Select
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
                                    >
                                        <Option value="mm">mm</Option>
                                        <Option value="cm">cm<sup>3</sup></Option>
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
                            setFlamePathData((data) => {
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
        </>
    )
}

export default EditFlamePathDimension