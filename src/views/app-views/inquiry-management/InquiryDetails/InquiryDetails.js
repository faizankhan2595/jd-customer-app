import { SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Input,
  message,
  Modal,
  Tag,
  Timeline,
} from "antd";
import React, { useEffect, useState } from "react";
import Icon1 from "assets/OrderDetail/question (4) 1.png";
import Icon2 from "assets/OrderDetail/precision_manufacturing_black_24dp 1 (1).png";
import Icon3 from "assets/OrderDetail/comments 1.png";
import Icon4 from "assets/OrderDetail/perm_media_black_24dp 1.png";
import SampleImage from "assets/OrderDetail/360_F_185851253_EmJWmKOrReArl27PN6bVVV5fOanRiCCm 1.png";
import Icon5 from "assets/OrderDetail/task_black_24dp (4) 1.png";
import Icon6 from "assets/OrderDetail/analytics-icon 1.png";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
// import TravelerRemarksLabel from './TravelerRemarks/TravelerRemarksLabel'
// import TravelerRemarks from './TravelerRemarks/TravelerRemarks'
import { axiosInstance } from "App";
import moment from "moment";
import TravelerRemarksLabel from "./TravelerRemarks/TravelerRemarksLabel";
import TravelerRemarks from "./TravelerRemarks/TravelerRemarks";

