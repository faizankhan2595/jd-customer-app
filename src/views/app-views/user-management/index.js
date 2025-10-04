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
import { role, Status } from 'utils/role';
import { hasPermission } from 'utils/permissionUtils';

const { Option } = Select;

const StaffManagement = () => {
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  // const [data, setData] = useState([]);
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleCancelConfirmation = () => {
    setDeleteConfirmationModal(false)
    setUserToDelete(null)
  }
  const handleYesConfirmation = async () => {
    if (!userToDelete) return;

    setDeleteConfirmationModal(false)

    try {
      console.log(`Attempting to delete user ${userToDelete.id}`);
      const response = await axiosInstance.delete(`/api/admin/customer-users/${userToDelete.id}/delete`);

      if (response.data) {
        console.log('User deleted successfully:', response.data);
        message.success(response.data.message || 'User deleted successfully');

        // Refresh the data
        getData(searchText, selectedStatus === 'all' ? '' : selectedStatus === 'pending-approval' ? 0 : selectedStatus === 'approved' ? 1 : 2);

        // Show success modal
        handleOpenAlert()
        setTimeout(() => {
          handleCloseAlert()
        }, 1500);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error(error.response?.data?.message || 'Failed to delete user. Please try again.');
    }

    // Clear the user to delete
    setUserToDelete(null);
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
  const [data, setData] = useState([]);

  const getData = async (search="",status="") => {
    let url = `?customer_id=${localStorage.getItem("parent_id")!='null'?localStorage.getItem('parent_id'):localStorage.getItem('user_id')}&search=${search}`
    //for 0 it is not handling
    if((status !== '' && status != 'all')) {
      url += `&status=${status}`
    }
    try {
      const resp = await axiosInstance.post('/api/admin/customer-users/list'+url);
      setData(resp.data);
    } catch (err) {
      console.log(err)
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getData();
  }, [])




  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      // title: 'Image',
      dataIndex: 'profile_pic',
      key: 'profile_pic',
      render: (text, record) => <Avatar src={text} alt={`Avatar for ${text}`} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'username',
    },
    {
      title: 'Accopunt Type',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (role_id) => {
        return role(role_id)
      }
    },
    {
      title: 'Mobile Number',
      dataIndex: 'phone_no',
      key: 'phone_no',
      render:(phone_no, record)=>(
        <span>{record.phone_code +-+ phone_no}</span>
      ) 
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'userSince',
      render: (date) => moment(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (role_id) => {
        const {status,color} = Status(role_id)
        return <Tag color={color}>{status}</Tag>
      }
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
      {hasPermission('user_management', 'View Users') && (
        <Menu.Item key="view" onClick={() => history.push(`/app/user-management/user-accounts/account-details/${record}`)}>
          <EyeOutlined /> View
        </Menu.Item>
      )}
      {hasPermission('user_management', 'Edit Users') && (
        <Menu.Item key="edit" onClick={() =>{
          history.push(`user-accounts/edit/${record}`)
        }}>
          <EditOutlined /> Edit
        </Menu.Item>
      )}
      {hasPermission('user_management', 'Delete Users') && (
        <Menu.Item key="delete" onClick={() => {
          setUserToDelete(record)
          setDeleteConfirmationModal(true)
          console.log('Setting user to delete:', record)
        }}>
          <DeleteOutlined /> Delete
        </Menu.Item>
      )}
    </Menu>
  );

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
  };
  const [searchText, setSearchText] = useState('');
  var timeout = ""
  const onSearch = (value) => {
    setSearchText(value.target.value)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getData(value.target.value,selectedStatus==='all'?'':selectedStatus==='pending-approval'?0:selectedStatus==='approved'?1:2);
    }, 500)
  }
   const [selectedStatus, setSelectedStatus] = useState('all');
  const handleStatusChange = (filter) => {
    setSelectedStatus(filter);
    getData(searchText,filter==='all'?'':filter==='pending-approval'?0:filter==='approved'?1:2);

  };



  const FilterMenu = (
    <Menu mode="horizontal">
          <SubMenu key="status" title="Status">
        <Menu.Item key="status-all">
          <Checkbox
            checked={selectedStatus === 'all'}
            onChange={() => handleStatusChange('all')}
          >
            All
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-active">
          <Checkbox
            checked={selectedStatus === 'pending-approval'}
            onChange={() => handleStatusChange('pending-approval')}
          >
            Pending Approval
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-inactive">
          <Checkbox
            checked={selectedStatus === 'approved'}
            onChange={() => handleStatusChange('approved')}
          >
            Approved
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="status-rejected">
          <Checkbox
            checked={selectedStatus === 'rejected'}
            onChange={() => handleStatusChange('rejected')}
          >
            Rejected
          </Checkbox>
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
          <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
        </div>
        {hasPermission('user_management', 'Create New Users') && (
          <div className="mb-2 d-flex align-items-center">
            <Button
              className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
            >
              <Link to={'user-accounts/add-new'}>
                + Add New</Link>
            </Button>
          </div>
        )}
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
            {userToDelete ? ` ${userToDelete.name}'s` : ' this user'} record?</h4>
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
          <h4 style={{ fontWeight: '300', width: '250px' }} className='text-center'>User account deleted successfully!</h4>
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
