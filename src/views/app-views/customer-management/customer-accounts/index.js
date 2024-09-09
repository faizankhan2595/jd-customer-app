import { DashboardOutlined, EllipsisOutlined, EyeOutlined, MoreOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, Space, Table, Tag, Modal, Select } from 'antd'
import { AssignDashboardIcon, CsvIcon, FilterIcon } from 'assets/svg/icon'
import axios from 'axios'
import Filter from 'components/shared-components/Filter'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { axiosInstance } from 'App'
import moment from 'moment'

const { Option } = Select;
const CustomerAccount = () => {
  const history = useHistory();
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSave = (selectedDashboards) => {
    // Handle save logic here
    console.log('Selected Dashboards:', selectedDashboards);
    setModalVisible(false);
  };


  const handleSelectChange = (selectedValues) => {
    if (selectedValues.includes('all')) {
      setSelectedDashboards(['all', 'Vibratory Sensor Dashboard', 'Solar Sensor Dashboard']);
    } else {
      setSelectedDashboards(selectedValues);
    }
  };


  // BELOW IS POST API NOT YET IMPLEMENTED
  const customerDatas = async () => {
    const resp = await axiosInstance.post('/api/admin/customer/list');
    setCustomerData(resp.data);
  }

  useEffect(() => {
    customerDatas();
  }, [])

  const data = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      organization: 'Customer Organization 1',
      contactNumber: '123-456-7890',
      membershipType: 'Premium',
      email: 'customer1@example.com',
      customerSince: '2022-01-01',
      status: true,
    },
    // Add more data entries as needed
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      // title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <Avatar src={data[0].image} alt={`Avatar for ${record.organization}`} />,
    },
    {
      title: 'Customer Organization',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
    {
      title: 'Membership Type',
      dataIndex: 'membershipType',
      key: 'membershipType',
      render:(row)=>{
        return<>Premium</>
      }
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Customer Since',
      dataIndex: 'created_at',
      key: 'created_at',
      render:(row)=>{
        return<>{moment(row.created_at).format('YYYY-MM-DD')}</>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (active) => (active==1 ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
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

  const handleView = (id) => {
    history.push(`/app/customer-management/customer-accounts/details/${id}`);
    // console.log(`Editing record with ID ${id}`);
  };

  const AssignDashboardfun = (id) => {
    console.log(`Deleting record with ID ${id}`);
    setModalVisible(true)
  };

  const getMenu = (id) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleView(id)}>
        <EyeOutlined />View Detail
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => AssignDashboardfun(id)}>
        <DashboardOutlined />Assign Dashboard
      </Menu.Item>
    </Menu>
  );


  const onSearch = (value) => console.log(value);
  const FilterMenu = (
    <Menu mode="horizontal">
      <Menu.SubMenu key="item1" title="Status">
        <Menu.Item key="subitem1">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem2">
          <Checkbox>Active</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem3  ">
          <Checkbox>Terminated</Checkbox>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
  return (
    <div>
      <h4> <TeamOutlined /><span style={{
        color: '#6a6a6a',
        fontWeight: '300'
      }}> Customer Management </span>/ Customers Accounts </h4>
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
        </div>
        {/* <div className="mb-2 d-flex align-items-center">
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={'/app/notifications/add_notification'}>
              + Add New Notification</Link>
          </Button>
        </div> */}
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
          columns={columns} dataSource={customerData} />
      </div>
      <Modal
        title={<div className='d-flex align-items-center'> <AssignDashboardIcon /> <span className='d-block ml-2' > Assign Dashboard </span></div>}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <div>
          <label className='d-block mb-3'>Select Dashboard</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select dashboard"
            value={selectedDashboards}
            onChange={handleSelectChange}
          >
            <Option value="all">All</Option>
            <Option value="Vibratory Sensor Dashboard">Vibratory Sensor Dashboard</Option>
            <Option value="Solar Sensor Dashboard">Solar Sensor Dashboard</Option>
            {/* Add more options as needed */}
          </Select>
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="save" className='bg-primary text-white ml-2' onClick={() => handleSave(selectedDashboards)}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerAccount
