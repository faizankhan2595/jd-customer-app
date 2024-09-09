import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";
const Edit = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("id");
  const [notiText, setNotiText] = useState("");
  const [notiTit, setNotiTit] = useState('')
  const history = useHistory();
  const addNoti = async () => {
    if (!notiText||!notiTit) {
      message.error('Please enter title  and description !');
      return
    }
    let data = {
      notification_title: notiTit,
      description: notiText,
      status: 1,
      action: 1,
      type: "system",
    };
    if (id) {
      const res1 = await axios.put(`${API_BASE_URL}/notifications/${id}`,data);
    if (res1.status===201) {
      setNotiText('');
      setNotiTit('')
      history.goBack()
    }
    message.success(res1.data.msg);
    return
    }
    const res1 = await axios.post(`${API_BASE_URL}/notifications`,data);
    if (res1.status===201) {
      setNotiText('');
      setNotiTit('')
      history.goBack()
    }
    console.log(res1);
  };
  const getNotification = async () => {
    const res1 = await axios.get(`${API_BASE_URL}/notifications/${id}`)
    console.log(res1.data[0]);
    setNotiTit(res1.data[0].notification_title)
    setNotiText(res1.data[0].description)
  }
  useEffect(() => {
    if (id) {
    getNotification()
  }
  }, [])
  
  return (
    <>
      <div className="py-3 mb-4 d-flex justify-content-between align-items-center">
        <h5>Notifications</h5>
        <div>
          <Button
            className="mr-4 px-4 font-weight-semibold"
            htmlType="button"
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Button
            className="px-4 font-weight-semibold text-white bg-info"
            onClick={addNoti}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="border rounded p-3 mb-4 bg-white d-flex justify-content-center align-items-center">
        <div className="w-50 pt-5" style={{ height: "60vh" }}>
          <h5>Notification Title</h5>
          <Input value={notiTit} placeholder="Title" onChange={(e)=>setNotiTit(e.target.value)} />
          <br />
          <h5 className="mt-5">Notification Text</h5>
          <ReactQuill theme="snow" value={notiText} onChange={setNotiText} />
        </div>
      </div>
    </>
  );
};

export default Edit;
