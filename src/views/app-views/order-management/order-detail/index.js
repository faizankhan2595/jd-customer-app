import { SettingOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Input, Tag, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import Icon1 from "assets/OrderDetail/question (4) 1.png"
import Icon2 from "assets/OrderDetail/precision_manufacturing_black_24dp 1 (1).png"
import Icon3 from "assets/OrderDetail/question (4) 1.png"
import Icon4 from "assets/OrderDetail/perm_media_black_24dp 1.png"
import SampleImage from "assets/OrderDetail/360_F_185851253_EmJWmKOrReArl27PN6bVVV5fOanRiCCm 1.png"
import Icon5 from "assets/OrderDetail/task_black_24dp (4) 1.png"
import Icon6 from "assets/OrderDetail/analytics-icon 1.png"
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { axiosInstance } from 'App'
import moment from 'moment'

function Index() {
  const history = useHistory()
  const {id} = useParams();
  const [order, setOrder] = useState({});
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
});
  const getData = async () => {
    try{
      const data = await axiosInstance.get("/api/admin/orders?customer_id="+localStorage.getItem("user_id"));
      const order = data.data.items.find((item)=>item.id == id);
      setOrder(order);
      if(order.survey[0]) setSurveyData(order.survey[0])
    }catch(e){

    }
  }
  useEffect(()=>{
    getData();
  },[])
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
              order.status === 0 ? (
                <Tag color="gold">Order Created</Tag>
              ):
              (
                <Tag color="yellow">Survey Scheduled</Tag>
              )
            }
          <div style={{
            color: "#72849A",
            fontSize: "12px",
            fontWeight: "400",
            marginTop: "5px"
          }}>
            Since 16 Jan 2022, 10:02 AM
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
              {/* <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Country</div>
                <div>Singapore</div>
              </div> */}
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
                order.machine_faults?.map((item,i)=>{
                 return <div style={{
                    width: "80%",
                    color: "#000"
                  }}>
                    {/* <div style={{
                      fontWeight: "bold",
                      marginBottom: "10px"
                    }}>Machine Fault</div> */}
                    <div>{item.fault}</div>
                  </div>
                 
                })
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
                <div>{surveyData.survey_date}</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Technician Assigned</div>
                <div>{surveyData.technician_id || 'Robert Fox'}</div>
              </div>

              <div style={{
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
              </div>

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

            </div>

          </Card>
        </div>
        <div style={{
          width: "28%"
        }}>
          <Card title={
            <div style={{
              display: "flex",
              gap: "10px",

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
              order.files?.length>0?  order.files?.map((item,i)=>{
                  <div style={{
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
                    <img src={item.file_path} />
                  </div>
                }):<Empty/>
              }
            </div>

          </Card>

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
                        <div>Timeline{i+1}</div>
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