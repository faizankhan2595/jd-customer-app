import { Avatar, Card, Divider, Tag } from 'antd'
import React from 'react'
import MeterIcon from "assets/Machine/Frame 1171275245.png"
import Machine from "assets/Machine/Avatar.png"
import Address from "assets/Machine/Frame 367.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import VibrationIcon from "assets/Frame 1171275235.png"

function CardMachine() {
    const history = useHistory();
    return (
        <>
            <Card style={{
                width: "32%",
                cursor: "pointer",
            }}
                onClick={() => {
                    history.push("/app/machine-and-sensors/machine-details")
                }}
            >
                <div style={{
                    display: "flex",
                }}>
                    <div style={{
                        display: "flex",
                        color: "#8C8E8F",
                        alignItems: "center",
                        flexDirection: "column",
                        width:"30%"
                    }}>
                        <div><img src={MeterIcon} /></div>
                        <div style={{

                            fontSize: "15px"
                        }}>Machine Health</div>
                        <div style={{

                            fontSize: "11px"
                        }} >*updated on 16 Jan 2023</div>
                    </div>
                    <div style={{
                      width:"70%"
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"flex-end"
                        }}>
                            <div>
                                <div style={{
                                    fontSize:"20px",
                                    fontWeight:"bold",
                                    color:"#000"
                                }}>Centrifugal pump</div>
                                <div style={{
                                    fontSize:"12px",

                                }}>#MC245F556</div>
                            </div>
                            <div style={{
                                height:"70px"
                            }}>
                                <img style={{
                                    height:"100%",
                                }} src={Machine}/>
                            </div>
                        </div>
                        <div style={{
                            display:"flex",
                            gap:"10px",
                            alignItems:"center"
                        }}>
                                <div>  <img src={Address}/></div>
                                <div>Jobsite 1-Pumping Station East</div>
                        </div>
                        <div style={{
                            display:"flex",
                            justifyContent:"flex-end"
                        }}>
                            <img src={VibrationIcon}/>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default CardMachine