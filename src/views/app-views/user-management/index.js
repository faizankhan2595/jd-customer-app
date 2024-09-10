import { DashboardOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, MoreOutlined, SearchOutlined, TeamOutlined, UserSwitchOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, Space, Table, Tag, Modal, Select, Form, Radio, message } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { AccountStatusIcon, AssignDashboardIcon, CsvIcon, FilterIcon, SuccessTickIcon } from 'assets/svg/icon'
import Filter from 'components/shared-components/Filter'
import React, { useState, useEffect } from 'react'
import Alert from '../../../assets/images/Alert.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosInstance } from 'App'
import moment from 'moment'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const { Option } = Select;

const StaffManagement = () => {
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  // const [data, setData] = useState([]);
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleCancelConfirmation = () => {
    setDeleteConfirmationModal(false)
  }
  const handleYesConfirmation = () => {
    setDeleteConfirmationModal(false)
    handleOpenAlert()
    setTimeout(() => {
      handleCloseAlert()
    }, 1500);
  }
  const handleOpenAlert = () => {
    setAlertModal(true)
  }
  const handleCloseAlert = () => {
    setAlertModal(false)
  }
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
  const [fetch, setData] = useState([]);

  const getData = async () => {
    try {
      const resp = await axiosInstance.get('/api/admin/staff/list');
      setData(resp.data.items);
    } catch (err) {
      console.log(err)
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const data = true ? [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      username: 'JohnDoe',
      type: 'Admin',
      contactNumber: '9876543210',
      email: 'john.doe@example.com',
      userSince: '2022-01-15',
      status: true, // Active
      organization: 'Company A',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      username: 'JaneSmith',
      type: 'User',
      contactNumber: '9123456789',
      email: 'jane.smith@example.com',
      userSince: '2023-05-10',
      status: false, // Inactive
      organization: 'Company B',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/150',
      username: 'MikeRoss',
      type: 'Moderator',
      contactNumber: '8765432109',
      email: 'mike.ross@example.com',
      userSince: '2021-11-23',
      status: true, // Active
      organization: 'Company C',
    },
  ] : fetch.map((value, i) => {
    return {
      id: value.id,
      image: value.profile_pic,
      username: value.name,
      workshop: value.workshop,

      contactNumber: value.phone_no,
      // membershipType: value.membershipType,
      email: value.email,
      userSince: moment(value.created_at).format('DD MMM YYYY'),
      status: value.status_remark == 1 ? "Active" : "Inactive",
    }
  })

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
      render: (text, record) => <Avatar src={text} alt={`Avatar for ${record.organization}`} />,
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Accopunt Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created On',
      dataIndex: 'userSince',
      key: 'userSince',
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

  const handleView = (id) => {
    console.log(`Editing record with ID ${id}`);
  };

  const AssignDashboardfun = (id) => {
    console.log(`Deleting record with ID ${id}`);
    setModalVisible(true)
  };

  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="view" onClick={() =>  history.push(`/app/user-management/user-accounts/account-details/${record.id}`)}>
        <EyeOutlined /> View
      </Menu.Item>
      <Menu.Item key="edit" onClick={() => console.log(record.key)}>
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => {
        setDeleteConfirmationModal(true)
        console.log(record.key)
      }}>
        <DeleteOutlined /> Delete
      </Menu.Item>
      <Menu.Item onClick={() => setModalVisible(true)}>
        <AccountStatusIcon /> Account Status
      </Menu.Item>
    </Menu>
  );

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
  };


  const onSearch = (value) => console.log(value);


  const FilterMenu = (
    <Menu mode="horizontal">
      <SubMenu key="item1" title="Status">
        <Menu.Item key="subitem1">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem2">
          <Checkbox>Active</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem3">
          <Checkbox>Terminated</Checkbox>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );


  return (
    <div>
      <h4> <UserSwitchOutlined /><span style={{
        color: '#6a6a6a',
        fontWeight: '300'
      }}> User Management </span>/ User Accounts </h4>
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
        <div className="mb-2 d-flex align-items-center">
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={'admin-accounts/add-new'}>
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
      <Modal
        // title={<div className='d-flex align-items-center'><span className='d-block ml-2' > User Account Status </span></div>}
        visible={deleteConfirmationModal}
        onCancel={() => setDeleteConfirmationModal(false)}
        footer={false}
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img style={{ width: '60px' }} src={Alert} alt={'...'} />
          <h4 style={{ fontWeight: '300', width: '250px' }} className='text-center'>Are you sure you want to delete
            user records?</h4>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <Button className='' onClick={() => handleCancelConfirmation()}>
            No
          </Button>
          <Button className='bg-primary text-white ml-2' onClick={handleYesConfirmation}>
            Yes
          </Button>
        </div>

      </Modal>
      <Modal
        visible={alertModal}
        onCancel={() => setAlertModal(false)}
        footer={false}
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <SuccessTickIcon />
          <h4 style={{ fontWeight: '300', width: '250px' }} className='text-center'>Admin account deleted successfully!</h4>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <Button className='bg-primary text-white ml-2' onClick={handleCloseAlert}>
            Close
          </Button>
        </div>
      </Modal>
      <Modal
        title={<div className='d-flex align-items-center'><span className='d-block ml-2' > User Account Status </span></div>}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="yourForm"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
        >
          <Form.Item
            label="User Status"
            name="user_status"
            rules={[{ required: false, message: 'Please select an user status' }]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Radio.Group>
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Add Remarks Textarea */}
          <Form.Item
            label="Remarks"
            name="addRemarks"
            rules={[{ required: false, message: 'Please add remarks' }]}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 32 }}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          {/* Submit Button */}

          <div className='d-flex justify-content-end mt-3'>
            <Button className='ml-2' onClick={handleCancel}>
              Cancel
            </Button>
            <Button className='bg-primary text-white ml-2' type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default StaffManagement
