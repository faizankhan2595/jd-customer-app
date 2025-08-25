import { Card, Divider, Popover, Tag } from 'antd'
import React from 'react'
import VibrationIcon from "assets/Frame 1171275235.png"
import QuotationIcon from "assets/quotation.png"
import HousingIcon from "assets/house.png"
import Machine from "assets/Machine.png";
import CalendarIcon from "assets/calendarForDesc.png";
import LocationForIcon from "assets/LocationIcon.png"
import ProfileForCard from "assets/ProfileForCard.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import moment from 'moment'
import QuestionMark from "assets/questionMark.png"
import InHouse from "assets/inhouse.png"
import generalInquiry from "assets/inhouse (1).png"

function CardOrder({data}) {
    console.log(data)
    const history = useHistory();
    return (
        <>
            <Card style={{
                width: "32%",
                cursor: "pointer",
            }}
                onClick={() => {
                    history.push("/app/inquiry-management/inquiry-details/" + data.id)
                }}
            >
                <div style={{
                    display: "flex",
                    gap: "10px",
                }}>
                    <div>
                        <img src={QuestionMark} />
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <div style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "#000"
                        }}>{data.id}</div>
                        {/* <div></div> */}
                        <div>
                            {
                                data.inquiry_status === 0 ? <Tag color="orange">Closed</Tag> : <Tag color="green">Open</Tag>
                            }
                        </div>
                    </div>
                    <div >
                        {
                            data.inquiry_type==="Machine Inquiry"?
                            <img style={{
                                cursor: "pointer"
                            }} src={InHouse} />:
                            <img style={{
                                cursor: "pointer"
                            }} src={generalInquiry} />
                        }
                    </div>
                    {/* <div>
                        <img style={{
                            cursor: "pointer"
                        }} src={LocationForIcon} />
                    </div>  */}
                    {/* <div>
                        <img style={{
                            cursor: "pointer"
                        }} src={ProfileForCard} />
                    </div> */}
                </div>
                <Divider
                    variant="dashed"
                    style={{
                        borderColor: '#F6F4F4',
                    }}
                    dashed
                />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",

                }}>
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",

                    }}>

                        <div><img src={HousingIcon} /></div>
                        <div style={{
                            color: "#72849A",
                            fontSize: "14px",
                        }}>
                            <Popover content={data.inquiry_details}
                                // titleMinWidth="100"
                            >
                            {data.inquiry_details.substring(0, 180)}{data.inquiry_details.length > 180 ? "..." : ""}
                            </Popover>
                        </div>
                    </div>

                    {/* <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",

                    }}>

                        <div><img src={Machine} /></div>
                        <div style={{
                            color: "#72849A",
                            fontSize: "14px",
                        }}>  {data.job_site?.jobsite_description}</div>
                    </div> */}


                    <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",

                    }}>

                        <div><img src={CalendarIcon} /></div>
                        <div style={{
                            color: "#72849A",
                            fontSize: "14px",
                        }}>{
                            moment(data.created_at).format('DD-MM-YYYY HH:mm A')
                        }</div>
                    </div>


                </div>
            </Card>
        </>
    )
}

export default CardOrder