function InquiryDetails() {
  const history = useHistory();
  const [data, setData] = useState({});
  const { id } = useParams();
  const [reamarks, setRemarks] = useState([
    // {
    //     addedByName: 'John Doe',
    //     createdAt: '16 Jan 2022',
    //     filePath: '',
    //     remarks: 'This is a dummy remark',
    //     editedLogs: [{
    //         addedByName: 'John Doe',
    //         createdAt: '16 Jan 2022',
    //         filePath: '',
    //         remarks: 'This is a dummy remark',
    //     }]
    // }
  ]);
  const [remarksReplying, setRemarksReplying] = useState("");
  const [remarksReply, setRemarksReply] = useState([]);
  const [labelRemarksReply, setLabelRemarksReply] = useState([]);
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarkss, setRemarkss] = useState("");

  const getData = async (Search = "") => {
    try {
      const response = await axiosInstance.get(`api/web/inquiries/${id}`);
      if (response.status === 200) {
        setData(response.data.item);
        // setData(...response.data.items.filter((item) => item.id == id));
        // console.log(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axiosInstance.get(
        "api/web/inquiries/" + id + "/comments"
      );
      if (response.status === 200) {
        // setRemarks(response.data.items)
        setRemarks(
          response.data.items
            .filter((item) => !item.parent_id) // Remove undefined results
            .map((parentItem) => ({
              ...parentItem,
              content: parentItem.comment,
              editedLogs: response.data.items
                .filter((childItem) => childItem.parent_id === parentItem.id)
                .map((item) => {
                  return {
                    ...item,
                    content: item.comment,
                  };
                }),
            }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getComments();
  }, []);

  const postRemarks = async () => {
    if (remarkss.trim() === "") {
      message.error("Please enter remarks");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/web/inquiries/${id}/comments`,
        {
          // content: remarks,
          // inquiryId: id,
          comment: remarkss,
          parent_id: null,
          // type: 'TRAVELER',
          // filePath: imageUrl.length>0?imageUrl[0].response.data.location:null
        }
      );
      setRemarkss("");
      // setImageUrl([])
      getComments();
    } catch (err) {
      message.error("Error while posting remarks");
    }
  };

  return (
    <div>
      <h4>
        {" "}
        <SettingOutlined />
        <span
          style={{
            color: "#6a6a6a",
            fontWeight: "300",
          }}
        >
          {" "}
          Inquiry Management
        </span>{" "}
        / Inquiry Details{" "}
      </h4>

      <div
        style={{
          textAlign: "right",
          display: "flex",
          justifyContent: "right",
          gap: "20px",
        }}
      >
        <div>
          {data.status == 1 ? (
            <Tag
              color="green"
              style={{
                padding: "3px 30px",
              }}
            >
              Open
            </Tag>
          ) : (
            <Tag
              color="red"
              style={{
                padding: "3px 30px",
              }}
            >
              Close
            </Tag>
          )}
          <div
            style={{
              color: "#72849A",
              fontSize: "12px",
              fontWeight: "400",
              marginTop: "5px",
            }}
          >
            {/* Since 16 Jan 2022, 10:02 AM */}
            Since {moment(data.created_at).format("DD MMM YYYY, hh:mm A")}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "71%",
          }}
        >
          {/* Card 1  */}

          <Card
            title={
              <div
                style={{
                  display: "flex",
                  gap: "10px",

                  alignItems: "center",
                }}
              >
                <img src={Icon1} />
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                  }}
                >
                  Inquiry Details
                </span>
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "40px",
              }}
            >
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Inquiry Date
                </div>
                <div>{moment(data.created_at).format("DD MMM YYYY")}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Company Name
                </div>
                <div>{data.company_name}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Phone Number
                </div>
                <div>{data.phone_code + " " + data.phone_no}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Email ID
                </div>
                <div>{data.email}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Job Site
                </div>
                <div>{data.job_site?.jobsite_name}</div>
              </div>
              <div
                style={{
                  width: "100%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Address
                </div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Postal Code
                </div>
                <div>{data.postal_code}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Block Number
                </div>
                <div>{data.block_number}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Street Number
                </div>
                <div>{data.street_number}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Unit Number
                </div>
                <div>{data.unit_number}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Level Number
                </div>
                <div>456</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Country
                </div>
                <div>
                  {data.country == 155
                    ? "Singapore"
                    : data.country == 75 && "India"}
                </div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Inquiry Type{" "}
                </div>
                <div>{data.inquiry_type}</div>
              </div>
              <div
                style={{
                  width: "45%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Machine
                </div>
                <div>{data.machine?.name}</div>
              </div>

              <div
                style={{
                  width: "100%",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  InquiryDetails{" "}
                </div>
                <div>{data.inquiry_details}</div>
              </div>
            </div>
          </Card>
        </div>
        <div
          style={{
            width: "28%",
          }}
        >
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  gap: "10px",

                  alignItems: "center",
                }}
              >
                <img src={Icon4} />
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                  }}
                >
                  Machine Pictures/Videos
                </span>
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {data.files?.map((file, index) => {
                return (
                  <div
                    style={{
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
                      width: "100%",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      src={file.file_url}
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title={
              <div
                style={{
                  display: "flex",
                  gap: "10px",

                  alignItems: "center",
                }}
              >
                <img src={Icon5} />
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                  }}
                >
                  Inquiry Timeline
                </span>
              </div>
            }
          >
            <div>
              <Timeline>
                <Timeline.Item>
                  <div>Inquiry Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
                <Timeline.Item>
                  <div>Inquiry Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
                <Timeline.Item>
                  <div>Inquiry Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
                <Timeline.Item>
                  <div>Inquiry Generated.</div>
                  <div>16 Jan 2022, 10:02 AM</div>
                </Timeline.Item>
              </Timeline>
            </div>
          </Card>
        </div>

        {/* Card 2 */}
      </div>
      <Card
        title={
          <div
            style={{
              display: "flex",
              gap: "10px",

              alignItems: "center",
            }}
          >
            <img src={Icon3} />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "17px",
                color: "#000",
              }}
            >
              Comments
            </span>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <TravelerRemarksLabel
            labelRemarksReply={labelRemarksReply}
            setLabelRemarksReply={setLabelRemarksReply}
            remarksReplying={remarksReplying}
            setRemarksReplying={setRemarksReplying}
            remarksModal={remarksModal}
            setRemarksModal={setRemarksModal}
            remarksArray={reamarks}
          />
        </div>
        <Input.TextArea
          value={remarkss}
          placeholder="Enter Remarks"
          onChange={(e) => {
            setRemarkss(e.target.value);
          }}
          style={{
            resize: "none",
          }}
          rows={4}
        />
        <div
          style={{
            textAlign: "right",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={() => {
              postRemarks();
            }}
            type="primary"
          >
            Save
          </Button>
        </div>
      </Card>
      {/* <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
            }}><Button
                type='primary'
                onClick={() => history.push('/inquiry-management')}
                style={{

                }}>Save</Button>
            </div> */}
      <Modal
        width={800}
        footer={null}
        visible={remarksModal}
        onOk={() => {}}
        onCancel={() => {
          setRemarksModal(false);
          setRemarksReplying("");
        }}
      >
        <TravelerRemarks
          id={id}
          getRemarks={getComments}
          remarksReply={remarksReply}
          setRemarksReply={setRemarksReply}
          remarksReplying={remarksReplying}
          setRemarksReplying={setRemarksReplying}
          remarksModal={remarksModal}
          setRemarksModal={setRemarksModal}
          remarksArray={reamarks}
        />
      </Modal>
    </div>
  );
}

export default InquiryDetails;
