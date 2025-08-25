import { SettingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Modal, Space, Table } from 'antd';
import { LogoWhiteTransparent } from 'assets/svg/icon'
import Sign from "assets/OrderDetail/signature.png"
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

const ViewQuotation = () => {
  const [visible, setVisible] = React.useState(false)
  const sigCanvas = React.useRef({});
  const dataSource = [
    {
      id: 1,
      machines: 'Machine 1',
      faults: 'Fault 1',
      services: 'Service 1',
      price: 100,
      total: 150,
    },
    {
      id: 2,
      machines: 'Machine 2',
      faults: 'Fault 2',
      services: 'Service 2',
      price: 120,
      total: 180,
    },
  ];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Machines',
      dataIndex: 'machines',
      key: 'machines',
    },
    {
      title: 'Faults',
      dataIndex: 'faults',
      key: 'faults',
    },
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
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
            <h4>JD123446-QTN</h4>
            <h5>JDWORKS PTE LTD</h5>
            <p style={{ lineHeight: '18px' }} className='mb-2'>info@jdworks.sg</p>
            <p style={{ lineHeight: '18px' }} className='mb-2'>No. 1, Sunview Road,
              #05-27, Eco Tech @Sunview, Singapore 627615</p>
            <p style={{ lineHeight: '18px' }} className='mb-2'>Phone: 8149 2657</p>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <h4 className='text-right'>Customer Details</h4>
            <h5 className='text-right'> #123-Acme co pte ltd</h5>
            <p style={{ lineHeight: '18px' }} className='mb-2 text-right'>acme@gmail.com</p>
            <p style={{ lineHeight: '18px' }} className='mb-2 text-right'>1111 ABC Road, XYZ Tower,
              EST 113 Singapore, 120023</p>
            <p style={{ lineHeight: '18px' }} className='mb-2 text-right'>Phone: 52654533</p>
          </div>
        </div>
        <div className='transparent mt-4 mb-4'>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <div className='d-flex justify-content-between'>
          <Space>
            <div>
              <img src={Sign} alt="signature" />
              <div>John Doe</div>
              <div>08/11/2022, 10:025 Am</div>
              <Button onClick={() => {
                setVisible(true)
              }} className='bg-primary text-white'>Sign</Button>
            </div>
          </Space>
          <div style={{ minWidth: '250px', marginRight: '5px' }}>
            <div className='d-flex justify-content-between'>
              <p>
                Subtotal
              </p>
              <h5>S$100.00</h5>
            </div>
            <div className='d-flex justify-content-between'>
              <p>
                Gst <span className='bg-primary text-white' style={{ fontSize: "10px", padding: '2px' }}>8%</span>
              </p>
              <h5>S$08.00</h5>
            </div>
            <div style={{ borderBottom: '1px solid #e7e7e7' }} className='d-flex justify-content-between'>
              <p>
                Discount <span className='bg-primary text-white' style={{ fontSize: "10px", padding: '2px' }}>10%</span>
              </p>
              <h5>S$10.00</h5>
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <h5>
                Net Total:
              </h5>
              <h5>S$98.00</h5>
            </div>
          </div>
        </div>

      </div>
      <div style={{ gap: '8px' }} className="d-flex justify-content-end mt-3">

        <Space>
          <Button>
            Cancel
          </Button>
          <Button className='bg-primary text-white'>
            Download PF
          </Button>
          {/* <Button className='bg-primary text-white'>
              Send
            </Button> */}
        </Space>

      </div>
      <Modal title="Signature" visible={visible} onOk={() => { }} onCancel={() => {
        setVisible(false)
      }}>
        <div style={{
          outlineStyle: "dashed",
          outlineColor: "#E6EBF1",
          borderRadius: "12px",
        }}>
          <SignatureCanvas
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            ref={sigCanvas}
          />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "end",
          color: "#FF6A00",
          width: "100%",
          marginTop: "10px",

        }}>
          <div style={{
            borderBottom: "1px solid #FF6A00",
            cursor: "pointer"
          }}
            onClick={() => {
              sigCanvas.current.clear()
            }}
          >Clear</div>

        </div>
        <div>
          <Checkbox style={{
            fontWeight: "bold",
          }}>By signing, I hereby acknowledged and agree to the terms & conditions of JD Works. </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default ViewQuotation