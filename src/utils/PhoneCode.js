import { Select } from "antd";
import { PhoneCodeJson } from "constants/phoneCodeConstant";
import React from "react";

function PhoneCode({ value, onChange }) {
  return (
    <>
      <Select
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        value={value}
        onChange={onChange}
        style={{
          width: 80,
        }}
      >
        {PhoneCodeJson.map((phoneCode) => (
          <Select.Option key={phoneCode.dial_code} value={phoneCode.dial_code}>
            {phoneCode.dial_code}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}

export default PhoneCode;
