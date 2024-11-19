import { Card, Divider, Tag } from 'antd'
import React from 'react'
import VibrationIcon from "assets/Frame 1171275235.png"
import QuotationIcon from "assets/quotation.png"
import HousingIcon from "assets/house.png"
import Machine from "assets/Machine.png";
import CalendarIcon from "assets/calendarForDesc.png";
import LocationForIcon from "assets/LocationIcon.png"
import ProfileForCard from "assets/ProfileForCard.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function CardOrder() {
    const history = useHistory();
    return (
        <>
            <Card style={{
                width: "32%",
                cursor: "pointer",
            }}
                onClick={() => {
                    history.push("/app/order-management/order-detail")
                }}
            >
                <div style={{
                    display: "flex",
                    gap: "10px",
                }}>
                    <div>
                        <img src={VibrationIcon} />
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <div style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "#000"
                        }}>Vibration Analysis</div>
                        <div>#123123421</div>
                        <div>
                            <Tag color='gold'>Pending</Tag>
                        </div>
                    </div>
                    <div >
                        <img style={{
                            cursor: "pointer"
                        }} src={QuotationIcon} />
                    </div>
                    <div>
                        <img style={{
                            cursor: "pointer"
                        }} src={LocationForIcon} />
                    </div> <div>
                        <img style={{
                            cursor: "pointer"
                        }} src={ProfileForCard} />
                    </div>
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
                        }}>Jobsite 1-Pumping Station East</div>
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",

                    }}>

                        <div><img src={Machine} /></div>
                        <div style={{
                            color: "#72849A",
                            fontSize: "14px",
                        }}>Water Pump</div>
                    </div>


                    <div style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",

                    }}>

                        <div><img src={CalendarIcon} /></div>
                        <div style={{
                            color: "#72849A",
                            fontSize: "14px",
                        }}>Fri, 5 Jan 2022, 4:00 PM-6:00 PM</div>
                    </div>


                </div>
            </Card>
        </>
    )
}

export default CardOrder