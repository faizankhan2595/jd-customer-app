import { SettingOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd';
import { LogoWhiteTransparent } from 'assets/svg/icon'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosInstance } from "App";
import { Flex, Spin } from "antd";
import moment from "moment";

const ViewQuotation = () => {
  const {id} = useParams();
  const history = useHistory();
  const [data, setData] = useState({});
  const [quotationData, setQuotationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'sNo',
      key: 'sNo',
    },
    {
      title: 'Faults',
      dataIndex: 'fault',
      key: 'fault',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const getSubtotal = () => {
    let items = quotationData.quotation_line_items;
    let amount = 0;
    if(items) {
      for(let item of items) {
        amount = amount + (+item.total);
      }
    }
    return amount? amount.toFixed(2) : 0.00;
  }

  const getOrderDetails = async () => {
    setIsLoading(true);
    try {
      const res1 = await axiosInstance.get(`/api/web/orders/${id}`);
      let data = res1.data.item;
      setData(data);
      console.log(data);
      if(data.quotation_line_items) {
        let line_items = data.quotation_line_items
        setQuotationData({
          quotation_line_items: line_items,
          discount: data.discount,
          tax_amount: data.tax_amount,
          total_amount: data.total_amount
        })
      }
      else {
        let faults = data.machine_faults
        if (faults) {
          faults = faults.map((e) => {
            return {
              ...e,
              price: null,
              total: null
            }
          })
          setQuotationData({
              quotation_line_items: faults,
              discount: null,
              tax_amount: null,
              total_amount: null
          })
        }
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails()
  }, [])
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>

        <h4> <SettingOutlined /><span style={{
          color: '#6a6a6a',
          fontWeight: '300'
        }}> Order Management / order details </span> / Quotation </h4>
      </div>

      <div className='p-3 bg-white border rounded mt-2'>
        <div style={{
          borderRadius: '10px 10px 0 0',
        }} className='p-4 bg-primary d-flex justify-content-center'>
          <LogoWhiteTransparent />
        </div>
        <div className='p-3 bg-grey rounded mt-3 d-flex justify-content-between'>
          <div style={{ maxWidth: '300px' }}>
            <h4>Quotation</h4>
            <h5>JDWORKS PTE LTD</h5>
            <p style={{ lineHeight: '18px' }} className='mb-2'>info@jdworks.sg</p>
            <p style={{ lineHeight: '18px' }} className='mb-2'>No. 1, Sunview Road,
              #05-27, Eco Tech @Sunview, Singapore 627615</p>
            <p style={{ lineHeight: '18px' }} className='mb-2'>Phone: 8149 2657</p>
          </div>

          <div style={{ maxWidth: '300px' }}>
            <h4 className='text-right'>Customer Details</h4>
            <p style={{ lineHeight: '18px' }} className='mb-2 text-right'>{data.company_name}</p>
          </div>
        </div>
        <div className='transparent mt-4'>
          <Table dataSource={quotationData.quotation_line_items} columns={columns} />
        </div>
        <div className='d-flex justify-content-end'>
          <div style={{ minWidth: '250px', marginRight: '5px' }}>
            <div className='d-flex justify-content-between'>
              <p>
                Subtotal
              </p>
              <h5>S${getSubtotal()}</h5>
            </div>

            <div  className='d-flex justify-content-between'>
              <p>
                Discount
              </p>
              <h5>S${quotationData.discount?.toFixed(2)}</h5>
            </div>
            <div style={{ borderBottom: '1px solid #e7e7e7' }} className='d-flex justify-content-between'>
              <p>
                Tax Amount
              </p>
              <h5>S${quotationData.tax_amount?.toFixed(2)}</h5>
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <h5>
                Net Total:
              </h5>
              <h5>S${quotationData.total_amount?.toFixed(2)}</h5>
            </div>
          </div>
        </div>

      </div>
      <div style={{ gap: '8px' }} className="d-flex justify-content-end mt-3">

          <Space>
            <Button onClick={()=> {
              history.goBack()
            }}>
              Back
            </Button>
          </Space>

        </div>
    </div>
  )
}

export default ViewQuotation