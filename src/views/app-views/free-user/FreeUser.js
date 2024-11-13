import Icon, { EyeOutlined, MoreOutlined, SearchOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, Form, Input, Menu, Modal, Radio, Space, Table } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import SubMenu from 'antd/lib/menu/SubMenu';
import { AccountStatusIcon, CsvIcon, FilterIcon } from 'assets/svg/icon';
import Filter from 'components/shared-components/Filter'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const data = [
    {
        id: 1,
        name: "John Doe",
        contact_number: "1234567890",
        email: "johndoe@gmail.com",
        user_since: "2021-09-10",
        status: "Active",
    }
]

function FreeUser() {
    
    const history = useHistory();
    const form = Form.useForm();

    const onFinish = (values) => {

    }

    const handleCancel = () => {
        setModalVisible(false);
    }

    const [modalVisible, setModalVisible] = React.useState(false);

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
    

    const columns = [
        {
            title:"Id",
            dataIndex:"id",
        },
        {
            title:"User Name",
            dataIndex:"name",
        },
        {
            title:"Contact Number",
            dataIndex:"contact_number",
        },
        {
            title:"Email Id",
            dataIndex:"email",
        },
        {
            title:"User Since",
            dataIndex:"user_since",
        },
        {
            title:"Status",
            dataIndex:"status",
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
    ]

    
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="view" onClick={() =>  history.push(`/app/user-management/user-accounts/account-details/${record.id}`)}>
        <EyeOutlined /> View
      </Menu.Item>

      <Menu.Item onClick={() => setModalVisible(true)}>
        <AccountStatusIcon /> Account Status
      </Menu.Item>
    </Menu>
  );

    const onSearch = () => {
        console.log('search')
    }
  return (
    <div>
    <h4> <UserSwitchOutlined /><span style={{
      color: '#6a6a6a',
      fontWeight: '300'
    }}> User Management </span>/ Free User Accounts </h4>
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

export default FreeUser