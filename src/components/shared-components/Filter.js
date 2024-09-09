import { Button, Dropdown, Menu, Checkbox } from "antd";
import React, { useState } from "react";


const Filter = (props) => {
  return (
    <Dropdown overlay={props.filters} placement="bottomLeft">
      {props.children}
    </Dropdown>
  );
};
export default Filter;