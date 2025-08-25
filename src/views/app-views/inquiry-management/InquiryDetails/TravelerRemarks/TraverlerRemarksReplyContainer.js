import { Card } from 'antd'
import moment from 'moment'
import React from 'react'

function TraverlerRemarksReplyContainer({ index, editedLogs, remarksReply, setRemarksReply, id }) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
        }}> {
                remarksReply[index] ? <>{editedLogs.map((item, index) => {
                    return (
                        <>
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
                            {/* {item.previousFilePath ?
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            // boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
                                            width: '40%',

                                        }}>
                                            {
                                                item.previousFilePath.split('.').pop() === 'pdf' ? <> <a style={{
                                                    textDecoration: 'underline',
                                                    color: '#2EA3F2',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    // padding: '10px'
                                                }} href={item.previousFilePath} target="_blank" rel="noreferrer">PDF</a>   <Card style={{
                                                        

                                                }}>
                                                    {item.previousContent}
                                                </Card>
                                                </>
                                                    : <><img src={item.previousFilePath} alt="file" style={{ width: "200px", height: 'auto' }} />
                                                        <Card style={{
                                                        

                                                        }}>
                                                            {item.previousContent}
                                                        </Card>
                                                    </>
                                            }

                                        </div>
                                        : */}
                                        <div>{item.comment}</div>
                                        {/* } */}

                        </>
                    )
                })
                }</> : <></>
            }
        </div>
    )
}

export default TraverlerRemarksReplyContainer

