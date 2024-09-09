import { Button, DatePicker, Input, Modal, Radio, Select } from "antd";
import { EditColorIcon } from "assets/svg/icon";
import React, { useState } from "react";
const { Option } = Select;
const EditStatorInsulation = ({ SIEditModal, setSIEditModal }) => {
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
      visible={SIEditModal}
      onCancel={() => setSIEditModal(false)}
      footer={false}
      width={1000}
    >
      <div className="">
        <div className="mb-4 d-flex justify-content-between align-items-center">
            <div className="d-flex " style={{gap:'8px'}}>
                
          <Radio.Group
            name="uvw_e"
            onChange={onRadioChange}
            value={SrRadioData?.uvw_e}
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
          <labek>UVW-E</labek>
            </div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.uvw_e}
            onChange={(e) => handleRadioChnge("uvw_e", e)}
            addonAfter={(<>
                <Select value={SrModalFormData?.uvw_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("uvw_e_suffix",{
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
            name="u_e"
            onChange={onRadioChange}
            value={SrRadioData?.u_e}
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
          <labek>U-E</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.u_e}
            onChange={(e) => handleRadioChnge("u_e", e)}
            addonAfter={(<>
            <Select value={SrModalFormData?.u_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("u_e_suffix",{
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
            name="v_e"
            onChange={onRadioChange}
            value={SrRadioData?.v_e}
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
          <labek>V-E</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.v_e}
            onChange={(e) => handleRadioChnge("v_e", e)}
            addonAfter={(<>
                <Select value={SrModalFormData?.v_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("v_e_suffix",{
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
            name="w_e"
            onChange={onRadioChange}
            value={SrRadioData?.w_e}
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
          <labek>W-E</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.w_e}
            onChange={(e) => handleRadioChnge("w_e", e)}
            addonAfter={(<>
                <Select value={SrModalFormData?.w_e_suffix} className="select-after" onChange={(e)=>handleRadioChnge("w_e_suffix",{
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
          <labek>U-V</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.u_v}
            onChange={(e) => handleRadioChnge("u_v", e)}
            addonAfter={(<>
                <Select value={SrModalFormData?.u_v_suffix} className="select-after" onChange={(e)=>handleRadioChnge("u_v_suffix",{
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
            addonAfter={(<>
                <Select value={SrModalFormData?.v_w_suffix} className="select-after" onChange={(e)=>handleRadioChnge("v_w_suffix",{
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
            addonAfter={(<>
                <Select value={SrModalFormData?.u_w_suffix} className="select-after" onChange={(e)=>handleRadioChnge("u_w_suffix",{
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
          <labek>Test Volt</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.test_volt}
            onChange={(e) => handleRadioChnge("test_volt", e)}
            suffix='V'
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
          <labek>Test Volt</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.test_volt}
            onChange={(e) => handleRadioChnge("test_volt", e)}
            suffix='V'
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
          <labek>Test Volt</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.test_volt}
            onChange={(e) => handleRadioChnge("test_volt", e)}
            suffix='V'
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
          <labek>Test Volt</labek></div>
          <Input
            style={{ width: "70%" }}
            placeholder="Type here..."
            value={SrModalFormData?.test_volt}
            onChange={(e) => handleRadioChnge("test_volt", e)}
            suffix='V'
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
      
      <div className="d-flex justify-content-end mt-5">
        <Button key="cancel" onClick={() => setSIEditModal(false)}>
          Cancel
        </Button>
        <Button
          key="save"
          className="bg-primary text-white ml-2"
          onClick={() => {
            console.log(SrModalFormData, SrModalFormData);
            setSIEditModal(false);
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditStatorInsulation;
