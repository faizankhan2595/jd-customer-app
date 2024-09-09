import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Modal, Timeline } from 'antd';
import { AssignTechIcon, ImageIcon, MachineFaultIcon, OrderDetailIcon, SurveyDetIcon, SurveyIcon, SurveyNotFoundIcon, TimelineIcon } from 'assets/svg/icon';
import SurveyNotFoundImage from 'assets/images/—Pngtree—not found_5408094 (1) 1.png'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const CustTimeline = () => {
    const items = [
        {
            color: "#0078FF",
            children: (
                <>
                    <h5 className="m-0">Order Generated</h5>
                    <p className="m-0">

                        {true
                            ? new Date().toLocaleDateString()
                            : "Not yet initiated"}
                    </p>
                </>
            ),
        },
        {
            color: "#C05DEF",
            children: (
                <>
                    <h5 className="m-0">Order Assigned</h5>
                    <p className="m-0"> {false
                        ? new Date().toLocaleDateString()
                        : "Not yet submitted"}</p>
                </>
            ),
        },
        {
            color: "#05ADA3",
            children: (
                <>
                    <h5 className="m-0">John smith Replied On Incquiry </h5>
                    <p className="m-0">{true
                        ? `${new Date().toLocaleDateString()}`
                        : "Not yet reviewed"}</p>
                </>
            ),
        },
        {
            color: "#FAD320",
            children: (
                <>
                    <h5 className="m-0">Acme co Replied On Incquiry  </h5>
                    <p className="m-0">{true
                        ? new Date().toLocaleDateString()
                        : "Not yet sent"}</p>
                </>
            ),
        },
        {
            color: "#499DFB",
            children: (
                <>
                    <h5 className="m-0">Inquiry convert to customer account </h5>
                    <p className="m-0">{true
                        ? new Date().toLocaleDateString()
                        : "Not yet sent"}</p>
                </>
            ),
        },
    ];

    return (
        <>
            <h4 className="d-flex m-0">
                {" "}
                <TimelineIcon />
                <span className="ml-2">Order Timeline</span>
            </h4>
            <div className="my-4">
                <Timeline>
                    {items.map((item, index) => (
                        <Timeline.Item key={index} color={item.color} dot={item.dot}>
                            {item.children}
                        </Timeline.Item>
                    ))}
                </Timeline>
            </div>
        </>
    );
}

const OrderDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { myCustomState } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    
  const history = useHistory()
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div>
            <div className='d-flex justify-content-between'>

            <h4> <TeamOutlined /><span style={{
                    color: '#6a6a6a',
                    fontWeight: '300'
                }}> Customer Management / Customers Accounts</span> / Order Details </h4>
                <div className='d-flex flex-column align-items-end'>
                    <span style={{ color: 'white', padding: '3px 24px', borderRadius: '5px', background: '#00AB6F', fontWeight: '600', fontSize: '16px' }} className=''>Active</span>
                    <p className=''>Since 16 Jan 2022, 10:02:36 AM</p>
                </div>
            </div>
            {/* <p>ID: {id}</p>
     {myCustomState && <p>{myCustomState}</p>} */}
            <div className="d-flex">
                <div
                    style={{ width: "68%" }}
                    className="p-3 bg-white border rounded mr-1"
                >
                    <h4 className="d-flex m-0">
                        {" "}
                        {/* <div dangerouslySetInnerHTML={{ __html: PersDetHead }}></div>{" "} */}
                        <OrderDetailIcon />
                        <span className="ml-2">Order Details</span>
                    </h4>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Order Id
                            </p>
                            <h5>{id}</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Company Name
                            </p>
                            <h5>Acme co</h5>
                        </div>
                    
                    <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Area
                            </p>
                            <h5>Bedok</h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4">
                      
                    <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Job site
                            </p>
                            <h5>pumping station 1</h5>
                        </div>
                    </div>
                    
                    <h4 className="mt-5">Address</h4>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Postal Code
                            </p>
                            <h5>64521</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Block Number
                            </p>
                            <h5>21</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Street Name
                            </p>
                            <h5>arer colony</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Unit Number
                            </p>
                            <h5>11</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4 mb-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Level Number
                            </p>
                            <h5>11</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Country
                            </p>
                            <h5>SG</h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Maintenance Service Type
                            </p>
                            <h5>Onsite</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Machine Name
                            </p>
                            <h5>Centrifugal Pump</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Machine Make
                            </p>
                            <h5>hjgj</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Machine Model
                            </p>
                            <h5>jghh</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4 mb-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Sensor
                            </p>
                            <h5>jhgj</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Sensor Location
                            </p>
                            <h5>jhgj</h5>
                        </div>
                    </div>
                </div>
                <div
                    style={{ width: "32%" }}

                >
                    <div style={{ height: '35%', paddingBottom: '0.6rem' }}>
                        <div style={{ minHeight: '100%' }} className="p-3 bg-white border rounded ml-1 customimgUploader" >
                            <h4 className="d-flex m-0 mb-2">
                                <ImageIcon />
                                <span className="ml-2">Machine Pictures/Videos</span>
                            </h4>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </div>
                    </div>
                    <div style={{ height: '65%' }}>

                        <div style={{ minHeight: '100%' }} className="p-3 bg-white border rounded ml-1" >

                            <CustTimeline />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-2">
                <div
                    style={{ width: "68%" }}
                    className="p-3 bg-white border rounded mr-1"
                >
                    <h4 className="d-flex m-0">
                        <MachineFaultIcon />
                        <span className="ml-2">Machine Faults</span>
                    </h4>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Machine Fault
                            </p>
                            <h5>Pump Vibrations</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-75">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Fault Details
                            </p>
                            <h5>loreum ipsum is dummy text. loreum ipsum is dummy text.loreum ipsum is dummy text.
                                loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.
                                loreum ipsum is dummy text.</h5>
                        </div>
                    </div>
                </div>
                <div
                    style={{ width: "32%" }}

                >
                    <div>
                        <div className="p-3 bg-white border rounded ml-1" >
                            <h4 className="d-flex m-0">
                                <AssignTechIcon />
                                <span className="ml-2">Assign Technicians</span>
                            </h4>
                            <div className="d-flex mt-4">
                                <div className="w-50">
                                    <p style={{ color: "black" }} className="m-0 mb-1">
                                        Technicians
                                    </p>
                                    <h5> Robert Fox</h5>
                                </div>
                            </div>

                            <div className="d-flex mt-4">
                                <div className="w-75">
                                    <p style={{ color: "black" }} className="m-0 mb-1">
                                        Add Instructions
                                    </p>
                                    <h5>Lorem Ipsum is simply dummy text of
                                        the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's
                                        standard dummy text ever since the
                                        1500s, when an
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-2">
                <div
                    style={{ width: "68%" }}
                    className="p-3 bg-white border rounded mr-1"
                >
                    <h4 className="d-flex m-0">
                        <SurveyIcon/>
                        <span className="ml-2">Scheduled Survey</span>
                    </h4>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Date of Survey
                            </p>
                            <h5>15/11/2022</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Survey Time Slot
                            </p>
                            <h5>01:00 To 06:00 PM</h5>
                        </div>
                    </div>

                    <h4 className="mt-5">Job Site Address</h4>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Postal Code
                            </p>
                            <h5>64521</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Block Number
                            </p>
                            <h5>21</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Street Name
                            </p>
                            <h5>arer colony</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Unit Number
                            </p>
                            <h5>11</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4 mb-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Level Number
                            </p>
                            <h5>11</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Country
                            </p>
                            <h5>SG</h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4">
                                <div className="w-75">
                                    <p style={{ color: "black" }} className="m-0 mb-1">
                                        Customer Remarks
                                    </p>
                                    <h5>Lorem Ipsum is simply dummy text of
                                        the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's
                                        standard dummy text ever since the
                                        1500s, when an
                                    </h5>
                                </div>
                            </div>
                </div>
                <div
                    style={{ width: "32%",minHeight:'100%' }}

                >
                    <div style={{height:'100%'}} >
                        <div style={{height:'100%'}} className="p-3 bg-white border rounded ml-1" >
                            <h4 className="d-flex m-0">
                                <SurveyDetIcon />
                                <span className="ml-2">Survey Details</span>
                            </h4>
                            {
                                true ? <>
                                <div className='d-flex flex-column justify-content-center mt-3'>

                                <img style={{
                                    width: '200px',
                                    margin:'auto',
                                }} src={SurveyNotFoundImage} alt='...'/>
                                <p className='text-center mt-3'>Survey details not available yet! </p>
                                </div>
                                </>:''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{gap:'8px'}} className="d-flex justify-content-end mt-3">
        <Button className="px-5" onClick={()=>history.goBack()}>Close</Button>
        {/* <Button className="bg-primary text-white px-5" onClick={()=>{history.push(`schedule-order/${id}`,{ myCustomState: 'Hello from MyComponent' })}}>Schedule</Button> */}
      </div>
        </div>
    )
}

export default OrderDetail
