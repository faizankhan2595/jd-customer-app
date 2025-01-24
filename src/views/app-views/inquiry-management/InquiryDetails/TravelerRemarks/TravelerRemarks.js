import { Button, Card, Divider, Input, message, Upload } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import TravelerRemarksReply from './TravelerRemarksReply'
import TraverlerRemarksReplyContainer from './TraverlerRemarksReplyContainer'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { axiosInstance } from 'App'

function TravelerRemarks({ id, remarksArray, getRemarks, remarksModal, setRemarksModal, remarksReply, setRemarksReply, remarksReplying, setRemarksReplying,imageUrl,setImageUrl }) {
    const BASE_URL = '';
    const [remarks, setRemarks] = useState('')
    // console.log()

    const [remarksArrayFinal, setRemarksArrayFinal] = useState(remarksArray)




    const handleChange = (info) => {
        console.log(info)
        setImageUrl([info.fileList[info.fileList.length-1]])
    }



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
      
        try {
            const response = await axiosInstance.post(`/api/web/inquiries/${id}/comments`, {
                // content: remarks,
                // inquiryId: id,
                comment: remarks,
                parent_id: remarksReplying,
                // type: 'TRAVELER',
                // filePath: imageUrl.length>0?imageUrl[0].response.data.location:null
            })
            setRemarks('')
            // setImageUrl([])
            getRemarks()
            message.success('Remarks posted successfully')
            setRemarksModal(false) 
        }catch(err){
            console.log(err);
            message.error('Error while posting remarks')
        }


   
    }


    return (
        <div>


            <h3>Remarks</h3>
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


            


        </div>
    )
}

export default TravelerRemarks


