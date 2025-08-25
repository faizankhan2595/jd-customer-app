import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal, Radio, Select, Input, Tooltip } from 'antd';
import { EditColorIcon } from 'assets/svg/icon';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditAuxiliariesChecks = ({ modalName, setEditStatus, editStatus, editData, editKey, suffixData, setSuffixData, setAuxiliariesChecksData }) => {
    const [tempEditData, setTempEditData] = useState(editData);
    
    

    const getSuffixIndex = (data) => {
        // console.log("check-1", data);
        // console.log(modalName);
        let key = '';
        if(modalName == 'Heater' || modalName == 'Brake') {
            if(+data.key == 2) {
                key = 'Result - Insulation'
            }
            else if(+data.key == 4) {
                key = 'Result - Resistance'
            } else {
                key = data.name
            }
        } else if(modalName == 'Thermistor' || modalName == 'Thermostat' || modalName == 'PT-100') {
            if(+data.key == 2) {
                key = 'Result - Resistance'
            }
        } else  {
            key = data.name
        }
        // console.log(key)
        let sf_name_found =  Object.keys(suffixData).find((e) => e == key);
        if(sf_name_found) {
            return sf_name_found
        } else {
            return false
        }
    };

    const showCurrentSuffix = (data, suffix) => {
        // console.log("check-1", data);
        let show_sfx = null;

        if(modalName == 'Heater' || modalName == 'Brake') {
            if(+data.key == 1 && ['E','MΩ','GΩ'].includes(suffix)) {
                show_sfx = true
            }
            else if(+data.key == 2 && ['MΩ','GΩ'].includes(suffix)) {
                show_sfx = true
            }
            else if(+data.key == 3 && ['KΩ','Ω'].includes(suffix)) {
                show_sfx = true
            }
            else if(+data.key == 4 && ['KΩ','Ω'].includes(suffix)) {
                show_sfx = true
            }
            else if(data.name.includes('Volt') && ['V'].includes(suffix)) {
                show_sfx = true
            }
            else if(data.name.includes('Current') && ['A'].includes(suffix)) {
                show_sfx = true
            }
            else {
                show_sfx = false
            }
        } else if(modalName == 'Thermistor' || modalName == 'Thermostat' || modalName == 'PT-100') {
            if(+data.key == 1 && ['KΩ','Ω'].includes(suffix)) {
                show_sfx = true
            }
            else if(+data.key == 2 && ['MΩ','GΩ'].includes(suffix)) {
                show_sfx = true
            } else {
                show_sfx = false
            }
        } else  {
            show_sfx = data.name
        }
        // console.log(show_sfx)
        return show_sfx
    };

    useEffect(() => {
        let crr_Data = tempEditData.map((internalData) => {
            let val = []
            if(internalData.value) {
                if(suffixData[getSuffixIndex(internalData)]) {
                    if(internalData.name == 'Resistance') {
                        let dt_arr = internalData.value.includes(' ~ ') ? internalData.value?.split(' ~ ') : null;
                        
                        if(dt_arr) {
                            // val = [dt_arr[0].split('-')[0], dt_arr[1].split('-')[0]];
                            
                            if(dt_arr[0]) {
                                let arr = dt_arr[0].split('-')
                                val = [arr[0], arr[1]]
                            } else {
                                val = ['', suffixData[getSuffixIndex(internalData)]]
                            }
    
                            if(dt_arr[1]) {
                                let arr = dt_arr[1].split('-')
                                val = [...val, arr[0], arr[1]]
                            } else {
                                val = [...val, '', suffixData[getSuffixIndex(internalData)]]
                            }
                        } else {
                            val = [
                                '', suffixData[getSuffixIndex(internalData)], 
                                '', suffixData[getSuffixIndex(internalData)]
                            ]
                        }
                    } else {
                        // val = internalData.value?.split('-')[0]
                        val = [ 
                            internalData.value?.split('-')[0], 
                            internalData.value?.split('-')[1]
                        ]
                    } 
                }
                else {
                    val = [internalData.value]
                }
            } else {
                if(suffixData[getSuffixIndex(internalData)]) {
                    if(internalData.name == 'Resistance') {
                        val = [ 
                            '', suffixData[getSuffixIndex(internalData)] ,
                            '', suffixData[getSuffixIndex(internalData)] 
                        ]
                        console.log(val)
                    } else {
                        val = [ '', suffixData[getSuffixIndex(internalData)] ];
                        console.log(val)
                    } 
                }
                else {
                    val = [internalData.value]
                    console.log(val)
                }
            }

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
                                                if((el.name == item.name) && (el.key === item.key)) {
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
                            {!(item.name == 'Resistance') &&
                                <Input
                                    style={{ width: "50%" }}
                                    placeholder="Type here..."
                                    value={item?.value[0]}
                                    onChange={(e) => {
                                        setTempEditData((data) => {
                                            let dt = data.map((el) => {
                                                if(el.name == item.name && el.key == item.key) {
                                                    let val = suffixData[getSuffixIndex(item)] ? [e.target.value, el.value[1]] : [e.target.value]
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
                                    addonAfter={getSuffixIndex(item) && (
                                        <Select
                                            // value={suffixData[getSuffixIndex(item)]}
                                            value={item?.value[1]}
                                            className="select-after"
                                            defaultValue={suffixData[getSuffixIndex(item)]}
                                            onChange={(e) => {
                                                // setSuffixData((data) => {
                                                //     let dt = data
                                                //     dt[getSuffixIndex(item)] = e
                                                //     return {...dt}
                                                // })
                                                setTempEditData((data) => {
                                                    let dt = data.map((el) => {
                                                        if(el.name == item.name && el.key == item.key) {
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
                                            disabled={['V','A'].includes(suffixData[item.name])}
                                        >
                                            {showCurrentSuffix(item, "MΩ") && <Option value="MΩ">MΩ</Option>}
                                            {showCurrentSuffix(item, "GΩ") && <Option value="GΩ">GΩ</Option>}
                                            {showCurrentSuffix(item, "KΩ") && <Option value="KΩ">KΩ</Option>}
                                            {showCurrentSuffix(item, "Ω") && <Option value="Ω">Ω</Option>}

                                            {showCurrentSuffix(item, "E") && <Option value="E">E</Option>}
                                            {showCurrentSuffix(item, "V") && <Option value="V">V</Option>}
                                            {showCurrentSuffix(item, "A") && <Option value="A">A</Option>}
                                        </Select>
                                    )}
                                />
                            }
                            {(item.name == 'Resistance') && <div className='w-50 d-flex justify-content-between'>
                                    <Input
                                        style={{ width: "47%" }}
                                        placeholder="Type here..."
                                        // value={item?.value[0]}
                                        value={item?.value[0]}
                                        onChange={(e) => {
                                            setTempEditData((data) => {
                                                let dt = data.map((el) => {
                                                    if((el.name == item.name) && (el.key === item.key)) {
                                                        // let val = [e.target.value, el.value[1]]
                                                        // let val = [[e.target.value,el.value[0][1]], el.value[1]]
                                                        let val = [e.target.value , el.value[1], el.value[2], el.value[3]]
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
                                        addonAfter={getSuffixIndex(item) && (
                                            <Select
                                                // value={suffixData[getSuffixIndex(item)]}
                                                // value={item?.value[0][1]}
                                                value={item?.value[1]}
                                                className="select-after"
                                                defaultValue={suffixData[getSuffixIndex(item)]}
                                                onChange={(e) => {
                                                    // setSuffixData((data) => {
                                                    //     let dt = data
                                                    //     dt[getSuffixIndex(item)] = e
                                                    //     return {...dt}
                                                    // })
                                                    setTempEditData((data) => {
                                                        let dt = data.map((el) => {
                                                            if(el.name == item.name) {
                                                                // let val = [el.value[0], e]
                                                                // let val = [[el.value[0][0], e], el.value[1]]
                                                                let val = [el.value[0], e.target.value, el.value[2], el.value[3]]
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
                                                <Option value="KΩ">KΩ</Option>
                                                <Option value="Ω">Ω</Option>
                                            </Select>
                                        )}
                                    />
                                    <div className='d-flex align-items-center'><h4>-</h4></div>
                                    <Input
                                        style={{ width: "47%" }}
                                        placeholder="Type here..."
                                        // value={item?.value[1]}
                                        value={item?.value[2]}
                                        onChange={(e) => {
                                            setTempEditData((data) => {
                                                let dt = data.map((el) => {
                                                    if((el.name == item.name) && (el.key === item.key)) {
                                                        // let val = [el.value[0], e.target.value]
                                                        // let val = [el.value[0], [e.target.value,el.value[1][1]]]
                                                        let val = [el.value[0], el.value[1], e.target.value, el.value[3]]
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
                                        addonAfter={getSuffixIndex(item) && (
                                            <Select
                                                // value={suffixData[getSuffixIndex(item)]}
                                                value={item?.value[3]}
                                                className="select-after"
                                                defaultValue={suffixData[getSuffixIndex(item)]}
                                                onChange={(e) => {
                                                    // setSuffixData((data) => {
                                                    //     let dt = data
                                                    //     dt[getSuffixIndex(item)] = e
                                                    //     return {...dt}
                                                    // })
                                                    setTempEditData((data) => {
                                                        let dt = data.map((el) => {
                                                            if(el.name == item.name) {
                                                                // let val = [el.value[0], e]
                                                                // let val = [el.value[0], [el.value[1][0], e]]
                                                                let val = [el.value[0], el.value[1], el.value[2], e.target.value]
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
                                                <Option value="KΩ">KΩ</Option>
                                                <Option value="Ω">Ω</Option>
                                            </Select>
                                        )}
                                    />
                                </div>
                            }
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
                                let val = '';
                                let val_suffix = '';
                                if(e.name == 'Resistance') {
                                    // let sf_1 = e.value[0] ? '-'+suffixData['Resistance'] : '';
                                    // let sf_2 = e.value[1] ? '-'+suffixData['Resistance'] : '';
                                    // val = (e.value[0] ? e.value[0] + sf_1 : '') + ' ~ ' + (e.value[1] ? (e.value[1] + sf_2) : '');

                                    let sf_1 = e.value[0] ? '-'+e.value[1] : '';
                                    let sf_2 = e.value[2] ? '-'+e.value[3] : '';
                                    val = (e.value[0] ? e.value[0] + sf_1 : '') + ' ~ ' + (e.value[2] ? (e.value[2] + sf_2) : '');
                                } else {
                                    val_suffix = ((e.value[0] && suffixData[getSuffixIndex(e)]) ? '-'+e.value[1] : '')
                                    val = e.value[0] + val_suffix
                                    // console
                                }
                                return {
                                    ...e,
                                    // value: e.value + val_suffix
                                    value: val
                                }
                            })
                            console.log(fpData)
                            setAuxiliariesChecksData((data) => {
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

export default EditAuxiliariesChecks