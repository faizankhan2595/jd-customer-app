import { Button, Menu, Modal, Select, Rate, Switch, Divider, message, Dropdown, Table, Checkbox, Empty, Card } from "antd";
import { Space, Tag } from 'antd';
import { BellOutlined, EditOutlined, EyeOutlined, MoreOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Filter from "components/shared-components/Filter";
import { useHistory } from 'react-router-dom';
import { CsvIcon, FilterIcon } from "assets/svg/icon";
import { axiosInstance } from "App";
import CalendarIcon from "assets/calendar.png"
import moment from "moment";
import CardOrder from "./Card/CardOrder";
import SubMenu from "antd/lib/menu/SubMenu";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState('all');
  const [searchText, setSearchText] = useState('');
  var timeout = ""
  const onSearch = (value) => {
    setSearchText(value.target.value)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getData(value.target.value)
    }, 500)
  }

  const getData = async (Search="",filter="all",type="all") => {
    let url = `?customer_id=${localStorage.getItem("parent_id")!="null"? localStorage.getItem("parent_id"):localStorage.getItem("user_id")}&search=${Search}`
    //for 0 it is not handling
    if((filter !== '' && filter != 'all')) {
      url += `&status=${filter}`
    }
    if((type !== '' && type != 'all')) {
      url += `&inquiry_type=${type}`
    }
    try {
      const response = await axiosInstance.get('api/web/inquiries' + url);
      if (response.status === 200) {
        setData(response.data.items);
        // console.log(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleService = (filter) => {
    setSelectedWorkshop(filter);
    getData(searchText, selectedFilter, filter);

  };

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
              getData(searchText, 1, selectedWorkshop);
              setSelectedFilter(1)
            }}
            checked={selectedFilter == 1}

          >Open</Checkbox>
        </Menu.Item>
        <Menu.Item key="subitem3"

        >
          <Checkbox onChange={() => {
            getData(searchText, 0, selectedWorkshop);
            setSelectedFilter(0)
          }}

            checked={selectedFilter === 0}>Closed</Checkbox>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="inquiryType" title="Inquiry Type">
        <Menu.Item key="inquiry-all">
          <Checkbox
            checked={selectedWorkshop === 'all'}
            onChange={() => {
              getData(searchText, selectedFilter, 'all');
              setSelectedWorkshop('all')
            }}
          >
            All
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="service-onsite">
          <Checkbox
            checked={selectedWorkshop === 'General Inquiry'}
            onChange={() =>{
              handleService('General Inquiry')
              // setSelectedWorkshop('General Inquiry')
            }}
          >
            General Inquiry
          </Checkbox>
         

        </Menu.Item>
        <Menu.Item key="service-workshop">
         <Checkbox
            checked={selectedWorkshop === 'Machine Inquiry'}
            onChange={() => handleService('Machine Inquiry')}
          >
            Machine Inquiry
          </Checkbox>
        </Menu.Item>

      </SubMenu>
    </Menu>
  );

  return (
    <div>

      <h4> <SettingOutlined /> Inquiry Management</h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="" style={{ display: "flex" }}>
          {/* <Space direction="vertical">
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
          </Space> */}
          <Filter filters={FilterMenu}>
            <Button
              icon={<Icon component={FilterIcon} />}
              className="d-flex align-items-center ml-2"
            >
              Filters
            </Button>
          </Filter>
          {/* <Filter filters={FilterMenu}>
            <Button
              icon={<Icon component={FilterIcon} />}
              className="d-flex align-items-center ml-2"
            >
              Filters
            </Button>
          </Filter>
          <Button icon={<Icon component={CsvIcon} />} className="d-flex align-items-center ml-2" >Export</Button> */}

        </div>
        <div className="mb-2 d-flex align-items-center">
          <Button
            // onClick={showModal}
            className="ml-3 bg-primary d-flex align-items-center rounded text-white font-weight-semibold px-4"
          >
            <Link to={'/app/inquiry-management/new-inquiry'}>
              + New Inquiry</Link>
          </Button>
        </div>
      </div>
      {
        data.length!==0?
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          // justifyContent: "space-between",
          gap: "20px",
        }}>
          {
            data.map((item, index) => (
              <CardOrder key={index} data={item} />
            ))}
        </div>:
       <Card>
         <Empty />
       </Card>

      }

    </div>
  )
}

export default Index