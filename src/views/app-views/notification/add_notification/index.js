import { Button, Input, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BellOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import uploadImage from "middleware/uploadImage";
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";
import { axiosInstance } from "App";
let styles = {
  files: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "13px",
    border: "1px solid lightblue",
    padding: "10px",
    borderRadius: "9px",
    background: "#0093ff0a",
  },
  uploadFile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },

  // Add the new styles here:

  ".uploadFile::-webkit-file-upload-button": {
    visibility: "hidden",
  },

  ".uploadFile::before": {
    content: "'Drag & Drop'",
    display: "inline-block",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },

  ".uploadFile:hover::before": {
    backgroundColor: "#ccc",
  },
};
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: `content${i + 1}`,
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));
const initialTargetKeys = mockData
  .filter((item) => Number(item.key) > 10)
  .map((item) => item.key);

const AddBroadcast = () => {
  const [notiTit, setNotiTit] = useState("");
  const [notiDesc, setNotiDesc] = useState('')
  const location = useLocation();
  const [notiText, setNotiText] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const history = useHistory()
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const submitFun = async () => {
    // var url = [];
    //   for (let i = 0; i < selectedFiles.length; i++) {
    // const img = await uploadImage(selectedFiles);
    //   url.push(img);
    // }
    console.log(targetKeys);
    console.log(notiTit, notiText);

    const res1 = await axiosInstance.post(`/api/admin/notifications/store`, {
      "title": notiTit,
      "description": notiDesc,
      "status": 1
    })
    if (res1.status == 200) {
      history.push('/app/notifications/add_notification')
    }
  }



  // if(res1.status===200){

  //   setModal2Open(true)
  //   setTimeout(() => {
  //       setModal2Open(false)
  //       history.goBack()
  //   }, 1500);
  // }

  //   if (id) {
  //     const res1 = await axios.put(`${API_BASE_URL}/notifications/broadcast/${id}`,{
  //       "ids": targetKeys,
  //       "notification_title": notiTit,
  //       "description": notiDesc,
  //       // "attachment": img
  //   })
  //   if(res1.status===200){

  //     setModal2Open(true)
  //     setTimeout(() => {
  //         setModal2Open(false)
  //         history.goBack()
  //     }, 1500);
  //   }
  //   return
  //   }

  return (
    <>
      <div className="">
        <h4> <BellOutlined /> Notifications</h4>
        <div style={{ gap: '8px' }} className="d-flex justify-content-end">
          <Button className="px-5" onClick={() => history.goBack()}>Back</Button>
          {/* <Button>Save As draft</Button> */}
          <Button className="bg-primary text-white px-5" onClick={submitFun}>Save</Button>
        </div>
        <div className="border rounded p-3 mb-4 bg-white w-100 mt-4 pt-5 d-flex justify-content-center" style={{ minHeight: '70vh' }}>
          <div className="w-50">
            <h5>Notification Title</h5>
            <Input
              value={notiTit}
              placeholder="Title"
              onChange={(e) => setNotiTit(e.target.value)}
            />
            <h5 className="mt-3">Notification Text</h5>
            <TextArea value={notiDesc} onChange={(e) => setNotiDesc(e.target.value)} placeholder="Type Here..." />
            {/* <ReactQuill
              style={{ height: '300px' }} modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }} theme="snow" value={notiText} onChange={setNotiText} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBroadcast;
