import React from 'react';
import { Collapse, Radio, Input, Button, DatePicker } from 'antd';
import { HistoryOutlined, EditOutlined } from '@ant-design/icons';
// import AuxilleryChecksIcon from "assets/svg/icon";
import { AuxilleryChecksIcon } from 'assets/svg/icon';
// import WhiteImageIcon from './WhiteImageIcon';
import { WhiteImageIcon } from 'assets/svg/icon';
import ReportSerchIcon from "assets/svg/greenSearch.png";
import { ConnectorResistIcon } from 'assets/svg/icon';
import TextArea from "antd/lib/input/TextArea";
import { ViewDetailsIcon } from 'assets/svg/icon';




const { Panel } = Collapse;

const FreeLoadTest = ({
    setInitialcondUploaModa, setInitialeditModal, receiveAndDelData, data, handleRadioChnge, handleRadio1Chnge, statorWindingGlobaldata, statorWindingGlobalRadioChange, setInitialcondUploaModal, selectedImages1,

    setSRUploadForm, setSREditModal, setModalName, auxileryChecksHeater, auxilleryHeaterRadioChange }) => {
    return (
        <>

            <Collapse className="mb-3">
                <Panel
                    header={
                        <>
                            <img src={ReportSerchIcon} alt="..." />
                            Free Load Test
                        </>
                    }
                    key="3"
                >
                    <div className="d-flex justify-content-between">
                        <h4 className="d-flex align-items-center">
                            {" "}
                            <ViewDetailsIcon /> View Details{" "}
                            <span
                                style={{ color: "grey", fontSize: "14px" }}
                                className="font-weight-300 ml-2"
                            >
                                {" "}
                                <HistoryOutlined /> Last updated an hour ago{" "}
                            </span>{" "}
                        </h4>
                        <div>
                            <Button onClick={() => setInitialcondUploaModal(true)}>
                                {" "}
                                Upload Photos
                            </Button>
                            <Button
                                className="bg-primary text-white ml-2"
                                onClick={() => {
                                    setInitialeditModal(true);
                                    setModalName("FreeLoadTest");
                                }}


                            >
                                {" "}
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                    </div>
                    <div className="green-radio mt-4 mb-5">
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.completed_unit}
                            >
                                Stator Volt
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.completed_unit}
                                onChange={(e) => handleRadio1Chnge("completed_unit", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.stator}
                            >
                                Frequency
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.stator}
                                onChange={(e) => handleRadio1Chnge("stator", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.rotor}
                            >
                                Current L1
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.rotor}
                                onChange={(e) => handleRadio1Chnge("rotor", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.coupling}
                            >
                                Current L2
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.coupling}
                                onChange={(e) => handleRadio1Chnge("coupling", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.pulley}
                            >
                                Current L3
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.pulley}
                                onChange={(e) => handleRadio1Chnge("pulley", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.impller}
                            >
                                Connection
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.impller}
                                onChange={(e) => handleRadio1Chnge("impller", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.t_box}
                            >
                                Speed
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.t_box}
                                onChange={(e) => handleRadio1Chnge("t_box", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.t_box_cover}
                            >
                                Rotation
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.t_box_cover}
                                onChange={(e) => handleRadio1Chnge("t_box_cover", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.power_cable}
                            >
                                DE Temp
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.power_cable}
                                onChange={(e) => handleRadio1Chnge("power_cable", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.terminal_board}
                            >
                                NDE Temp
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.terminal_board}
                                onChange={(e) => handleRadio1Chnge("terminal_board", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.connector}
                            >
                                Position
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.connector}
                                onChange={(e) => handleRadio1Chnge("connector", e)}
                            />
                        </div>
                        <div className="mb-4 d-flex justify-content-between">
                            <Radio
                                style={{ width: "30%" }}
                                checked={receiveAndDelData?.cooling_fan_cover}
                            >
                                Time
                            </Radio>
                            <Input
                                style={{ width: "70%" }}
                                placeholder="Type here..."
                                value={data?.cooling_fan_cover}
                                onChange={(e) => handleRadio1Chnge("cooling_fan_cover", e)}
                            />
                        </div>









                        <div className="mt-5">
                            <h5>Remarks</h5>
                            <TextArea rows={5} cols={16} placeholder="Type Here..." />
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </>
    );
};















{/* <Collapse className="mb-3">
                <Panel
                    header={
                        <>
                            <img src={ReportSerchIcon} alt="..." />
                            Free Load tests
                        </>
                    }
                    key="3"
                >
                    <div className="normal-header-color">
                        <Collapse
                            expandIconPosition={"end"}
                            onChange={(data) => console.log(data)}
                            className="mb-3"
                        >
                            <Panel
                                header={
                                    <>
                                        <span className="d-flex align-items-center" style={{ gap: "5px" }}>
                                            <AuxilleryChecksIcon /> View {' '}
                                            <span style={{ color: "grey", fontSize: "14px" }} className="font-weight-300 ml-2">
                                                {' '}
                                                <HistoryOutlined /> Last updated an hour ago{' '}
                                            </span>
                                        </span>
                                        <span className="customEditButton" style={{ gap: "5px" }}>
                                            <Button className="bg-primary text-white mr-1" onClick={(e) => {
                                                e.stopPropagation();
                                                console.log("add");
                                            }}>
                                                +
                                            </Button>
                                            <Button onClick={(e) => {
                                                e.stopPropagation();
                                                setSRUploadForm(true);
                                            }} className="bg-primary text-white mr-1">
                                                <WhiteImageIcon />
                                            </Button>
                                            <Button onClick={(e) => {
                                                e.stopPropagation();
                                                setSREditModal(true);
                                                setModalName("heater");
                                            }} className="bg-primary text-white mr-1">
                                                <EditOutlined />
                                            </Button>
                                        </span>
                                    </>
                                }
                                key="1"
                            >
                                <div className="green-radio">
                                    <div className="mb-4 mt-3 d-flex justify-content-between">
                                        <Radio style={{ width: "30%" }} checked={auxileryChecksHeater?.insulation?.checked}>
                                            Vibration tests
                                        </Radio>
                                        <Input
                                            style={{ width: "70%" }}
                                            placeholder="Type here..."
                                            value={auxileryChecksHeater?.insulation?.value}
                                            onChange={(e) => auxilleryHeaterRadioChange("insulation", e)}
                                            suffix="mΩ"
                                        />
                                    </div>
                                    {/* other radio and input groups */}
{/* </div>
                            </Panel>
                        </Collapse>
                    </div>
                </Panel>
            </Collapse> */}


export default FreeLoadTest;
