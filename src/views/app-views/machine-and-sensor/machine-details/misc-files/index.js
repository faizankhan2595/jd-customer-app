import { EyeOutlined, MoreOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Avatar, Button, Dropdown, Input, Menu, Space, Table, Tag } from 'antd'
import { CsvIcon, ReportIcon } from 'assets/svg/icon'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const MiscFiles = () => {
  const history = useHistory()
  const goback = () => {
    history.goBack();
  }
  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Misc File ID',
      dataIndex: 'miscFileId',
      key: 'miscFileId',
    },
    {
      title: 'Machine',
      dataIndex: 'machine',
      key: 'machine',
      render: (machine) => {
        return <>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={`Avatar for`}
          /> <span className='ml-2'>{machine}</span>
        </>
      }
    },
    {
      title: 'Uploaded On',
      dataIndex: 'uploadedOn',
      key: 'uploadedOn',
    },
    {
      title: 'Upload By',
      dataIndex: 'uploadBy',
      key: 'uploadBy',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <span><ReportIcon /></span>
        </>
      ),
    },
  ];
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="view" onClick={() => console.log(record.id)}>
        <EyeOutlined /> View Detail
      </Menu.Item>
    </Menu>
  );
  const data = [
    {
      srNo: 1,
      miscFileId: 'MISC001',
      machine: 'Machine A',
      uploadedOn: '2024-03-13',
      uploadBy: 'John Doe',
      status: 'Pending',
    },
    {
      srNo: 2,
      miscFileId: 'MISC002',
      machine: 'Machine B',
      uploadedOn: '2024-03-12',
      uploadBy: 'Jane Doe',
      status: 'Completed',
    },
    // Add more data as needed
  ];
  return (
    <div>
      <h4> <ToolOutlined /><span style={{
        color: '#6a6a6a',
        fontWeight: '300'
      }}></span> /  Misc Files </h4>
      <div className="d-flex justify-content-between mb-3 mt-4">
        <div className="" style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={(text) => { }}
              style={{
                width: 200,
              }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
          </Space>
          <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button
            onClick={goback}
            className="ml-3 d-flex align-items-center rounded font-weight-semibold px-4"
          >
            Back
          </Button>
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={`/app/machine-and-sensors/machine-details/sensor/misc-files/${2}/add-new`}>
              + Add New</Link>
          </Button>
        </div>
      </div>
      <div className='mt-3'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default MiscFiles
