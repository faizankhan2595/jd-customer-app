import { EyeOutlined, MoreOutlined, SearchOutlined, ToolOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Button, Dropdown, Input, Menu, message, Space, Table, Tag } from 'antd'
import { CsvIcon } from 'assets/svg/icon'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosInstance } from "App";
import { render } from '@testing-library/react'
import moment from 'moment'

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

const ViewPasEvent = () => {
    const history = useHistory()
    const param = useParams();
    const [eventsData, setEventsData] = useState([])
    const goback = ()=>{
        history.goBack();
    }
    const columns = [
        {
          title: 'Event ID',
          dataIndex: 'id',
          key: 'id',
          render: (item) => <div>#{item}</div>
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (name) => <div>{name || 'Unnamed Event'}</div>
        },
        {
          title: 'Date Received',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (item) => <div>{moment(item).format('DD-MM-YYYY')}</div>
        },
        {
          title: 'Date Requested',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (item) => <div>{moment(item).format('DD-MM-YYYY')}</div>
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Tag color={status === 'Pending' ? 'yellow' : 'green'}>{status || 'Submitted'}</Tag>
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
          <Menu.Item key="edit" onClick={() => editLifecycleEvent(record.id)}>
            <EditOutlined /> Edit
          </Menu.Item>
          <Menu.Item key="view" onClick={() => deleteLifecycleEventHandler(record.id)}>
            <DeleteOutlined /> Delete
          </Menu.Item>
        </Menu>
      );

    const editLifecycleEvent = async (event_id) => {
      history.push(`/app/machine-and-sensors/machine-details/life-cycle-management/edit-life-cycle-event/${event_id}`);
    }

    const deleteLifecycleEventHandler = async (event_id) => {
      console.log("fetch called")
      const response = await axiosInstance.delete(`api/admin/life-cycle-event/${event_id}/delete`
        // , { search: 'none' }
      );
      console.log(response.data.items)
      let data = response.data;
      if(data.status) {
        message.success("Event deleted successfully")
        fetchData();
      } else {
        message.success("Event cannot be deleted")
      }
    }

    const fetchData = async () => {
      const response = await axiosInstance.get(`api/admin/life-cycle-event/list?machine_id=${param.id}`);
      let data = response.data.items;
      if(data) {
        setEventsData([
          ...data
        ])
      }
    }

    useEffect(() => {
      fetchData()
    }, [])
    
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
            <Link to={`/app/machine-and-sensors/machine-details/life-cycle-management/add-new-life-cycle-event/${param.id}`}>
              + Add New Event</Link>
          </Button>
        </div>
      </div>
      <div className='mt-3'>
      <Table columns={columns} dataSource={eventsData} />
      </div>
    </div>
  )
}

export default ViewPasEvent
