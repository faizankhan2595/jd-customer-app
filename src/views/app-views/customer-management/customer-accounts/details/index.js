import { DashboardOutlined, EyeOutlined, MoreOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon';
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, Modal, Space, Table, Tabs, Tag } from 'antd'
import Item from 'antd/lib/list/Item';
import SubMenu from 'antd/lib/menu/SubMenu';
import { CsvIcon, CustomerAccountIcon, EmailIcon, ExploreIcon, FilterIcon, InquiryIcon, InquiryStatusIcon, ManagersIcon, PhoneIcon, SettingsIcon } from 'assets/svg/icon';
import Filter from 'components/shared-components/Filter';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';

import { Form, Radio } from 'antd';
import { axiosInstance } from 'App';
import moment from 'moment';
const CustomerDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { myCustomState } = location.state || {};
  const [customer, setCustomer] = useState({})
  const [inquiryList, setInquiryList] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSave = (selectedDashboards) => {
    // Handle save logic here
    console.log('Selected Dashboards:', selectedDashboards);
  };
  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can handle form submission logic here
  };

  const columnsInquiry = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Inquiry Details',
      dataIndex: 'inquiry_detail',
      key: 'inquiry_detail',
    },
    {
      title: 'Inquiry Type',
      dataIndex: 'inquiry_type',
      key: 'inquiry_type',
    },
    // {
    //   title: 'Membership Type',
    //   dataIndex: 'membershipType',
    //   key: 'membershipType',
    // },
    {
      title: 'Created On',
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
  const dummyOrdersData = [
    {
      id: 1,
      image: 'https://example.com/avatar1.jpg',
      Jobsite: 'Construction Site A',
      Area: 'Zone 1',
      Machine: 'Excavator',
      Sensor: 'Vibrator',
      userSince: '2022-01-10',
      status: true,
    },
    {
      id: 2,
      image: 'https://example.com/avatar2.jpg',
      Jobsite: 'Construction Site B',
      Area: 'Zone 2',
      Machine: 'Bulldozer',
      Sensor: 'Vibrator',
      userSince: '2022-02-20',
      status: false,
    },
    {
      id: 3,
      image: 'https://example.com/avatar3.jpg',
      Jobsite: 'Construction Site C',
      Area: 'Zone 3',
      Machine: 'Crane',
      Sensor: 'Vibrator',
      userSince: '2022-03-15',
      status: true,
    },
    // Add more dummy data as needed
  ];
  const dummyData = [
    {
      id: 1,
      inquiryDetails: 'General Inquiry from John Doe',
      inquiryType: 'General Inquiry',
      userSince: '2022-01-01',
      status: true,
    },
    {
      id: 2,
      inquiryDetails: 'Support Request from Jane Smith',
      inquiryType: 'Support Request',
      userSince: '2022-02-15',
      status: false,
    },
    {
      id: 3,
      inquiryDetails: 'Product Inquiry from Alice Johnson',
      inquiryType: 'Product Inquiry',
      userSince: '2022-03-20',
      status: true,
    },
    // Add more dummy data as needed
  ];
  const getMenu = (_id) => (
    <Menu>
      <Menu.Item key="edit">
        <Link style={{color:'#475569'}} className='d-flex align-items-center' to={`${id}/inquiry-details/${_id}`}>
        <EyeOutlined /><span className='d-block ml-2'>View Detail</span></Link>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => setModalVisible(true)}>
        <InquiryStatusIcon />Inquiry Status
      </Menu.Item>
    </Menu>
  );
  const getMenuOrders = (_id) => (
    <Menu>
      <Menu.Item key="edit">
        <Link className='d-flex align-items-center' to={`/app/order-management/order-detail/${_id}`}>
        <EyeOutlined /><span className='d-block ml-2'>View Detail</span></Link>
      </Menu.Item>
    </Menu>
  );

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
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    // {
    //   title: 'Membership Type',
    //   dataIndex: 'membershipType',
    //   key: 'membershipType',
    // },
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
  ];
  const columnsOrders = [
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
      title: 'Jobsite',
      dataIndex: 'Jobsite',
      key: 'Jobsite',
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
    },
    {
      title: 'Machine',
      dataIndex: 'Machine',
      key: 'Machine',
    },
    {
      title: 'Sensor',
      dataIndex: 'Sensor',
      key: 'Sensor',
      cell: (value) => {
        return <>Vibrator</>
      }
    },
    {
      title: 'Order Date',
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
          <Dropdown overlay={getMenuOrders(record.id)} placement="bottomRight" trigger={['hover']}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const dataone = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      username: 'Customer Organization 1',
      contactNumber: '123-456-7890',
      membershipType: 'Premium',
      email: 'customer1@example.com',
      userSince: '2022-01-01',
      status: true,
    },
    // Add more data entries as needed
  ];
  const tabData = [
    {
      key: '1',
      tabTitle: 'Tab 1',
      tableData: [
        { key: '1', name: 'John Doe', age: 30, address: '123 Main St' },
        { key: '2', name: 'Jane Smith', age: 25, address: '456 Oak St' },
      ],
    },
    {
      key: '2',
      tabTitle: 'Tab 2',
      tableData: [
        { key: '3', name: 'Bob Johnson', age: 40, address: '789 Elm St' },
        { key: '4', name: 'Alice Williams', age: 35, address: '101 Pine St' },
      ],
    },
    // Add more tabs as needed
  ];
  const FilterMenu = (
    <Menu mode="horizontal">
      <SubMenu key="item1" title="Job site">
        <Item key="subitem1">
          <Checkbox>All</Checkbox>
        </Item>{" "}
        <Item key="subitem2">
          <Checkbox>Job site 1</Checkbox>
        </Item>
        <Item key="subitem3  ">
          <Checkbox>Job site 2</Checkbox>
        </Item>
      </SubMenu>
      <SubMenu key="item2" title="Area">
        <Menu.Item key="subitem4">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem5">
          <Checkbox>Bedok</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem6  ">
          <Checkbox>Woodland</Checkbox>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="item3" title="Status">
        <Menu.Item key="subitem7">
          <Checkbox>All</Checkbox>
        </Menu.Item>{" "}
        <Menu.Item key="subitem8">
          <Checkbox>Active</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem9  ">
          <Checkbox>Terminated</Checkbox>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
  const items = [
    {
      label: (
        <div className="d-flex align-items-center">
          <CustomerAccountIcon color={"#3CA6C1"} />
          <span className="ml-2">
            Customer Admin</span>
        </div>
      ),
      key: 1,
      children: (
        <>

          <div className="ml-2 mb-3" style={{ display: "flex" }}>
            <Space direction="vertical">
              <Input
                placeholder="Search"
                allowClear
                onChange={(text) => console.log(text)}
                style={{
                  width: 200,
                }}
                prefix={<SearchOutlined style={{ marginRight: 8 }} />}
              />
            </Space>
            <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
          </div>
          <div className="p-3 bg-white border rounded ml-1">
            <div>
              <Table dataSource={dataone} columns={columns} />
            </div>

          </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <ManagersIcon />
          <span className="ml-2">Managers</span>
        </div>
      ),
      key: 2,
      children: (
        <>
                  <div className="ml-2 mb-3" style={{ display: "flex" }}>
            <Space direction="vertical">
              <Input
                placeholder="Search"
                allowClear
                onChange={(text) => console.log(text)}
                style={{
                  width: 200,
                }}
                prefix={<SearchOutlined style={{ marginRight: 8 }} />}
              />
            </Space>
            <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
          </div>
        <div className="p-3 bg-white border rounded ml-1">

          <div>
            <Table dataSource={dataone} columns={columns} />
          </div>

        </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <ManagersIcon />
          <span className="ml-2">Customer Users</span>
        </div>
      ),
      key: 3,
      children: (
        <>
                  <div className="ml-2 mb-3" style={{ display: "flex" }}>
            <Space direction="vertical">
              <Input
                placeholder="Search"
                allowClear
                onChange={(text) => console.log(text)}
                style={{
                  width: 200,
                }}
                prefix={<SearchOutlined style={{ marginRight: 8 }} />}
              />
            </Space>
            <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button>
          </div>
        <div className="p-3 bg-white border rounded ml-1">

          <div>
            <Table dataSource={tabData[0].tableData} columns={columns} />
          </div>

        </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <InquiryIcon />
          <span className="ml-2">Inquiry</span>
        </div>
      ),
      key: 4,
      children: (
        <>
        <div className="d-flex justify-content-between mb-3 mr-1 ml-2" style={{    alignItems: 'baseline'}}>
            <div className="" style={{ display: "flex" }}>
              <Space direction="vertical">
                <Input
                  placeholder="Search"
                  allowClear
                  onChange={(text) => console.log(text)}
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
              <h5>Ops admin in charge : <Avatar src={"https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={`Avatar`} style={{ width: '22px', height: '22px' }}/> Wade warren</h5>
            </div>
          </div>
        <div className="p-3 bg-white border rounded ml-1">
          
          <div>
            <Table dataSource={inquiryList} columns={columnsInquiry} />
          </div>

        </div>
        </>
      ),
    },
    {
      label: (
        <div className="d-flex align-items-center">
          <SettingsIcon />
          <span className="ml-2">Orders</span>
        </div>
      ),
      key: 5,
      children: (
        <>
        <div className="d-flex justify-content-between mb-3 mr-1 ml-2" style={{    alignItems: 'baseline'}}>
            <div className="" style={{ display: "flex" }}>
              <Space direction="vertical">
                <Input
                  placeholder="Search"
                  allowClear
                  onChange={(text) => console.log(text)}
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
              {/* <h5>Ops admin in charge : <Avatar src={"https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={`Avatar`} style={{ width: '22px', height: '22px' }}/> Wade warren</h5> */}
            </div>
          </div>
        <div className="ml-2 p-3 bg-white border rounded ml-1">

          <div>
            <Table dataSource={dummyOrdersData} columns={columnsOrders} />
          </div>

        </div>
        </>
      ),
    },
  ];
  const getCustomerDetail = async () => { 
    const res1 = await axiosInstance.post(`api/admin/customer/list`,{id:id});
    setCustomer(res1.data[0]);
  }
  const getInquiryList = async () => { 
    const res1 = await axiosInstance.post(`api/admin/inquires/list`,{company_id:id});
    setInquiryList(res1.data);
  }
  useEffect(() => {
    getCustomerDetail()
    getInquiryList();
  }, [])
  
  return (
    <div>
      <h4> <TeamOutlined /><span style={{
        color: '#6a6a6a',
        fontWeight: '300'
      }}> Customer Management </span>/ Customers Accounts </h4>
      <div className="d-flex mt-3" style={{ height: "80vh", overflow: 'auto' }}>
        <div
          style={{
            width: "22%",
            background: "white",
            height: "100%",
          }}
        >
          <div className="d-flex justify-content-center mt-3">
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              src={customer?.flag_icon}
              alt="..."
            />
          </div>
          <h4 className="text-center mt-3 mb-0">
            {customer?.name}
          </h4>
          <p className="text-center mb-1 text-gray">
            #{id} | Free
          </p>
          <Button style={{ margin: 'auto' }} className='d-block mb-4'>
            Edit Details
          </Button>
          <div
            style={{
              borderTop: "0.5px solid #b2adad",
              width: "90%",
              margin: "auto",
            }}
          ></div>
          <div className="p-3">
            <h5>Contact</h5>
            <div className="d-flex" style={{ marginTop: "15px" }}>
              <div
                style={{
                  marginRight: "12px",
                  color: "grey",
                  marginBottom: "12px",
                }}
              >
                <PhoneIcon/>
              </div>
              <div>+{customer?.phonecode} {customer?.phone_no}</div>
            </div>

            <div className="d-flex">
              <div
                style={{
                  marginRight: "12px",
                  color: "grey",
                  marginBottom: "12px",
                }}
              >
                <EmailIcon/>
              </div>
              <div>Bedok-Bidadari Park Drive
                Singapore</div>
            </div>
            <div className="d-flex">
              <div
                style={{
                  marginRight: "12px",
                  color: "grey",
                  marginBottom: "12px",
                }}
              >
                <ExploreIcon/>
              </div>
              <div>{customer?.email}</div>
            </div>
          </div>
          <div
            style={{
              borderTop: "0.5px solid #b2adad",
              width: "90%",
              margin: "auto",
            }}
          ></div>
          <div className='p-3'>
            <div className='displayCenter mb-2'>
              <p>Total Admins</p>
              <span className='totalAdminCircle'>
                05
              </span>
            </div>
            <div className='displayCenter mb-2'>
              <p>Total Admins</p>
              <span className='totalUserCircle'>
                05
              </span>
            </div>
            <div className='displayCenter mb-2'>
              <p>Total Admins</p>
              <span className='totalManagerCircle'>
                05
              </span>
            </div>
          </div>
        </div>
        <div style={{ width: "78%" }} className='pl-3'>
          <div className="customTableBackground">
            <Tabs>
              {items.map((item) => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                  {item.children}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>

      <Modal
      title={'Inquiry Status'}
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
      {/* Inquiry Status Radio Group */}
      <Form.Item
        label="Inquiry Status"
        name="inquiryStatus"
        rules={[{ required: false, message: 'Please select an inquiry status' }]}
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
        <Button className='bg-primary text-white ml-2' type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
    </Modal>
    </div>
  )
}

export default CustomerDetails
