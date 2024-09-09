import { EyeOutlined, MoreOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Button, Dropdown, Input, Menu, Space, Table, Tag } from 'antd'
import { CsvIcon } from 'assets/svg/icon'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ViewPasEvent = () => {
    const history = useHistory()
    const goback = ()=>{
        history.goBack();
    }
    const columns = [
        {
          title: 'Event ID',
          dataIndex: 'eventId',
          key: 'eventId',
        },
        {
          title: 'Date Received',
          dataIndex: 'dateReceived',
          key: 'dateReceived',
        },
        {
          title: 'Date Requested',
          dataIndex: 'dateRequested',
          key: 'dateRequested',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Tag color={status === 'Pending' ? 'yellow' : 'green'}>{status}</Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Dropdown overlay={getMenu(record)} trigger={['hover']}>
                <MoreOutlined />
              </Dropdown>
            </Space>
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
          eventId: 'EV001',
          dateReceived: '2024-03-13',
          dateRequested: '2024-03-10',
          status: 'Pending',
          
        },
        {
          eventId: 'EV002',
          dateReceived: '2024-03-12',
          dateRequested: '2024-03-11',
          status: 'Submitted',
          
        },
        // Add more data as needed
      ];
  return (
    <div>
         <h4> <ToolOutlined /><span style={{
                color: '#6a6a6a',
                fontWeight: '300'
            }}> Machine & Sensors / Sensors</span> / Past Analysis </h4>
      <div className="d-flex justify-content-between mb-3 mt-4">
        <div className="" style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={(text)=>{}}
              style={{
                width: 200,
              }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
          </Space>
          <Button icon={<Icon component={CsvIcon}/>} className="d-flex align-items-center ml-2" >Export</Button>
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
            <Link to={'/app/notifications/add_notification'}>
              + Add New Event</Link>
          </Button>
        </div>
      </div>
      <div className='mt-3'>
      <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default ViewPasEvent
