import { Button, DatePicker, Input, Modal, Radio, Select } from "antd";
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditRIModal = ({ RIEditModal, setRIEditModal }) => {
    const [SrModalFormData, setSrModalFormData] = useState({
      klm_e_suffix:'mΩ',
      k_e_suffix:'mΩ',
      l_e_suffix:'mΩ',
      m_e_suffix:'mΩ',
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
        visible={RIEditModal}
        onCancel={() => setRIEditModal(false)}
        footer={false}
        width={1000}
      >
        <div className="">
          <div className="mb-4 d-flex justify-content-between align-items-center">
              <div className="d-flex " style={{gap:'8px'}}>
                  
            <Radio.Group
              name="klm_e"
              onChange={onRadioChange}
              value={SrRadioData?.klm_e}
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
            <labek>KLM-E</labek>
              </div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.klm_e}
              onChange={(e) => handleRadioChnge("klm_e", e)}
            //   suffix='mΩ'
              addonAfter={(<>
                  <Select value={SrModalFormData?.klm_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("klm_e_suffix",{
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
              name="k_e"
              onChange={onRadioChange}
              value={SrRadioData?.k_e}
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
            <labek>K-E</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.k_e}
              onChange={(e) => handleRadioChnge("k_e", e)}
            //   suffix='mΩ'
              addonAfter={(<>
                  <Select value={SrModalFormData?.k_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("k_e_suffix",{
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
              name="l_e"
              onChange={onRadioChange}
              value={SrRadioData?.l_e}
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
            <labek>L-E</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.l_e}
              onChange={(e) => handleRadioChnge("l_e", e)}
              addonAfter={(<>
                  <Select value={SrModalFormData?.l_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("l_e_suffix",{
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
              name="m_e"
              onChange={onRadioChange}
              value={SrRadioData?.m_e}
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
            <labek>M-E</labek></div>
            <Input
              style={{ width: "70%" }}
              placeholder="Type here..."
              value={SrModalFormData?.m_e}
              onChange={(e) => handleRadioChnge("m_e", e)}
              addonAfter={(<>
                  <Select value={SrModalFormData?.m_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("m_e_suffix",{
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
          <Button key="cancel" onClick={() => setRIEditModal(false)}>
            Cancel
          </Button>
          <Button
            key="save"
            className="bg-primary text-white ml-2"
            onClick={() => {
              console.log(SrModalFormData, SrModalFormData);
              setRIEditModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  };

export default EditRIModal
