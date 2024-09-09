import React, { useEffect, useState } from "react";
import "./adminchat.css";
import { Tooltip, Upload } from "antd";
// import axios from "axios";
import {
  // FileImageOutlined,
  // FileTextOutlined,
  // VideoCameraOutlined,
  // SendOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import send from "../../assets/adminChat/send.png"
import uploadDoc from "../../assets/adminChat/uploadDoc.png"
import uploadImage from "../../assets/adminChat/uploadImage.png"
import uploadVideo from "../../assets/adminChat/uploadVideo.png"
const ChatInput = ({ setChatData, chatData, setInputValue, inputValue, handleSendChat,attachments,setAttachment,fileList,setFileList,fileForVideo,setFileForVideo,fileForDocument,setFileForDocument,loadings }) => {
  // const [inputValue, setInputValue] = useState("");


  


 
  // const handleSendChat = () => {
  //   // console.log(`input value-${inputValue}`);
  //   setChatData([
  //     ...chatData,
  //     {
  //       id: Math.random(),
  //       senderId: "admin",
  //       message: inputValue,
  //       timestamp: new Date().toLocaleTimeString(navigator.language, {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //       read: false,
  //     },
  //   ]);
  //   setInputValue("");
  // };

  const propsForImage = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const propsForVideo = {
    onRemove: (file) => {
      setFileForVideo([]);
    },
    beforeUpload: (file) => {
      setFileForVideo([...fileForVideo, file]);
      return false;
    },
    fileList:fileForVideo,
  };

  const propsForDocument = {
    onRemove: (file) => {
      setFileForDocument([]);
    },
    beforeUpload: (file) => {
      setFileForDocument([...fileForDocument,file]);
      return false;
    },
    fileList:fileForDocument,
  };

  return (
    <div className="chat-input-box white-card">
      <TextArea
        rows={2}
        placeholder="Type Here..."
        style={{ borderRadius: "8px 8px 0 0" }}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 15px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center",gap:"10px",position:"relative" }}>
          <div style={{paddingTop:"20px"}}>
          <Upload
          // action={}
          {...propsForImage}

          accept="image/*"
        
            
          >
             <Tooltip placement="top" title="Upload Image" >
            <Button 
              icon={<img src={uploadImage} />}
              style={{ border: "none" ,position:"absolute",top:"4px",left:"-2px"}}
              disabled={fileForDocument?.length!==0?true:fileList.length!==0?true:fileForVideo?.length!==0?true:false}
            ></Button>
            </Tooltip>
          </Upload>
          </div>
          <div style={{paddingTop:"20px"}}>
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            {...propsForVideo}
            // fileList={[...fileList]}
            // onChange={handleChangeForVideo}
            accept="video/*"
            // disabled={fileList.length===0 ?false:true}
            
          >
             <Tooltip placement="top" title="Upload Video" >
            <Button
           
              icon={<img src={uploadVideo} />}
              style={{ border: "none",position:"absolute", top:"4px",left:"40px"}}
              disabled={fileForDocument?.length!==0?true:fileList.length!==0?true:fileForVideo?.length!==0?true:false}
              
            ></Button>
            </Tooltip>
          </Upload>
          </div>
          <div style={{paddingTop:"20px"}} >
          <Upload
            {...propsForDocument}
            accept=".pdf,.doc,.docx,.csv"
          >
            <Tooltip placement="top" title="Upload Document" >
            <Button
              icon={<img src={uploadDoc} />}
              style={{ border: "none" ,position:"absolute",top:"4px",left:"80px"}}
              disabled={fileForDocument?.length!==0?true:fileList.length!==0?true:fileForVideo?.length!==0?true:false}
            ></Button>
            </Tooltip>
          </Upload>
          </div>
        </div>
        <Button
          style={{ border: "none", cursor: "pointer", background: "none" ,}}
          onClick={handleSendChat}
          disabled={inputValue?.length >= 1 ? false : fileList?.length!==0?false:fileForDocument?.length!==0?false:fileForVideo?.length!==0?false:true}
        >
         {loadings?<LoadingOutlined/> :<img src={send} />}
        </Button>
     
      

        
      </div>
    </div>
  );
};

export default ChatInput;
