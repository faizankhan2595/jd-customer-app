import { Button, DatePicker, Input, Modal, Radio, Select } from "antd";
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditSCModal = ({ SCEditModal, setSCEditModal }) => {
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
        visible={SCEditModal}
        onCancel={() => setSCEditModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
              <div className="d-flex " style={{gap:'8px'}}>
                  
            <Radio.Group
              name="u_v"
              onChange={onRadioChange}
              value={SrRadioData?.u_v}
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
            <labek>U-V</labek>
              </div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.u_v}
              onChange={(e) => handleRadioChnge("u_v", e)}
            //   suffix='mΩ'
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
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
            <labek>U-W</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.u_w}
              onChange={(e) => handleRadioChnge("u_w", e)}
            //   suffix='mΩ'
            />
          </div>
          <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex " style={{gap:'8px'}}>
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
            <labek>V-W</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.v_w}
              onChange={(e) => handleRadioChnge("v_w", e)}
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
          <Button key="cancel" onClick={() => setSCEditModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(SrModalFormData, SrModalFormData);
              setSCEditModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  };


export default EditSCModal
