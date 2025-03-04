import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Select, Input, Collapse, DatePicker, Form, message, Space } from "antd";
import {
  EditColorIcon,
} from "assets/svg/icon";

const EditVibrationTests = ({
    initialModalFormdata,
    initialModalForm,
    setInitialModalFormdata,
    vibrationData,
    setVibrationData,
    vibrationTestModal,
    setVibrationTestModal,
    onRadioChange,
    handleRadio2Chnge,
    setInitialeditModal,
    setInitialModalForm,
    setInitialcondVibrationUploaModal,
  }) => {

  // useEffect(() => {
  //   console.log(initialModalForm)
  //   console.log(initialModalFormdata)
  // }, [])
  
  return (
    <>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon />{" "}
            <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={vibrationTestModal}
        onCancel={() => setVibrationTestModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_1"
              onChange={onRadioChange}
              value={initialModalForm?.point_1}
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
            <label>Point 1</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_1}
              // onChange={(e) => handleRadio2Chnge("point_1", e)}
              // suffix={'mm/s'}
              
              value={initialModalFormdata?.point_1[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_1[1]]
                  
                  let dt = {
                      ...data,
                      point_1: val
                  }
                  return dt
                  // return {
                  //   ...prev,
                  //   point_1: [e.target.value, prev.point_1[1]]
                  // }
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_1[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_1[0], e]
                            
                            return {
                              ...data,
                              point_1: val
                            }
                          })
                      }}
                  >
                      <Select.Option value="mm/s">mm/s</Select.Option>
                      <Select.Option value="m/s">m/s<sup>2</sup></Select.Option>
                  </Select>
              }
            />
          </div>      
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_2"
              onChange={onRadioChange}
              value={initialModalForm?.point_2}
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
            <label>Point 2</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_2}
              // onChange={(e) => handleRadio2Chnge("point_2", e)}

              value={initialModalFormdata?.point_2[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_2[1]]
                  
                  let dt = {
                      ...data,
                      point_2: val
                  }
                  return dt
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_2[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_2[0], e]
                            
                            return {
                              ...data,
                              point_2: val
                            }
                          })
                      }}
                  >
                      <Select.Option  value="mm/s">mm/s</Select.Option >
                      <Select.Option  value="m/s">m/s<sup>2</sup></Select.Option >
                  </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_3"
              onChange={onRadioChange}
              value={initialModalForm?.point_3}
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
            <label>Point 3</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_3}
              // onChange={(e) => handleRadio2Chnge("point_3", e)}
              // value={initialModalFormdata?.point_2[0]}
              value={initialModalFormdata?.point_3[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_3[1]]
                  
                  let dt = {
                      ...data,
                      point_3: val
                  }
                  return dt
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_3[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_3[0], e]
                            
                            return {
                              ...data,
                              point_3: val
                            }
                          })
                      }}
                  >
                      <Select.Option  value="mm/s">mm/s</Select.Option >
                      <Select.Option  value="m/s">m/s<sup>2</sup></Select.Option >
                  </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_4"
              onChange={onRadioChange}
              value={initialModalForm?.point_4}
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
            <label>Point 4</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_4}
              // onChange={(e) => handleRadio2Chnge("point_4", e)}
              
              value={initialModalFormdata?.point_4[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_4[1]]
                  
                  let dt = {
                      ...data,
                      point_4: val
                  }
                  return dt
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_4[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_4[0], e]
                            
                            return {
                              ...data,
                              point_4: val
                            }
                          })
                      }}
                  >
                      <Select.Option  value="mm/s">mm/s</Select.Option >
                      <Select.Option  value="m/s">m/s<sup>2</sup></Select.Option >
                  </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_5"
              onChange={onRadioChange}
              value={initialModalForm?.point_5}
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
            <label>Point 5</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_5}
              // onChange={(e) => handleRadio2Chnge("point_5", e)}
              value={initialModalFormdata?.point_5[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_5[1]]
                  
                  let dt = {
                      ...data,
                      point_5: val
                  }
                  return dt
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_5[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_5[0], e]
                            
                            return {
                              ...data,
                              point_5: val
                            }
                          })
                      }}
                  >
                      <Select.Option  value="mm/s">mm/s</Select.Option >
                      <Select.Option  value="m/s">m/s<sup>2</sup></Select.Option >
                  </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="point_6"
              onChange={onRadioChange}
              value={initialModalForm?.point_6}
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
            <label>Point 6</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              // value={initialModalFormdata?.point_6}
              // onChange={(e) => handleRadio2Chnge("point_6", e)}
              
              value={initialModalFormdata?.point_6[0]}
              onChange={(e) => {
                setInitialModalFormdata((data) => {
                  let val = [e.target.value, data.point_6[1]]
                  let dt = {
                      ...data,
                      point_6: val
                  }
                  return dt
                })
              }}

              addonAfter={
                  <Select
                      value={initialModalFormdata?.point_6[1]}
                      defaultValue={'mm/s'}
                      className="select-after"
                      onChange={(e) => {
                          setInitialModalFormdata((data) => {
                            let val = [data.point_6[0], e]
                            return {
                              ...data,
                              point_6: val
                            }
                          })
                      }}
                  >
                      <Select.Option on value="mm/s">mm/s</Select.Option >
                      <Select.Option  value="m/s">m/s<sup>2</sup></Select.Option >
                  </Select>
              }
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="de_bearing"
              onChange={onRadioChange}
              value={initialModalForm?.de_bearing}
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
            <label>DE Bearing</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.de_bearing}
              onChange={(e) => handleRadio2Chnge("de_bearing", e)}
              suffix={'g'}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="nde_bearing"
              onChange={onRadioChange}
              value={initialModalForm?.nde_bearing}
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
            <label>NDE Bearing</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.nde_bearing}
              onChange={(e) => handleRadio2Chnge("nde_bearing", e)}
              suffix={'g'}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <Radio.Group
              name="others"
              onChange={onRadioChange}
              value={initialModalForm?.others}
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
            <label>Others</label>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={initialModalFormdata?.others}
              onChange={(e) => handleRadio2Chnge("others", e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => {
            setVibrationTestModal(false);
          }}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              // console.log(initialModalFormdata, initialModalForm);
              setVibrationTestModal(false);
              setVibrationData({
                  ...vibrationData,
                  point_1:{
                    check: initialModalForm?.point_1,
                    value:  initialModalFormdata?.point_1[0] + (initialModalFormdata?.point_1[0] && '-'+initialModalFormdata?.point_1[1])
                  },
                  point_2:{
                    check: initialModalForm?.point_2,
                    value: initialModalFormdata?.point_2[0] + (initialModalFormdata?.point_2[0] && '-'+initialModalFormdata?.point_2[1])
                  },
                  point_3:{
                    check: initialModalForm?.point_3,
                    value: initialModalFormdata?.point_3[0] + (initialModalFormdata?.point_3[0] && '-'+initialModalFormdata?.point_3[1])
                  },
                  point_4:{
                    check: initialModalForm?.point_4,
                    value: initialModalFormdata?.point_4[0] + (initialModalFormdata?.point_4[0] && '-'+initialModalFormdata?.point_4[1])
                  },
                  point_5:{
                    check: initialModalForm?.point_5,
                    value: initialModalFormdata?.point_5[0] + (initialModalFormdata?.point_5[0] && '-'+initialModalFormdata?.point_5[1])
                  },
                  point_6:{
                    check: initialModalForm?.point_6,
                    value: initialModalFormdata?.point_6[0] + (initialModalFormdata?.point_6[0] && '-'+initialModalFormdata?.point_6[1])
                  },
                  de_bearing:{
                    check: initialModalForm?.de_bearing,
                    value: initialModalFormdata?.de_bearing
                  },
                  nde_bearing:{
                    check: initialModalForm?.nde_bearing,
                    value: initialModalFormdata?.nde_bearing
                  },
                  others:{
                    check: initialModalForm?.others,
                    value: initialModalFormdata?.others
                  },
              })
            }}
          >
            Save
          </Button>
        </div>
      </Modal></>
  )
}

export default EditVibrationTests