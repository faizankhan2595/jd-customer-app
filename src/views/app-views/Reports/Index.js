import Icon, { FileOutlined } from '@ant-design/icons'
import React from 'react'
import { Button, Checkbox, Input, Menu, Select, Space, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Filter from 'components/shared-components/Filter'
import { CsvIcon, FilterIcon } from 'assets/svg/icon'
import CalendarIcon from "assets/calendar.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
function Reports() {
    const [data, setData] = React.useState([
        {
            id: 1,
            name: "Machine 1",
            contact_number: "Area 1",
            email: "JobSite 1",
            activeJobs: "Active"
        },
        {
            id: 2,
            name: "Machine 2",
            contact_number: "Area 2",
            email: "JobSite 2",
            activeJobs: "Inactive"
        },
        {
            id: 3,
            name: "Machine 3",
            contact_number: "Area 3",
            email: "JobSite 3",
            activeJobs: "Active"
        },
        {
            id: 4,
            name: "Machine 4",
            contact_number: "Area 4",
            email: "JobSite 4",
            activeJobs: "Inactive"
        },
        {
            id: 5,
            name: "Machine 5",
            contact_number: "Area 5",
            email: "JobSite 5",
            activeJobs: "Active"
        },
        {
            id: 6,
            name: "Machine 6",
            contact_number: "Area 6",
            email: "JobSite 6",
            activeJobs: "Inactive"
        },
        {
            id: 7,
            name: "Machine 7",
            contact_number: "Area 7",
            email: "JobSite 7",
            activeJobs: "Active"
        },
        {
            id: 8,
            name: "Machine 8",
            contact_number: "Area 8",
            email: "JobSite 8",
            activeJobs: "Inactive"
        },
        {
            id: 9,
            name: "Machine 9",
            contact_number: "Area 9",
            email: "JobSite 9",
            activeJobs: "Active"
        },
        {
            id: 10,
            name: "Machine 10",
            contact_number: "Area 10",
            email: "JobSite 10",
            activeJobs: "Inactive"
        },
    ])
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Machine",
            dataIndex: "name",
        },
        {
            title: "Area",
            dataIndex: "contact_number",
        },
        {
            title: "JobSite",
            dataIndex: "email",
        },

        {
            title: "Status",
            dataIndex: "activeJobs",
            render: (text, record) => (
                <div>
                    {record.activeJobs === "Active" ? (
                        <Tag color="green">Active</Tag>
                    ) : (
                        <Tag color="red">Inactive</Tag>
                    )}
                </div>
            ),
        },

    ]
    const onSearch = (value) => console.log(value);
    const FilterMenu = (
        <Menu mode="horizontal">
            <Menu.SubMenu key="item1" title="Service Type">
                <Menu.Item key="subitem1">
                    <Checkbox>All</Checkbox>
                </Menu.Item>{" "}
                <Menu.Item key="subitem3">
                    <Checkbox>workshop</Checkbox>
                </Menu.Item>{" "}
                <Menu.Item key="subitem2">
                    <Checkbox>Onsite</Checkbox>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="item2" title="Status">
                <Menu.Item key="subitem5">
                    <Checkbox>All</Checkbox>
                </Menu.Item>{" "}

            </Menu.SubMenu>
        </Menu>
    );
    return (
        <div>
            {/* <div>
      <Tabs activeKey={key} onChange={setKey} tabBarExtraContent={key==="1"?operations:operationsTwo}>
        {items.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.key}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div> */}
            <h4> <FileOutlined /> Reports</h4>
            <div className="d-flex justify-content-between mb-3">
                <div className="" style={{ display: "flex" }}>
                    <Space direction="vertical">
                        <Input
                            placeholder="Search"
                            allowClear
                            onChange={onSearch}
                            style={{
                                width: 200,
                            }}
                            prefix={<SearchOutlined style={{ marginRight: 8 }} />}
                        />
                    </Space>
                    <Filter filters={FilterMenu}>
                        <Button
                            icon={<Icon component={FilterIcon} />}
                            className="d-flex align-items-center ml-2"
                        >
                            Filters
                        </Button>
                    </Filter>
                    <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
                    <Select value={"all"} style={{
                        width: "200px",
                        marginLeft: "10px"
                    }}>
                        <Select.Option value={"all"}>All</Select.Option>
                        <Select.Option value={"service_report"}>Service Report</Select.Option>
                        <Select.Option value={"repair_report"}>Repair Report</Select.Option>
                        <Select.Option value={"analysis_report"}>Analysis Report</Select.Option>
                        <Select.Option value={"failure_prediction_report"}>Failure Prediction Report</Select.Option>
                    </Select>
                </div>
                <div className="mb-2 d-flex align-items-center">
                    <Button
                        // onClick={showModal}
                        className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
                    >
                        Generate Report
                    </Button>
                </div>
            </div>
            <div>
                <Table
                    // rowKey='id'
                    // rowSelection={{
                    //   selectedRowKeys,
                    //   onChange: (selectedRowKeys, selectedRows) => {
                    //     setSelectedRowKeys(selectedRowKeys);
                    //   }
                    // }} 
                    columns={columns} dataSource={data} />
            </div>

        </div>
    )
}

export default Reports