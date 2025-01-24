import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Avatar, Button, Checkbox, Divider, Dropdown, Input, Menu, Popconfirm, Space, Table, Tag, message } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { axiosInstance } from 'App';
import { CsvIcon, FilterIcon, MachineSensorIcon } from 'assets/svg/icon';
import Filter from 'components/shared-components/Filter';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import moment from 'moment'
// import { SensorListCSV } from 'constants/Headers';
// import Csv from 'utils/Csv';

const ViewSensor = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [fetchData, setData] = useState([]);
  const [csvData, setCSVData] = useState([])
  const [header, setHeader] = useState({})
  const [searchText, setSearchText] = useState('');
  const getData = async (search = "", filter = 'all') => {
    let url = "?"
    if(search != "") {
      url += `search=${search}&`

    }
    //for 0 it is not handling
    if((filter !== '' && filter != 'all')) {
      url += `status=${filter}`
    }
    const response = await axiosInstance.get(`/api/web/machines/${id}/sensors${url}`);
    // const response = await axiosInstance.get(`/api/web/machines/${id}/sensors?search=${search}` + (filter != 'all' ? `&status=${filter}` : ""));

    setData(response.data.items);
    setCSVData(response.data.items.map((item) => {
      return {
        id: item.id,
        image: item.image,
        sensor_id: item.sensor_id,
        sensor_type: item.sensor_type,
        sensor_name: item.sensor_name,
        sensor_location: item.sensor_location,
        updated_at: moment(item.updated_at).format("DD-MM-YYYY"),
        sensor_status: item.sensor_status ? 'Active' : 'Inactive',
      }
    }))
    setHeader(response.data.item)
  };
  useEffect(() => {

    getData();
  }, [])

  const data = fetchData.map((value, i) => {
    return {
      key: value.id,
      id: value.id,
      image: value.image,
      sensor_id: value.sensor_id,
      sensor_type: value.sensor_type,
      sensor_name: value.sensor_name,
      location: value.sensor_location,
      last_update_on: moment(value.updated_at).format("DD-MM-YYYY"),
      status: value.sensor_status,

    }
  })


  // const data = [
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     sensor_id: '#VS-456866',
  //     sensor_type: 'Vibratory Sensor ',
  //     sensor_name: 'Industrial piezoelectric accelerometers',
  //     location: 'Moto',
  //     last_update_on: '2022-01-01',
  //     status: true,
  //   },
  //   // Add more data entries as needed
  // ];

  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      // title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <Avatar src={text} alt={`Avatar for ${record.organization}`} />,
    },
    {
      title: 'Sensor ID',
      dataIndex: 'sensor_id',
      key: 'sensor_id',
    },
    {
      title: 'Sensor Type',
      dataIndex: 'sensor_type',
      key: 'sensor_type',
    },
    {
      title: 'Sensor Name',
      dataIndex: 'sensor_name',
      key: 'sensor_name',
    },
    {
      title: 'Loction',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Last Update On',
      dataIndex: 'last_update_on',
      key: 'last_update_on',
      //   render: (active) => (active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (active) => (active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={getMenu(record.id)} placement="bottomRight" trigger={['hover']}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const onDeleteSensor = async (ids) => {
    console.log('is', id);
    try {
      const response = await axiosInstance.delete(`/api/web/machines/${id}/sensors/${ids}`);
      message.success('Sensor delete successfully!');
      if (response.data.status) {
        getData()
      }
    } catch (error) {
      message.error('Failed to delete sensor. Please try again.');
      console.error('Error:', error);
    }
  }
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="edit" >
        <Link style={{ width: '100%', display: 'block', color: 'gray' }} to={`edit-sensor/${id}/${record}?machine_name=${header.machine_name}`} >
          <EditOutlined /> Edit
        </Link>
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          style={{ width: '100%', display: 'block', color: 'gray' }}
          title="Are you sure to delete this sensor?"
          description="Are you sure to delete this sensor?"
          onConfirm={() => onDeleteSensor(record)}
          onCancel={(e) => console.log('cancel', e)}
          okText="Yes"
          cancelText="No"
        >
          <div>

            <DeleteOutlined /> Delete
          </div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
  };
  var timeout = ""
  const onSearch = (value) => {
    setSearchText(value.target.value)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getData(value.target.value, selectedFilter)
    }, 500)
  }
  const FilterMenu = (
    <Menu mode="horizontal" onChange={(e) => {
      console.log(e)
    }}>
      <SubMenu key="item1" title="Status">
        <Menu.Item key="subitem1"

        >
          <Checkbox onChange={() => {
            getData(searchText);
            setSelectedFilter('all')
          }} checked={
            selectedFilter === 'all'
          }>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem2"

        >
          <Checkbox
            onChange={() => {
              getData(searchText, 1);
              setSelectedFilter(1)
            }}
            checked={selectedFilter == 1}

          >Active</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem3"

        >
          <Checkbox onChange={() => {
            getData(searchText, 0);
            setSelectedFilter(0)
          }}

            checked={selectedFilter === 0}>Inactive</Checkbox>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
  return (
    <div>
      <div className='rounded bg-white p-3 mb-3'>

        <h4> <MachineSensorIcon /><span style={{
          color: '#6a6a6a',
          fontWeight: '300'
        }}> Machines </span>/ Sensor </h4>
        <div
          style={{ background: "#FAFAFB" }}
          className="mb-4 rounded d-flex justify-content-between align-items-start w-100 p-3"
        >
          <div
            style={{ gap: "10px", width: "80%" }}
            className="d-flex align-items-start p-3 w-100 justify-content-between"
          >
            <div style={{ gap: "10px" }} className="d-flex align-items-top">
              <div>

                <Avatar.Group
                  size="large"
                  max={{
                    count: 2,

                  }}
                >
                  {
                    header?.machine_images?.map((item) => {
                      return <Avatar src={item} />
                    })
                  }

                </Avatar.Group>
                {/* <img style={{ borderRadius: '50%' }} height={40} width={40} src="https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" /> */}
              </div>
              <div className='ml-4' style={{ width: "auto" }}>
                <h5 className="m-0">Machine Name</h5>
                <div style={{ color: '#0D6CC9' }} className="d-flex align-items-center">
                  {header.machine_name}
                </div>
              </div>
            </div>
            <Divider style={{ height: "60px" }} type="vertical" />
            <div>
              <div>
                <h5 className="m-0">Machine ID</h5>
                <p className="m-0">{
                  header.machine_id
                }</p>
              </div>
            </div>
            <Divider style={{ height: "60px" }} type="vertical" />
            <div>
              <div>
                <h5 className="m-0">Customer</h5>
                <p className="m-0"> {
                  header.customer_name
                }</p>
              </div>
            </div>
            <Divider style={{ height: "60px" }} type="vertical" />
            <div>
              <div>
                <h5 className="m-0">Jobsite</h5>
                <p className="m-0">{
                  header.Jobsite
                }</p>
              </div>
            </div>
            <Divider style={{ height: "60px" }} type="vertical" />
            <div>
              <div className='d-flex flex-column align-items-end'>
                {/* <span style={{ color: 'white', padding: '3px 24px', borderRadius: '5px', background: '#00AB6F', fontWeight: '600', fontSize: '16px' }} className=''>Active</span> */}
                {
                  header.machine_status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
                }
                <p className=''>{`Active Since ${moment(header.active_since).format("DD-MM-YYYY HH:mm")}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="" style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              value={searchText}
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
          {/* <Csv data={csvData} filename='sensor-list' header={SensorListCSV} /> */}
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button
            onClick={() => history.goBack()}
            className="ml-3 d-flex align-items-center rounded font-weight-semibold px-4"
          >
            Back
          </Button>
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={`add-new/${id}?machine_name=${header.machine_name}`}>
              + Add New</Link>
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

export default ViewSensor
