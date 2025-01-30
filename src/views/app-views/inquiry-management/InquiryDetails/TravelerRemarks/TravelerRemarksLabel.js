import { Button, Card, Divider, Empty, Input, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import TravelerRemarksReply from './TravelerRemarksReply'
import TraverlerRemarksReplyContainer from './TraverlerRemarksReplyContainer'
import TravelerRemarksReplyLabel from './TravelerRemarksReplyLabel'

function TravelerRemarksLabel({ id, remarksArray, getRemarks, hide, remarksModal, setRemarksModal, labelRemarksReply, setLabelRemarksReply, remarksReplying, setRemarksReplying }) {


    return (
        <div style={{
            width: '100%',
        }}>



            <Card>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '17px',
                    width: '100%'
                }}>
                    {
                        remarksArray.length != 0 ? remarksArray.map((item, index) => {
                            return (
                                <div key={index} style={{
                                    backgroundColor: labelRemarksReply[index] ? '#F7F7F7' : 'white',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: 500,
                                            color: 'black'
                                        }}>{item.user?.name}</div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: 'gray'
                                        }}>{moment(item.createdAt).format('DD MMM YYYY hh:mm a')}</div>
                                    </div>
                                    {/* {item.filePath ?
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            // boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
                                            width: '40%',

                                        }}>
                                            {
                                                item.filePath.split('.').pop() === 'pdf' ? <> <a style={{
                                                    textDecoration: 'underline',
                                                    color: '#2EA3F2',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    // padding: '10px'
                                                }} href={item.filePath} target="_blank" rel="noreferrer">PDF</a>   <Card style={{


                                                }}>
                                                        {item.content}
                                                    </Card>
                                                </>
                                                    : <><img src={item.filePath} alt="file" style={{ width: "200px", height: 'auto' }} />
                                                        <Card style={{


                                                        }}>
                                                            {item.content}
                                                        </Card>
                                                    </>
                                            }

                                        </div> */}
                                        {/* : */}
                                        <div>{item.content}</div>
                                        {/* } */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        color: 'gray',
                                        alignItems: 'center'
                                    }}>
                                        <div onClick={() => {

                                            setRemarksReplying(item.id)
                                            setRemarksModal(true);


                                        }} style={{
                                            textDecoration: 'underline',
                                            color: '#2EA3F2',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}>Reply</div>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#E7E7E7',
                                            borderRadius: '50%'
                                        }}></div>
                                        <div> {item.editedLogs.length} Replies</div>
                                        <TravelerRemarksReplyLabel index={index} editedLogs={item.editedLogs} id={item.id} labelRemarksReply={labelRemarksReply} setLabelRemarksReply={setLabelRemarksReply} />
                                    </div>
                                    <TraverlerRemarksReplyContainer index={index} editedLogs={item.editedLogs} id={item.id} remarksReply={labelRemarksReply} setRemarksReply={setLabelRemarksReply} />

                                </div>
                            )
                        }) : <Empty description="No Remarks" />
                    }
                </div>
            </Card>


        </div>
    )
}

export default TravelerRemarksLabel