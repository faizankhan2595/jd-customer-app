import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar, Button, Timeline } from 'antd';
import { AssignTechIcon, CommentIcon, ImageIcon, MachineFaultIcon, OrderDetailIcon, SurveyDetIcon, SurveyIcon, SurveyNotFoundIcon, TimelineIcon } from 'assets/svg/icon';
import SurveyNotFoundImage from 'assets/images/—Pngtree—not found_5408094 (1) 1.png'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { isArray } from 'lodash';
import ChatInput from 'components/shared-components/ChatInput';
import { axiosInstance } from 'App';
import moment from 'moment';
const comments = [
    {
        title: 'John Co',
        comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an'
    },
    [
        {
            title: 'Acme Co',
            comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an'
        },
        {
            title: 'Acme Co',
            comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an'
        },
    ]
];
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
                    <h5 className="m-0">Inquiry Generated. </h5>
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
                    <h5 className="m-0">Inquiry Assigned </h5>
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
                    <h5 className="m-0">Admin replied on inquiry </h5>
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
                    <h5 className="m-0">Acme co replied on inquiry  </h5>
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

const InquiryDetails = () => {
    const { id } = useParams();
    const { Inqid } = useParams();
    const location = useLocation();
    const { myCustomState } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [inquiryDetails, setInquiryDetails] = useState({})
    const history = useHistory()
    const handleCancel = () => {
        setModalVisible(false);
      };
    
      const handleSave = (selectedDashboards) => {
        // Handle save logic here
        console.log('Selected Dashboards:', selectedDashboards);
      };
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
    const getInquiryDetail = async () => {
        const res1 = await axiosInstance.post(`api/admin/inquires/list`,{
            "company_id": id,
            "inquiry_id": Inqid
            })
            setInquiryDetails(res1.data[0])
    }
    useEffect(() => {
      getInquiryDetail()

    }, [])
    
    return (
        <div>
            <div className='d-flex justify-content-between'>

                <h4> <TeamOutlined /><span style={{
                    color: '#6a6a6a',
                    fontWeight: '300'
                }}> Customer Management / Customers Accounts</span> / Inquiry Details </h4>
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
                        <span className="ml-2">Inquiry Details</span>
                    </h4>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Inquiry Id
                            </p>
                            <h5>{inquiryDetails?.inquiry_id}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Inquiry Date
                            </p>
                            <h5>{moment(inquiryDetails?.created_at).format('DD-MMM-YYYY')}</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Company Name
                            </p>
                            <h5>{inquiryDetails?.company_name}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Email
                            </p>
                            <h5>{inquiryDetails?.email}</h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Phone Number
                            </p>
                            <h5>+61 {inquiryDetails?.phone_number}</h5>
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
                            <h5>{inquiryDetails?.jobsite}</h5>
                        </div>
                    </div>
                    <h4 className="mt-5">Address</h4>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Postal Code
                            </p>
                            <h5>{inquiryDetails?.postal_code}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Block Number
                            </p>
                            <h5>{inquiryDetails?.block_number}</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Street Name
                            </p>
                            <h5>{inquiryDetails?.street_number}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Unit Number
                            </p>
                            <h5>{inquiryDetails?.unit_number}</h5>
                        </div>
                    </div>

                    <div className="d-flex mt-4 mb-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Level Number
                            </p>
                            <h5>{inquiryDetails?.level_number}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Country
                            </p>
                            <h5>SG</h5>
                        </div>
                    </div>
                    <div
                        style={{
                            borderTop: "1.5px solid #d9d9d9",
                            width: "97%",
                            margin: "auto",
                        }}
                    ></div>
                    <div className="d-flex mt-4">
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Inquiry Type
                            </p>
                            <h5>{inquiryDetails?.inquiry_type}</h5>
                        </div>
                        <div className="w-50">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Machine
                            </p>
                            <h5>{inquiryDetails?.machine}</h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4">
                        <div className="w-75">
                            <p style={{ color: "black" }} className="m-0 mb-1">
                                Inquiry Details
                            </p>
                            <h5>{inquiryDetails?.inquiry_detail}</h5>
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
            <div>
                <div
                    // style={{ width: "68%" }}
                    className="p-3 bg-white border rounded mt-2"
                >
                    <h4 className="d-flex m-0">
                        {" "}
                        {/* <div dangerouslySetInnerHTML={{ __html: PersDetHead }}></div>{" "} */}
                        <CommentIcon />
                        <span className="ml-2">Comments</span></h4>

                    <div>
                        {
                            comments.map(function (comment, index) {
                                return (
                                    <div className='m-3'>
                                        <h4 style={{display:'flex',gap:'5px'}}>
                                        {
                                            isArray(comment)?null:
                                            <Avatar src={"https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={`Avatar`} style={{ width: '22px', height: '22px' }}/> 
                                        }
                                        {comment?.title}</h4>
                                        <p>{comment?.comment}</p>
                                        {
                                            isArray(comment)?null:<div
                                            style={{
                                                borderTop: "1.5px solid #d9d9d9",
                                                width: "98%",
                                                margin: "auto",
                                            }}
                                        ></div>
                                        }
                                        {
                                            isArray(comment) ? comment.map(function (comm, index) {
                                                return (
                                                    <div className='pl-4 border-dashed pt-2'>
                                                        <h4 style={{display:'flex',gap:'5px'}}><Avatar src={"https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={`Avatar`} style={{ width: '22px', height: '22px' }}/> {comm?.title}</h4>
                                                        <p className='m-0'>{comm?.comment}</p>
                                                    </div>
                                                )
                                            }) : ''
                                        }
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div
                        style={{
                            borderTop: "1.5px solid #d9d9d9",
                            width: "97%",
                            margin: "2rem auto",
                        }}
                    ></div>
                    <ChatInput/>
                    {/* <TextEditor/> */}
                </div>
            </div>
            <div style={{ gap: '8px' }} className="d-flex justify-content-end mt-3">
                <Button className="px-5" onClick={() => history.goBack()}>Close</Button>
                {/* <Button className="bg-primary text-white px-5" onClick={()=>{history.push(`schedule-order/${id}`,{ myCustomState: 'Hello from MyComponent' })}}>Schedule</Button> */}
            </div>
        </div>
    )
}

export default InquiryDetails
