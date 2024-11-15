import { SettingOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Input, Tag, Timeline } from 'antd'
import React from 'react'
import Icon1 from "assets/OrderDetail/question (4) 1.png"
import Icon2 from "assets/OrderDetail/precision_manufacturing_black_24dp 1 (1).png"
import Icon3 from "assets/OrderDetail/question (4) 1.png"
import Icon4 from "assets/OrderDetail/perm_media_black_24dp 1.png"
import SampleImage from "assets/OrderDetail/360_F_185851253_EmJWmKOrReArl27PN6bVVV5fOanRiCCm 1.png"
import Icon5 from "assets/OrderDetail/task_black_24dp (4) 1.png"
import Icon6 from "assets/OrderDetail/analytics-icon 1.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

function Index() {
  const history = useHistory()
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
        <Button onClick={()=>{
          history.push("/app/order-management/view-quotation")
        }} type="primary">View Quotation</Button>
        <div>
          <Tag color='green' style={{
            padding: "3px 30px",
          }}>Active</Tag>
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
                <div>Acme co</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Job Site</div>
                <div>Pumping Station  1</div>
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
                <div>123456</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Block Number</div>
                <div>012</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Street Number</div>
                <div>123</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Unit Number</div>
                <div>12355</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Level Number</div>
                <div>456</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Country</div>
                <div>Singapore</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Maintenance Service Type </div>
                <div>Onsite</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Name</div>
                <div>Centrifugal Pump</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Make</div>
                <div>Johnson Electric</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Model </div>
                <div>CF1245g6</div>
              </div>
              <div style={{
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
              </div>
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
              <div style={{
                width: "80%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Machine Fault</div>
                <div>Pump Vibrations</div>
              </div>
              <div style={{
                width: "80%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Fault Details</div>
                <div>loreum ipsum is dummy text. loreum ipsum is dummy text.loreum ipsum is dummy text.
                  loreum ipsum is dummy text.loreum ipsum is dummy text.loreum ipsum is dummy text.
                  loreum ipsum is dummy text.</div>
              </div>

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
                <div>16 Jan 2022</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Time Slot</div>
                <div>10:00 AM-12:00 PM</div>
              </div>
              <div style={{
                width: "45%",
                color: "#000"
              }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}>Technician Assigned</div>
                <div>Robert Fox</div>
              </div>
              <div style={{
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
              </div>

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
                <img src={SampleImage} />
              </div>
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
                <Timeline.Item>
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
                </Timeline.Item>
                <Timeline.Item>
                  <div>Order Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>

              </Timeline>
            </div>

          </Card>

          <Card title={
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

          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index