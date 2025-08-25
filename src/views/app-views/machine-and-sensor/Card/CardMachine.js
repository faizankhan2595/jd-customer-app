import { Avatar, Card, Divider, Tag } from 'antd'
import React from 'react'
import MeterIcon from "assets/Machine/Frame 1171275245.png"
import Machine from "assets/Machine/Avatar.png"
import Address from "assets/Machine/Frame 367.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import VibrationIcon from "assets/Frame 1171275235.png"
import moment from 'moment'
import Gauge from './Gauge'


function CardMachine({data}) {
    const history = useHistory();
    return (
        <>
            <Card 
            style={{
                width: "32%",
                cursor: "pointer",
            }}
                onClick={() => {
                    history.push("/app/machine-and-sensors/machine-details/"+data.id)
                }}
            >
                <div style={{
                    display: "flex",
                    gap:"10px"
                }}>
                    <div style={{
                        display: "flex",
                        color: "#8C8E8F",
                        alignItems: "center",
                        flexDirection: "column",
                        width:"40%"
                    }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            // border: "1px solid #000",
                        }}>
                            <div>
                                <Gauge value={data.health}/>
                            </div>
                        {/* <img src={MeterIcon} /> */}
                        </div>
                        <div style={{

                            fontSize: "12px"
                        }}>Machine Health</div>
                        <div style={{

                            fontSize: "10px"
                        }} >*updated on {moment(data.updated_at).format("DD MMM YYYY")}</div>
                    </div>
                    <div style={{
                      width:"60%"
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
                                }}>{
                                    data?.name
                                }</div>
                                <div style={{
                                    fontSize:"12px",

                                }}>#{data.id}</div>
                            </div>
                            {/* <div style={{
                                height:"70px",
                                width:"70px",
                            }}>
                                <img style={{
                                    height:"100%",
                                    width:"100%",
                                    objectFit:"cover",
                                }} src={data?.pictures[0]?.file_path}/>
                            </div> */}
                        </div>
                        <div style={{
                            display:"flex",
                            gap:"10px",
                            alignItems:"center"
                        }}>
                                <div>  <img src={Address}/></div>
                                <div>{data?.job_site?.jobsite_name}</div>
                        </div>
                        <div
                        onClick={(e) => {
                            history.push("/app/machine-and-sensors/machine-details/sensors/"+data.id)
                            e.stopPropagation();
                        }}
                        style={{
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