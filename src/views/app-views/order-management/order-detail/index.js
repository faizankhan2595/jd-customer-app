import { EyeOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Input, Tag, Timeline } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import Icon1 from "assets/OrderDetail/question (4) 1.png"
import Icon2 from "assets/OrderDetail/precision_manufacturing_black_24dp 1 (1).png"
import Icon3 from "assets/OrderDetail/question (4) 1.png"
import Icon4 from "assets/OrderDetail/perm_media_black_24dp 1.png"
import SampleImage from "assets/OrderDetail/360_F_185851253_EmJWmKOrReArl27PN6bVVV5fOanRiCCm 1.png"
import Icon5 from "assets/OrderDetail/task_black_24dp (4) 1.png"
import Icon6 from "assets/OrderDetail/analytics-icon 1.png"
import SurveyNotFoundImage from "assets/images/—Pngtree—not found_5408094 (1) 1.png";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { axiosInstance } from 'App'
import moment from 'moment'
import { CountryContext } from 'CountryContext'
import { ImageIcon, UploadFileIcon } from 'assets/svg/icon'

function Index() {
  const history = useHistory()
  const {id} = useParams();
  const {countryList} = useContext(CountryContext);
  const [order, setOrder] = useState({});
  const [fileData, setFileData] = useState([]);
  const [surveyData, setSurveyData] = useState({
    "id": 0,
    "user_id": 0,
    "order_id": 0,
    "survey_date": null,
    "timeslot": null,
    "technician_id": 0,
    "instructions": null,
    "postal_code": "",
    "block_number": "",
    "street_number": "",
    "level_number": "",
    "unit_number": "",
    "country": "",
    "customer_remarks": "",
    "status": 0,
    "is_deleted": 0,
    "technician": ""
});
const getMachineImage = async (id) => {
  const res = await axiosInstance.get(`api/admin/machines/${id}`);
  setFileData(res.data.item.pictures);
}
  const getData = async () => {
    try{
      const data = await axiosInstance.get(`/api/admin/orders/${id}`);
      // orders/${id}
      const order = data.data.item;
      getMachineImage(order.machine_id);
      setOrder(order);
      // const order = data.data.items.find((item)=>item.id == id);
      // setOrder(order);
      if(order.survey[0]) setSurveyData(order.survey[0])
    }catch(e){

    }
  }
  useEffect(()=>{
    getData();
  },[])

  const getTimelineStatus = (time_item, i) => {
    if(time_item.status == 1) {
      return "Order Created"
    }
    if(time_item.status == 2) {
      return "Survey Scheduled"
    }
    return "Timeline "+(i+1)
  }

  return (
    <div>
      <h4> <SettingOutlined /><span
        style={{
          color: "#6a6a6a",
          fontWeight: "300",
        }}
      >
        {" "}
        Order Management
      </span>{" "}
        / Order Details{" "}</h4>

      <div style={{
        textAlign: "right",
        display: "flex",
        justifyContent: "right",
        gap: "20px",
      }}>
        <Button onClick={()=>{
          history.goBack()
        }}>Back</Button>
        {/* <Button onClick={()=>{
          history.push("/app/order-management/view-quotation")
        }} type="primary">View Quotation</Button> */}
        <div>
        {
                (order.status === 1) ? (
                  <Tag color="gold">Order Created</Tag>
                ):
                (order.status === 2) ? (
                  <Tag color="green">Order Scheduled</Tag>
                ):
                (order.status === 3) ? (
                  <Tag color="blue">Order Closed</Tag>
                ):"NA"
              }
          <div style={{
            color: "#72849A",
            fontSize: "12px",
            fontWeight: "400",
            marginTop: "5px"
          }}>
            Since {moment(order.created_at).format("DD-MM-YYYY hh:mmA")}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',

      }}>
        <div style={{
          width: "71%"
        }}>

          {/* Card 1  */}

          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

              alignItems: "center"
            }}>
              <img src={Icon1} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Order Details</span>
            </div>
          }>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px"
            }}>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Company Name</div>
                <div>{order.company_name}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Job Site</div>
                <div>{order.job_site?.jobsite_name}</div>
              </div>
              <div style={{
                width: "100%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",

                }}>Address</div>

              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Postal Code</div>
                <div>{order.postal_code}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Block Number</div>
                <div>{order.block_number}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Street Number</div>
                <div>{order.street_number}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Unit Number</div>
                <div>{order.unit_number}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Level Number</div>
                <div>{order.level_number}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Country</div>
                <h5>
                {/* {data.country} */}
                {countryList.find((country) => country.id == order.country)?.name}
              </h5>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Maintenance Service Type </div>
                <div>{order.maintenance_service_type}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Name</div>
                <div>{order.machine?.name}</div>
              </div>
              {/* <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Make</div>
                <div>{
                  }</div>
              </div> */}
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Model </div>
                <div>{order.model}</div>
              </div>
              {/* <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Sensor</div>
                <div>Vibratory Sensor</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Sensor Location</div>
                <div>Rotor</div>
              </div> */}
            </div>

          </Card>

          {/* Card 2  */}
          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

              alignItems: "center"
            }}>
              <img src={Icon2} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Machine Faults</span>
            </div>
          }>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px"
            }}>
              {
                order.faults?.length>0 ?               
                  order.machine_faults?.map((item,i)=>{
                   return <div style={{
                      width: "80%",
                      color: "#000"
                    }}>
                     <Card>
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
  
                                // color:"black"
                              }}
                            >
                              Fault{" "}
                            </div>
                            {item.fault}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
                                marginTop: "10px",
                                // color:"black"
                              }}
                            >
                              Fault Detail
                            </div>
                            {item.faultDetails}
                          </div>
                        </Card>
                    </div>
                   
                  })
                :<Empty style={{
                  width: "100%",
                }}/>
              }
            </div>

          </Card>


          {/* Card 3 */}
          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

              alignItems: "center"
            }}>
              <img src={Icon3} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Survey Schedule</span>
            </div>
          }>

            {surveyData.created_at ? <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px"
            }}>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Date of Survey</div>
                <div>{surveyData.survey_date}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Survey Time Slot</div>
                <div>{surveyData.timeslot}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Technician Assigned</div>
                <div>{surveyData.technician || 'Robert Fox'}</div>
              </div>

              {/* <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Postal Code</div>
                <div>{surveyData.postal_code}</div>
              </div>

              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Block Number</div>
                <div>{surveyData.block_number}</div>
              </div>

              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Street Name</div>
                <div>{surveyData.street_number}</div>
              </div>

              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Unit Number</div>
                <div>{surveyData.unit_number}</div>
              </div>

              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Level Number</div>
                <div>{surveyData.level_number}</div>
              </div> */}

              <div style={{
                width: "95%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Customer Remarks</div>
                <div>{surveyData.customer_remarks}</div>
              </div>
              
              {/* <div style={{
                width: "80%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Add Remarks</div>
                <div>
                  <Input.TextArea />
                </div>
                <Button style={{
                  marginTop: "10px"
                }} type="primary">Save</Button>
              </div> */}

            </div> : 
            (<div className="d-flex flex-column justify-content-center mt-3">
              <img
                style={{
                  width: "200px",
                  margin: "auto",
                }}
                src={SurveyNotFoundImage}
                alt="..."
              />
              <p className="text-center mt-3">
                Survey is not scheduled yet!{" "}
              </p>
            </div>)}

          </Card>
        </div>
        <div style={{
          width: "28%"
        }}>
          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",
              overflow:"auto" ,height:"100%" ,
              alignItems: "center"
            }}>
              <img src={Icon4} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Machine Pictures/Videos</span>
            </div>
          }>

            <div>
            {
                  fileData.length > 0 ? fileData?.map((item, i) => {
                    return <div style={{
                      // outline-style: dashed;
                      // outline-color: #E6EBF1;
                      // border-radius: 12px;
                      outlineStyle: "dashed",
                      outlineColor: "#E6EBF1",
                      borderRadius: "12px",
                      padding: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                    }}>
                       <img style={{
                        maxWidth:"100%"
                      }} src={item.file_url} />
                      
                    </div>
                  }) : <Empty />
                }
            </div>

          </Card>
          <div style={{ height: "35%", paddingBottom: "0.6rem" }}>
            <div
              style={{ minHeight: "100%" }}
              className="p-3 bg-white border rounded ml-1 customimgUploader"
            >
              <h4 className="d-flex m-0 mb-2">
                <ImageIcon />
                <span className="ml-2">Orders Document</span>
              </h4>
              <div>
  
                 <div className="mt-4">
                      {order?.files?.length > 0 && (
                        <ul className="p-0" style={{ width: "100%" }}>
                          {order.files.map((file, i) => (
                            <li key={i} className="my-3" style={styles.files}>
                              {" "}
                              <div className="d-flex align-items-center">
                                <UploadFileIcon />{" "}
                                <span className="ml-2">Document #{i+1} </span>{" "}
                                {/* <span className="ml-5">
                                            {file.url ? (  <EyeOutlined style={{ cursor: "pointer" }} onClick={() => window.open(file.url)} />) : null}
                                        </span> */}
                              </div>
                              <div>
                                {
                                  file.file_url && <span className="ml-3 " style={{
                                    cursor: "pointer"
                                  }} onClick={() => {
                                    window.open(file.file_url, '_blank')
                                  }}>
                                    <EyeOutlined />
                                  </span>
                                }
                               
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                   
                  </div>
              </div>

            </div>
          </div>
          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

              alignItems: "center"
            }}>
              <img src={Icon5} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Order Timeline</span>
            </div>
          }>

            <div>
              <Timeline>
                {
                  order.timeline?.map((item,i)=>{
                    return (
                      <Timeline.Item>
                        {/* <div>Timeline{i+1}</div> */}
                        <div>{getTimelineStatus(item, i)}</div>
                        <div>{moment(item.created_at).format("DD-MM-YYYY hh:mmA")}</div>
                      </Timeline.Item>
                    )
                  })
                }
                {/* <Timeline.Item>
                  <div>Order Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item> */}
                {/* <Timeline.Item>
                  <div>Order Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
                <Timeline.Item>
                  <div>Order Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
                <Timeline.Item>
                  <div>Order Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item> */}

              </Timeline>
            </div>

          </Card>

          {/* <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

              alignItems: "center"
            }}>
              <img src={Icon6} />
              <span style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000"
              }}>Survey Details</span>
            </div>
          }>

            <div>
              <Empty />
            </div>

          </Card> */}
        </div>
      </div>
    </div>
  )
}

export default Index

const styles = {
  files: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '13px',
    border: '1px solid lightblue',
    padding: '10px',
    borderRadius: '9px',
    background: '#0093ff0a',
  },
  uploadFile: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  '.uploadFile::-webkit-file-upload-button': {
    visibility: 'hidden',
  },
  '.uploadFile::before': {
    content: "'Drag & Drop'",
    display: 'inline-block',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  '.uploadFile:hover::before': {
    backgroundColor: '#ccc',
  },
};