import { Button, DatePicker, Input, Modal, Radio, Select } from "antd";
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditPolarizationIndexModal = ({ PIEditModal, setPIEditModal }) => {
    const [SrModalFormData, setSrModalFormData] = useState({
      ins_1_min_suffix:'mΩ',
      ins_10_min_suffix:'mΩ',
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
      <Modal
        title={
          <div className="d-flex align-items-center">
            <EditColorIcon /> <span className="d-block ml-2"> Edit Details </span>
          </div>
        }
        visible={PIEditModal}
        onCancel={() => setPIEditModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
              <div className="d-flex " style={{gap:'8px'}}>
                  
            <Radio.Group
              name="ins_1_min"
              onChange={onRadioChange}
              value={SrRadioData?.ins_1_min}
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
            <labek>Ins 1 min</labek>
              </div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.ins_1_min}
              onChange={(e) => handleRadioChnge("ins_1_min", e)}
            //   suffix='mΩ'
              addonAfter={(<>
                  <Select value={SrModalFormData?.ins_1_min_suffix} className="select-after" onChange={(e)=>handleRadioChnge("ins_1_min_suffix",{
                      target: { value: e },
                    })} >
          <Option value="mΩ">mΩ</Option>
          <Option value="Ω">Ω</Option>
        </Select>
                  </>)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
            <Radio.Group
              name="ins_10_min"
              onChange={onRadioChange}
              value={SrRadioData?.ins_10_min}
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
            <labek>Ins 10 min</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.ins_10_min}
              onChange={(e) => handleRadioChnge("ins_10_min", e)}
            //   suffix='mΩ'
              addonAfter={(<>
                  <Select value={SrModalFormData?.ins_10_min_suffix} className="select-after" onChange={(e)=>handleRadioChnge("ins_10_min_suffix",{
                      target: { value: e },
                    })} >
          <Option value="mΩ">mΩ</Option>
          <Option value="Ω">Ω</Option>
        </Select>
                  </>)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
            <Radio.Group
              name="pi"
              onChange={onRadioChange}
              value={SrRadioData?.pi}
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
            <labek>PI</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.pi}
              onChange={(e) => handleRadioChnge("pi", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
            <Radio.Group
              name="test_volt"
              onChange={onRadioChange}
              value={SrRadioData?.test_volt}
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
            <labek>Text Volt</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.test_volt}
              onChange={(e) => handleRadioChnge("test_volt", e)}
              suffix='v'
        //       addonAfter={(<>
        //           <Select value={SrModalFormData?.l_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("l_e_suffix",{
        //               target: { value: e },
        //             })} >
        //   <Option value="mΩ">mΩ</Option>
        //   <Option value="Ω">Ω</Option>
        // </Select>
        //           </>)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
            <Radio.Group
              name="checked_by"
              onChange={onRadioChange}
              value={SrRadioData?.checked_by}
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
            <labek>Checked By</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.checked_by}
              onChange={(e) => handleRadioChnge("checked_by", e)}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="d-flex " style={{gap:'8px'}}>
          <Radio.Group
            name="instrument"
            onChange={onRadioChange}
            value={SrRadioData?.instrument}
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
          <labek>Instrument</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.instrument}
            onChange={(e) => handleRadioChnge("instrument", e)}
          />
        </div>
        <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="d-flex " style={{gap:'8px'}}>
          <Radio.Group
            name="date"
            onChange={onRadioChange}
            value={SrRadioData?.date}
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
          <labek>Date</labek></div>
          <DatePicker
            style={{ width: "70%" }}
            placeholder="Select date"
            value={SrModalFormData?.date}
            onChange={(e) =>
                handleRadioChnge("date", {
                target: { value: e },
              })
            }
            // suffix='mΩ'
          />
        </div>
        <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="d-flex " style={{gap:'8px'}}>
          <Radio.Group
            name="remarks"
            onChange={onRadioChange}
            value={SrRadioData?.remarks}
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
          <labek>Remarks</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.remarks}
            onChange={(e) => handleRadioChnge("remarks", e)}
          />
        </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <Button key="cancel" onClick={() => setPIEditModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(SrModalFormData, SrModalFormData);
              setPIEditModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  };


export default EditPolarizationIndexModal
