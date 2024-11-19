import { SettingOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Input, Modal, Tag, Timeline } from 'antd'
import React, { useState } from 'react'
import Icon1 from "assets/OrderDetail/question (4) 1.png"
import Icon2 from "assets/OrderDetail/precision_manufacturing_black_24dp 1 (1).png"
import Icon3 from "assets/OrderDetail/comments 1.png"
import Icon4 from "assets/OrderDetail/perm_media_black_24dp 1.png"
import SampleImage from "assets/OrderDetail/360_F_185851253_EmJWmKOrReArl27PN6bVVV5fOanRiCCm 1.png"
import Icon5 from "assets/OrderDetail/task_black_24dp (4) 1.png"
import Icon6 from "assets/OrderDetail/analytics-icon 1.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import TravelerRemarksLabel from './TravelerRemarks/TravelerRemarksLabel'
import TravelerRemarks from './TravelerRemarks/TravelerRemarks'

function InquiryDetails() {
    const history = useHistory()
    const [reamarks, setRemarks] = useState([
        {
            addedByName: 'John Doe',
            createdAt: '16 Jan 2022',
            filePath: '',
            remarks: 'This is a dummy remark',
            editedLogs: [{
                addedByName: 'John Doe',
                createdAt: '16 Jan 2022',
                filePath: '',
                remarks: 'This is a dummy remark',
            }]
        }
    ]);
    const [remarksReplying, setRemarksReplying] = useState('');
    const [remarksReply, setRemarksReply] = useState([]);
    const [labelRemarksReply, setLabelRemarksReply] = useState([]);
    const [remarksModal, setRemarksModal] = useState(false);
    return (
        <div>
            <h4> <SettingOutlined /><span
                style={{
                    color: "#6a6a6a",
                    fontWeight: "300",
                }}
            >
                {" "}
                Inquiry Management
            </span>{" "}
                / Inquiry Details{" "}</h4>

            <div style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "right",
                gap: "20px",
            }}>

                <div>
                    <Tag color='green' style={{
                        padding: "3px 30px",
                    }}>Active</Tag>
                    <div style={{
                        color: "#72849A",
                        fontSize: "12px",
                        fontWeight: "400",
                        marginTop: "5px"
                    }}>
                        Since 16 Jan 2022, 10:02 AM
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                <div style={{
                    width: "71%"
                }}>

                    {/* Card 1  */}

                    <Card title={
                        <div style={{
                            display: "flex",
                            gap: "10px",

                            alignItems: "center"
                        }}>
                            <img src={Icon1} />
                            <span style={{
                                fontWeight: "bold",
                                fontSize: "17px",
                                color: "#000"
                            }}>Inquiry Details</span>
                        </div>
                    }>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "40px"
                        }}>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Inquiry Date</div>
                                <div>16 Jan 2022</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Company Name</div>
                                <div>Acme co</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Phone Number</div>
                                <div>+65 133569966</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Email ID</div>
                                <div>acmeco@contact.com</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Job Site</div>
                                <div>Pumping Station  1</div>
                            </div>
                            <div style={{
                                width: "100%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",

                                }}>Address</div>

                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Postal Code</div>
                                <div>123456</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Block Number</div>
                                <div>012</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Street Number</div>
                                <div>123</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Unit Number</div>
                                <div>12355</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Level Number</div>
                                <div>456</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Country</div>
                                <div>Singapore</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Inquiry Type </div>
                                <div>Machine Inquiry</div>
                            </div>
                            <div style={{
                                width: "45%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>Machine</div>
                                <div>Centrifugal Pump</div>
                            </div>

                            <div style={{
                                width: "100%",
                                color: "#000"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}>InquiryDetails </div>
                                <div>loreum ipsum is dummy text. loreum ipsum is dummy text.loreum ipsum is dummy text.
                                    loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.
                                    loreum ipsum is dummy text.loreum ipsum is dummy text. loreum ipsum is dummy text.loreum
                                    ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is
                                    dummy text.l oreum ipsum is dummy text.</div>
                            </div>

                        </div>

                    </Card>




                </div>
                <div style={{
                    width: "28%"
                }}>
                    <Card title={
                        <div style={{
                            display: "flex",
                            gap: "10px",

                            alignItems: "center"
                        }}>
                            <img src={Icon4} />
                            <span style={{
                                fontWeight: "bold",
                                fontSize: "17px",
                                color: "#000"
                            }}>Machine Pictures/Videos</span>
                        </div>
                    }>

                        <div>
                            <div style={{
                                // outline-style: dashed;
                                // outline-color: #E6EBF1;
                                // border-radius: 12px;
                                outlineStyle: "dashed",
                                outlineColor: "#E6EBF1",
                                borderRadius: "12px",
                                padding: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                            }}>
                                <img src={SampleImage} />
                            </div>
                        </div>

                    </Card>

                    <Card title={
                        <div style={{
                            display: "flex",
                            gap: "10px",

                            alignItems: "center"
                        }}>
                            <img src={Icon5} />
                            <span style={{
                                fontWeight: "bold",
                                fontSize: "17px",
                                color: "#000"
                            }}>Inquiry Timeline</span>
                        </div>
                    }>

                        <div>
                            <Timeline>
                                <Timeline.Item>
                                    <div>Inquiry Generated.</div>
                                    <div>16 Jan 2022, 10:02 AM</div>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <div>Inquiry Generated.</div>
                                    <div>16 Jan 2022, 10:02 AM</div>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <div>Inquiry Generated.</div>
                                    <div>16 Jan 2022, 10:02 AM</div>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <div>Inquiry Generated.</div>
                                    <div>16 Jan 2022, 10:02 AM</div>
                                </Timeline.Item>

                            </Timeline>
                        </div>

                    </Card>


                </div>

                {/* Card 2 */}


            </div>
            <Card title={
                <div style={{
                    display: "flex",
                    gap: "10px",

                    alignItems: "center"
                }}>
                    <img src={Icon3} />
                    <span style={{
                        fontWeight: "bold",
                        fontSize: "17px",
                        color: "#000"
                    }}>Comments</span>
                </div>
            }>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: "100%"
                }}>
                    <TravelerRemarksLabel labelRemarksReply={labelRemarksReply} setLabelRemarksReply={setLabelRemarksReply} remarksReplying={remarksReplying} setRemarksReplying={setRemarksReplying} remarksModal={remarksModal} setRemarksModal={setRemarksModal} remarksArray={reamarks} />
                </div>

            </Card>
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
            }}><Button

                onClick={() => history.push('/inquiry-management')}
                style={{

                }}>Save</Button>
            </div>
            <Modal width={800} footer={null} visible={remarksModal} onOk={() => {

            }} onCancel={() => {
                setRemarksModal(false)
                setRemarksReplying('')

            }}>
                <TravelerRemarks remarksReply={remarksReply} setRemarksReply={setRemarksReply} remarksReplying={remarksReplying} setRemarksReplying={setRemarksReplying} remarksModal={remarksModal} setRemarksModal={setRemarksModal} remarksArray={reamarks} />
            </Modal>
        </div>
    )
}

export default InquiryDetails