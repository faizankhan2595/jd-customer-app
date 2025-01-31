import React from 'react';
import { CSVLink } from 'react-csv';
import { Button, } from "antd";

import Icon from "@ant-design/icons"
import {  CsvIcon } from 'assets/svg/icon'

const Csv = (props) => {
    const { header, data, filename } = props;

    return (
        <CSVLink
            headers={header}
            data={data}
            filename={filename}
        >
            <Button className="d-flex align-items-center ml-2" >
                <Icon className="mr-2" component={CsvIcon} />Export
            </Button>
        </CSVLink>

    )
}

export default Csv;