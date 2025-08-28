import { Button, Menu, Modal, Select, Rate, Switch, Divider, message, Dropdown, Table } from "antd";
import { Space, Tag } from 'antd';
import { BellOutlined, EditOutlined, MoreOutlined, SearchOutlined, DeleteOutlined, AudioOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./notification.css";
import TextArea from "antd/lib/input/TextArea";
import { Input } from 'antd';
import { axiosInstance } from "App";
import moment from "moment";

const { Search } = Input;

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [datas, setData] = useState([]);

  const data = datas.map((value, key) => ({
    key: key.toString(),
    notificationTitle: value.title,
    createdOn: moment(value.created_at).format('dd/mm/yy'),
    lastUpdate: moment(value.update_at).format('dd/mm/yy'),
    status: value.is_active === 1 ? 'active' : 'inactive',
    active: value.is_active === 1,
  }));

  const columns = [
    {
      title: 'Notification Title',
      dataIndex: 'notificationTitle',
      key: 'notificationTitle',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 'active' ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
    },
    {
      title: 'Active/Inactive',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={(checked) => handleSwitchChange(checked, record.key)}
        />
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
      <Menu.Item key="edit" onClick={() => handleEdit(record.key)}>
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.key)}>
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );

  const handleSwitchChange = async (checked, key) => {
    try {
      const response = await axiosInstance.put(`/api/admin/notifications/${key}/update-status`, {
        status: checked ? 1 : 0
      });
      // Update the local state after a successful update
      setData((prevData) =>
        prevData.map((item, index) =>
          index.toString() === key ? { ...item, is_active: checked ? 1 : 0 } : item
        )
      );
    } catch (error) {
      console.error(`Error updating notification status:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/notifications/list');
        setData(response.data.items);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 10000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const operations = (
    <div className="mb-2 d-flex align-items-center">
      <Button className="ml-3 bg-info d-flex align-items-center rounded text-white font-weight-semibold px-4">
        <Link to={'/app/notification/add_notification'}>+ Add New Notification</Link>
      </Button>
    </div>
  );

  const operationsTwo = (
    <div className="mb-2 d-flex align-items-center">
      <Button className="ml-3 bg-info d-flex align-items-center rounded text-white font-weight-semibold px-4">
        <Link to={'/app/notification/add_broadcast_notification'}>+ Add New</Link>
      </Button>
    </div>
  );

  const onDeleteData = (Id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Broadcast notification?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        handleDelete(Id);
      },
    });
  };

  const handleEdit = (key) => {
    console.log('Edit notification with key:', key);
  };

  const handleDelete = async (key) => {
    try {
      await axiosInstance.delete(`/api/admin/notifications/${key}/delete`);
      setData((prevData) => prevData.filter((item, index) => index.toString() !== key));
    } catch (error) {
      console.error(`Error deleting notification with key ${key}:`, error);
    }
  };

  const onSearch = (value) => console.log(value);

  return (
    <div>
      <h4><BellOutlined /> Notifications</h4>
      <div className="d-flex justify-content-between mb-3">
        <div style={{ display: "flex" }}>
          <Space direction="vertical">
            <Input
              placeholder="Search"
              allowClear
              onChange={onSearch}
              style={{ width: 200 }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
          </Space>
        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4">
            <Link to={'/app/notifications/add_notification'}>+ Add New Notification</Link>
          </Button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal width={600} footer={null} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="d-flex mb-3 flex-column">
          <h3 style={{ margin: 0 }} className="font-weight-bold">Performance Ratings</h3>
          <Divider />
          <h5 className="font-weight-bold">Teacher</h5>
          <h5>Wade Smith</h5>
          <br />
          <h5 className="font-weight-bold">Ratings</h5>
          <Rate value={3} />
          <br />
          <h5 className="font-weight-bold">Remarks</h5>
          <TextArea rows={4} />
          <div>
            <Button className="mt-3 bg-info text-white">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
