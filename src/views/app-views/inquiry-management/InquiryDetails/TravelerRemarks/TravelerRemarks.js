import { Button, Card, Divider, Input, message, Upload } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import TravelerRemarksReply from './TravelerRemarksReply'
import TraverlerRemarksReplyContainer from './TraverlerRemarksReplyContainer'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'

function TravelerRemarks({ id, remarksArray, getRemarks, remarksModal, setRemarksModal, remarksReply, setRemarksReply, remarksReplying, setRemarksReplying,imageUrl,setImageUrl }) {

    const [remarks, setRemarks] = useState('')


    const [remarksArrayFinal, setRemarksArrayFinal] = useState(remarksArray)




    const handleChange = (info) => {
        console.log(info)
        setImageUrl([info.fileList[info.fileList.length-1]])
    }


    const uploadDocument = async (fileList) => {
        try {
            const formData = new FormData();
            formData.append("file", fileList);
            const response = await axios.post(`${BASE_URL}/api/timelines/upload`, formData, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('adminToken')

                }
            });
            console.log(response.data?.data?.location)
            return response.data?.data?.location

        } catch (error) {
            console.error('Error during image upload:', error);
            throw error;
        }
    };
    const handlePreview = (file) => {
        if (file.originFileObj) {
            const fileUrl = URL.createObjectURL(file.originFileObj);
            window.open(fileUrl, '_blank');
        } else {
            window.open(file.url, '_blank');
        }

    };



    const postRemarks = async () => {
        if (remarks.trim() === '') {
            message.error('Please enter remarks')
            return
        }
      



   
    }


    return (
        <div>


            <h3>Traveler Remarks</h3>
            <Divider />

            <div>
                <div>Add Remarks</div>
                <Input.TextArea value={remarks} onChange={(e) => {
                    setRemarks(e.target.value)
                }} style={{
                    resize: 'none'
                }} rows={4} />
            </div>
        
            <div style={{
                textAlign: 'right',
                marginTop: '10px'
            }}>
                <Button onClick={() => {
                    postRemarks()
                }} type="primary">Save</Button>
            </div>


            {remarksArrayFinal.length > 0 && <>     <Divider />  <Card>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '17px'
                }}>
                    {
                        remarksArrayFinal.map((item, index) => {
                            return (
                                <div key={index} style={{
                                    backgroundColor: remarksReply[index] ? '#F7F7F7' : 'white',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: 500,
                                            color: 'black'
                                        }}>{item.addedByName}</div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: 'gray'
                                        }}>{moment(item.createdAt).format('DD MMM YYYY hh:mm a')}</div>
                                    </div>
                                    {item.filePath ?
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

                                        </div>
                                        :
                                        <div>{item.content}</div>}
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        color: 'gray',
                                        alignItems: 'center'
                                    }}>
                                        <div onClick={() => {

                                            setRemarksReplying(item.id)
                                            setRemarksModal(false);
                                            setTimeout(() => {
                                                setRemarksModal(true)
                                            }, 500)

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
                                        <TravelerRemarksReply index={index} editedLogs={item.editedLogs} id={item.id} remarksReply={remarksReply} setRemarksReply={setRemarksReply} />
                                    </div>
                                    <TraverlerRemarksReplyContainer index={index} editedLogs={item.editedLogs} id={item.id} remarksReply={remarksReply} setRemarksReply={setRemarksReply} />

                                </div>
                            )
                        })
                    }
                </div>
            </Card></>}


        </div>
    )
}

export default TravelerRemarks