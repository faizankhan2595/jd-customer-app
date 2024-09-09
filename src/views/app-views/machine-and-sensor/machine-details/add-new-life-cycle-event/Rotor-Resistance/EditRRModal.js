import { Button, DatePicker, Input, Modal, Radio, Select } from "antd";
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditRRModal = ({ RREditModal, setRREditModal }) => {
    const [SrModalFormData, setSrModalFormData] = useState({
      v_w_suffix:'mΩ',
      u_e_suffix:'mΩ',
      u_v_suffix:'mΩ',
      v_e_suffix:'mΩ',
      uvw_e_suffix:'mΩ',
      u_w_suffix:'mΩ',
      w_e_suffix:'mΩ',
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
        visible={RREditModal}
        onCancel={() => setRREditModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
              <div className="d-flex " style={{gap:'8px'}}>
                  
            <Radio.Group
              name="k_l"
              onChange={onRadioChange}
              value={SrRadioData?.k_l}
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
            <labek>K-L</labek>
              </div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.k_l}
              onChange={(e) => handleRadioChnge("k_l", e)}
              addonAfter={(<>
                  <Select value={SrModalFormData?.k_l_suffix} className="select-after" onChange={(e)=>handleRadioChnge("k_l_suffix",{
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
              name="k_m"
              onChange={onRadioChange}
              value={SrRadioData?.k_m}
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
            <labek>K-M</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.k_m}
              onChange={(e) => handleRadioChnge("k_m", e)}
              addonAfter={(<>
              <Select value={SrModalFormData?.k_m_suffix} className="select-after" onChange={(e)=>handleRadioChnge("k_m_suffix",{
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
              name="l_m"
              onChange={onRadioChange}
              value={SrRadioData?.l_m}
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
            <labek>L-M</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.l_m}
              onChange={(e) => handleRadioChnge("l_m", e)}
              addonAfter={(<>
                  <Select value={SrModalFormData?.l_m_suffix} className="select-after" onChange={(e)=>handleRadioChnge("l_m_suffix",{
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
          <Button key="cancel" onClick={() => setRREditModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(SrModalFormData, SrModalFormData);
              setRREditModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  };

export default EditRRModal
